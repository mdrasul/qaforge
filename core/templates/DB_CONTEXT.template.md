# DB_CONTEXT.md
# ─────────────────────────────────────────────────────────────────────────────
# QAForge Context File — Database & Data Layer
# TIER 2 — CONDITIONAL. Required only if testing database / ETL / data pipelines.
# ─────────────────────────────────────────────────────────────────────────────
#
# HOW TO USE:
#   Copy to your project root as DB_CONTEXT.md and fill in all [TODO] fields.
#   If using Mode B (Discovery Agent), the Discoverer will scan migration files
#   and generate a draft of this file automatically.
# ─────────────────────────────────────────────────────────────────────────────

---

## 1. DATABASE IDENTITY

| Field | Value |
|-------|-------|
| **Database Type** | [TODO: PostgreSQL / Oracle / SQL Server / MySQL / SQLite / MongoDB / DynamoDB / Snowflake / Redshift] |
| **Database Name** | [TODO: e.g. "orders_db"] |
| **Connection (QA)** | [TODO: e.g. `qa-db.example.com:5432` or "stored in .env as QA_DB_HOST"] |
| **Connection (Prod)** | [TODO: READ ONLY access only — e.g. `prod-db.example.com:5432` or "N/A"] |
| **Auth Method** | [TODO: Username/Password / Windows Auth / IAM / SSL cert] |
| **QA Credentials** | [TODO: stored in .env as DB_USER / DB_PASSWORD or "see team vault"] |
| **SQL Client Tool** | [TODO: e.g. DBeaver / SQL Server Management Studio / pgAdmin / mysql CLI] |

---

## 2. QA TEST DATA CONVENTIONS

[TODO: This section prevents agents from using production data or creating conflicting records]

| Convention | Value |
|-----------|-------|
| **QA ID Range** | [TODO: e.g. "IDs 90000–99999 are reserved for QA-generated records"] |
| **QA User Prefix** | [TODO: e.g. "All QA test usernames start with 'qa_test_'"] |
| **Data Reset Schedule** | [TODO: e.g. "QA DB resets every Sunday at 2am UTC" or "No reset — manual cleanup required"] |
| **Test Data Source** | [TODO: e.g. "SQL seed scripts in /tests/sql/seed/" or "API-generated" or "Manual setup"] |

---

## 3. KEY TABLES UNDER TEST

[TODO: List the database tables relevant to your test scenarios.
Agents use this to write correct SQL assertions and data setup steps.]

### Table: `[TODO: orders]`
**Purpose:** [TODO: e.g. Stores all field survey orders]

| Column | Type | Nullable | Description |
|--------|------|---------|-------------|
| `[TODO: id]` | [TODO: INT PK] | No | [TODO: Primary key, auto-increment] |
| `[TODO: customer_id]` | [TODO: INT FK] | No | [TODO: References customers.id] |
| `[TODO: status]` | [TODO: VARCHAR(20)] | No | [TODO: draft / submitted / approved / rejected / closed] |
| `[TODO: created_at]` | [TODO: TIMESTAMP] | No | [TODO: UTC timestamp of creation] |
| `[TODO: assigned_to]` | [TODO: INT FK] | Yes | [TODO: References users.id — null if unassigned] |

**Key constraints / business rules:**
- [TODO: e.g. "status can only advance forward — can never go from 'approved' back to 'draft'"]
- [TODO: e.g. "A customer can have max 5 open orders at once — enforced by DB trigger"]

---

### Table: `[TODO: users]`
**Purpose:** [TODO: e.g. Application users and their roles]

| Column | Type | Nullable | Description |
|--------|------|---------|-------------|
| `[TODO: id]` | [TODO: INT PK] | No | |
| `[TODO: username]` | [TODO: VARCHAR(100)]` | No | [TODO: Unique login] |
| `[TODO: role]` | [TODO: VARCHAR(20)] | No | [TODO: admin / user / readonly] |
| `[TODO: active]` | [TODO: BOOLEAN] | No | [TODO: false = deactivated account] |

---

[TODO: Repeat the above table block for each additional table under test]

---

## 4. KEY RELATIONSHIPS

[TODO: List the foreign key relationships that matter for test data setup]

```
[TODO: Example:
orders.customer_id → customers.id
orders.assigned_to → users.id
order_items.order_id → orders.id
order_items.product_id → products.id
]
```

**Data setup order (insert in this sequence to avoid FK violations):**
1. [TODO: e.g. customers]
2. [TODO: e.g. users]
3. [TODO: e.g. products]
4. [TODO: e.g. orders]
5. [TODO: e.g. order_items]

---

## 5. COMMON QA QUERIES

[TODO: Pre-written queries the DB Query Agent should use. Copy from your existing
test SQL scripts or write new ones. These save agents from guessing column names.]

**Find a valid test record for scenario X:**
```sql
-- [TODO: e.g. Find an open order assigned to a QA user]
SELECT o.id, o.status, o.customer_id, u.username
FROM orders o
JOIN users u ON o.assigned_to = u.id
WHERE o.status = 'submitted'
  AND o.id BETWEEN 90000 AND 99999
ORDER BY o.created_at DESC
LIMIT 1;
```

**Verify data after action Y:**
```sql
-- [TODO: e.g. Verify order was closed successfully]
SELECT id, status, closed_at
FROM orders
WHERE id = :order_id;
-- Expected: status = 'closed', closed_at IS NOT NULL
```

**Cleanup after test run:**
```sql
-- [TODO: e.g. Remove QA test records]
DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE id BETWEEN 90000 AND 99999);
DELETE FROM orders WHERE id BETWEEN 90000 AND 99999;
```

---

## 6. ETL / DATA PIPELINE (if applicable)

[TODO: Fill this section only if your project involves ETL processes, batch jobs, or cloud data pipelines]

| Pipeline / Job | Source | Destination | Schedule | Key Validation Points |
|---------------|--------|------------|---------|----------------------|
| `[TODO: nightly_order_sync]` | [TODO: orders DB] | [TODO: reporting_warehouse] | [TODO: Daily 2am UTC] | [TODO: Row count match, status field mapping] |

**Batch job logs location:** [TODO: e.g. CloudWatch log group `/aws/lambda/order-sync` or `/var/log/etl/`]
**How to trigger manually (QA only):** [TODO: e.g. `aws lambda invoke --function-name order-sync-qa` or "Jenkins job: ETL-Manual-Trigger"]

---

## 7. KNOWN DATA GOTCHAS

[TODO: Things that cause false failures or data surprises]

- [TODO: e.g. "The 'status' column allows NULL in DB but the application always sends an empty string '' — assert both in SQL and UI"]
- [TODO: e.g. "Timestamps are stored in UTC but displayed in Eastern Time in the UI — account for timezone offset in assertions"]
- [TODO: e.g. "Soft-deleted records have deleted_at set — always add 'AND deleted_at IS NULL' to queries"]

---
