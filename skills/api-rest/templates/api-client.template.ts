/**
 * api-client.template.ts
 *
 * QAForge api-rest skill — Typed API Client base pattern.
 *
 * HOW TO USE:
 *   1. Copy this file to your-project/tests/api/clients/
 *   2. Rename it to match your API (e.g. OrderApiClient.ts)
 *   3. Replace [YOUR_API_NAME] with your API name throughout
 *   4. Add one method per endpoint you need to test
 *   5. Set API_BASE_URL and API_TOKEN in your environment / globalSetup.ts
 *
 * SELECTOR PRIORITY (what to assert in tests):
 *   1. HTTP status code — always first
 *   2. Required body fields (per API_CONTEXT.md response shape)
 *   3. Specific field values that matter for the AC
 *   4. Headers — only if an AC explicitly requires it
 */

import { APIRequestContext } from '@playwright/test';

// ─── Response types ────────────────────────────────────────────────────────
// Define one interface per endpoint response — copy shapes from API_CONTEXT.md

interface [YOUR_API_NAME]Response {
  id: string;
  // TODO: add fields from your API_CONTEXT.md response shape
}

interface [YOUR_API_NAME]ListResponse {
  data: [YOUR_API_NAME]Response[];
  meta: {
    total: number;
    page: number;
    per_page: number;
  };
}

interface ApiError {
  error: string;
  message?: string;
  status?: number;
}

// ─── Client class ─────────────────────────────────────────────────────────

export class [YOUR_API_NAME]ApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    // Source from env — set in globalSetup.ts or CI environment
    this.baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3001/v1';
    this.token = process.env.API_TOKEN ?? '';
  }

  // Auth headers — applied to every request
  private get authHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  // ─── GET single resource ──────────────────────────────────────────────

  async getById(id: string): Promise<{ status: number; body: [YOUR_API_NAME]Response | ApiError }> {
    const response = await this.request.get(`${this.baseUrl}/[resource]/${id}`, {
      headers: this.authHeaders,
    });
    const body = await response.json();
    return { status: response.status(), body };
  }

  // ─── GET list ─────────────────────────────────────────────────────────

  async list(page = 1): Promise<{ status: number; body: [YOUR_API_NAME]ListResponse | ApiError }> {
    const response = await this.request.get(`${this.baseUrl}/[resource]`, {
      params: { page },
      headers: this.authHeaders,
    });
    const body = await response.json();
    return { status: response.status(), body };
  }

  // ─── POST create ──────────────────────────────────────────────────────

  async create(payload: Partial<[YOUR_API_NAME]Response>): Promise<{ status: number; body: [YOUR_API_NAME]Response | ApiError }> {
    const response = await this.request.post(`${this.baseUrl}/[resource]`, {
      headers: this.authHeaders,
      data: payload,
    });
    const body = await response.json();
    return { status: response.status(), body };
  }

  // ─── PUT / PATCH update ───────────────────────────────────────────────

  async update(id: string, payload: Partial<[YOUR_API_NAME]Response>): Promise<{ status: number; body: [YOUR_API_NAME]Response | ApiError }> {
    const response = await this.request.patch(`${this.baseUrl}/[resource]/${id}`, {
      headers: this.authHeaders,
      data: payload,
    });
    const body = await response.json();
    return { status: response.status(), body };
  }

  // ─── DELETE ───────────────────────────────────────────────────────────

  async delete(id: string): Promise<{ status: number }> {
    const response = await this.request.delete(`${this.baseUrl}/[resource]/${id}`, {
      headers: this.authHeaders,
    });
    return { status: response.status() };
  }
}
