# AUTOMATION_CONTEXT.md
# ─────────────────────────────────────────────────────────────────────────────
# QAForge Context File — Automation Framework & CI/CD
# TIER 1 — REQUIRED. Agents need this to generate code that fits your framework.
# ─────────────────────────────────────────────────────────────────────────────
#
# HOW TO USE:
#   Copy to your project root as AUTOMATION_CONTEXT.md and fill in all [TODO] fields.
#   This file is what makes the Automation Engineer agent produce code that
#   fits seamlessly into your existing framework — not standalone scripts.
# ─────────────────────────────────────────────────────────────────────────────

---

## 1. AUTOMATION FRAMEWORK IDENTITY

| Field | Value |
|-------|-------|
| **Framework Name** | [TODO: e.g. "Task Manager UI/API Automation Suite"] |
| **Language** | [TODO: TypeScript / Java / C# / Python / JavaScript] |
| **Test Runner** | [TODO: Playwright / Selenium / NUnit / pytest / JUnit / TestNG] |
| **BDD Layer** | [TODO: Cucumber/Gherkin / None / Behave / SpecFlow] |
| **Assertion Library** | [TODO: @playwright/test expect / AssertJ / NUnit Assert / pytest assert] |
| **Reporting Tool** | [TODO: Playwright HTML reporter / ExtentReports / Allure / TestNG Reports] |
| **Framework Root** | [TODO: path to automation project, e.g. `./automation/` or same as project root] |

---

## 2. PROJECT STRUCTURE

[TODO: Map out the folder structure of your automation project. This is critical — agents use this to know where to put generated files.]

```
[TODO: Replace this example tree with your actual structure]
tests/                          ← test root
├── ui/
│   ├── specs/                  ← test spec files go here (organized by feature)
│   │   └── featureName/        ← one folder per feature
│   ├── pages/                  ← Page Object Model files
│   ├── fixtures/               ← test fixtures (Playwright extended test objects)
│   └── utils/                  ← UI test utilities (scroll helpers, wait helpers)
├── api/
│   ├── specs/                  ← API test spec files
│   ├── clients/                ← HTTP client wrappers
│   ├── models/                 ← TypeScript interfaces / data models
│   └── utils/                  ← globalSetup, data resolvers
FeatureSpecs/                   ← QAForge artifact output (one folder per story)
playwright.config.ts            ← Playwright configuration
```

---

## 3. EXISTING KEY FILES

[TODO: List the critical existing files that agents MUST read before generating code.
Never generate new framework files if existing ones can be extended.]

| File Path | What it provides | When to use |
|-----------|-----------------|------------|
| `[TODO: tests/ui/pages/MainPage.ts]` | [TODO: Page Object Model — all locators and page methods] | [TODO: Always — extend this, never create a new POM] |
| `[TODO: tests/ui/fixtures/testFixtures.ts]` | [TODO: Extended test object with fixtures for each scenario] | [TODO: Always — use existing fixtures, add new ones here if needed] |
| `[TODO: tests/api/utils/globalSetup.ts]` | [TODO: Runs before all tests — resolves live test data, caches it] | [TODO: Understand before adding new scenarios] |
| `[TODO: tests/api/models/DataModels.ts]` | [TODO: TypeScript interfaces for all API response shapes] | [TODO: Use these types in new specs — never redeclare] |

---

## 4. NAMING CONVENTIONS

[TODO: How are files and tests named? Consistent naming prevents confusion and makes CI output readable.]

**Spec files:**
- Pattern: `[TODO: ts{nn}-{feature-name}.spec.ts]`
- Example: `[TODO: ts01-happy-path.spec.ts, ts02-edge-cases.spec.ts]`

**Test suite names:**
- Pattern: `[TODO: TS-{nn} — {Suite Name} ({SCENARIO_ID})]`
- Example: `[TODO: TS-01 — Primary Happy Path (SC-01)]`

**Test case names:**
- Pattern: `[TODO: TC-{suite}-{nn} — {Short descriptive title}]`
- Example: `[TODO: TC-01-01 — Sticky CTA not visible on initial page load]`

**Page Object files:**
- Pattern: `[TODO: {PageName}Page.ts]`
- Example: `[TODO: OrderDetailPage.ts, DashboardPage.ts]`

**Fixture names:**
- Pattern: `[TODO: sc{nn} (scenario) + edpPage (page object)]`
- Example: `[TODO: { sc01: ResolvedEvent, sc02: ResolvedEvent, orderPage: OrderPage }]`

---

## 5. TEST CONFIGURATION

[TODO: Playwright config or equivalent — what projects/profiles are defined?]

**Config file:** `[TODO: playwright.config.ts / jest.config.js / pytest.ini / etc.]`

| Profile / Project | Viewport / Browser | Test match pattern | When to run |
|------------------|-------------------|-------------------|------------|
| `[TODO: happy-path]` | [TODO: Chrome 576px] | `[TODO: **/ts01-*.spec.ts]` | [TODO: Every PR] |
| `[TODO: full-regression]` | [TODO: Chrome 576px] | `[TODO: **/ts*.spec.ts]` | [TODO: Nightly] |
| `[TODO: responsive-320px]` | [TODO: Chrome 320px] | `[TODO: **/ts08-*.spec.ts]` | [TODO: Weekly] |
| `[TODO: api-tests]` | [TODO: No browser] | `[TODO: **/api/**/*.spec.ts]` | [TODO: Every PR] |

**Timeouts:**
- Default test timeout: `[TODO: e.g. 45000 (45 sec)]`
- Expect timeout: `[TODO: e.g. 5000 (5 sec)]`
- Navigation timeout: `[TODO: e.g. 30000 (30 sec)]`

**Parallelism:**
- Workers: `[TODO: e.g. 1 (serial) or 4 (parallel)]`
- `fullyParallel`: `[TODO: true / false]`

---

## 6. TEST DATA STRATEGY

[TODO: How does this automation project acquire test data?]

- **Strategy:** [TODO: Choose and describe:
  - "Live API resolution — globalSetup calls real API before tests run, caches results in .event-cache.json"
  - "SQL seeding — seed scripts in /tests/sql/seed/ run before each test"
  - "Static fixtures — hardcoded test data in /tests/fixtures/data/"
  - "Sandbox setup — manual creation in QA environment before test run"
  - "Factory pattern — tests create data via API and clean up after"
  ]
- **Test data location:** `[TODO: path to seed files, cache files, or fixture data]`
- **Data cleanup:** [TODO: e.g. "Automatic via afterAll hooks" or "Manual — run cleanup script"]
- **Data refresh:** [TODO: e.g. "globalSetup refreshes cache on every test run" or "Manual before each sprint"]

---

## 7. CI/CD PIPELINE

| Field | Value |
|-------|-------|
| **CI Tool** | [TODO: GitHub Actions / Jenkins / Azure DevOps / GitLab CI / CircleCI] |
| **Config file** | [TODO: `.github/workflows/test.yml` or `Jenkinsfile`] |
| **Trigger** | [TODO: Pull Request / Push to main / Scheduled nightly / Manual] |
| **Test command** | [TODO: e.g. `npx playwright test --project=happy-path` or `mvn test`] |
| **Report artifact** | [TODO: e.g. `playwright-report/` uploaded to GitHub Pages or S3] |
| **Failure policy** | [TODO: e.g. "Block PR merge if any P0 test fails"] |

**How to run locally:**
```bash
# [TODO: Replace with your actual run commands]
npm install
npx playwright test --project=happy-path
npx playwright show-report
```

---

## 8. ARTIFACT CONVENTIONS

[TODO: QAForge produces numbered markdown artifacts per story. Where do they live?]

| Artifact | Location | Format |
|---------|----------|--------|
| Story artifacts | `[TODO: FeatureSpecs/{TICKET_ID}-{Name}/]` | Numbered markdown files |
| Spec files | `[TODO: tests/ui/specs/{featureName}/]` | `.spec.ts` or test files |
| Evidence (screenshots) | `[TODO: FeatureSpecs/{TICKET_ID}/05_execution_evidence/]` | PNG / JPG |
| Test reports | `[TODO: playwright-report/]` | HTML |
| Xray import | `[TODO: FeatureSpecs/{TICKET_ID}/09_xray_import.xml]` | Xray XML |

---

## 9. KNOWN FRAMEWORK GOTCHAS

[TODO: Things a new engineer (or agent) will trip over if not warned]

- [TODO: e.g. "Never import EdpPage directly in test files — always use the fixture. Direct instantiation bypasses the modal handler setup."]
- [TODO: e.g. "The globalSetup runs once per worker, not once per test. If test data resolves incorrectly, check the cache file at test-results/.event-cache.json"]
- [TODO: e.g. "Do not add new test files to playwright.config.ts testDir — use testMatch in the project config instead"]
- [TODO: e.g. "screenshot and video artifacts are in test-results/ not playwright-report/ — check both folders on failure"]

---
