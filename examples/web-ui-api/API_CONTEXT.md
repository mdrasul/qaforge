---
## API CONTEXT — EventHub Demo Project

---

## 1. API OVERVIEW

| Field | Value |
|-------|-------|
| **API Type** | REST |
| **Base URL (QA)** | `https://api.qa.eventhub.io/v1` |
| **Base URL (local)** | `http://localhost:3001/v1` |
| **Auth mechanism** | Bearer token in `Authorization` header |
| **Token source** | `process.env.API_TOKEN` (set per environment) |
| **Content-Type** | `application/json` |
| **API docs** | `https://api.qa.eventhub.io/docs` (Swagger) |

---

## 2. KEY ENDPOINTS

### GET /events
Returns a paginated list of events.

**Response shape:**
```json
{
  "data": [
    {
      "id": "evt_001",
      "title": "Midnight Echoes World Tour",
      "status": "on_sale",
      "date": "2026-06-15",
      "venue": "Madison Square Garden"
    }
  ],
  "meta": { "total": 42, "page": 1, "per_page": 20 }
}
```

---

### GET /events/{id}
Returns full event detail including CTA state.

**Response shape:**
```json
{
  "id": "evt_001",
  "title": "Midnight Echoes World Tour",
  "status": "on_sale",
  "cta_disabled": false,
  "price_from_usd": 45.00,
  "description": "...",
  "venue": {
    "name": "Madison Square Garden",
    "city": "New York",
    "country": "US"
  }
}
```

**Status field values:**
| Value | Meaning | Expected CTA |
|-------|---------|-------------|
| `on_sale` | Tickets available now | "Buy Tickets" |
| `presale` | Pre-registration open | "Get Notified" |
| `disabled` | No ticket path (CMS flag) | No CTA rendered |

---

## 3. TEST FIXTURE EVENT IDs

Pre-seeded in QA environment. Do not modify these records.

| Event ID | Status | Title |
|----------|--------|-------|
| `evt_onsale_01` | `on_sale` | Midnight Echoes World Tour |
| `evt_presale_01` | `presale` | The Velvet Frequency — Spring Tour |
| `evt_disabled_01` | `disabled` | Archive Event (CMS disabled) |

---

## 4. ERROR RESPONSES

| HTTP Status | Meaning | When it occurs |
|-------------|---------|----------------|
| 400 | Bad Request | Malformed event ID |
| 401 | Unauthorized | Missing or expired token |
| 404 | Not Found | Event ID does not exist |
| 429 | Rate Limited | More than 100 req/min per token |
| 500 | Server Error | Upstream ticketing system down |

---

## 5. RATE LIMITS

- 100 requests per minute per API token
- QA test suites must not exceed this limit without retry logic
- Parallel test workers should use separate tokens where possible
