# Building a QAForge Skill Pack

Skill packs let you extend QAForge for a specific technology, framework, or domain without modifying the core engine. This guide walks through building a production-ready skill from scratch.

---

## What a skill pack is

A skill pack is a folder inside `skills/` with three components:

1. **Agent files** — `.agent.md` files that replace or augment core agents
2. **Template files** — starter code patterns for the test runner
3. **README.md** — when to use, what it provides, install instructions

Skills follow the same agent contract as the core engine. They communicate through the same numbered artifact sequence. They add capability on top of the core — they don't fork it.

---

## Folder structure

```
skills/
  your-skill-name/
    README.md
    agents/
      your-runner.agent.md        ← replaces core Automation Engineer
      your-validator.agent.md     ← augments core QA Validator (optional)
    templates/
      your-client.template.{ext}  ← annotated starter code
```

---

## Step 1 — Define what your skill replaces

Most skills replace exactly one core agent — the **Automation Engineer** — because that's where technology-specific test code is generated.

Skills may also **augment** (not replace) the **QA Validator** when the validation step needs additional domain-specific checks (contract checks, cloud resource checks, ETL counts, etc.).

| Core agent | When to replace | When to augment |
|-----------|----------------|----------------|
| QAForge Automation Engineer | Always — this is where test code is generated | n/a |
| QAForge QA Validator | Never — don't replace, only augment | When your domain adds validation checks beyond pass/fail |

No skill should replace the Manager, Analyst, Test Case Gen, Data Resolver, or Reporter. Those agents are framework-agnostic by design.

---

## Step 2 — Write the runner agent

The runner replaces the core Automation Engineer. Its YAML frontmatter must declare:

```yaml
---
name: QAForge {YourSkill} Runner
description: >
  One sentence. What technology does this run? What does it produce?
skill: your-skill-name
replaces: QAForge Automation Engineer
tools: [read, edit]
---
```

The `skill:` and `replaces:` fields are what makes this a skill agent, not a standalone agent.

**Required sections:**

1. `## FIRST ACTION — ALWAYS` — list the files to read before generating code
2. `## ROLE` — what the agent does in plain language
3. `## WHAT YOU PRODUCE` — file paths and formats
4. `## RULES` — numbered, non-negotiable constraints
5. `## END SIGNAL` — the `APPROVAL_REQUIRED` block

**Rules every runner must include:**
- No credentials hardcoded — always from `process.env`
- One describe block per Test Suite from `03_TEST_CASES.md`
- Read `03_TEST_CASES.md` (not `03_BDD_TEST_CASES.md`)

---

## Step 3 — Write the validator augmentor (optional)

If your skill needs extra validation checks, write an augmentor. It does NOT replace the core validator — it adds a domain-specific section to `07_VALIDATION_REPORT.md`.

**Required YAML:**
```yaml
---
name: QAForge {YourSkill} Validator
description: >
  Validates {domain-specific} results. Augments core QA Validator.
skill: your-skill-name
tools: [read, edit]
---
```

No `replaces:` field — augmentors don't replace anything.

**Required: CRITICAL naming warning**

Every validator agent (core or augmentor) must include this warning:

```markdown
> ⚠️ CRITICAL: Output file is **`07_VALIDATION_REPORT.md`**. Number is 07, not 06.
```

This warning exists because LLMs have a training bias toward using `06_` for validation artifacts. The warning has been effective at preventing this. Do not remove it from your augmentor.

---

## Step 4 — Write the template

The template is annotated starter code in the test runner's language. It should:

- Be a working pattern, not a full implementation
- Use `[PLACEHOLDER]` naming for everything project-specific
- Source all credentials and endpoints from `process.env`
- Include a `HOW TO USE` block at the top
- Include a `SECURITY NOTE` if credentials are involved

---

## Step 5 — Write the README

The README is what a developer reads before deciding whether to use your skill. Include:

1. **When to use** — the decision criteria (what story types trigger this skill)
2. **When NOT to use** — equally important; prevent misuse
3. **What it provides** — table: agent name → replaces/adds → purpose
4. **Install** — exact `cp` commands to copy files
5. **Required context files** — which files must be filled in and why
6. **Security note** — if your skill touches credentials, infrastructure, or databases

---

## Checklist before submitting a skill PR

- [ ] `skill:` and `replaces:` YAML frontmatter on the runner agent
- [ ] `FIRST ACTION — ALWAYS` section reads the 5 core context files
- [ ] All file references use `03_TEST_CASES.md` (not `03_BDD_TEST_CASES.md`)
- [ ] Validator augmentor includes the `⚠️ CRITICAL` naming warning for `07_VALIDATION_REPORT.md`
- [ ] No credentials hardcoded in templates — all from `process.env`
- [ ] `END SIGNAL` block present in runner and validator agents
- [ ] README includes when to use, install steps, and required context files
- [ ] Tested against at least one story using the EventHub demo as a reference
