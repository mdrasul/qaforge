# QAForge Story Input
# ─────────────────────────────────────────────────────────────────────────────
# Fill in this template, then paste to @QAForge Manager to start a story cycle.
# Required fields are marked [REQUIRED]. Optional fields can be left blank.
# ─────────────────────────────────────────────────────────────────────────────

## STORY IDENTITY

| Field | Value |
|-------|-------|
| **Ticket ID** | [REQUIRED: e.g. PROJ-421] |
| **Story Title** | [REQUIRED: e.g. Event Detail Page — Sticky CTA behavior] |
| **Priority** | [REQUIRED: P0 / P1 / P2] |
| **Sprint** | [Optional: e.g. Sprint 14] |
| **Epic / Feature** | [Optional: e.g. Event Discovery] |

---

## USER STORY

```
As a [role],
I want [capability],
So that [business value].
```

---

## ACCEPTANCE CRITERIA

[REQUIRED: List every AC. Be explicit — vague ACs produce weak test coverage.]

- **AC-01:** [e.g. The Sticky CTA is not visible on initial page load]
- **AC-02:** [e.g. The Sticky CTA becomes visible after user scrolls past the inline CTA]
- **AC-03:** [e.g. The Sticky CTA label matches the API-returned `ctaLabel` field]
- **AC-04:** [e.g. Add: additional ACs here]

---

## SCOPE

**In scope:**
- [ ] UI (browser / web)
- [ ] API (REST / GraphQL)
- [ ] Database / ETL
- [ ] Mobile
- [ ] Accessibility

**Not in scope for this story:** [e.g. Payment flow, user login, mobile breakpoints]

---

## TECH CONTEXT HINTS (optional — override PROJECT_CONTEXT.md for this story only)

**Primary URL / endpoint:** [e.g. https://qa.example.com/events/{id} or /v1/events/{id}]

**Key API fields that drive behavior:**
```
[e.g. ctaLabel, ctaEnabled, presaleDate — these control CTA visibility and text]
```

**Known edge cases or business rules:**
```
[e.g. If ctaEnabled = false, the CTA must be hidden entirely regardless of scroll position]
[e.g. Presale events show a different CTA label than on-sale events]
```

**Test data hints:**
```
[e.g. Use event ID 1001 for on-sale, 1002 for presale, 1003 for CMS-disabled]
[Optional: Leave blank and let Data Resolver find live data]
```

**Devices / breakpoints in scope:**
```
[e.g. Mobile 576px only — desktop is out of scope for this story]
```

---

## LINKS (optional)

| Type | Link |
|------|------|
| Jira story | [URL] |
| Figma / design | [URL] |
| API documentation | [URL] |
| Prior test cases | [URL or Xray Test Plan ID] |

---

## NOTES FOR QA AGENTS

```
[Anything else the agents should know before starting:
 - "The event API is slow in QA — allow 5+ second timeouts"
 - "Login is NOT required for this page — do not test auth"
 - "The modal on this page uses a dynamic class — see UI_CONTEXT.md line 45 for selector strategy"
]
```
