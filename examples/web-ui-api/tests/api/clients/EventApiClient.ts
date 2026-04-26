import { APIRequestContext } from '@playwright/test';

interface EventDetail {
  id: string;
  title: string;
  status: 'on_sale' | 'presale' | 'disabled';
  cta_disabled: boolean;
  price_from_usd: number;
  venue: {
    name: string;
    city: string;
    country: string;
  };
}

/**
 * EventApiClient — typed API client for the EventHub REST API.
 * Base URL and auth token are sourced from environment variables
 * set in globalSetup.ts.
 */
export class EventApiClient {
  private readonly request: APIRequestContext;
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3001/v1';
    this.token = process.env.API_TOKEN ?? '';
  }

  private get authHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  async getEvent(eventId: string): Promise<{ status: number; body: EventDetail }> {
    const response = await this.request.get(`${this.baseUrl}/events/${eventId}`, {
      headers: this.authHeaders,
    });
    const body = await response.json() as EventDetail;
    return { status: response.status(), body };
  }

  async getEvents(page = 1): Promise<{ status: number; body: unknown }> {
    const response = await this.request.get(`${this.baseUrl}/events`, {
      params: { page },
      headers: this.authHeaders,
    });
    const body = await response.json();
    return { status: response.status(), body };
  }
}
