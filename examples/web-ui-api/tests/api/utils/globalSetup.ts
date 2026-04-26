/**
 * globalSetup.ts — Runs once before all tests.
 * Sets environment defaults that tests depend on.
 */
export default async function globalSetup(): Promise<void> {
  // Set API base URL default if not already set by CI/env
  process.env.API_BASE_URL ??= 'http://localhost:3001/v1';

  // In a real project: fetch a short-lived auth token here and store it
  // process.env.API_TOKEN = await fetchQAToken();

  // For this demo: a placeholder token is used
  process.env.API_TOKEN ??= 'demo-qa-token-replace-with-real';

  console.log('[QAForge globalSetup] API_BASE_URL:', process.env.API_BASE_URL);
}
