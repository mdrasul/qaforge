---
## AUTOMATION CONTEXT — EventHub Demo Project

---

## 1. AUTOMATION SCOPE

| Area | Automated? | Notes |
|------|-----------|-------|
| UI (browser) | YES | Playwright — event detail page, CTA button behavior |
| REST API | YES | Playwright `request` context — event status endpoint |
| Database | NO | Read-only via API; direct DB checks out of scope |
| Mobile | NO | Separate project |

---

## 2. FRAMEWORK & LANGUAGE

| Field | Value |
|-------|-------|
| **Framework** | Playwright |
| **Language** | TypeScript |
| **Test runner command** | `npx playwright test` |
| **CI command** | `npx playwright test --ci` |
| **Report command** | `npx playwright show-report` |

---

## 3. BDD LAYER

**BDD Layer:** None
Test cases use **plain-language format**. No Gherkin/Cucumber configured.

---

## 4. PROJECT STRUCTURE

```
tests/
├── ui/
│   ├── specs/          ← .spec.ts files (one folder per feature area)
│   ├── pages/          ← Page Object Model classes
│   └── fixtures/       ← test.extend() fixture files
└── api/
    ├── clients/        ← typed API client classes
    └── utils/          ← globalSetup, auth helpers
```

**Config file:** `playwright.config.ts` at project root
**Base URL source:** `process.env.BASE_URL` (defaults to `http://localhost:3000`)

---

## 5. SELECTOR PRIORITY

Use in this order — stop at the first one that works:

1. `getByRole()` — semantic role selectors (preferred)
2. `getByLabel()` — for form fields
3. `getByTestId()` — `data-testid` attributes added by the dev team
4. CSS selector — last resort only, avoid class names that change with styling

**Reserved data-testid values:**
| Element | data-testid |
|---------|-------------|
| CTA button (inline) | `event-cta-button` |
| CTA button (sticky) | `event-cta-sticky` |
| Hero section | `event-hero` |
| Ticket price block | `ticket-price-block` |

---

## 6. FIXTURE PATTERN

All tests import from `tests/ui/fixtures/eventFixtures.ts`.
Fixtures provide: `eventPage`, `apiClient`, `onSaleEvent`, `presaleEvent`, `disabledEvent`.

---

## 7. KNOWN FLAKE PATTERNS

| Pattern | Mitigation |
|---------|-----------|
| Scroll position detection (sticky CTA) | Use `addLocatorHandler` + explicit scroll wait |
| Modal animation (presale registration modal) | `await expect(modal).toBeVisible()` before interacting |
| API response latency on QA env | `waitForResponse` before asserting UI state |
