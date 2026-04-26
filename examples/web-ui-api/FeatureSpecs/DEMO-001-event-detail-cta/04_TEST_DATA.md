# 04 — Test Data
**Story:** DEMO-001 — Event Detail CTA Button — Status-Driven Behavior
**Produced by:** QAForge Data Resolver
**Date:** 2026-04-26

---

## Resolved Test Data

### UI Tests — Pre-seeded Fixture Events

All UI test cases use pre-seeded events in the QA environment. Do not modify these records.

| Test Data Key | Event ID | Status | `cta_disabled` | Used by |
|--------------|---------|--------|---------------|---------|
| On-sale event | `evt_onsale_01` | `on_sale` | `false` | TC-01-01, TC-01-02, TC-01-03 |
| Pre-sale event | `evt_presale_01` | `presale` | `false` | TC-02-01, TC-02-02, TC-02-03 |
| Disabled event | `evt_disabled_01` | `disabled` | `true` | TC-03-01, TC-03-02 |

**Event URLs:**
| Event | QA URL |
|-------|--------|
| On-sale | `https://qa.eventhub.io/events/evt_onsale_01` |
| Pre-sale | `https://qa.eventhub.io/events/evt_presale_01` |
| Disabled | `https://qa.eventhub.io/events/evt_disabled_01` |

---

### API Tests — Auth Token

| Field | Value |
|-------|-------|
| Token location | QA secrets vault → `EVENTHUB_QA_API_TOKEN` |
| Environment variable | `API_TOKEN` (set in globalSetup.ts) |
| Token format | Bearer `eyJ...` (JWT) |
| Token expiry | 24 hours — regenerate from vault before a test run |

---

### API Tests — Endpoint

| Field | Value |
|-------|-------|
| Base URL | `https://api.qa.eventhub.io/v1` |
| Environment variable | `API_BASE_URL` |

---

## Data Setup Verification

Before running the full suite, verify the fixture events are in the expected state:

```bash
# Verify on-sale event
curl -H "Authorization: Bearer $API_TOKEN" \
  https://api.qa.eventhub.io/v1/events/evt_onsale_01 | jq '.status, .cta_disabled'
# Expected: "on_sale" / false

# Verify pre-sale event
curl -H "Authorization: Bearer $API_TOKEN" \
  https://api.qa.eventhub.io/v1/events/evt_presale_01 | jq '.status, .cta_disabled'
# Expected: "presale" / false

# Verify disabled event
curl -H "Authorization: Bearer $API_TOKEN" \
  https://api.qa.eventhub.io/v1/events/evt_disabled_01 | jq '.cta_disabled'
# Expected: true
```

If any event is in the wrong state, the QA environment may have been reset incorrectly.
Contact DevOps to re-seed from `qa-fixtures/events.json`.

---

## Scroll Threshold

| Parameter | Value | Source |
|-----------|-------|--------|
| Scroll Y to trigger sticky CTA | `700px` | UI_CONTEXT.md — hero height ~600px + 100px safety margin |
| Wait after scroll | `150ms` | AUTOMATION_CONTEXT.md — IntersectionObserver + CSS transition time |
