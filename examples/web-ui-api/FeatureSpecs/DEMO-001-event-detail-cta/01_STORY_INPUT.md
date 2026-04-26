# 01 — Story Input
**Story:** DEMO-001 — Event Detail CTA Button — Status-Driven Behavior
**Submitted by:** QAForge Demo User
**Date:** 2026-04-26

---

## User Story

**As a** fan browsing EventHub,
**I want** the Event Detail page CTA button to reflect the current ticket sale status,
**So that** I know whether I can buy tickets, register for pre-sale, or if no ticket option is currently available.

---

## Acceptance Criteria

| AC ID | Acceptance Criterion |
|-------|---------------------|
| AC-01 | When an event has `status: on_sale`, the CTA button displays "Buy Tickets" |
| AC-02 | When an event has `status: presale`, the CTA button displays "Get Notified" and clicking it opens the pre-sale registration modal |
| AC-03 | When an event has `cta_disabled: true`, no CTA button is rendered on the page |
| AC-04 | The CTA button becomes sticky (fixed position) after the user scrolls past the hero section |

---

## Scope

- [x] UI (browser — Event Detail page)
- [x] API (event status field drives UI behavior)
- [ ] Database
- [ ] Mobile
- [ ] Accessibility

**Automation in scope:** YES — Playwright + TypeScript (see AUTOMATION_CONTEXT.md)

---

## Tech Context Hints

- API endpoint: `GET /v1/events/{id}` — `status` and `cta_disabled` fields drive CTA
- Key UI elements: `data-testid="event-cta-button"` (inline), `data-testid="event-cta-sticky"` (sticky)
- Scroll threshold: sticky CTA appears when scroll Y >= 600px (hero section height)
- Pre-seeded test event IDs: `evt_onsale_01`, `evt_presale_01`, `evt_disabled_01`

---

## Links

- Jira: EVHB-001
- Figma: (fictional — not linked)
- API docs: `https://api.qa.eventhub.io/docs`
