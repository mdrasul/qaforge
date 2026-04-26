# FAQ

Answers to the questions that come up most often when teams first deploy QAForge.

---

## Setup

### Which GitHub Copilot plan do I need?

GitHub Copilot Business or Enterprise. The agent mode feature (`.agent.md` files) requires one of these plans. Individual plan does not support custom agents.

### Do I need to install QAForge or run any setup command?

No installation required. Clone the repo, open it in VS Code, and GitHub Copilot discovers all 16 agents in `.github/agents/` automatically. No copying. No setup commands.

### Why is the QAForge Manager not appearing in my Copilot agent list?

1. Verify the file is at `.github/agents/qaforge-manager.agent.md` — the path must be exact
2. Reload the VS Code window (Command Palette → `Developer: Reload Window`)
3. Confirm agent mode is enabled in your Copilot settings

---

## Context Files

### I have 10 tables in my database. Do I need to document all of them in `DB_CONTEXT.md`?

No — only the tables your current story's test cases need to verify. The DB Query Agent reads `03_TEST_CASES.md` alongside `DB_CONTEXT.md`, so it will flag any table it needs that isn't documented rather than guessing. Add tables incrementally as stories require them.

### My API has 40 endpoints. Should they all be in `API_CONTEXT.md`?

No — document only the endpoints your active ticket's test cases will exercise. `API_CONTEXT.md` is a living file; add endpoints story by story.

### What happens if I leave `Test Management Tool` blank in `PROJECT_CONTEXT.md`?

The Reporter skips Xray XML generation entirely. Your `08_FINAL_TEST_REPORT.md` will include a note: "Xray export skipped — no test management tool configured." This is the expected behavior for teams not using Xray.

### Do I need `AUTOMATION_CONTEXT.md` for every project?

Only if you're generating automated test code. Manual testing projects only need `PROJECT_CONTEXT.md`. If `AUTOMATION_CONTEXT.md` is absent, the Manager runs a manual test case pipeline and skips the Automation Engineer step.

---

## Agent Behavior

### The validator named the artifact `06_VALIDATION_REPORT.md` instead of `07_`

This is a known LLM training bias. The core validator and all skill validator augmentors include a `⚠️ CRITICAL` warning to prevent this. If it still happens:
1. Ask the agent to rename the file to `07_VALIDATION_REPORT.md`
2. The warning is already there — the model occasionally ignores it. A simple correction prompt is sufficient.

### The Test Case Gen produced BDD format even though I set BDD Layer to `none`

Check that `AUTOMATION_CONTEXT.md` is in the project root (or the path your Manager points to). The Test Case Gen reads `BDD Layer:` from that file. If the file is missing or the field is missing, it falls back to BDD format. Add `BDD Layer: none` explicitly.

### The Automation Engineer generated Playwright code but my project uses pytest

The Automation Engineer reads `AUTOMATION_CONTEXT.md` `Language and test runner:` field. If it generated the wrong language, either the field is missing or the agent was invoked without access to the file. Verify the field is set and the file is in the correct location.

### The Manager always generates Xray XML even though I didn't configure a test management tool

Check `PROJECT_CONTEXT.md` `Test Management Tool:` field. If it contains any value (even something like `TBD`), the Reporter treats it as "configured". Clear the field entirely or set it to `none`.

---

## Skills

### Can I use more than one skill on the same project?

Yes. Skills are additive. You can install `playwright` + `api-rest` together — the Playwright agent handles UI test code and the API runner handles API test code. The Manager routes to the right agent based on the story type.

### Can I use `database-sql` and `api-rest` on the same ticket?

Yes — create test suites for both in `03_TEST_CASES.md`. The Manager will invoke the API runner for API test suites and the DB Query Agent for database verification suites.

### My framework isn't covered by any existing skill. Can I still use QAForge?

Yes — the core Automation Engineer is framework-agnostic. Fill in `AUTOMATION_CONTEXT.md` with your language and test runner, and the core agent will generate appropriate test code without framework-specific helpers. You can build a skill for your framework when you're ready — see [building-a-skill.md](building-a-skill.md).

---

## Output and Artifacts

### Why is the artifact folder named `05_execution_evidence/` and not `05_TEST_CODE/`?

The folder holds everything from the execution phase — test code, run logs, screenshots, API responses. `execution_evidence` is more accurate than `test_code` because it includes all evidence the Validator needs, not just source files.

### Why does the artifact sequence jump from 05 to 07? There is no 06.

This was an intentional design decision after the original `06_VALIDATION_REPORT.md` naming caused consistent LLM confusion. Moving validation to `07_` and leaving `06_` unused makes the naming unambiguous. There is no `06_` artifact in QAForge.

### Can I add my own artifact types beyond the 8 standard ones?

Yes — add a note to `PROJECT_CONTEXT.md` describing your custom artifact and what agent produces it. The Manager picks this up and includes it in the pipeline run notes.

---

## Contributing

### I found a bug in a core agent. How do I report it?

Open a GitHub issue using the Bug Report template. Include the agent file name, the symptom, and the expected behavior. If you have a fix, open a PR — see `CONTRIBUTING.md`.

### I want to contribute a skill for {framework}. Where do I start?

Read [building-a-skill.md](building-a-skill.md) end-to-end first. Then open a GitHub issue using the Skill Request template to describe your proposed skill before building it — this prevents duplicate work.
