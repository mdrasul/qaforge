# QAForge Core Engine

The core engine is 8 universal GitHub Copilot agents that work together to run a full QA pipeline — from a raw user story to a validated test report.

The core is framework-agnostic. It does not contain any references to Playwright, pytest, or any other test framework. Technology-specific logic lives in skill packs in `skills/`.

---

## Agents

| Agent | File | Role |
|-------|------|------|
| Manager | `qaforge-manager.agent.md` | Orchestrates the pipeline. Entry point for all user commands. |
| Analyst | `qaforge-analyst.agent.md` | Reads the story and produces test analysis with risk assessment. |
| Test Case Gen | `qaforge-testcase-gen.agent.md` | Converts analysis into numbered test cases (plain-language or BDD). |
| Data Resolver | `qaforge-data-resolver.agent.md` | Identifies test data requirements and fixture IDs. |
| Automation Engineer | `qaforge-automation-engineer.agent.md` | Generates test code. Replaced by skill agents when a skill is installed. |
| Validator | `qaforge-validator.agent.md` | Reviews execution evidence and produces `07_VALIDATION_REPORT.md`. |
| Reporter | `qaforge-reporter.agent.md` | Produces `08_FINAL_TEST_REPORT.md` and Xray XML (conditional). |
| Fixer | `qaforge-fixer.agent.md` | Diagnoses test failures and suggests fixes. |

---

## Artifact sequence

Each agent reads the previous agent's output and produces the next artifact:

```
01_STORY_INPUT.md          ← provided by the user
02_TEST_ANALYSIS.md        ← Analyst
03_TEST_CASES.md           ← Test Case Gen
04_TEST_DATA.md            ← Data Resolver
tests/                     ← Automation Engineer writes code here (path defined in AUTOMATION_CONTEXT.md)
07_VALIDATION_REPORT.md    ← Validator  (note: 07, not 06 — intentional)
08_FINAL_TEST_REPORT.md    ← Reporter
09_xray_import.xml         ← Reporter (conditional — only if Xray configured)
```

Artifacts live in `FeatureSpecs/{TICKET_ID}-{description}/`.

---

## Conditionals

The pipeline adapts based on what context files are present:

| Condition | Behavior |
|-----------|---------|
| `AUTOMATION_CONTEXT.md` absent | Manager skips automation steps; manual test cases only |
| `Test Management Tool:` blank in PROJECT_CONTEXT.md | Reporter skips Xray XML |
| `BDD Layer: none` in AUTOMATION_CONTEXT.md | Test Case Gen produces numbered plain-language format |
| `BDD Layer: Gherkin + Cucumber` | Test Case Gen produces `.feature` format |
| Skill agent installed | Automation Engineer is replaced by the skill agent |

---

## Extending with skills

All skill agents are pre-installed in `.github/agents/` alongside the core agents — no copying required. Skill agents declare `skill:` and `replaces: QAForge Automation Engineer` in their YAML frontmatter. The Manager automatically routes to them when the relevant skill is needed.

See `skills/` for available skill packs and `docs/building-a-skill.md` to build your own.

---

## Usage

Open GitHub Copilot Chat in VS Code in agent mode:

```
@QAForge-Manager run full pipeline for {TICKET_ID}
```

Or run a single step:
```
@QAForge-Analyst analyze story {TICKET_ID}
@QAForge-TestCaseGen generate test cases for {TICKET_ID}
@QAForge-Validator validate {TICKET_ID}
```
