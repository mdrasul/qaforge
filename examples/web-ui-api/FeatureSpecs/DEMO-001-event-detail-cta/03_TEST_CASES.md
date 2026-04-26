# 03 — Test Cases
**Story:** DEMO-001 — Event Detail CTA Button — Status-Driven Behavior
**Produced by:** QAForge Test Case Generator
**Format:** Plain-language (no BDD layer configured — see AUTOMATION_CONTEXT.md)
**Date:** 2026-04-26

---

## Test Suite TS-01 — On-Sale CTA Behavior

**AC covered:** AC-01, AC-04

### TC-01-01 — On-sale event renders "Buy Tickets" inline CTA
**Priority:** P0
**Steps:**
1. Navigate to `/events/evt_onsale_01`
2. Wait for the hero section to be visible
**Expected result:** The inline CTA button (`data-testid="event-cta-button"`) is visible and its label is exactly "Buy Tickets".

---

### TC-01-02 — On-sale sticky CTA appears after scrolling past hero
**Priority:** P0
**Steps:**
1. Navigate to `/events/evt_onsale_01`
2. Confirm sticky CTA is NOT visible before scrolling
3. Scroll to Y=700px
4. Wait 150ms for IntersectionObserver transition
**Expected result:** The sticky CTA (`data-testid="event-cta-sticky"`) is visible and its label is "Buy Tickets".

---

### TC-01-03 — Sticky CTA disappears when user scrolls back to top
**Priority:** P1
**Steps:**
1. Navigate to `/events/evt_onsale_01`
2. Scroll to Y=700px → confirm sticky CTA visible
3. Scroll back to Y=0
4. Wait 150ms
**Expected result:** The sticky CTA is no longer visible.

---

## Test Suite TS-02 — Pre-Sale CTA Behavior

**AC covered:** AC-02, AC-04

### TC-02-01 — Pre-sale event renders "Get Notified" inline CTA
**Priority:** P0
**Steps:**
1. Navigate to `/events/evt_presale_01`
2. Wait for hero section
**Expected result:** Inline CTA is visible. Label is "Get Notified".

---

### TC-02-02 — Clicking "Get Notified" opens the pre-sale modal
**Priority:** P0
**Steps:**
1. Navigate to `/events/evt_presale_01`
2. Click the inline CTA button
**Expected result:** A dialog with the name "Get Notified" is visible.

---

### TC-02-03 — Pre-sale sticky CTA appears after scrolling
**Priority:** P1
**Steps:**
1. Navigate to `/events/evt_presale_01`
2. Scroll to Y=700px
**Expected result:** Sticky CTA is visible. Label is "Get Notified".

---

## Test Suite TS-03 — CMS-Disabled CTA Behavior

**AC covered:** AC-03, AC-04

### TC-03-01 — Disabled event shows no inline CTA
**Priority:** P0
**Steps:**
1. Navigate to `/events/evt_disabled_01`
2. Wait for the page to fully load (hero visible)
**Expected result:** The inline CTA button (`data-testid="event-cta-button"`) is NOT visible.

---

### TC-03-02 — Disabled event shows no sticky CTA after scrolling
**Priority:** P0
**Steps:**
1. Navigate to `/events/evt_disabled_01`
2. Scroll to Y=700px
**Expected result:** The sticky CTA (`data-testid="event-cta-sticky"`) is NOT visible.

---

## Test Suite TS-04 — API Contract Verification

**AC covered:** AC-01, AC-02, AC-03

### TC-04-01 — On-sale event API contract
**Priority:** P1
**Steps:**
1. Send `GET /v1/events/evt_onsale_01` with valid auth token
**Expected result:** HTTP 200. Response body has `status: "on_sale"` and `cta_disabled: false`.

---

### TC-04-02 — Pre-sale event API contract
**Priority:** P1
**Steps:**
1. Send `GET /v1/events/evt_presale_01` with valid auth token
**Expected result:** HTTP 200. Response body has `status: "presale"` and `cta_disabled: false`.

---

### TC-04-03 — Disabled event API contract
**Priority:** P1
**Steps:**
1. Send `GET /v1/events/evt_disabled_01` with valid auth token
**Expected result:** HTTP 200. Response body has `cta_disabled: true`.

---

### TC-04-04 — Non-existent event returns 404
**Priority:** P2
**Steps:**
1. Send `GET /v1/events/evt_does_not_exist` with valid auth token
**Expected result:** HTTP 404.

---

## Coverage Matrix

| SC ID | Test Suite | Test Case(s) | AC Covered | Priority |
|-------|-----------|-------------|-----------|---------|
| SC-01 | TS-01 | TC-01-01 | AC-01 | P0 |
| SC-02 | TS-01 | TC-01-02 | AC-01, AC-04 | P0 |
| SC-03 | TS-01 | TC-01-03 | AC-04 | P1 |
| SC-04 | TS-02 | TC-02-01 | AC-02 | P0 |
| SC-05 | TS-02 | TC-02-02 | AC-02 | P0 |
| SC-06 | TS-02 | TC-02-03 | AC-02, AC-04 | P1 |
| SC-07 | TS-03 | TC-03-01 | AC-03 | P0 |
| SC-08 | TS-03 | TC-03-02 | AC-03, AC-04 | P0 |
| SC-09 | TS-04 | TC-04-01 | AC-01 | P1 |
| SC-10 | TS-04 | TC-04-02 | AC-02 | P1 |
| SC-11 | TS-04 | TC-04-03 | AC-03 | P1 |
| SC-12 | TS-04 | TC-04-04 | (integrity) | P2 |
