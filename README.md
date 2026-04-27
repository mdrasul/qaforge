# QAForge

> **The AI-powered QA operating system for any project, any tech stack.**
> Built on GitHub Copilot. Deployed in 30 minutes. Scales to 1000+ engineers.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-GitHub%20Copilot-blue)](https://code.visualstudio.com/)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-orange)]()

---

## What Is QAForge?

QAForge is a **multi-agent AI orchestration system** that automates the full QA lifecycle — from reading a Jira story to delivering running automated tests and audit-ready reports.

You paste a story. Eight specialized AI agents collaborate, with your approval at every step, to:

1. **Analyse** the story and identify every test scenario
2. **Write** structured BDD/Gherkin test cases (Xray-ready)
3. **Resolve** real, live test data for each scenario
4. **Generate** production-ready automated test code
5. **Validate** coverage against every acceptance criterion
6. **Report** results with a final stakeholder report + Jira import

No manual handoffs. No context switching. No starting from scratch every sprint.

---

## The 90-Second Demo

🎥 **[Watch the full 25-minute live demo on YouTube](https://youtu.be/o8rkB_uJlVk)** — end-to-end pipeline run on a live site, no cuts.

```
You:     @QAForge Manager
         [paste your Jira story]

Manager: Story understood. Folder created at FeatureSpecs/TICKET-123/.
         Delegating to Story Analyst...

Analyst: Analysis complete. 14 scenarios identified across 4 test suites.
         Saved to 02_TEST_ANALYSIS.md.
         ⏸ APPROVAL GATE — type APPROVE to continue.

You:     APPROVE

Generator: 23 BDD test cases written in Gherkin format.
           P0: 8 cases | P1: 11 cases | P2: 4 cases.
           ⏸ APPROVAL GATE

You:     APPROVE

Data Resolver: Live API called. 5 test scenarios resolved with real event IDs.
               Saved to 04_TEST_DATA.md.
               ⏸ APPROVAL GATE

You:     APPROVE

Automation Engineer: 5 Playwright spec files generated.
                     POM updated with 3 new methods.
                     All fixtures wired to resolved test data.
                     ⏸ APPROVAL GATE

You:     APPROVE → run the tests → come back

Validator: 23/23 test cases mapped to ACs. 21 passing. 2 failing (P1 — non-blocking).
           QA Sign-Off: CONDITIONAL PASS.

Reporter:  Final report saved. Xray XML ready for Jira import.
           ✅ COMPLETE.
```

---

## Why QAForge Is Different

| The old way | QAForge |
|------------|---------|
| Write test analysis manually (2–4 hours) | Analyst agent — 2 minutes |
| Write test cases from scratch every story | Test Case Generator — 3 minutes |
| Chase down test data per environment | Data Resolver — automated, live data |
| Write Playwright/Selenium code by hand | Automation Engineer — generated, fits existing framework |
| Validation is a mental checklist | Validator — every AC mapped, every gap flagged |
| Report is a copy-paste from Jira | Reporter — structured, audit-ready, Xray-importable |
| Each engineer does this differently | QAForge — consistent across every engineer, every story |

---

## Who Is This For?

- **QA Engineers** who want to stop writing the same analysis and test case documents sprint after sprint
- **SDET Engineers** who want AI to generate the boilerplate automation code while they focus on framework design
- **QA Leads** who want every engineer on the team producing consistent, traceable artifacts
- **DevOps / Engineering Managers** who need audit trails, Xray imports, and sign-off documents without chasing QA

---

## Works With Any Tech Stack

QAForge ships with four skill packs covering the most common testing environments:

| Tech Stack | Use Case | Skill Pack |
|-----------|----------|------------|
| Playwright + TypeScript | Web UI testing | [`skills/playwright`](skills/playwright/README.md) |
| REST API (any language) | API contract + integration testing | [`skills/api-rest`](skills/api-rest/README.md) |
| PostgreSQL / MySQL / SQL Server | Direct DB verification + ETL validation | [`skills/database-sql`](skills/database-sql/README.md) |
| AWS SQS + S3 + Lambda + DynamoDB | Cloud pipeline testing | [`skills/aws-cloud`](skills/aws-cloud/README.md) |

The **Core Engine** never changes. The **Skill Layer** adapts to your stack. The **Context Layer** teaches the agents your specific project.

---

## Quick Start

### Prerequisites
- VS Code (latest stable)
- GitHub Copilot extension (active subscription)
- Node.js >= 18

### Deploy in 3 Steps

```bash
# 1. Clone QAForge — this becomes your QA workspace
git clone https://github.com/mdrasul/qaforge.git
cd qaforge

# 2. Open in VS Code — all 16 agents are auto-discovered immediately
code .

# 3. Copy the context template and fill it in for your project
cp core/templates/PROJECT_CONTEXT.template.md PROJECT_CONTEXT.md
# Open PROJECT_CONTEXT.md and fill in your app details
# Reload VS Code:  Cmd+Shift+P → Developer: Reload Window
```

### Run Your First Story

1. Open Copilot Chat in VS Code (`Cmd+Shift+I`)
2. Fill in `core/templates/INPUT_STORY_TEMPLATE.md` with your story
3. Type `@QAForge Manager` and paste your filled template
4. Follow the approval gates

**Full guide:** [docs/getting-started.md](docs/getting-started.md) | **Troubleshooting:** [docs/troubleshooting.md](docs/troubleshooting.md)

---

## Repository Structure

```
qaforge/
├── .github/agents/          ← All agents — auto-discovered by VS Code on clone
├── core/                    ← Templates and engine reference docs
├── skills/                  ← Skill pack docs and code templates
├── examples/                ← Reference implementations per stack
└── docs/                    ← Full documentation
```

See [core/README.md](core/README.md) for agent details and [docs/](docs/) for full documentation.

---

## The Three Layers

```
┌─────────────────────────────────────────┐
│  CONTEXT LAYER  — Your PROJECT_CONTEXT  │  ← You write this once
│  (domain knowledge, URLs, schemas)      │
├─────────────────────────────────────────┤
│  SKILL LAYER    — Your Tech Stack       │  ← Pick from the skills library
│  (playwright / api-rest / database-sql / aws-cloud)  │
├─────────────────────────────────────────┤
│  CORE ENGINE    — Universal Agents      │  ← Never changes
│  (Manager, Analyst, TC Gen, etc.)       │
└─────────────────────────────────────────┘
```

Read the full design: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## The Approval Gate Philosophy

QAForge does not run autonomously end-to-end. Every major step produces an artifact and **pauses for your review**.

This is intentional. AI moves fast. Judgment makes it right.

You are always in control. The agents eliminate the writing work. You provide the thinking.

---

## Contributing

QAForge is designed to grow through community-contributed skill packs.

If you've adapted QAForge for a new tech stack (GraphQL, Kafka, mobile, Kubernetes, SAP, etc.), contribute it back as a Skill Pack. See [CONTRIBUTING.md](CONTRIBUTING.md).

**The more skill packs exist, the more stacks QAForge covers — without changing the core engine.**

---

## License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE).

---

## Author

**MD Rasul** — Senior SDET / Automation Architect
10+ years building production QA automation systems across enterprise, cloud, and web platforms.

> *"I built this because I was tired of watching talented QA engineers spend 80% of their time writing documents instead of solving testing problems. QAForge gives that time back."*
