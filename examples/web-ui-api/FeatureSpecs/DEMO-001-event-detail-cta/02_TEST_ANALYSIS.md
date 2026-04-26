# 02 — Test Analysis
**Story:** DEMO-001 — Event Detail CTA Button — Status-Driven Behavior
**Produced by:** QAForge Story Analyst
**Date:** 2026-04-26

---

## Testable Scenarios

| SC ID | Scenario Description | AC(s) Covered | Priority | Type |
|-------|---------------------|--------------|----------|------|
| SC-01 | On-sale event renders "Buy Tickets" inline CTA | AC-01 | P0 | UI |
| SC-02 | On-sale sticky CTA appears after scroll and shows "Buy Tickets" | AC-01, AC-04 | P0 | UI |
| SC-03 | Sticky CTA disappears when user scrolls back to top | AC-04 | P1 | UI |
| SC-04 | Pre-sale event renders "Get Notified" inline CTA | AC-02 | P0 | UI |
| SC-05 | Clicking "Get Notified" opens the pre-sale modal | AC-02 | P0 | UI |
| SC-06 | Pre-sale sticky CTA appears after scroll and shows "Get Notified" | AC-02, AC-04 | P1 | UI |
| SC-07 | CMS-disabled event renders no inline CTA | AC-03 | P0 | UI |
| SC-08 | CMS-disabled event renders no sticky CTA after scroll | AC-03, AC-04 | P0 | UI |
| SC-09 | API returns `status: on_sale` and `cta_disabled: false` for on-sale event | AC-01 | P1 | API |
| SC-10 | API returns `status: presale` and `cta_disabled: false` for pre-sale event | AC-02 | P1 | API |
| SC-11 | API returns `cta_disabled: true` for disabled event | AC-03 | P1 | API |
| SC-12 | API returns 404 for non-existent event ID | (integrity) | P2 | API |

---

## API Dependencies

| Dependency | Endpoint | Used by |
|-----------|---------|---------|
| Event status | `GET /v1/events/{id}` | All UI scenarios — status drives CTA label |
| Pre-seeded events | QA environment fixture data | All scenarios — use fixture IDs from API_CONTEXT.md |

---

## Ambiguities & Resolutions

| AQ ID | Question | Resolution |
|-------|---------|-----------|
| AQ-01 | What exactly triggers the sticky CTA — scroll position or IntersectionObserver? | Dev confirmed: IntersectionObserver on `data-testid="event-hero"`. Sticky appears when hero exits viewport (scroll Y >= ~600px depending on viewport height). Tests scroll to Y=700 for safety margin. |
| AQ-02 | Does the sticky CTA link to the same destination as the inline CTA? | Yes — both link to checkout or open the pre-sale modal. No separate behavior for sticky. |
| AQ-03 | Is `status: disabled` the same as `cta_disabled: true`? | No — `status` is the ticketing state; `cta_disabled` is a separate CMS override flag. Either one alone is sufficient to suppress the CTA. For these tests, `evt_disabled_01` has `cta_disabled: true`. |

---

## Out of Scope (confirmed)

- Checkout flow (EVHB-010)
- Pre-sale modal form submission (EVHB-012)
- Login flow required to complete purchase (EVHB-005)
- Accessibility compliance (EVHB-AXE)
