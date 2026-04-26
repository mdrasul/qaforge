/**
 * QAForge — Playwright Fixture Pattern Template
 * ─────────────────────────────────────────────────────────────────────────────
 * PURPOSE:
 *   This is the reference template for how QAForge expects Playwright fixtures
 *   to be structured. The Playwright Automation Engineer agent extends this
 *   pattern when adding new scenario data or page objects to the fixture set.
 *
 * HOW TO USE:
 *   1. Copy this pattern into your project's fixtures file
 *   2. Replace [TODO] types and data with your actual scenario data models
 *   3. Register overlay handlers here (not in individual spec files)
 *   4. Import this extended `test` in all spec files — never import from @playwright/test directly
 *
 * RULE:
 *   There is ONE fixture file per project. The Automation Engineer agent
 *   EXTENDS this file — it never creates a second fixture file.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { test as base, expect, type Page } from '@playwright/test';
import { ExamplePage } from '../pages/ExamplePage';   // [TODO: import your POM]

// ─── SCENARIO DATA TYPES ────────────────────────────────────────────────────
// Define a TypeScript interface for each scenario's resolved test data.
// These types mirror what the Data Resolver puts in 04_TEST_DATA.md.

interface ScenarioData {
  id: string | number;                         // The record ID (event ID, order ID, etc.)
  url?: string;                                // Full URL if pre-built
  apiResponse?: Record<string, unknown>;       // Key API fields from 04_TEST_DATA.md
  // [TODO: Add fields specific to your application]
  // e.g. ctaLabel?: string;
  // e.g. status?: 'on-sale' | 'presale' | 'cancelled';
}

// ─── FIXTURE TYPE DECLARATION ────────────────────────────────────────────────
// Declare all fixtures. Every scenario gets its own fixture key.
// Page Objects are also declared here so specs access them via fixture, not directly.

type QAForgeFixtures = {
  // Page object fixtures — one per page under test
  examplePage: ExamplePage;    // [TODO: rename to your page, e.g. eventPage, orderPage]

  // Scenario data fixtures — one per scenario in 03_BDD_TEST_CASES.md
  sc01: ScenarioData;          // SC-01 (e.g. on-sale event)
  sc02: ScenarioData;          // SC-02 (e.g. presale event)
  sc03: ScenarioData;          // SC-03 (e.g. CMS-disabled event)
  // [TODO: Add sc04, sc05, etc. as needed per story]
};

// ─── EXTENDED TEST OBJECT ────────────────────────────────────────────────────
// Export this as `test` — ALL spec files import from this file.

export const test = base.extend<QAForgeFixtures>({

  // ── Page Object Fixture ────────────────────────────────────────────────────
  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page);
    await registerOverlayHandlers(page);       // Always register overlays before use
    await use(examplePage);
  },

  // ── Scenario Data Fixtures ─────────────────────────────────────────────────
  // Data comes from:
  //   - Static import from test data cache (e.g. .event-cache.json from globalSetup)
  //   - Direct construction from 04_TEST_DATA.md values
  //   - [TODO: import your resolved data source]

  sc01: async ({}, use) => {
    // [TODO: Replace with real data from 04_TEST_DATA.md — SC-01]
    await use({
      id: '10042',
      url: '/events/10042',
      apiResponse: { ctaLabel: 'Get Tickets', ctaEnabled: true, status: 'on-sale' },
    });
  },

  sc02: async ({}, use) => {
    // [TODO: Replace with real data from 04_TEST_DATA.md — SC-02]
    await use({
      id: '10043',
      url: '/events/10043',
      apiResponse: { ctaLabel: 'Register for Presale', ctaEnabled: true, status: 'presale' },
    });
  },

  sc03: async ({}, use) => {
    // [TODO: Replace with real data from 04_TEST_DATA.md — SC-03]
    await use({
      id: '10044',
      url: '/events/10044',
      apiResponse: { ctaLabel: 'Get Tickets', ctaEnabled: false, status: 'on-sale' },
    });
  },

});

// ─── OVERLAY HANDLER REGISTRATION ────────────────────────────────────────────
// Register addLocatorHandler for any persistent overlays (cookie banners, modals,
// permission prompts) that can appear mid-test and interrupt test flow.
//
// This runs once per page fixture — before each spec that uses the page.

async function registerOverlayHandlers(page: Page): Promise<void> {
  // [TODO: Add your application's overlays here]
  // Example: cookie consent banner
  await page.addLocatorHandler(
    page.getByRole('dialog', { name: /cookie/i }),
    async (dialog) => {
      await dialog.getByRole('button', { name: /accept|got it/i }).click();
    }
  );

  // Example: newsletter signup modal
  await page.addLocatorHandler(
    page.getByRole('dialog', { name: /subscribe|newsletter/i }),
    async (dialog) => {
      await dialog.getByRole('button', { name: /close|no thanks/i }).click();
    }
  );
}

// ─── RE-EXPORT EXPECT ────────────────────────────────────────────────────────
// Re-export expect from this file so specs only ever import from here.
export { expect };
