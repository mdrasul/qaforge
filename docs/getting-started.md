# Getting Started with QAForge

> **QAForge** is an AI-powered QA agent system that runs inside VS Code with GitHub Copilot.
> You describe a user story. QAForge produces structured test cases, resolves test data, generates automation code, validates results, and writes the final report — entirely through a chain of specialist AI agents.

---

## 1. What is QAForge?

QAForge is a system of eight coordinated AI agents that handle every step of the QA lifecycle for a user story — from analysis to final sign-off. You provide the story and context; the agents handle the rest.

**It works for any project.** Playwright, Selenium, REST APIs, manual testing, or no automation at all.
The Playwright skill pack extends QAForge for Playwright + TypeScript projects specifically.

---

## 2. What do I need?

| Requirement | Details |
|-------------|---------|
| VS Code | Version 1.95 or later |
| GitHub Copilot subscription | Agent mode required (Individual or Business plan) |
| GitHub Copilot Chat extension | Installed and signed in |
| Node.js 20+ | Only required if you use the Playwright skill |

No CLI. No npm package. No configuration files. QAForge runs entirely through `.agent.md` files in your project.

---

## 3. How to deploy QAForge to your project

Follow these three steps. Total time: ~5 minutes to get running.

### Step 1 — Clone QAForge and open in VS Code

```bash
git clone https://github.com/mdrasul/qaforge.git
cd qaforge
code .
```

All agents — 8 core + 8 skill pack — are already in `.github/agents/`. GitHub Copilot discovers them automatically when you open the folder. **No copying. No installation.**

### Step 2 — Create your `PROJECT_CONTEXT.md`

```bash
cp core/templates/PROJECT_CONTEXT.template.md PROJECT_CONTEXT.md
```

Open it and fill in:
- Project name and team name
- A 2–4 sentence description of your application
- Your QA environment URLs
- Test user credentials (or a reference to your vault)
- Test management tool (leave blank if you don't use one)

**This is the only file required to run your first story.**

### Step 3 — (Optional) Add more context files

For automation projects:

```bash
cp core/templates/AUTOMATION_CONTEXT.template.md AUTOMATION_CONTEXT.md
```

For projects with REST APIs:
```bash
cp core/templates/API_CONTEXT.template.md API_CONTEXT.md
```

For UI-heavy features:
```bash
cp core/templates/UI_CONTEXT.template.md UI_CONTEXT.md
```

Then reload VS Code: `Cmd+Shift+P` → **Developer: Reload Window**.

---

## 4. Writing your first context file — 3 key tips

**Tip 1: Be specific about your environment URLs.**
The Data Resolver agent uses your QA URL to construct test data instructions. A placeholder URL means placeholder instructions.

**Tip 2: The "What does this application do?" field is the most important one.**
Agents use this description to understand scope. 2–4 clear sentences are enough. Don't paste your entire product spec.

**Tip 3: Leave fields blank rather than writing `[TODO]`.**
Blank fields are skipped gracefully. `[TODO]` markers appear verbatim in agent output and create noise.

---

## 5. How to run your first story

Open Copilot Chat → switch to **Agent mode** → select `@QAForge Manager`.

Paste a story in this format:

```
Ticket: PROJ-123
Title: User Login — Basic Authentication

User Story:
As a registered user, I want to log in with my email and password
so that I can access my account.

Acceptance Criteria:
- AC-01: Valid credentials result in successful login and redirect to dashboard
- AC-02: Incorrect password shows an error message
- AC-03: Unregistered email shows an error message

Scope: Manual verification only
```

The Manager will:
1. Create `FeatureSpecs/PROJ-123-user-login/` with your story
2. Route to the Story Analyst
3. Pause at each step with an **APPROVAL GATE** — type `APPROVE` to advance

**Want to skip all gates?** Add `--ci` to your message to run the full cycle uninterrupted.

---

## 6. What does the output look like?

After a full story cycle, your `FeatureSpecs/` folder will contain:

```
FeatureSpecs/PROJ-123-user-login/
├── 01_STORY_INPUT.md          ← Your story, structured
├── 02_TEST_ANALYSIS.md        ← Testable scenarios with priorities
├── 03_TEST_CASES.md           ← Plain-language or BDD test cases
├── 04_TEST_DATA.md            ← Resolved test data and setup instructions
├── 05_execution_evidence/     ← Your test results go here
├── 07_VALIDATION_REPORT.md    ← QA sign-off decision (PASS / BLOCKED)
└── 08_FINAL_TEST_REPORT.md    ← Shareable report for stakeholders
```

See [examples/web-ui-api/FeatureSpecs/DEMO-001-event-detail-cta/](../examples/web-ui-api/FeatureSpecs/DEMO-001-event-detail-cta/) for a complete, polished example of all artifacts.

---

## 7. What do I do if it doesn't work?

### Agent is not found / `@QAForge Manager` doesn't appear

- Confirm `.agent.md` files are in `.github/agents/` inside your open VS Code workspace
- Confirm GitHub Copilot Chat extension is installed and up to date
- Restart VS Code and try again

### Manager says "PROJECT_CONTEXT.md not found"

- Confirm `PROJECT_CONTEXT.md` exists at the root of your workspace (not in a subfolder)
- If your project has multiple root folders, place it in the folder you opened in VS Code

### Manager stops and asks for AUTOMATION_CONTEXT.md

- If your story is manual-only (no automation scope), it won't ask for this file
- If it asks, either create `AUTOMATION_CONTEXT.md` from the template, or change your story's Scope to "Manual verification only"

### Output artifacts look generic or use placeholder data

- Your `PROJECT_CONTEXT.md` likely has unfilled `[TODO]` fields — fill in the URL and description fields
- Check that your QA environment URL is reachable

### More help

- See [examples/web-ui-api/](../examples/web-ui-api/) for a fully working reference deployment
- Open a GitHub Discussion in the QAForge repo with the label **Q&A**
