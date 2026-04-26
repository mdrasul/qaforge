import { Page, Locator } from '@playwright/test';

/**
 * EventPage — Page Object Model for the EventHub Event Detail page.
 *
 * Selector priority (per AUTOMATION_CONTEXT.md):
 *   1. getByRole  — semantic/accessible selectors
 *   2. getByLabel — form fields
 *   3. getByTestId — data-testid attributes
 *   4. CSS selector — last resort only
 */
export class EventPage {
  readonly page: Page;

  // Inline CTA (within the hero section)
  readonly ctaButton: Locator;

  // Sticky CTA (fixed position, visible after scrolling past hero)
  readonly stickyCtaButton: Locator;

  // Hero section container — used to determine scroll threshold
  readonly heroSection: Locator;

  // Ticket price block
  readonly ticketPriceBlock: Locator;

  // Pre-sale "Get Notified" modal
  readonly presaleModal: Locator;
  readonly presaleModalCloseButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ctaButton = page.getByTestId('event-cta-button');
    this.stickyCtaButton = page.getByTestId('event-cta-sticky');
    this.heroSection = page.getByTestId('event-hero');
    this.ticketPriceBlock = page.getByTestId('ticket-price-block');
    this.presaleModal = page.getByRole('dialog', { name: 'Get Notified' });
    this.presaleModalCloseButton = page.getByRole('button', { name: 'Close' });
  }

  // ─── Navigation ──────────────────────────────────────────────────────────────

  async goto(eventId: string): Promise<void> {
    await this.page.goto(`/events/${eventId}`);
    // Wait for the hero section to be present before proceeding
    await this.heroSection.waitFor({ state: 'visible' });
  }

  // ─── Actions ─────────────────────────────────────────────────────────────────

  /**
   * Scrolls past the hero section to trigger sticky CTA visibility.
   * Waits briefly for the IntersectionObserver animation to settle.
   */
  async scrollPastHero(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' }));
    // Allow 150ms for IntersectionObserver + CSS opacity transition
    await this.page.waitForTimeout(150);
  }

  /**
   * Scrolls back to the top of the page.
   */
  async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await this.page.waitForTimeout(150);
  }

  async clickCtaButton(): Promise<void> {
    await this.ctaButton.click();
  }

  async clickStickyCtaButton(): Promise<void> {
    await this.stickyCtaButton.click();
  }

  async closePesaleModal(): Promise<void> {
    await this.presaleModal.waitFor({ state: 'visible' });
    await this.presaleModalCloseButton.click();
  }

  // ─── State readers ────────────────────────────────────────────────────────────

  async getCtaLabel(): Promise<string> {
    return (await this.ctaButton.textContent()) ?? '';
  }

  async getStickyCtaLabel(): Promise<string> {
    return (await this.stickyCtaButton.textContent()) ?? '';
  }

  async isCtaVisible(): Promise<boolean> {
    return this.ctaButton.isVisible();
  }

  async isStickyCtaVisible(): Promise<boolean> {
    return this.stickyCtaButton.isVisible();
  }

  async isPresaleModalOpen(): Promise<boolean> {
    return this.presaleModal.isVisible();
  }
}
