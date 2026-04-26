# Example: Automation Exercise — E-Commerce App

This is a ready-to-run QAForge demo using [automationexercise.com](https://automationexercise.com) —
a public e-commerce site built for QA automation practice.

---

## What's included

```
automation-exercise/
├── PROJECT_CONTEXT.md                          ← Pre-filled project context
├── AUTOMATION_CONTEXT.md                       ← Tells agents where to write code (tests/ structure)
└── FeatureSpecs/
    └── AE-001-add-to-cart-checkout/
        └── 01_STORY_INPUT.md                  ← Pre-written story: search → cart → checkout
```

---

## Pre-flight (do once before running)

This is a shared public site. Register a fresh account before each demo run:

```bash
curl -s -X POST "https://automationexercise.com/api/createAccount" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "name=QAForge Demo" \
  --data-urlencode "email=qaforge+demo@gmail.com" \
  --data-urlencode 'password=QAForge123!' \
  --data-urlencode "title=Mr" \
  --data-urlencode "birth_date=1" \
  --data-urlencode "birth_month=1" \
  --data-urlencode "birth_year=1990" \
  --data-urlencode "firstname=QAForge" \
  --data-urlencode "lastname=Demo" \
  --data-urlencode "company=QAForge" \
  --data-urlencode "address1=123 Test Street" \
  --data-urlencode "address2=Suite 1" \
  --data-urlencode "country=United States" \
  --data-urlencode "zipcode=10001" \
  --data-urlencode "state=New York" \
  --data-urlencode "city=New York" \
  --data-urlencode "mobile_number=5555555555"
```

Verify:
```bash
curl -s -X POST "https://automationexercise.com/api/verifyLogin" \
  --data-urlencode "email=qaforge+demo@gmail.com" \
  --data-urlencode 'password=QAForge123!'
# Expected: {"responseCode": 200, "message": "User exists!"}
```

---

## Run the demo

```bash
# From the qaforge repo root:
cp examples/automation-exercise/PROJECT_CONTEXT.md .
cp examples/automation-exercise/AUTOMATION_CONTEXT.md .
cp -r examples/automation-exercise/FeatureSpecs .
```

Then in VS Code Copilot Chat (Agent mode):

```
@QAForge Manager run full pipeline for AE-001 --ci
```

The `--ci` flag skips all approval gates and runs the full chain in one shot.

---

## What you'll see produced

```
FeatureSpecs/AE-001-add-to-cart-checkout/
├── 01_STORY_INPUT.md          ← your story
├── 02_TEST_ANALYSIS.md        ← 16 testable scenarios
├── 03_TEST_CASES.md           ← full test cases with steps
├── 04_TEST_DATA.md            ← resolved credentials, product IDs, API payloads
├── 07_VALIDATION_REPORT.md    ← QA sign-off decision
└── 08_FINAL_TEST_REPORT.md    ← stakeholder report

tests/
├── ui/
│   ├── specs/cart-checkout/   ← Playwright UI spec files
│   ├── pages/                 ← Page Object Model files (CartPage.ts, CheckoutPage.ts, etc.)
│   └── fixtures/              ← extended test fixtures
├── api/
│   ├── specs/cart-checkout/   ← API test spec files
│   └── clients/               ← AEApiClient.ts
└── utils/globalSetup.ts       ← pre-test data resolution

playwright.config.ts           ← created at project root
package.json                   ← created at project root
```
