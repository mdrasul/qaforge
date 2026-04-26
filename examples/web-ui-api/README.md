# EventHub — QAForge Web UI + API Demo

This is the **reference implementation** for QAForge. It shows a complete, working QAForge deployment on a fictional web application called **EventHub** — an event listing and ticketing platform.

Use this example to:
- See what filled context files look like
- Understand the full artifact sequence (01 → 08)
- Copy the test structure into your own project
- Verify QAForge is working after you deploy it

---

## What EventHub tests

**Feature under test:** Event Detail Page — CTA Button Status-Driven Behavior

The EventHub Event Detail page shows a "Buy Tickets" or "Get Notified" CTA button depending on
the event's API status. The button also becomes sticky after the user scrolls past the hero
section. When a CMS `disabled` flag is set, no button is shown at all.

**Three test scenarios:**
| Scenario | API status | Expected CTA |
|----------|-----------|-------------|
| On-sale event | `on_sale` | "Buy Tickets" — sticky on scroll |
| Pre-sale event | `presale` | "Get Notified" — opens modal |
| CMS-disabled event | `disabled` | No CTA rendered |

---

## How to run this example

### Prerequisites
- Node.js 20+
- VS Code with GitHub Copilot (agent mode)

### Install dependencies
```bash
cd examples/web-ui-api
npm install
npx playwright install --with-deps chromium
```

### Run the example specs
```bash
npx playwright test
```

### Run a full QAForge story cycle
1. Open this folder in VS Code
2. Open the qaforge root folder in VS Code — agents are already in `.github/agents/`
3. Open Copilot Chat in agent mode
4. Call `@QAForge Manager` with any story — see `FeatureSpecs/DEMO-001-event-detail/01_STORY_INPUT.md` for the reference story

---

## What's in this folder

```
examples/web-ui-api/
├── PROJECT_CONTEXT.md          ← Filled project context (EventHub)
├── AUTOMATION_CONTEXT.md       ← Playwright + TypeScript config
├── API_CONTEXT.md              ← EventHub REST API reference
├── UI_CONTEXT.md               ← Event Detail page layout + selectors
├── playwright.config.ts        ← Playwright configuration
├── package.json                ← Dependencies (Playwright only)
├── .github/
│   └── agents/                 ← Copy your QAForge agents here
├── tests/
│   ├── ui/
│   │   ├── specs/event-detail/ ← Spec files
│   │   ├── pages/              ← Page Object Model
│   │   └── fixtures/           ← Fixture setup
│   └── api/
│       ├── clients/            ← Typed API client
│       └── utils/              ← Global setup
└── FeatureSpecs/
    └── DEMO-001-event-detail/  ← Example QAForge artifact set (01–08)
```
