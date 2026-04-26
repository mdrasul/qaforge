import { test as base, expect } from '@playwright/test';
import { EventPage } from '../pages/EventPage';
import { EventApiClient } from '../../api/clients/EventApiClient';

// ─── Fixture data types ───────────────────────────────────────────────────────

export interface EventFixtureData {
  id: string;
  title: string;
  status: 'on_sale' | 'presale' | 'disabled';
}

export interface QAForgeFixtures {
  eventPage: EventPage;
  apiClient: EventApiClient;
  onSaleEvent: EventFixtureData;
  presaleEvent: EventFixtureData;
  disabledEvent: EventFixtureData;
}

// ─── Pre-seeded fixture event IDs (see API_CONTEXT.md §3) ────────────────────

const FIXTURE_EVENTS: Record<string, EventFixtureData> = {
  onSale: { id: 'evt_onsale_01', title: 'Midnight Echoes World Tour', status: 'on_sale' },
  presale: { id: 'evt_presale_01', title: 'The Velvet Frequency — Spring Tour', status: 'presale' },
  disabled: { id: 'evt_disabled_01', title: 'Archive Event (CMS disabled)', status: 'disabled' },
};

// ─── Extended test with fixtures ─────────────────────────────────────────────

export const test = base.extend<QAForgeFixtures>({

  eventPage: async ({ page }, use) => {
    const eventPage = new EventPage(page);

    // Register overlay handler for the pre-sale modal in case it appears unexpectedly
    await page.addLocatorHandler(
      page.getByRole('dialog', { name: 'Get Notified' }),
      async () => {
        await page.getByRole('button', { name: 'Close' }).click();
      }
    );

    await use(eventPage);
  },

  apiClient: async ({ request }, use) => {
    const client = new EventApiClient(request);
    await use(client);
  },

  onSaleEvent: async ({}, use) => {
    await use(FIXTURE_EVENTS.onSale);
  },

  presaleEvent: async ({}, use) => {
    await use(FIXTURE_EVENTS.presale);
  },

  disabledEvent: async ({}, use) => {
    await use(FIXTURE_EVENTS.disabled);
  },
});

export { expect };
