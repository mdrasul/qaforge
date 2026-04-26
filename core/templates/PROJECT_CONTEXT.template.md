# PROJECT_CONTEXT.md
# ─────────────────────────────────────────────────────────────────────────────
# QAForge Context File — Project Identity & Business Rules
# TIER 1 — REQUIRED. Agents will not run without this file.
# ─────────────────────────────────────────────────────────────────────────────
#
# HOW TO USE THIS TEMPLATE:
#   1. Copy this file to your project root and rename it PROJECT_CONTEXT.md
#   2. Replace every [TODO: ...] placeholder with your real values
#   3. Remove these comment lines (lines starting with #) when done
#   4. Run @QAForge Context Validator to confirm completeness
#
# ─────────────────────────────────────────────────────────────────────────────

---

## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project Name** | [TODO: e.g. "Task Manager — Web Application"] |
| **Jira Project Key** | [TODO: e.g. "TASK"] |
| **Team / Squad Name** | [TODO: e.g. "Platform QA Team"] |
| **Company / Client** | [TODO: e.g. "Internal Platform"] |
| **QA Engineer(s)** | [TODO: Your name] |
| **Last Updated** | [TODO: YYYY-MM-DD] |

---

## 2. APPLICATION OVERVIEW

**What does this application do?**
[TODO: 2–4 sentences. What is it? Who uses it? What is the core workflow?
Example: "A web-based task management application for software teams. Users create
projects, assign tasks, track progress through a board view, and generate status
reports. The system supports multiple user roles with different permission levels."]

**Application Type:**
- [ ] Web UI (browser)
- [ ] Mobile (iOS / Android)
- [ ] REST API only
- [ ] Cloud / serverless pipeline
- [ ] Desktop application
- [ ] Mixed (check all that apply)

**Production URL:** `[TODO: https://app.example.com]`
**QA / Staging URL:** `[TODO: https://qa.app.example.com]`
**Dev / Local URL:** `[TODO: http://localhost:3000]`

---

## 3. TECH STACK

| Layer | Technology |
|-------|-----------|
| Frontend | [TODO: e.g. React 18 / Angular / Vue / ASP.NET MVC / None] |
| Backend | [TODO: e.g. Node.js Express / Spring Boot / .NET 6 / Django] |
| API Format | [TODO: e.g. REST JSON / GraphQL / SOAP / gRPC] |
| Authentication | [TODO: e.g. OAuth2 / OKTA SSO / JWT / API Key / None] |
| Database | [TODO: e.g. PostgreSQL 14 / Oracle 19c / SQL Server 2019 / MongoDB] |
| Cloud / Infra | [TODO: e.g. AWS (ECS, RDS, S3) / Azure / GCP / On-prem / None] |
| Test Runner | [TODO: e.g. Playwright / Selenium WebDriver / NUnit / pytest] |
| Test Language | [TODO: e.g. TypeScript / Java / C# / Python] |
| CI/CD | [TODO: e.g. GitHub Actions / Jenkins / Azure DevOps / None] |

---

## 4. ENVIRONMENTS

| Environment | URL | Purpose | Auth Required |
|-------------|-----|---------|---------------|
| Production | `[TODO]` | Smoke testing only | [TODO: Yes/No] |
| QA / Staging | `[TODO]` | Full test execution | [TODO: Yes/No] |
| Dev / Local | `[TODO]` | Developer testing | [TODO: Yes/No] |

**VPN Required?** [TODO: Yes — [name of VPN] / No]
**How to obtain test credentials:** [TODO: e.g. "Stored in team 1Password vault under 'QA Test Accounts'"]

---

## 5. USER ROLES & TEST ACCOUNTS

[TODO: List every user role that matters for testing. Include test account IDs or usernames if static.]

| Role Name | Permission Level | Test User ID / Username | Notes |
|-----------|-----------------|------------------------|-------|
| [TODO: e.g. Admin] | [TODO: Full access] | [TODO: testadmin@qa.com] | [TODO: any notes] |
| [TODO: e.g. Standard User] | [TODO: Read + create] | [TODO: testuser@qa.com] | |
| [TODO: e.g. Read Only] | [TODO: View only] | [TODO: readonly@qa.com] | |

---

## 6. KEY FEATURES / MODULES UNDER TEST

[TODO: List the parts of the application that QA tests. Be specific.]

| Feature / Module | Description | Priority |
|-----------------|-------------|---------|
| [TODO: e.g. Order Creation] | [TODO: Create new field survey orders] | [TODO: P0] |
| [TODO: e.g. Billing Workflow] | [TODO: Close orders and generate invoices] | [TODO: P0] |
| [TODO: e.g. User Management] | [TODO: Create, edit, deactivate users] | [TODO: P1] |

---

## 7. BUSINESS RULES — CRITICAL

[TODO: This is the most important section. Write the rules agents MUST know to write correct tests.
Bad context here = wrong tests. Take time on this section.]

**Example format:**
- Rule BR-01: [Condition] → [Expected behavior]
- Rule BR-02: ...

[TODO: Write your business rules here. Examples:]
- Rule BR-01: [TODO: e.g. "An order cannot be submitted if the customer has an outstanding unpaid invoice"]
- Rule BR-02: [TODO: e.g. "Admin users can view all orders; Standard users can only view orders they created"]
- Rule BR-03: [TODO: Add as many as needed]

**Known edge cases / gotchas:**
[TODO: e.g. "The billing workflow has a 24-hour cooling-off period — tests that check billing status immediately after order creation will fail"]

---

## 8. OUT OF SCOPE

[TODO: What does QA explicitly NOT test for this project?]

- [TODO: e.g. "Third-party payment gateway — tested by vendor"]
- [TODO: e.g. "Mainframe batch jobs — covered by separate ETL QA team"]

---

## 9. DEPENDENCIES & INTEGRATIONS

[TODO: What external systems does this app integrate with?]

| System | Type | Tested in QA? | Notes |
|--------|------|--------------|-------|
| [TODO: e.g. Stripe] | [TODO: Payment processing API] | [TODO: Yes/No/Mocked] | |
| [TODO: e.g. SendGrid] | [TODO: Transactional email] | [TODO: No — sandbox only] | |

---
