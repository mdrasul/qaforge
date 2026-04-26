# AUTOMATION_CONTEXT.md
# QAForge Context File — Automation Framework & CI/CD
# Project: automationexercise.com — Playwright + TypeScript

---

## 1. AUTOMATION FRAMEWORK IDENTITY

| Field | Value |
|-------|-------|
| **Framework Name** | AutomationExercise UI/API Test Suite |
| **Language** | TypeScript |
| **Test Runner** | Playwright |
| **BDD Layer** | None (plain test descriptions) |
| **Assertion Library** | @playwright/test expect |
| **Reporting Tool** | Playwright HTML reporter |
| **Framework Root** | `.` (project root — all paths below are relative to workspace root) |

---

## 2. PROJECT STRUCTURE

```
tests/
├── ui/
│   ├── specs/
│   │   └── cart-checkout/          ← spec files for AE-001 go here
│   ├── pages/                      ← Page Object Model files
│   └── fixtures/                   ← extended test fixture objects
├── api/
│   ├── specs/
│   │   └── cart-checkout/          ← API spec files for AE-001 go here
│   ├── clients/                    ← HTTP client wrappers (e.g. AEApiClient.ts)
│   └── utils/                      ← globalSetup.ts — pre-test data resolution
FeatureSpecs/                       ← QAForge artifact output (stories, test cases, reports)
playwright.config.ts                ← Playwright config (create at root if not present)
package.json                        ← dependencies (create at root if not present)
```

**IMPORTANT**: If `playwright.config.ts` and `package.json` do not exist at the project root,
the Automation Engineer MUST create them as part of spec file generation.

---

## 3. EXISTING KEY FILES

This is a fresh project. No existing POM or fixture files. Create new ones:

| File Path | What to create |
|-----------|---------------|
| `tests/ui/pages/ProductsPage.ts` | POM for product listing and search page |
| `tests/ui/pages/CartPage.ts` | POM for cart page |
| `tests/ui/pages/CheckoutPage.ts` | POM for checkout and payment pages |
| `tests/ui/fixtures/checkoutFixtures.ts` | Extended test object for checkout scenarios |
| `tests/api/clients/AEApiClient.ts` | HTTP client wrapping automationexercise.com REST API |
| `tests/utils/globalSetup.ts` | Pre-test login and data resolution |

When creating POM files, follow Playwright Page Object Model pattern.
When creating fixtures, use `test.extend()` from `@playwright/test`.

---

## 4. NAMING CONVENTIONS

**Spec files:**
- Pattern: `tc{nn}-tc{nn}-{feature}.spec.ts`
- Example: `tc01-tc08-checkout-flow.spec.ts`, `tc11-tc12-api-happy.spec.ts`

**Test suite names (test.describe):**
- Pattern: `TS-{nn} — {Suite Name}`
- Example: `TS-01 — Cart and Checkout UI Flow`

**Test case names (test()):**
- Pattern: `TC-{nn}-{nn} — {descriptive title}`
- Example: `TC-01-01 — Search for a product and add to cart`

**Page Object files:**
- Pattern: `{PageName}Page.ts`
- Example: `ProductsPage.ts`, `CartPage.ts`, `CheckoutPage.ts`

**Fixture names:**
- Pattern: `sc{nn}` for scenario data, camelCase page names for page objects
- Example: `{ sc01: CheckoutData, sc09: EdgeCaseData, cartPage: CartPage }`

---

## 5. TEST CONFIGURATION

**Config file:** `playwright.config.ts`

If creating from scratch, use this structure:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  retries: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://www.automationexercise.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

---

## 6. API CLIENT NOTES

Base URL: `https://automationexercise.com/api`

All API responses return JSON with:
- `responseCode` (integer in body — NOT the HTTP status code)
- `message` (string)

Common endpoints:
- `POST /createAccount` — register new user
- `POST /verifyLogin` — verify credentials
- `GET /productsList` — get all products
- `POST /addCartItem` — add item to cart

**Note:** API calls must check `responseCode` in the JSON body, not the HTTP status.

---

## 7. ENVIRONMENT & TEST DATA

Base URL: `https://www.automationexercise.com`

Test account (created in pre-flight):
- Email: `qaforge+demo@gmail.com`
- Password: `QAForge123!`

Do NOT hardcode credentials in spec files. Read from a fixture or `process.env`.
