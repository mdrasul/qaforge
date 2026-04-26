# UI_CONTEXT.md
# ─────────────────────────────────────────────────────────────────────────────
# QAForge Context File — UI & Web / Mobile Layer
# TIER 2 — CONDITIONAL. Required only if testing a web or mobile user interface.
# ─────────────────────────────────────────────────────────────────────────────
#
# HOW TO USE:
#   Copy to your project root as UI_CONTEXT.md and fill in all [TODO] fields.
#   The richer this file is, the more precise the selector strategies and
#   responsive test cases will be.
# ─────────────────────────────────────────────────────────────────────────────

---

## 1. UI IDENTITY

| Field | Value |
|-------|-------|
| **UI Framework** | [TODO: React / Angular / Vue / ASP.NET MVC / Next.js / Svelte / iOS Native / Android Native] |
| **Rendering Mode** | [TODO: Client-side SPA / Server-side rendered (SSR) / Static / Hybrid] |
| **CSS / Styling** | [TODO: CSS Modules / Tailwind / Bootstrap / Material UI / Styled Components / Plain CSS] |
| **Component Library** | [TODO: MUI / Ant Design / Chakra / Custom / None] |
| **State Management** | [TODO: Redux / Zustand / Context API / NgRx / None] |

---

## 2. KEY PAGES & ROUTES

[TODO: List every page / route that QA tests. Provide the URL pattern and describe key elements.]

| Page Name | URL Pattern | Key UI Elements | Notes |
|-----------|------------|----------------|-------|
| [TODO: Home / Dashboard] | [TODO: `/` or `/dashboard`] | [TODO: Nav bar, summary cards, recent orders table] | |
| [TODO: Order Detail Page] | [TODO: `/orders/{id}`] | [TODO: Order status badge, action buttons, line items table] | |
| [TODO: Create Order] | [TODO: `/orders/new`] | [TODO: Multi-step form, customer search, product selector] | |
| [TODO: Login] | [TODO: `/login`] | [TODO: Username/password fields, SSO button] | |

---

## 3. SELECTOR STRATEGY

[TODO: Define how to locate elements in this application. Consistent selectors prevent flaky tests.]

**Recommended approach:** [TODO: e.g. `data-testid` attributes / ARIA roles / CSS class patterns / XPath as last resort]

**Selector stability notes:**
- [TODO: e.g. "CSS class names include a hash suffix (e.g. `Button_btn__3xK2a`) — they change on every build. Use role-based selectors or data-testid instead."]
- [TODO: e.g. "The application uses `data-testid` on all interactive elements — use these first"]
- [TODO: e.g. "Tables have stable `id` attributes — use `#orders-table tbody tr` for row selectors"]

**Known unstable selectors to avoid:**
- [TODO: e.g. "Never use `nth-child()` on order list items — order changes on sort"]
- [TODO: e.g. "Do not use inner text of status badges — they are localizable"]

---

## 4. RESPONSIVE BREAKPOINTS

[TODO: List every breakpoint that QA tests. Agents use this to generate responsive test suites.]

| Breakpoint Name | Viewport Width | Viewport Height | Behavior Notes |
|----------------|---------------|----------------|---------------|
| [TODO: Mobile S] | [TODO: 320px] | [TODO: 844px] | [TODO: Single-column layout, hamburger menu] |
| [TODO: Mobile M] | [TODO: 390px] | [TODO: 844px] | [TODO: Same as Mobile S] |
| [TODO: Tablet] | [TODO: 768px] | [TODO: 1024px] | [TODO: Two-column layout, side nav appears] |
| [TODO: Desktop] | [TODO: 1280px] | [TODO: 800px] | [TODO: Full layout, all columns visible] |

**Breakpoints that change behavior significantly:**
[TODO: e.g. "At <768px the 'Buy Tickets' button moves from the page header to a bottom sticky bar"]

---

## 5. DYNAMIC UI BEHAVIORS

[TODO: Behaviors that are time-based, scroll-based, or triggered by user interaction.
Agents need this to write reliable tests for these scenarios.]

| Behavior | Trigger | Expected Result | Test Consideration |
|----------|---------|----------------|-------------------|
| [TODO: Sticky nav bar] | [TODO: User scrolls past hero section] | [TODO: Nav bar pins to top] | [TODO: Must scroll past hero before asserting nav is sticky] |
| [TODO: Toast notification] | [TODO: Successful form submit] | [TODO: Green toast appears for 3 seconds then disappears] | [TODO: Assert immediately after action, before 3s timeout] |
| [TODO: Modal / overlay] | [TODO: User clicks "Delete" button] | [TODO: Confirmation dialog appears] | [TODO: Must dismiss modal before continuing test — use addLocatorHandler pattern] |
| [TODO: Lazy load] | [TODO: User scrolls to bottom of list] | [TODO: Next page of results loads] | [TODO: Wait for network idle after scroll] |

---

## 6. MODAL & OVERLAY HANDLING

[TODO: Modals are a major source of flakiness. Document every modal/overlay in the app.]

| Modal Name | Trigger | How to Dismiss | Test Impact |
|-----------|---------|---------------|------------|
| [TODO: Newsletter signup modal] | [TODO: 3 seconds after page load] | [TODO: Click "No thanks" or press Escape] | [TODO: Can intercept any test — use addLocatorHandler to auto-dismiss] |
| [TODO: Cookie consent banner] | [TODO: First visit] | [TODO: Click "Accept All"] | [TODO: Handle in beforeAll or global setup] |
| [TODO: Session timeout warning] | [TODO: 29 min of inactivity] | [TODO: Click "Stay logged in"] | [TODO: Not expected in automated tests — flag if it appears] |

---

## 7. NAVIGATION & AUTH FLOW

**Login sequence:**
```
[TODO: Describe the steps to reach an authenticated state. Example:
1. Navigate to /login
2. Enter username (from test config)
3. Enter password
4. Click "Sign In" button
5. Wait for redirect to /dashboard
OR
1. Navigate to app URL
2. OKTA SSO modal appears automatically
3. Enter OKTA credentials
4. 2FA via Okta Verify app (only for manual testing — use saved auth state for automation)
]
```

**Auth state for test automation:**
[TODO: e.g. "Use Playwright storageState — save auth cookies in beforeAll and reuse across tests to avoid logging in on every test"]
[TODO: e.g. "Auth token in .env as QA_AUTH_TOKEN — set in Authorization header directly"]

---

## 8. KNOWN UI QUIRKS & GOTCHAS

[TODO: Anything that will cause false failures if agents don't know about it]

- [TODO: e.g. "The order status badge has a 500ms CSS transition after status change — wait for transition before asserting color"]
- [TODO: e.g. "The search input has a 300ms debounce — wait 400ms after typing before asserting results"]
- [TODO: e.g. "Satisfi chat widget renders as role='dialog' aria-modal='true' — NEVER dismiss it in tests, exclude it explicitly from modal handlers"]
- [TODO: e.g. "The date picker uses a custom component that doesn't support keyboard input — use click interactions only"]

---

## 9. ACCESSIBILITY BASELINE (optional)

[TODO: If accessibility testing is in scope, document the expected baseline.]

- ARIA landmark requirements: [TODO: e.g. "Every page must have exactly one `main` landmark"]
- Heading hierarchy: [TODO: e.g. "H1 on every page, no skipped heading levels"]
- Color contrast standard: [TODO: e.g. "WCAG 2.1 AA minimum"]
- Screen reader: [TODO: e.g. "NVDA + Chrome / VoiceOver + Safari"]

---
