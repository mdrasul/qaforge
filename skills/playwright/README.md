# QAForge Playwright Skill Pack

The Playwright skill pack extends the QAForge core engine with Playwright + TypeScript
specific automation capabilities. Install this skill to get Playwright-aware code
generation, execution, and fixture patterns.

---

## What this skill does

| Capability | Detail |
|-----------|--------|
| Code generation | Generates `.spec.ts` files that extend your existing framework — not standalone scripts |
| POM extension | Adds new methods to existing Page Object files (never creates unnecessary new ones) |
| Fixture integration | Extends your existing `test.extend()` fixture object |
| Overlay handling | Uses `addLocatorHandler` for cookie banners, modals, permission prompts |
| Execution | Runs `npx playwright test` with the profile from `AUTOMATION_CONTEXT.md` |
| Evidence capture | Saves screenshots, traces, and run output to `05_execution_evidence/` |

---

## When to use this skill

Use this skill when your automation framework is built on:
- **Playwright** (any version)
- **TypeScript** or **JavaScript**
- Any assertion library — though `@playwright/test` `expect` is assumed

Also compatible with:
- Cucumber/Gherkin BDD layer on top of Playwright
- `playwright-bdd` library
- Multi-project `playwright.config.ts` (viewport breakpoints, environments, etc.)

---

## Setup

Playwright skill agents are pre-installed in `.github/agents/` when you clone QAForge. No agent files to copy.

Fill in `AUTOMATION_CONTEXT.md` at your workspace root:

Key sections to complete for Playwright projects:
- Framework Identity: Language = TypeScript, Test Runner = Playwright
- Project Structure: Map your `tests/` folder layout
- Existing Key Files: List your POM files, fixture file, globalSetup
- Naming Conventions: Your spec file and test name patterns
- Test Configuration: Your `playwright.config.ts` projects/profiles
- Test Data Strategy: Live API / globalSetup / static fixtures
- Known Gotchas: Anything a new engineer would trip over

**Step 4:** Verify the agents are detected:

In VS Code, open the Copilot Chat Agent panel. You should see:
- `QAForge Manager`
- `QAForge Playwright Automation Engineer`
- `QAForge Test Runner`
- (and all other core agents)

---

## Agents included in this skill pack

| Agent file | Name | Replaces |
|-----------|------|---------|
| `playwright-automation-engineer.agent.md` | QAForge Playwright Automation Engineer | QAForge Automation Engineer |
| `playwright-test-runner.agent.md` | QAForge Test Runner | (new — no core equivalent) |

---

## Templates included

| Template | Purpose |
|----------|---------|
| `page-object-model.template.ts` | Reference POM structure — extend, don't copy blindly |
| `fixture-pattern.template.ts` | Reference fixture + overlay handler structure |

These are reference patterns for the Automation Engineer agent and for new team members.
Do not use them as-is in production — adapt to your project's existing structure.

---

## Configuration reference

The Playwright skill reads these fields from `AUTOMATION_CONTEXT.md`:

| Field | Used by | Effect |
|-------|---------|--------|
| Framework Root | All agents | Where to look for existing files |
| Existing Key Files → POM files | Automation Engineer | Which files to extend |
| Existing Key Files → fixture file | Automation Engineer | Where to add new fixtures |
| Naming Conventions | Automation Engineer | Spec file name, test describe/it names |
| Test Configuration → profiles table | Test Runner | Which `--project` flag to use |
| CI/CD → test command | Test Runner | Exact command to execute |
| Known Gotchas | All agents | Warnings before code generation |

---

## Playwright version compatibility

| Playwright version | Compatible | Notes |
|-------------------|-----------|-------|
| 1.40+ | ✅ | Full feature support |
| 1.30–1.39 | ✅ | `addLocatorHandler` requires 1.31+ |
| < 1.30 | ⚠️ | Some generated patterns may not compile — upgrade recommended |

---

## Known skill limitations

- Does not generate Cucumber step definitions (BDD layer) — use the BDD skill add-on (coming in v1.1)
- Does not configure `playwright.config.ts` — engineers set that up manually
- Mobile Playwright (Android/iOS) not supported in v1.0 — desktop and mobile viewport only
