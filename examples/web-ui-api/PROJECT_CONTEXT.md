---
## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project Name** | EventHub — Event Listing & Ticketing Platform |
| **Ticket Prefix** | EVHB |
| **Team / Squad Name** | Platform QA Team |
| **Company / Client** | EventHub Inc. (fictional demo project) |
| **QA Engineer(s)** | QAForge Demo User |
| **Last Updated** | 2026-04-26 |

---

## 2. APPLICATION OVERVIEW

**What does this application do?**
EventHub is a web-based event listing and ticketing platform. Fans browse upcoming events, view event detail pages with ticket pricing and availability, and purchase tickets or register pre-sale interest. The platform integrates with a ticketing inventory API and uses CMS-controlled feature flags to govern CTA button behavior on event detail pages.

**Application Type:**
- [x] Web UI (browser)
- [ ] Mobile (iOS / Android)
- [x] REST API (backend consumed by frontend)
- [ ] Cloud / serverless pipeline
- [ ] Desktop application

**Production URL:** `https://eventhub.io`
**QA / Staging URL:** `https://qa.eventhub.io`
**Dev / Local URL:** `http://localhost:3000`

---

## 3. KEY BUSINESS RULES

1. An event CTA button has three possible states driven by the API `status` field:
   - `on_sale` → Button shows "Buy Tickets" and links to checkout
   - `presale` → Button shows "Get Notified" and opens a registration modal
   - `disabled` → No CTA button is rendered on the page
2. The CTA button becomes **sticky** (fixed position) after the user scrolls past the hero section (first 600px). It resets to inline when the user scrolls back to the top.
3. Ticket prices are displayed in USD. Currency conversion is NOT in scope for this demo.
4. A user must be logged in to complete ticket purchase. Guest checkout is not supported.
5. Events with `status: disabled` must have NO purchaseable path — not even a hidden one.

---

## 4. TEST ENVIRONMENTS

| Environment | URL | Notes |
|-------------|-----|-------|
| QA | `https://qa.eventhub.io` | Shared. Reset nightly at 02:00 UTC |
| Staging | `https://staging.eventhub.io` | Release candidate only |
| Local | `http://localhost:3000` | Requires `npm run dev` |
| API (QA) | `https://api.qa.eventhub.io/v1` | Seeded with fixture events |

**Test user credentials:**
| Role | Email | Password |
|------|-------|----------|
| Standard user | `qa-user@eventhub.io` | `[stored in QA vault]` |
| Admin | `qa-admin@eventhub.io` | `[stored in QA vault]` |

---

## 5. TEST MANAGEMENT TOOL

**Tool:** None configured for this demo project.
(Xray XML output is skipped by QAForge Reporter when this field is blank.)

---

## 6. OUT OF SCOPE

- Payment processing and Stripe integration
- Email notification delivery
- Mobile app (separate project)
- Accessibility compliance (tracked separately under EVHB-AXE)
- Multi-currency pricing
