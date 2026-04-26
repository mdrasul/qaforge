# Troubleshooting

Common problems and how to fix them. If your issue isn't listed here, check [faq.md](faq.md) or open a GitHub Discussion.

---

## Agents not appearing in Copilot

**Symptom:** You type `@QAForge` and nothing appears in the agent picker.

**Fix steps — in order:**
1. Confirm agent files are in `.github/agents/` — not in `agents/` or any other path
2. Confirm file extension is `.agent.md` — not `.md` alone
3. Reload VS Code: `Cmd+Shift+P` → `Developer: Reload Window`
4. Confirm GitHub Copilot Chat extension is up to date (Extensions panel → check for updates)
5. Confirm your Copilot plan is Business or Enterprise — Individual plan does not support custom agents

---

## Manager runs but produces no output

**Symptom:** You invoke `@QAForge-Manager` and the response is empty or stops after "Reading context files."

**Likely cause:** `PROJECT_CONTEXT.md` is missing or empty.

**Fix:** Create `PROJECT_CONTEXT.md` at your project root using the template:
```bash
cp core/templates/PROJECT_CONTEXT.template.md PROJECT_CONTEXT.md
```
Fill in at minimum: app name, purpose, and primary business rules. Then re-invoke.

---

## Test Case Gen always produces BDD format

**Symptom:** You get Given/When/Then format even though you don't use Cucumber.

**Fix:** Check `AUTOMATION_CONTEXT.md` for the `BDD Layer:` field. It must say `none` (not blank, not `false`). Blank is treated as unconfigured and defaults to BDD.

```
BDD Layer: none
```

---

## Validator produces `06_VALIDATION_REPORT.md` instead of `07_`

**Symptom:** Validation artifact is named `06_VALIDATION_REPORT.md` instead of `07_VALIDATION_REPORT.md`.

**Why it happens:** LLMs have a training bias toward sequential numbering. Since `05_execution_evidence/` is the previous artifact, the model defaults to `06_` for the next one.

**Fix:** Ask the agent to rename the file:
```
Please rename 06_VALIDATION_REPORT.md to 07_VALIDATION_REPORT.md in the FeatureSpecs folder.
```

This is a known issue. The `⚠️ CRITICAL` warning in the Validator agent reduces frequency but does not eliminate it. A simple one-line correction is sufficient.

---

## Reporter always generates Xray XML even though I'm not using Xray

**Symptom:** `09_xray_import.xml` is generated on every run.

**Fix:** Open `PROJECT_CONTEXT.md` and find the `Test Management Tool:` field. Clear it completely or set it to `none`. Any non-empty value triggers XML generation.

```
Test Management Tool: none
```

---

## Automation Engineer generates the wrong language

**Symptom:** You want Python/pytest but get TypeScript/Playwright, or vice versa.

**Fix:** Check `AUTOMATION_CONTEXT.md` `Language and test runner:` field. The value must be explicit:

```
Language and test runner: Python + pytest
```

If the field is missing, the agent defaults to TypeScript + Playwright (the most common stack in the training data).

---

## Skill agent not taking over from core Automation Engineer

**Symptom:** You installed a skill (e.g. `api-runner.agent.md`) but the core Automation Engineer still runs.

**Fix steps:**
1. Confirm the skill agent file is in `.github/agents/` alongside the core agents
2. Confirm the YAML frontmatter has `skill:` and `replaces: QAForge Automation Engineer`
3. In your story invocation, name the skill explicitly: `@QAForge-Manager run api-rest pipeline for {TICKET_ID}`
4. Reload VS Code window after adding new agent files

---

## DB queries fail with wrong column names

**Symptom:** `db-query-agent` generates queries with placeholder column names (`id`, `status`) that don't match your schema.

**Fix:** `DB_CONTEXT.md` is incomplete. Add the table definition with exact column names:

```markdown
Table: your_table_name
  Columns:
  - order_uuid (PK, UUID)
  - order_status (enum: PENDING, CONFIRMED, CANCELLED)
  - customer_ref_id (FK → customers.cust_id)
```

The more detail you provide, the more accurate the generated queries.

---

## AWS tests fail in CI but pass locally

**Symptom:** AWS SDK calls succeed on your machine but fail with credential errors in CI.

**Why it happens:** Your machine uses a local AWS profile (`~/.aws/credentials`). CI uses IAM roles.

**Fix:** Confirm your CI pipeline assigns an IAM role to the test runner. Do NOT add `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` to CI secrets — use IAM roles instead. The AWS SDK default credential chain handles IAM roles automatically.

If you must use key-based auth in CI, set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION` as CI secrets (not hardcoded).

---

## `05_execution_evidence/` folder is empty after Automation Engineer runs

**Symptom:** The Automation Engineer agent appears to complete but no test files are created.

**Fix steps:**
1. The agent may have paused at an approval gate — scroll up in Copilot Chat to find the `APPROVAL_REQUIRED` message
2. If no approval gate appeared, the agent may have failed silently — re-invoke with `@QAForge-Automation-Engineer generate tests for {TICKET_ID}`
3. Confirm `03_TEST_CASES.md` and `04_TEST_DATA.md` exist — the Automation Engineer reads both

---

## Pipeline stops after one step and doesn't continue

**Symptom:** The Manager delegates to the Analyst, Analyst produces `02_TEST_ANALYSIS.md`, but nothing else happens.

**Expected behavior:** The Manager pauses at each approval gate. This is intentional.

**Fix:** Type `APPROVE` in Copilot Chat to move to the next step. If you want to skip approval gates during development, add `--skip-approval` to your invocation command (check Manager agent docs for supported flags).

---

## "Context file not found" warning in agent output

**Symptom:** An agent outputs `[WARNING: DB_CONTEXT.md not found — skipping database-aware checks]`.

**This is expected behavior.** Optional context files (DB_CONTEXT.md, API_CONTEXT.md, UI_CONTEXT.md) are only required if your story exercises that layer. The warning is informational — the pipeline continues without them.

If the warning appears for `PROJECT_CONTEXT.md`, that is a blocking issue — that file is always required.

---

## Still stuck?

1. Check [faq.md](faq.md) for behavior questions
2. Open a GitHub Discussion (Q&A category) for setup help
3. Open a Bug Report issue if you believe you've found a defect in an agent file
