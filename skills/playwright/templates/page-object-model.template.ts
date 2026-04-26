/**
 * QAForge — Playwright Page Object Model Template
 * ─────────────────────────────────────────────────────────────────────────────
 * PURPOSE:
 *   This is the reference template for how QAForge expects a Playwright POM to
 *   be structured. The Playwright Automation Engineer agent uses this pattern
 *   when extending existing POMs or creating new ones.
 *
 * HOW TO USE:
 *   1. Rename the class and file to match the page you're modeling
 *   2. Replace [TODO] locators with real selectors from your application
 *   3. Add this file path to "Existing Key Files" in AUTOMATION_CONTEXT.md
 *   4. Import from your fixture file — not directly in spec files
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { type Locator, type Page } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;

  // ─── LOCATORS ──────────────────────────────────────────────────────────────
  // Define ALL selectors here as Locator properties.
  // Spec files NEVER contain raw selectors — they call POM methods only.
  //
  // Selector priority (most stable → least stable):
  //   1. getByRole (accessibility-based — most resilient)
  //   2. getByLabel / getByPlaceholder
  //   3. getByTestId (data-testid attribute — requires dev cooperation)
  //   4. getByText (for unique visible text)
  //   5. CSS selector (last resort — avoid dynamic/generated class names)

  // [TODO: Replace with your actual locators]
  readonly pageHeading: Locator;
  readonly primaryCta: Locator;
  readonly stickyCta: Locator;
  readonly inlineCta: Locator;
  readonly navigationMenu: Locator;

  // ─── CONSTRUCTOR ───────────────────────────────────────────────────────────
  constructor(page: Page) {
    this.page = page;

    // [TODO: Replace with real selectors]
    this.pageHeading    = page.getByRole('heading', { level: 1 });
    this.primaryCta     = page.getByRole('button', { name: /get tickets/i });
    this.stickyCta      = page.getByTestId('sticky-cta');
    this.inlineCta      = page.getByTestId('inline-cta');
    this.navigationMenu = page.getByRole('navigation');
  }

  // ─── NAVIGATION ────────────────────────────────────────────────────────────

  /**
   * Navigate to this page using a URL built from test data.
   * Read the base URL from config — never hardcode environment URLs here.
   */
  async goto(id: string | number): Promise<void> {
    await this.page.goto(`/[TODO: your-route]/${id}`);
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ─── ACTIONS ───────────────────────────────────────────────────────────────

  /**
   * Scroll the page until the inline CTA is in view.
   * Used to trigger sticky CTA appearance.
   */
  async scrollPastInlineCta(): Promise<void> {
    await this.inlineCta.scrollIntoViewIfNeeded();
    await this.page.mouse.wheel(0, 300);
    // Allow scroll-triggered visibility transitions to complete
    await this.page.waitForTimeout(300);
  }

  /**
   * Click the primary CTA and wait for navigation.
   */
  async clickPrimaryCta(): Promise<void> {
    await this.primaryCta.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ─── ASSERTIONS / STATE READERS ────────────────────────────────────────────
  // These are helper methods that RETURN values or booleans for use in specs.
  // The actual expect() calls stay in the spec file.

  /**
   * Returns true if the sticky CTA is currently visible in the viewport.
   */
  async isStickyCTAVisible(): Promise<boolean> {
    return await this.stickyCta.isVisible();
  }

  /**
   * Returns the text content of the primary CTA button.
   */
  async getPrimaryCtaLabel(): Promise<string> {
    return (await this.primaryCta.textContent()) ?? '';
  }

  // ─── OVERLAY / MODAL HANDLING ──────────────────────────────────────────────
  // Register overlay handlers in the fixture or globalSetup, not here.
  // See: fixture-pattern.template.ts for how to register addLocatorHandler.
  //
  // Add page-specific overlay locators here if needed:

  readonly cookieBanner: Locator = this.page.getByRole('dialog', { name: /cookie/i });

  async dismissCookieBanner(): Promise<void> {
    if (await this.cookieBanner.isVisible()) {
      await this.cookieBanner.getByRole('button', { name: /accept/i }).click();
    }
  }
}
