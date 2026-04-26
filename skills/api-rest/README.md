# QAForge Skill — api-rest

The `api-rest` skill extends QAForge with REST API-specific agents for projects where the primary test surface is an HTTP API (no UI under test, or UI and API tested separately).

---

## When to use this skill

Use `api-rest` when your story involves:
- Validating REST API response schemas, status codes, and field values
- Contract testing (does the API response match what the frontend expects?)
- Multi-step API flows (create → read → update → delete)
- Authentication and authorization checks at the API layer
- Performance threshold checks on individual endpoints

Do NOT use this skill as a replacement for the Playwright skill on a full-stack feature — use both skills together if the story covers both UI and API behavior.

---

## What this skill provides

| Agent | Replaces | Purpose |
|-------|---------|---------|
| `api-runner.agent.md` | QAForge Automation Engineer | Generates REST API test scripts |
| `api-contract-validator.agent.md` | (adds to) QAForge QA Validator | Deep API contract validation |

| Template | Purpose |
|----------|---------|
| `api-client.template.ts` | Typed HTTP client base class pattern |

---

## Setup

API Rest skill agents are pre-installed in `.github/agents/` when you clone QAForge. No agent files to copy.

To use the API client template as a starting point:

```bash
cp skills/api-rest/templates/api-client.template.ts tests/api/clients/
```

---

## Required context files

| File | Required? | Notes |
|------|-----------|-------|
| `PROJECT_CONTEXT.md` | YES | Always required |
| `API_CONTEXT.md` | YES | Base URL, auth mechanism, key endpoints, error codes |
| `AUTOMATION_CONTEXT.md` | YES | Language, framework, test runner command |

The `api-rest` skill reads `API_CONTEXT.md` to understand your endpoint structure, auth headers, and rate limits. Fill it thoroughly — every blank field produces a less precise test.

---

## How it works

1. `@QAForge Manager` routes the story as normal
2. `@QAForge Story Analyst` and `@QAForge Test Case Generator` run unchanged
3. When the Automation Engineer step is reached, `@QAForge API Runner` takes over — it generates REST API tests instead of UI specs
4. The `@QAForge QA Validator` is augmented by `@QAForge API Contract Validator` which checks schema compliance in addition to pass/fail

---

## Supported languages / clients

The `api-runner` agent generates tests in whatever language is specified in `AUTOMATION_CONTEXT.md`. The included template is TypeScript using Playwright's `request` context — the same toolchain as the Playwright skill, so both can coexist in the same project.

For Python (pytest + requests), Java (RestAssured), or other clients: fill `AUTOMATION_CONTEXT.md` with your framework and the agent will adapt its output accordingly.
