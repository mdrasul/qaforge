/**
 * aws-test-helper.template.ts
 *
 * QAForge aws-cloud skill — AWS SDK Test Helper base pattern.
 *
 * HOW TO USE:
 *   1. Copy to your-project/tests/cloud/helpers/
 *   2. Install AWS SDK v3: npm install @aws-sdk/client-sqs @aws-sdk/client-s3 @aws-sdk/client-lambda @aws-sdk/client-dynamodb
 *   3. Set required env vars (see getAWSConfig below)
 *   4. Add one method per verification check from your test cases
 *   5. Use the pollUntil helper for async pipeline assertions
 *
 * SECURITY NOTE:
 *   - Never hardcode AWS credentials, ARNs, bucket names, or queue URLs
 *   - All resource identifiers come from process.env
 *   - AWS credential chain handles IAM roles in CI automatically (no key/secret needed)
 *   - This helper is read-only — only verify operations, no data mutations
 */

import {
  SQSClient,
  GetQueueAttributesCommand,
  ReceiveMessageCommand,
} from '@aws-sdk/client-sqs';
import {
  S3Client,
  HeadObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import {
  LambdaClient,
  InvokeCommand,
} from '@aws-sdk/client-lambda';
import {
  DynamoDBClient,
  GetItemCommand,
  AttributeValue,
} from '@aws-sdk/client-dynamodb';

// ─── Config ───────────────────────────────────────────────────────────────

function getAWSRegion(): string {
  return process.env.AWS_REGION ?? 'us-east-1';
}

// ─── Polling helper ───────────────────────────────────────────────────────

/**
 * Poll until a condition returns true, or until the timeout expires.
 * Use for all async pipeline assertions — never use sleep().
 */
export async function pollUntil(
  condition: () => Promise<boolean>,
  timeoutMs = 30_000,
  intervalMs = 1_000
): Promise<boolean> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await condition()) return true;
    await new Promise<void>(r => setTimeout(r, intervalMs));
  }
  return false;
}

// ─── SQS helper ───────────────────────────────────────────────────────────

export class SQSHelper {
  private readonly client: SQSClient;
  private readonly queueUrl: string;

  constructor(queueUrlEnvVar: string) {
    this.client = new SQSClient({ region: getAWSRegion() });
    this.queueUrl = process.env[queueUrlEnvVar] ?? '';
    if (!this.queueUrl) throw new Error(`Env var ${queueUrlEnvVar} is not set`);
  }

  /** Get approximate message count for the queue. */
  async getApproximateMessageCount(): Promise<number> {
    const response = await this.client.send(new GetQueueAttributesCommand({
      QueueUrl: this.queueUrl,
      AttributeNames: ['ApproximateNumberOfMessages'],
    }));
    return parseInt(response.Attributes?.ApproximateNumberOfMessages ?? '0', 10);
  }

  /** Check that the DLQ has zero messages (pass the DLQ URL env var name). */
  async isDlqEmpty(dlqUrlEnvVar: string): Promise<boolean> {
    const dlq = new SQSHelper(dlqUrlEnvVar);
    return (await dlq.getApproximateMessageCount()) === 0;
  }
}

// ─── S3 helper ────────────────────────────────────────────────────────────

export class S3Helper {
  private readonly client: S3Client;
  private readonly bucket: string;

  constructor(bucketEnvVar: string) {
    this.client = new S3Client({ region: getAWSRegion() });
    this.bucket = process.env[bucketEnvVar] ?? '';
    if (!this.bucket) throw new Error(`Env var ${bucketEnvVar} is not set`);
  }

  /** Returns true if the object exists at the given key. */
  async objectExists(key: string): Promise<boolean> {
    try {
      await this.client.send(new HeadObjectCommand({ Bucket: this.bucket, Key: key }));
      return true;
    } catch {
      return false;
    }
  }

  /** Returns the object body as a UTF-8 string. */
  async getObjectContent(key: string): Promise<string> {
    const response = await this.client.send(new GetObjectCommand({ Bucket: this.bucket, Key: key }));
    if (!response.Body) throw new Error(`S3 object at ${key} has no body`);
    return response.Body.transformToString('utf-8');
  }
}

// ─── Lambda helper ────────────────────────────────────────────────────────

export class LambdaHelper {
  private readonly client: LambdaClient;

  constructor() {
    this.client = new LambdaClient({ region: getAWSRegion() });
  }

  /** Invoke a Lambda function synchronously and return the parsed response. */
  async invoke(
    functionNameEnvVar: string,
    payload: Record<string, unknown>
  ): Promise<{ statusCode: number; body: unknown; hasError: boolean }> {
    const functionName = process.env[functionNameEnvVar] ?? '';
    if (!functionName) throw new Error(`Env var ${functionNameEnvVar} is not set`);

    const response = await this.client.send(new InvokeCommand({
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload),
    }));

    const rawPayload = response.Payload ? Buffer.from(response.Payload).toString('utf-8') : '{}';
    const body = JSON.parse(rawPayload);
    const hasError = !!response.FunctionError;

    return { statusCode: response.StatusCode ?? 0, body, hasError };
  }
}

// ─── DynamoDB helper ──────────────────────────────────────────────────────

export class DynamoDBHelper {
  private readonly client: DynamoDBClient;
  private readonly tableName: string;

  constructor(tableNameEnvVar: string) {
    this.client = new DynamoDBClient({ region: getAWSRegion() });
    this.tableName = process.env[tableNameEnvVar] ?? '';
    if (!this.tableName) throw new Error(`Env var ${tableNameEnvVar} is not set`);
  }

  /** Get a single item by partition key (and optional sort key). */
  async getItem(
    pk: { name: string; value: string },
    sk?: { name: string; value: string }
  ): Promise<Record<string, AttributeValue> | null> {
    const key: Record<string, AttributeValue> = {
      [pk.name]: { S: pk.value },
    };
    if (sk) key[sk.name] = { S: sk.value };

    const response = await this.client.send(new GetItemCommand({
      TableName: this.tableName,
      Key: key,
    }));

    return response.Item ?? null;
  }
}
