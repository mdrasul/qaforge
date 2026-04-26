# QAForge Skill — database-sql

The `database-sql` skill extends QAForge for projects where test coverage requires direct database verification — checking that data was created, updated, or deleted correctly by backend operations.

---

## When to use this skill

Use `database-sql` when your story involves:
- Verifying that a backend operation persists the correct data to the database
- Checking that a delete operation removes records (and cascades correctly)
- ETL pipeline validation — source data transformed and loaded as expected
- Data integrity checks between systems (source DB → target DB)
- Stories where the API response alone is insufficient — you need to confirm DB state

Do NOT use this skill for read-only queries that could be validated via API response — prefer the `api-rest` skill for those cases.

---

## What this skill provides

| Agent | Replaces / Adds | Purpose |
|-------|----------------|---------|
| `db-query-agent.agent.md` | QAForge Automation Engineer | Generates SQL verification queries and DB test helpers |
| `etl-validator.agent.md` | (adds to) QAForge QA Validator | Validates ETL pipeline results against source/target DB |

| Template | Purpose |
|----------|---------|
| `db-helper.template.ts` | Typed database query helper pattern |

---

## Setup

Database SQL skill agents are pre-installed in `.github/agents/` when you clone QAForge. No agent files to copy.

To use the database helper template as a starting point:

```bash
cp skills/database-sql/templates/db-helper.template.ts tests/db/helpers/
```

---

## Required context files

| File | Required? | Notes |
|------|-----------|-------|
| `PROJECT_CONTEXT.md` | YES | Always required |
| `DB_CONTEXT.md` | YES | Connection string pattern, schema, table names, ID conventions |
| `AUTOMATION_CONTEXT.md` | YES | Language, test runner |

`DB_CONTEXT.md` is the most important file for this skill. Fill in the table names, key column names, and any naming conventions your team uses — the agents produce queries that match your actual schema.

---

## Security note

Database credentials must NEVER be hardcoded in test files. The `db-helper` template sources all connection details from environment variables. Store credentials in your CI secret store or a `.env` file excluded from version control.

---

## Supported databases

The `db-query-agent` adapts its output to the database type declared in `DB_CONTEXT.md`:
- PostgreSQL
- MySQL / MariaDB
- Microsoft SQL Server
- SQLite (for local/embedded testing)
- Oracle (basic SELECT/INSERT/DELETE — no stored procedure generation)
