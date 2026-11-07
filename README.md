# QAForge

> **AI-assisted QA. Engineer-led.**
> A coordinated QA workflow in GitHub Copilot, grounded in your project context and guided by your review.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![VS Code](https://img.shields.io/badge/VS%20Code-GitHub%20Copilot-blue)](https://code.visualstudio.com/)
![Status: Beta](https://img.shields.io/badge/Status-Beta-orange)

---

## What Is QAForge?

QAForge is a **multi-agent QA workflow** that helps engineers turn a story and approved project context into analysis, test cases, test data plans, automation drafts and reports.

An **AI Manager agent** coordinates specialist agents. Depending on your scope and configured tools, they can help you:

1. **Analyse** a story and propose scenarios and coverage gaps
2. **Write** structured test cases for your review
3. **Resolve** test data using authorized sources, or identify missing data
4. **Draft** automation adapted to your framework for review and execution
5. **Validate** acceptance-criteria coverage against available evidence
6. **Report** results, limitations and follow-up work

Start with one story. Review the artifacts, correct assumptions and keep approval gates enabled. Generated code is not a passing test; execution evidence and engineering judgment determine the result.

---

## Watch QAForge in Action

- **[Part 2 — Meet your AI QA team](https://youtu.be/XAoT-4p5e8U):** an introduction to the agents, project context and human approval workflow.
- **[Part 3 — Follow a practical QA workflow](https://youtu.be/EHITM9zFefI):** context preparation, story input, artifact review and browser validation using a sample application.
- [Earlier extended demonstration](https://youtu.be/o8rkB_uJlVk): an older walkthrough; start with Parts 2 and 3 for the newer presentation.

The following is an illustrative conversation, not an execution report or a promise of a particular number of scenarios or passing tests:

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
| Repeatedly prepare story analysis | Review and refine agent-drafted scenarios |
| Write test cases from a blank page | Start from structured drafts grounded in project context |
| Chase down test data per environment | Use authorized sources and make missing data explicit |
| Write automation boilerplate by hand | Review generated code against your framework, then run it |
| Keep coverage in a mental checklist | Inspect explicit acceptance-criteria mappings and gaps |
| Assemble reports from scattered notes | Review structured findings and supporting evidence |
| Repeat project explanations | Maintain reusable context and technical instructions |

---

## Who Is This For?

- **QA Engineers** who want to stop writing the same analysis and test case documents sprint after sprint
- **SDET Engineers** who want AI to generate the boilerplate automation code while they focus on framework design
- **QA Leads** who want every engineer on the team producing consistent, traceable artifacts
- **DevOps / Engineering Managers** who need audit trails, Xray imports, and sign-off documents without chasing QA

---

## Adapt the Workflow to Your Stack

QAForge includes four skill packs. Review and configure the relevant pack for your environment before execution:

| Tech Stack | Use Case | Skill Pack |
|-----------|----------|------------|
| Playwright + TypeScript | Web UI testing | [`skills/playwright`](skills/playwright/README.md) |
| REST API (any language) | API contract + integration testing | [`skills/api-rest`](skills/api-rest/README.md) |
| PostgreSQL / MySQL / SQL Server | Direct DB verification + ETL validation | [`skills/database-sql`](skills/database-sql/README.md) |
| AWS SQS + S3 + Lambda + DynamoDB | Cloud pipeline testing | [`skills/aws-cloud`](skills/aws-cloud/README.md) |

The **Core Engine** defines the shared workflow. The **Skill Layer** supplies stack-specific instructions. The **Context Layer** supplies project facts and business rules. Maintain these files as your project evolves; providing context does not permanently train the underlying model.

---

## Quick Start

### Prerequisites
- VS Code with Copilot access and custom agents enabled under your organization's policy
- Tools and permissions required by your chosen skill pack
- For Node-based examples, check their package requirements and the runtime supported by the dependencies you install; the repository declares Node.js >= 18

### Deploy in 3 Steps

```bash
# 1. Clone QAForge — this becomes your QA workspace
git clone https://github.com/mdrasul/qaforge.git
cd qaforge

# 2. Open in VS Code and check the Copilot agent picker
code .

# 3. Copy the context template and fill it in for your project
cp core/templates/PROJECT_CONTEXT.template.md PROJECT_CONTEXT.md
# Open PROJECT_CONTEXT.md and fill in your app details
# Reload VS Code:  Cmd+Shift+P → Developer: Reload Window
```

### Run Your First Story

1. **Prepare context.** Follow the questions in [the project context template](core/templates/PROJECT_CONTEXT.template.md): application purpose, users, business rules and scope. Save your approved details in `PROJECT_CONTEXT.md`.
2. **Select the AI Manager agent.** Choose QAForge Manager in Copilot's agent picker. Ask it to read the context and summarize its understanding before starting work. Correct missing or misunderstood facts.
3. **Provide one story.** Follow [the story input template](core/templates/INPUT_STORY_TEMPLATE.md). Paste approved text into chat, or save it as a workspace file such as `STORY_INPUT.md` and ask the AI Manager agent to read that file.
4. **Review before proceeding.** Open the generated artifacts, check assumptions and expected results, and request changes where necessary. Approve only the next agreed phase. Decide separately whether reusable automation is appropriate.

Example context prompt:

```text
Read PROJECT_CONTEXT.md. Summarize the application, user roles and business
rules. Identify missing information without guessing. Do not start story
analysis or execute tests yet; wait for my review.
```

Example first-story prompt:

```text
Read STORY_INPUT.md using the reviewed project context. Start with story
analysis and proposed test coverage. Identify ambiguities and assumptions.
Keep approval gates enabled and wait for my review before the next phase.
Do not execute tests or change application code in this step.
```

`STORY_INPUT.md` is an example name for your completed story file, not a separate bundled template.

### Protect Project Information

Use only company-approved AI accounts, tools and data-sharing policies. Start with synthetic examples when permission is unclear. Exclude credentials, tokens, personal/customer data and restricted company details. Sanitizing a document does not itself authorize sharing it.

A local file may be sent to the configured AI service when an agent reads it; a path is not a privacy boundary. Keep private context out of public Git commits and use approved secret-management mechanisms instead of storing passwords in prompts or context files. Limit tool permissions and review proposed actions as well as their results.

**Full guide:** [docs/getting-started.md](docs/getting-started.md) | **Troubleshooting:** [docs/troubleshooting.md](docs/troubleshooting.md)

---

## Repository Structure

```
qaforge/
├── .github/agents/          ← Custom agent definitions for Copilot
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
│  CONTEXT LAYER  — Your PROJECT_CONTEXT  │  ← Maintain verified facts
│  (domain knowledge, URLs, schemas)      │
├─────────────────────────────────────────┤
│  SKILL LAYER    — Your Tech Stack       │  ← Pick from the skills library
│  (playwright / api-rest / database-sql / aws-cloud)  │
├─────────────────────────────────────────┤
│  CORE ENGINE    — Universal Agents      │  ← Shared workflow
│  (Manager, Analyst, TC Gen, etc.)       │
└─────────────────────────────────────────┘
```

Read the full design: [ARCHITECTURE.md](ARCHITECTURE.md)

---

## The Approval Gate Philosophy

The default governed workflow uses approval checkpoints between major phases. **Keep them enabled**, inspect the artifacts and request changes when needed. Prompt-based gates are not a security boundary: restrict tool access and retain your organization's approval controls.

This is intentional. AI moves fast. Judgment makes it right.

Agents help prepare the work. You remain responsible for reviewing evidence and deciding whether to proceed.

## Get Practical Setup Help

Start independently with the templates and walkthroughs above. If you would like one-on-one help with setup, project context or applying the workflow to your QA tasks, visit [Test Engineer PRO](https://www.testengineerpro.com/) and use WhatsApp to request a session.

Suggested message: “Hi Rasul, I'd like a one-on-one session for QAForge setup and project context. I need help with [brief non-confidential description]. My preferred time and time zone are [details].”

Do not send credentials or confidential employer documents. Session scope and availability are arranged directly with Rasul.

---

## Contributing

QAForge is designed to grow through community-contributed skill packs.

If you've adapted QAForge for a new tech stack (GraphQL, Kafka, mobile, Kubernetes, SAP, etc.), contribute it back as a Skill Pack. See [CONTRIBUTING.md](CONTRIBUTING.md).

New skill packs can extend the workflow to additional stacks; contributions need review and validation.

---

## License

MIT — free to use, modify, and distribute. See [LICENSE](LICENSE).

---

## Author

**MD Rasul** — Senior SDET / Automation Architect
10+ years building production QA automation systems across enterprise, cloud, and web platforms.

The goal is to reduce repetitive preparation so engineers can focus on testing decisions, investigation and evidence.
