# QAForge Skill — aws-cloud

The `aws-cloud` skill extends QAForge for projects where test coverage requires verifying cloud pipeline behavior — SQS message delivery, S3 object presence, Lambda execution results, and DynamoDB state.

---

## When to use this skill

Use `aws-cloud` when your story involves:
- Verifying that an event-driven pipeline processed a message (SQS → Lambda → target)
- Checking that a file was uploaded, transformed, or archived in S3
- Validating Lambda execution results and error rates
- DynamoDB item state verification after a pipeline run
- End-to-end cloud pipeline smoke tests

---

## What this skill provides

| Agent | Replaces / Adds | Purpose |
|-------|----------------|---------|
| `aws-pipeline-runner.agent.md` | QAForge Automation Engineer | Generates AWS SDK test scripts for pipeline verification |
| `aws-infra-validator.agent.md` | (adds to) QAForge QA Validator | Validates cloud resource state against expected outcomes |

| Template | Purpose |
|----------|---------|
| `aws-test-helper.template.ts` | Typed AWS SDK helper pattern (SQS, S3, Lambda, DynamoDB) |

---

## Setup

AWS Cloud skill agents are pre-installed in `.github/agents/` when you clone QAForge. No agent files to copy.

To use the AWS test helper template as a starting point:

```bash
cp skills/aws-cloud/templates/aws-test-helper.template.ts tests/cloud/helpers/
```

Install the AWS SDK v3:
```bash
npm install @aws-sdk/client-sqs @aws-sdk/client-s3 @aws-sdk/client-lambda @aws-sdk/client-dynamodb
```

---

## Required context files

| File | Required? | Notes |
|------|-----------|-------|
| `PROJECT_CONTEXT.md` | YES | Always required |
| `AUTOMATION_CONTEXT.md` | YES | Language, test runner |
| AWS resource identifiers | Inline in story or `PROJECT_CONTEXT.md` | Queue ARNs, bucket names, Lambda function names, DynamoDB table names |

---

## Security note

AWS credentials must come from IAM roles (in CI) or environment variables (local). Never hardcode `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` in test files. The template uses the AWS SDK's default credential chain, which automatically picks up IAM roles in CI environments.

---

## Supported AWS services

- **SQS** — send test messages, verify message delivery, check dead-letter queues
- **S3** — verify object presence, check object metadata, validate file content
- **Lambda** — invoke functions, verify response payload and error rates
- **DynamoDB** — query items by PK/SK, verify attribute values after pipeline run
