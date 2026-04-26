# QAForge — System Architecture Document
> **Version:** 1.0 — April 26, 2026

---

## Executive Summary

QAForge is a **multi-agent AI orchestration platform** that automates the full QA lifecycle for any software project — from reading a Jira story to delivering running automated tests and audit-ready reports — without manual handoffs.

It is not a test framework. It is not a prompt library.
It is an **intelligent QA operating system** built on top of GitHub Copilot's VS Code agent framework.

> **The core promise:** Any QA engineer on any project can deploy QAForge in under 30 minutes and run a complete, AI-assisted QA cycle from story intake to signed-off report — regardless of their tech stack.

---

## 1. The Problem QAForge Solves

Every QA team on every project faces the same invisible bottleneck:

```
Story arrives → QA reads it → QA writes analysis → QA writes test cases
    → QA sets up test data → QA runs tests → QA writes report
    → QA files evidence → cycle starts again tomorrow
```

This chain has **7 manual handoff points**. Each one is a place where:
- Context is lost
- Time is wasted
- Quality varies by engineer
- Nothing is traceable

QAForge eliminates every handoff with AI agents.

---

## 2. The Architecture: Three Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                     QAFORGE PLATFORM                            │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  LAYER 3 — CONTEXT LAYER  (Project-Specific)           │    │
│  │  PROJECT_CONTEXT.md  ·  INPUT_STORY_TEMPLATE.md        │    │
│  │  Domain knowledge, URLs, API schemas, DB schemas,       │    │
│  │  user roles, test environments, CI/CD config            │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ▲ feeds                              │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  LAYER 2 — SKILL LAYER  (Tech Stack Plugins)           │    │
│  │                                                         │    │
│  playwright/  api-rest/  database-sql/  aws-cloud/      │    │
│  │                                                         │    │
│  │  Each Skill = 1–3 specialist agents + tool definitions  │    │
│  └────────────────────────────────────────────────────────┘    │
│                            ▲ extends                            │
│  ┌────────────────────────────────────────────────────────┐    │
│  │  LAYER 1 — CORE ENGINE  (Universal, Never Changes)     │    │
│  │                                                         │    │
│  │  Manager · Analyst · Test Case Gen · Data Resolver      │    │
│  │  Validator · Reporter · Fixer · PR Recon                │    │
│  │                                                         │    │
│  │  Approval gates · Artifact naming · Routing logic       │    │
│  └────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Layer 1 — Core Engine
The immutable brain. Eight agents that exist in every QAForge deployment, regardless of project or tech stack. Their behavior is governed by **routing rules and approval gates** — not by knowing anything about any specific project. The core engine reads the Context Layer to acquire domain knowledge at runtime.

| Agent | Role | Never Changes |
|-------|------|--------------|
| `Manager` | Orchestrator — routes, enforces gates, delegates | The routing logic |
| `Story Analyst` | Reads Jira story → produces test analysis doc | The analysis structure |
| `Test Case Generator` | Analysis → BDD/Gherkin test cases (Xray-ready) | The TC format |
| `Data Resolver` | Resolves real test data per scenario | The resolution protocol |
| `Automation Engineer` | Test cases + data → runnable test code | The code gen contract |
| `QA Validator` | Verifies coverage against acceptance criteria | The validation checklist |
| `Reporter` | Execution results → stakeholder report + Xray XML | The report format |
| `Test Fixer` | Diagnoses failing tests, repairs and re-runs | The diagnostic protocol |

### Layer 2 — Skill Layer
Technology-specific agent plugins. A Skill is a **set of 1–3 specialist agents** that know one technology deeply. All v1.0 skill agents are pre-installed in `.github/agents/` alongside the core agents — no setup required. When working on a project that needs only a subset of skills, unused agents stay dormant; the Manager only routes to agents relevant to the current story.

| Skill Pack | Agents Included | Tech Covered |
|-----------|----------------|-------------|
| `playwright` | Automation Engineer (Playwright), Test Runner | TypeScript, POM, fixtures |
| `api-rest` | API Runner, Contract Validator | REST, OpenAPI/Swagger, JSON schema |
| `database-sql` | DB Query Agent, ETL Validator | PostgreSQL, MySQL, SQL Server, SQLite |
| `aws-cloud` | AWS Pipeline Runner, AWS Infra Validator | SQS, S3, Lambda, DynamoDB |

Community skill packs (contribute via [CONTRIBUTING.md](CONTRIBUTING.md)): `selenium` · `salesforce` · `mobile-appium` · `graphql` · `pytest` · `cypress`

### Layer 3 — Context Layer
A single markdown file — `PROJECT_CONTEXT.md` — that is the **project's brain**. It holds everything the agents need to know about one specific project: URLs, API schemas, database tables, user roles, test environments, business rules, tech stack, CI/CD pipeline. This file is written once per project and maintained by the QA team. It transforms a generic QAForge deployment into an expert QA system for a specific application.

