# Contributing to QAForge

Thank you for your interest in contributing. QAForge grows through community skill packs and bug fixes. This guide covers what to contribute, how to do it, and what the review bar looks like.

---

## What we welcome

| Type | Where | Notes |
|------|-------|-------|
| Bug fix in a core agent | `.github/agents/` | Must include a test case or repro in the PR description |
| New skill pack | `skills/` | Read the skill pack guide first |
| Documentation improvement | `docs/` | Corrections, clarifications, missing examples |
| Example project | `examples/` | Real scenario, no client names, fictional data only |
| Bug report | GitHub Issues | Use the Bug Report template |
| Skill request | GitHub Issues | Use the Skill Request template before building |

---

## What we do not accept

- Changes to core agents that add framework-specific logic (Playwright, pytest, etc.) — those belong in a skill
- Hardcoded credentials, URLs, or environment names in any file
- Client names, real company data, or real ticket IDs in examples
- Changes that break the canonical artifact sequence (`01_` → `08_`)

---

## Building a skill pack

Read [docs/building-a-skill.md](docs/building-a-skill.md) before starting. Open a Skill Request issue before writing code — this prevents duplicate work and gets early feedback on the design.

Skill pack checklist (from the guide — required for PR approval):
- [ ] `skill:` and `replaces:` YAML frontmatter on the runner agent
- [ ] `FIRST ACTION — ALWAYS` section reads the 5 core context files
- [ ] All file references use `03_TEST_CASES.md`
- [ ] Validator augmentor includes the `⚠️ CRITICAL` naming warning
- [ ] No credentials hardcoded — all from `process.env`
- [ ] `END SIGNAL` block in runner and validator agents
- [ ] README with when-to-use, install steps, and required context files
- [ ] Tested against at least one story

---

## Submitting a pull request

1. Fork the repository
2. Create a branch: `feature/skill-{name}` or `fix/agent-{name}`
3. Make your changes
4. Test against a story (use the EventHub demo as a reference)
5. Open a PR with:
   - What changed and why
   - Which agent files were modified
   - A repro/test if it's a bug fix

---

## Code style

- Agent files: plain markdown. No HTML. Headers use `##` and `###`.
- TypeScript templates: 2-space indent, single quotes, no semicolons omitted at statement end.
- SQL templates: UPPERCASE keywords, lowercase identifiers.
- All files: Unix line endings (LF), UTF-8.

---

## Questions

Open a Discussion on GitHub. Do not use Issues for questions — Issues are for bugs and feature requests only.
