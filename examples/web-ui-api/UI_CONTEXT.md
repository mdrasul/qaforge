---
## UI CONTEXT — EventHub Demo Project

---

## 1. APPLICATION URL STRUCTURE

| Page | Path | Notes |
|------|------|-------|
| Home | `/` | Event listing grid |
| Event Detail | `/events/{id}` | Main page under test |
| Checkout | `/checkout` | Out of scope for this demo |
| Login | `/login` | Required for purchase path |

---

## 2. EVENT DETAIL PAGE LAYOUT

The Event Detail page has three visual zones:

```
┌─────────────────────────────────────┐
│  HERO SECTION (~600px tall)         │  ← data-testid="event-hero"
│  - Event title                      │
│  - Date, venue                      │
│  - Hero image                       │
│  - Inline CTA button                │  ← data-testid="event-cta-button"
├─────────────────────────────────────┤
│  EVENT INFO SECTION                 │
│  - Description                      │
│  - Lineup                           │
│  - Ticket pricing block             │  ← data-testid="ticket-price-block"
├─────────────────────────────────────┤
│  STICKY CTA (appears on scroll)     │  ← data-testid="event-cta-sticky"
│  - Same label as inline CTA         │
│  - Fixed position at bottom         │
│  - Hidden when hero is in viewport  │
└─────────────────────────────────────┘
```

---

## 3. CTA BUTTON STATES

| API `status` | `cta_disabled` flag | Inline CTA | Sticky CTA |
|-------------|---------------------|-----------|------------|
| `on_sale` | `false` | "Buy Tickets" | "Buy Tickets" (sticky on scroll) |
| `presale` | `false` | "Get Notified" | "Get Notified" (sticky on scroll) |
| `disabled` | `true` | Not rendered | Not rendered |
| Any | `true` | Not rendered | Not rendered |

---

## 4. STICKY CTA SCROLL BEHAVIOR

- Sticky CTA is **hidden** when the hero section is in the viewport (scroll Y < 600)
- Sticky CTA becomes **visible** when the user scrolls past the hero section (scroll Y >= 600)
- The transition uses a CSS `opacity` animation (100ms) — allow for this in assertions
- Sticky CTA disappears again if user scrolls back to top

**How to trigger in tests:**
```typescript
await page.evaluate(() => window.scrollTo(0, 700));
await expect(page.getByTestId('event-cta-sticky')).toBeVisible();
```

---

## 5. KEY SELECTORS

| Element | Selector strategy | Value |
|---------|-------------------|-------|
| Inline CTA button | `data-testid` | `event-cta-button` |
| Sticky CTA button | `data-testid` | `event-cta-sticky` |
| Hero section | `data-testid` | `event-hero` |
| Ticket price block | `data-testid` | `ticket-price-block` |
| Pre-sale modal | `role` | `dialog` with name "Get Notified" |
| Pre-sale modal close | `role` | `button` with name "Close" |
| Nav login link | `role` | `link` with name "Log in" |

---

## 6. KNOWN UI QUIRKS

| Quirk | Detail | Mitigation |
|-------|--------|-----------|
| Sticky CTA scroll detection | Uses IntersectionObserver — may fire slightly late in headless mode | `await page.waitForTimeout(150)` after scroll, or use `addLocatorHandler` |
| Pre-sale modal animation | 200ms slide-in animation | `await expect(modal).toBeVisible()` before interacting |
| Hero image lazy-load | Hero image loads async — can cause layout shift | Assert CTA after `networkidle` or explicit image load wait |
| Price block currency format | Renders as `$45.00` — assert with regex `/\$\d+\.\d{2}/` | Use regex matcher in assertions |
