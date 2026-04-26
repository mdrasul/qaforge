# API_CONTEXT.md
# ─────────────────────────────────────────────────────────────────────────────
# QAForge Context File — API & Web Services Layer
# TIER 2 — CONDITIONAL. Required only if testing API endpoints.
# ─────────────────────────────────────────────────────────────────────────────
#
# HOW TO USE:
#   Copy to your project root as API_CONTEXT.md and fill in all [TODO] fields.
#   If you have a Swagger/OpenAPI spec, reference it below — the Discoverer
#   agent can extract most of this automatically from swagger.json / openapi.yaml.
# ─────────────────────────────────────────────────────────────────────────────

---

## 1. API IDENTITY

| Field | Value |
|-------|-------|
| **API Name** | [TODO: e.g. "Task Manager REST API v3"] |
| **Base URL (QA)** | [TODO: e.g. `https://qa.api.example.com/v3`] |
| **Base URL (Prod)** | [TODO: e.g. `https://api.example.com/v3`] |
| **API Format** | [TODO: REST / GraphQL / SOAP / gRPC] |
| **API Spec File** | [TODO: path or URL to swagger.json / openapi.yaml, or "None"] |
| **Postman Collection** | [TODO: path to .json file, or "None"] |

---

## 2. AUTHENTICATION

| Field | Value |
|-------|-------|
| **Auth Type** | [TODO: Bearer Token / API Key / OAuth2 / OKTA / Basic / None] |
| **Token Source** | [TODO: e.g. "POST /auth/login with user credentials" or "Static token in .env"] |
| **Token Header** | [TODO: e.g. `Authorization: Bearer <token>` or `X-API-Key: <key>`] |
| **Token Expiry** | [TODO: e.g. "1 hour" / "24 hours" / "Never"] |
| **How to refresh** | [TODO: e.g. "POST /auth/refresh with refresh_token" or "Re-login"] |

**Test credentials for API (QA environment):**
```
[TODO: e.g.
Username: qa-test-user@example.com
Password: stored in .env as QA_API_PASSWORD
Token: stored in .env as QA_API_TOKEN
]
```

---

## 3. ENDPOINTS UNDER TEST

[TODO: List every endpoint relevant to QA testing. Add rows as needed.]

| Endpoint | Method | Purpose | Auth Required | Key Request Fields | Key Response Fields |
|----------|--------|---------|--------------|-------------------|-------------------|
| `[TODO: /v3/orders]` | GET | [TODO: List all orders] | [TODO: Yes] | [TODO: status, page, limit] | [TODO: orders[], total, page] |
| `[TODO: /v3/orders/{id}]` | GET | [TODO: Get single order] | [TODO: Yes] | [TODO: id (path)] | [TODO: id, status, created_at, items[]] |
| `[TODO: /v3/orders]` | POST | [TODO: Create new order] | [TODO: Yes] | [TODO: customer_id, product_id, quantity] | [TODO: id, status, created_at] |
| `[TODO: /v3/orders/{id}/submit]` | PUT | [TODO: Submit order for processing] | [TODO: Yes] | [TODO: id (path), notes] | [TODO: id, status: "submitted"] |

---

## 4. KEY RESPONSE FIELDS & BUSINESS LOGIC

[TODO: For each important field that drives UI behavior or business rules, explain it here.
This is what helps the Test Case Generator write correct assertions.]

| Field | Type | Values / Range | What it controls |
|-------|------|---------------|-----------------|
| `[TODO: status]` | string | [TODO: "draft" \| "submitted" \| "approved" \| "rejected"] | [TODO: Controls which actions are available in the UI] |
| `[TODO: enable_feature_x]` | boolean | true / false | [TODO: CMS toggle — when false, feature is hidden] |
| `[TODO: user_role]` | string | [TODO: "admin" \| "user" \| "readonly"] | [TODO: Controls visible menu items and edit permissions] |

---

## 5. ERROR HANDLING PATTERNS

[TODO: How does the API signal errors? What status codes and error shapes does it use?]

| Scenario | HTTP Status | Response shape |
|----------|------------|---------------|
| [TODO: Not found] | [TODO: 404] | `[TODO: { error: "NOT_FOUND", message: "..." }]` |
| [TODO: Unauthorized] | [TODO: 401] | `[TODO: { error: "UNAUTHORIZED" }]` |
| [TODO: Validation error] | [TODO: 400] | `[TODO: { error: "VALIDATION_ERROR", fields: [...] }]` |
| [TODO: Server error] | [TODO: 500] | `[TODO: { error: "INTERNAL_ERROR" }]` |

---

## 6. RATE LIMITS & THROTTLING

[TODO: Are there rate limits that will affect test execution?]

- Rate limit: [TODO: e.g. "100 requests/minute per API key" or "None"]
- Burst limit: [TODO: e.g. "20 concurrent requests" or "None"]
- **Test execution impact:** [TODO: e.g. "Run API test suites serially — parallel runs hit rate limit"]

---

## 7. KNOWN API QUIRKS & GOTCHAS

[TODO: Things that will cause false failures if agents don't know about them]

- [TODO: e.g. "The /events endpoint returns events sorted by date DESC but the API docs say ASC — use DESC in assertions"]
- [TODO: e.g. "The `presale` field returns null when there's no presale — not false or absent — null is the truthy check"]
- [TODO: e.g. "QA environment data resets every Sunday at 2am — tests relying on persistent data will fail Monday morning"]

---