```
PROJECT_CONTEXT.md answers:
  - What is this application?
  - Where does it run (URLs)?
  - What tech stack does it use?
  - What API endpoints exist?
  - What database tables matter for QA?
  - What user roles exist?
  - What are the critical business rules?
  - How is test data created / resolved?
  - How does CI/CD work?
```

---

## 3. The Execution Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  👤 ENGINEER                                                    │
│  Pastes Jira story into VS Code Copilot Chat                   │
│                         │                                       │
│                         ▼                                       │
│  🧠 Manager reads PROJECT_CONTEXT.md                           │
│     Creates artifact folder: FeatureSpecs/{TICKET_ID}/         │
│                         │                                       │
│  ┌──────────────────────▼──────────────────────────────────┐   │
│  │              AUTOMATED AGENT CHAIN                       │   │
│  │                                                          │   │
│  │  Story Analyst ──────────────► 02_TEST_ANALYSIS.md       │   │
│  │       ⏸ Approval Gate                                    │   │
│  Test Case Generator ────────► 03_TEST_CASES.md          │   │
│       ⏸ Approval Gate                                    │   │
│  Data Resolver ──────────────► 04_TEST_DATA.md           │   │
│       ⏸ Approval Gate                                    │   │
│  Automation Engineer ────────► 05_execution_evidence/    │   │
│       ⏸ Approval Gate                                    │   │
│  QA Validator ───────────────► 07_VALIDATION_REPORT.md   │   │
│       ⏸ Approval Gate                                    │   │
│  Reporter ───────────────────► 08_FINAL_TEST_REPORT.md   │   │
│                               + 09_xray_import.xml (cond.)│   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ✅ OUTCOME: Running tests + Signed-off report + Jira import    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Approval Gates are non-negotiable.** The human reviews every major artifact before the next step runs. This is the key design insight: AI velocity + human judgment = reliable output at scale.

---

## 4. What Changes Per Project vs. What Is Universal

| Component | Universal (Core) | Project-Specific (Context/Skill) |
|-----------|-----------------|----------------------------------|
| Manager routing logic | ✅ | Destination agents only |
| Approval gate pattern | ✅ | |
| Artifact naming convention | ✅ | |
| Story analysis structure | ✅ | |
| BDD/Gherkin test case format | ✅ | |
| Test report format | ✅ | |
| Application URL | | ✅ |
| API schemas & endpoints | | ✅ |
| Database schema | | ✅ |
| Auth mechanism | | ✅ |
| Test automation language | | ✅ (Skill Layer) |
| Test data creation method | | ✅ (Skill Layer) |
| CI/CD pipeline | | ✅ |
| Business domain rules | | ✅ |

---

## 5. Design Principles

1. **Human-in-the-loop by design.** Agents never execute autonomously end-to-end. Every major artifact is reviewed by the engineer before proceeding. Speed comes from eliminating the *writing* work, not the *thinking* work.

2. **Context is the product.** A QAForge deployment is only as good as its `PROJECT_CONTEXT.md`. The agents are amplifiers — they amplify the quality of the context they're given.

3. **No vendor lock-in.** QAForge runs entirely inside VS Code + GitHub Copilot. No cloud subscription beyond Copilot. No proprietary API. No license server. The agents are markdown files.

4. **Skills are composable.** A project can use Playwright + AWS + REST API skills simultaneously. Skills are additive — they do not conflict.

5. **Artifacts are the audit trail.** Every agent produces a numbered markdown file. At the end of every story cycle, the `FeatureSpecs/{TICKET_ID}/` folder is a complete, traceable QA artifact package — ready for Jira, Xray, or compliance review.

6. **The framework teaches itself.** The `GETTING_STARTED.md`, agent descriptions, and context template are written so that a new QA engineer can onboard to QAForge with zero external training.

---

## 6. Scalability Model

```
1 engineer + 1 project       → QAForge deployed in ~30 min
10 engineers + 1 project     → Shared PROJECT_CONTEXT.md, same agent system
100 engineers + 10 projects  → 10 PROJECT_CONTEXT.md files, same Core Engine
1000 engineers + 100 projects → Skills library grows; Core Engine unchanged
```

The Core Engine does not change as you scale. Only the Context Layer and Skills library grow.

---

## 7. What QAForge Is NOT

- It is **not a replacement for human QA judgment.** The engineer decides at every approval gate.
- It is **not a magic button.** The context file must be maintained and accurate.
- It is **not locked to one AI provider.** The agent pattern works with any Copilot-compatible AI model.
- It is **not a testing tool.** It orchestrates testing tools — Playwright, Selenium, AWS CLI, etc.

---

*END OF ARCHITECTURE DOCUMENT*
