# Changelog

All notable changes to QAForge are documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/)

---

## [1.0.0] — 2026-04-26

### Added

**Core Engine**
- 8 universal agent files: Manager, Analyst, Test Case Gen, Data Resolver, Automation Engineer, Validator, Reporter, Fixer
- Conditional AUTOMATION_CONTEXT.md support — not required for manual testing projects
- Conditional Xray XML export — only produced when test management tool is configured in PROJECT_CONTEXT.md
- BDD/Gherkin output as an opt-in format (controlled by AUTOMATION_CONTEXT.md)
- Single canonical validation artifact: `07_VALIDATION_REPORT.md`
- `⚠️ CRITICAL` file naming enforcement in Validator (prevents LLM training bias toward `06_` naming)

**Context Templates**
- `PROJECT_CONTEXT.md` — app purpose, business rules, test management tool
- `AUTOMATION_CONTEXT.md` — language, test runner, BDD flag, selector priority
- `API_CONTEXT.md` — REST endpoint shapes, auth scheme, error codes
- `DB_CONTEXT.md` — database type, schema, table definitions
- `UI_CONTEXT.md` — layout, selector table, known quirks
- `INPUT_STORY_TEMPLATE.md` — story input format for `01_STORY_INPUT.md`

**Skill Packs**
- `skills/playwright/` — Playwright + TypeScript skill (2 agents + 2 TS templates)
- `skills/api-rest/` — REST API testing skill (2 agents + 1 TS template)
- `skills/database-sql/` — Direct DB verification + ETL validation skill (2 agents + 1 TS template)
- `skills/aws-cloud/` — AWS cloud pipeline skill: SQS, S3, Lambda, DynamoDB (2 agents + 1 TS template)

**Example Project**
- `examples/web-ui-api/` — EventHub fictional ticketing app
  - Full PROJECT_CONTEXT, AUTOMATION_CONTEXT, API_CONTEXT, UI_CONTEXT
  - Playwright + TypeScript test suite (12 test cases, 4 test suites)
  - Complete DEMO-001 artifact sequence (01 → 08)

**Documentation**
- `docs/getting-started.md`
- `docs/deploy-to-new-project.md`
- `docs/writing-a-context-file.md`
- `docs/building-a-skill.md`
- `docs/faq.md`

**Repo**
- `CONTRIBUTING.md`
- `LICENSE` (MIT)
- `core/README.md`
