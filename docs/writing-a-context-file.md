# Writing a Context File

Context files are the most important part of a QAForge setup. They are what turns generic AI output into test artifacts that match your actual product, team conventions, and technology stack.

This guide covers every field in each context file — what it means, why it matters, and what happens if you leave it blank.

---

## `PROJECT_CONTEXT.md` — the foundation

Every agent reads this file. It defines your app, your business rules, and your test environment.

### App name and purpose

**What to write:** A plain-language description of what the app does — one or two sentences, written for a new team member who has never seen the app.

**Why it matters:** The Analyst uses this to understand the scope of what to test. Vague descriptions produce generic test cases.

**Example:**
```
App: EventHub
Purpose: B2C event ticketing platform. Users browse events, enter presale waitlists,
and purchase tickets. Revenue depends on conversion from event detail page to checkout.
```

### Primary business rules

**What to write:** 3–7 rules that must always be true in your app. Think: what would a P0 test check?

**Why it matters:** The Analyst uses these rules to generate test conditions. The Validator uses them to flag BLOCKED status when a rule is violated.

**Example:**
```
Business rules:
- An event in DISABLED state must never show a "Buy Tickets" CTA
- A presale event must show the "Get Notified" flow, not a purchase flow
- Ticket price must be shown before the user can proceed to checkout
```

### Test environment URL

**What to write:** The base URL of your QA/staging environment.

**Why it matters:** The Automation Engineer and API test helpers use this as the default `BASE_URL`. If blank, agents default to `http://localhost:3000` which may not match your setup.

### Test management tool

**What to write:** `Xray` if you use Xray for Jira. Leave blank for everything else.

**Why it matters:** This is the Xray XML conditional. If blank, the Reporter skips XML generation entirely. If you fill in a tool name that is not `Xray`, the Reporter will note "tool not supported for auto-export".

---

## `AUTOMATION_CONTEXT.md` — automation stack

Agents read this only when generating or reviewing automated test code.

### Language and test runner

**What to write:** The exact language + framework combination your team uses.

**Common values:**
- `TypeScript + Playwright`
- `Python + pytest`
- `Java + JUnit 5 + RestAssured`
- `JavaScript + Cypress`

**Why it matters:** The Automation Engineer adapts its output to match your stack. A TypeScript project will get `describe/it` blocks and async/await. A Python project will get `def test_*` functions with pytest fixtures.

### BDD layer

**What to write:** `Gherkin + Cucumber` if your team writes `.feature` files. `none` for everything else.

**Why it matters:** This is the BDD conditional. When set to `none`, the Test Case Gen produces plain-language numbered test cases. When set to `Gherkin + Cucumber`, it produces `.feature` file format with Given/When/Then steps.

**Default recommendation:** `none` — unless your team already has a BDD workflow. Adding BDD to a team that doesn't use it creates maintenance overhead without benefit.

### Selector priority

*Playwright/UI only.* Defines which locator types to prefer, in order.

**Recommended order:**
```
1. data-testid attributes
2. ARIA roles (getByRole)
3. Labels (getByLabel)
4. Text (getByText) — last resort
5. CSS/XPath — avoid
```

### Fixture pattern

*Playwright only.* `test.extend()` with named fixtures (preferred) or `beforeEach` (legacy).

---

## `DB_CONTEXT.md` — database schema

Required only when using the `database-sql` skill.

### Database type

**What to write:** `PostgreSQL`, `MySQL`, `SQL Server`, `SQLite`, or `Oracle`.

**Why it matters:** The DB Query Agent adapts SQL dialect — `$1` (PostgreSQL), `?` (MySQL), `@param` (SQL Server).

### Schema name

**What to write:** The schema or database name your test queries run against. Use your QA/staging schema, not production.

### Table definitions

**What to write:** The tables your test cases need to query, with their key columns and ID format.

**Example:**
```
Table: orders
  id: UUID, format: ord_{uuid}
  status: enum [pending, confirmed, cancelled]
  user_id: UUID FK → users.id
  created_at: TIMESTAMPTZ
```

**Why it matters:** The DB Query Agent generates queries using your exact column names. If you leave this blank, the agent will use generic placeholder names and the queries won't run.

### Acceptable rejection threshold (ETL)

*Only relevant for ETL pipeline stories.* The maximum number of rejected records that still counts as a PASS.

---

## `API_CONTEXT.md` — REST API shape

Required when using the `api-rest` skill, or when the story involves API calls.

### Base URL

**What to write:** The API base URL for your QA environment, including version prefix (e.g. `https://qa.api.yourapp.io/v2`).

### Endpoint definitions

**What to write:** For each endpoint your tests will call:
- Method + path
- Request body shape (if POST/PUT/PATCH)
- Response body shape (required fields only — skip optional fields unless an AC requires them)
- Error codes

**Why it matters:** The API Runner generates assertions based on this. If a required field is not listed, the agent won't assert it.

### Auth scheme

**What to write:** How your API authenticates — `Bearer token`, `API key header`, `OAuth 2.0 client credentials`, etc.

**Security note:** Never put actual tokens in this file. Reference env var names instead: `Token from: process.env.API_TOKEN`.

---

## `UI_CONTEXT.md` — UI layout and selectors

Required when using the `playwright` skill for UI tests.

### Selector table

**What to write:** A table mapping UI elements to their recommended selectors.

| Element | Selector | Notes |
|---------|---------|-------|
| Buy Tickets button | `[data-testid="cta-buy"]` | P0 — test in every state |
| Sticky CTA | `[data-testid="sticky-cta"]` | Appears after 600px scroll |

**Why it matters:** The Playwright Automation Engineer uses these selectors directly. Consistent selectors prevent selector drift across test files.

### Known quirks

**What to write:** Any timing issues, animation delays, or browser-specific behaviors that affect test reliability.

**Example:**
```
- Presale modal has 300ms CSS animation — wait for aria-hidden=false before asserting content
- Sticky CTA uses IntersectionObserver — scroll must exceed 600px to trigger
```
