# Deploying QAForge to a New Project

This guide walks through integrating QAForge into an existing project from scratch. By the end you will have all core agents installed, context files configured, and your first story ready to run.

---

## Prerequisites

- GitHub Copilot (Business or Enterprise plan)
- VS Code with the GitHub Copilot Chat extension
- Agent mode enabled in VS Code Copilot settings
- Node.js 18+ (if using TypeScript test output)

---

## Step 1 — Clone QAForge and open in VS Code

```bash
git clone https://github.com/mdrasul/qaforge.git
cd qaforge
code .
```

All 16 agents (8 core + 8 skill pack) are pre-installed in `.github/agents/`. GitHub Copilot discovers them automatically — no copying required.

To verify: open Copilot Chat → switch to **Agent mode** → `@QAForge Manager` should appear in the agent list.

---

## Step 2 — Create `PROJECT_CONTEXT.md`

This is the most important file. Place it at the root of your project (or in a `qa-forge/` subfolder if you prefer to keep QA artifacts separate).

Start from the template:
```bash
cp core/templates/PROJECT_CONTEXT.template.md PROJECT_CONTEXT.md
```

Fill in every field. The Manager agent reads this file on every run. Incomplete fields lead to generic, less useful output.

The most critical fields:
- **App name and purpose** — what the app does in plain language
- **Primary business rules** — the rules that must always hold (what a P0 test would check)
- **Test management tool** — leave blank if you are not using Xray or a similar tool; this disables XML export

See [writing-a-context-file.md](writing-a-context-file.md) for a field-by-field guide.

---

## Step 3 — Create `AUTOMATION_CONTEXT.md` (if automating)

If your project runs automated tests, fill in the automation context:
```bash
cp core/templates/AUTOMATION_CONTEXT.template.md AUTOMATION_CONTEXT.md
```

Key fields:
- **Language and test runner** — e.g. TypeScript + Playwright, Python + pytest, Java + JUnit
- **BDD layer** — set to `none` unless your team uses Gherkin syntax
- If you use Playwright, also set the **selector priority** and **fixture pattern** fields

---

## Step 4 — Create your first story

Create a `FeatureSpecs/` folder at your project root:
```bash
mkdir -p FeatureSpecs/
```

Create a folder for your first ticket:
```bash
mkdir -p FeatureSpecs/{TICKET_ID}-{short-description}/
```

Start from the story input template:
```bash
cp core/templates/INPUT_STORY_TEMPLATE.md \
   FeatureSpecs/{TICKET_ID}-{short-description}/01_STORY_INPUT.md
```

Fill in the story. Then in VS Code Copilot Chat, type:
```
@QAForge-Manager run full pipeline for TICKET_ID
```

---

## Step 5 — Run the pipeline

Open GitHub Copilot Chat in VS Code and switch to agent mode.

```
@QAForge-Manager run full pipeline for {TICKET_ID}
```

The Manager will orchestrate each specialist agent in sequence:
1. Analyst → `02_TEST_ANALYSIS.md`
2. Test Case Gen → `03_TEST_CASES.md`
3. Data Resolver → `04_TEST_DATA.md`
4. Automation Engineer (or skill agent) → test scripts in `05_execution_evidence/`
5. Validator → `07_VALIDATION_REPORT.md`
6. Reporter → `08_FINAL_TEST_REPORT.md`

Each agent produces an artifact and waits for your approval before the next step runs.

---

## Folder structure (expected result)

After a full pipeline run your project will have:

```
qaforge/                         ← your QA workspace (the cloned repo)
  .github/agents/                ← all 16 agents — already here
  PROJECT_CONTEXT.md             ← you create this
  AUTOMATION_CONTEXT.md          ← you create this (if automating)
  FeatureSpecs/
    {TICKET_ID}-{desc}/
      01_STORY_INPUT.md
      02_TEST_ANALYSIS.md
      03_TEST_CASES.md
      04_TEST_DATA.md
      05_execution_evidence/
      07_VALIDATION_REPORT.md
      08_FINAL_TEST_REPORT.md
```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Agent not appearing in Copilot | File not in `.github/agents/` | Verify path, reload VS Code window |
| Manager can't find context files | FILES are in wrong directory | Move `PROJECT_CONTEXT.md` to project root |
| Output always uses BDD format | AUTOMATION_CONTEXT.md missing BDD field | Set `BDD Layer: none` explicitly |
| Validator names artifact `06_` | LLM training bias — known issue | The CRITICAL warning in the validator catches this. Re-run if it happens. |
| Xray XML file is missing | Expected — XML is conditional | Only produced if `Test Management Tool` is set in PROJECT_CONTEXT.md |
