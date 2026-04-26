---

## 1. PROJECT IDENTITY

| Field | Value |
|-------|-------|
| **Project Name** | Automation Exercise — E-Commerce Web App |
| **Jira Project Key** | AE |
| **Team / Squad Name** | QAForge Demo Team |
| **Company / Client** | AutomationExercise.com (Public Practice App) |
| **QA Engineer(s)** | Demo QA Engineer |
| **Last Updated** | 2026-04-26 |

---

## 2. APPLICATION OVERVIEW

**What does this application do?**
Automation Exercise is a fully functional e-commerce web application built specifically for QA automation practice. Users can browse products by category and brand, search for products, add items to a cart, and complete a checkout with shipping and payment details. The platform supports user account registration, login, and account management. A documented REST API is available for backend-level testing alongside the web UI.

**Application Type:**
- [x] Web UI (browser)
- [x] REST API only

**Production URL:** `https://automationexercise.com`
**QA / Staging URL:** `https://automationexercise.com`
**API Base URL:** `https://automationexercise.com/api`
**Dev / Local URL:** Not applicable — using hosted environment

---

## 3. TECH STACK

| Layer | Technology |
|-------|-----------|
| Frontend | HTML / JavaScript (server-rendered + jQuery) |
| Backend | Not disclosed (hosted service) |
| API Format | REST — responses return JSON with `responseCode` + `message` / `products` fields |
| Authentication | Form-based login for UI; email + password parameters for API |
| Database | Not directly accessible — API layer only |
| Cloud / Infra | Hosted — no cloud access needed |
| Test Runner | Playwright |
| Test Language | TypeScript |
| CI/CD | Not yet configured |

---

## 4. ENVIRONMENTS

| Environment | URL | Purpose | Auth Required |
|-------------|-----|---------|---------------|
| Production / Demo | `https://automationexercise.com` | Full UI + API test execution | Yes (for account & checkout flows) |
| API | `https://automationexercise.com/api` | API-level verification | Yes (email + password as form params) |

**VPN Required?** No
**How to obtain test credentials:** Register a fresh account before running. See §5 and pre-flight instructions below.

---

## 5. USER ROLES & TEST ACCOUNTS

| Role Name | Permission Level | Test Username / Email | Notes |
|-----------|-----------------|----------------------|-------|
| Registered User | Full access — browse, cart, checkout, account management | `qaforge+demo@gmail.com` / password: `QAForge123!` | See pre-flight note below |
| Guest / Anonymous | Browse products and view details only | No credentials needed | Cannot checkout or manage account |

> **⚠ PRE-FLIGHT — Do this once before running tests:**
> This is a shared public site. Register a fresh account before each demo to guarantee clean state.
> Use the `+` alias trick so email delivers to your inbox: `qaforge+demo@gmail.com`, `qaforge+run2@gmail.com`, etc.
>
> Register via API (run in terminal):
> ```bash
> curl -s -X POST "https://automationexercise.com/api/createAccount" \
>   -H "Content-Type: application/x-www-form-urlencoded" \
>   --data-urlencode "name=QAForge Demo" \
>   --data-urlencode "email=qaforge+demo@gmail.com" \
>   --data-urlencode 'password=QAForge123!' \
>   --data-urlencode "title=Mr" \
>   --data-urlencode "birth_date=1" \
>   --data-urlencode "birth_month=1" \
>   --data-urlencode "birth_year=1990" \
>   --data-urlencode "firstname=QAForge" \
>   --data-urlencode "lastname=Demo" \
>   --data-urlencode "company=QAForge" \
>   --data-urlencode "address1=123 Test Street" \
>   --data-urlencode "address2=Suite 1" \
>   --data-urlencode "country=United States" \
>   --data-urlencode "zipcode=10001" \
>   --data-urlencode "state=New York" \
>   --data-urlencode "city=New York" \
>   --data-urlencode "mobile_number=5555555555"
> # Expected: {"responseCode": 201, "message": "User created!"}
> ```
>
> Verify:
> ```bash
> curl -s -X POST "https://automationexercise.com/api/verifyLogin" \
>   --data-urlencode "email=qaforge+demo@gmail.com" \
>   --data-urlencode 'password=QAForge123!'
> # Expected: {"responseCode": 200, "message": "User exists!"}
> ```
> Then update the email in this file and in `01_STORY_INPUT.md` test data hints to match.

---

## 6. KEY FEATURES / MODULES UNDER TEST

| Feature / Module | Description | Priority |
|-----------------|-------------|---------|
| User Registration | Create new account with name, email, password, address details | P0 |
| User Login / Logout | Authenticate via form (UI) or API | P0 |
| Product Listing | Browse all products; filter by category and brand | P0 |
| Product Search | Search by keyword — results shown in grid | P0 |
| Product Detail | View product name, price, category, availability, image | P1 |
| Add to Cart | Add product from listing or detail page; quantity control | P0 |
| Cart Management | View cart, update quantities, remove items | P1 |
| Checkout Flow | Enter address, review order, enter payment, place order | P0 |
| Order Confirmation | Confirm order placed successfully with confirmation message | P0 |
| Account Detail | View account name, address, and profile info | P1 |
| Contact Us Form | Submit message via contact form | P2 |

---

## 7. BUSINESS RULES — CRITICAL

- Rule BR-01: A user must be logged in to proceed to checkout. Guest users are redirected to the login page from the cart.
- Rule BR-02: The API returns `responseCode: 200` on success. Error responses return a non-200 `responseCode` with a `message` field — NOT standard HTTP error codes. Always assert the JSON `responseCode` field, not the HTTP status.
- Rule BR-03: Product search is case-insensitive. Searching "T-SHIRT" and "t-shirt" return the same results.
- Rule BR-04: Adding the same product to the cart increments the quantity — it does not add a duplicate row.
- Rule BR-05: The checkout flow requires 3 steps: (1) delivery address confirmation, (2) payment details entry, (3) place order. All 3 must complete for an order to be placed.
- Rule BR-06: API `POST /api/verifyLogin` requires both `email` and `password` as form parameters. Missing either returns `responseCode: 400`.
- Rule BR-07: `GET /api/productsList` returns all products. `POST /api/searchProduct` with `search_product` parameter returns filtered results. Missing `search_product` returns `responseCode: 400`.
- Rule BR-08: Category navigation uses a left sidebar. Clicking a subcategory (e.g. Women > Tops) filters the product grid to that category only.

**Known edge cases / gotchas:**
- The site contains ads and iframes. Use strict role-based locators — avoid position-based selectors.
- Payment fields accept any values — no real payment processing. Use card `4111111111111111`, CVC `123`, expiry `12/2027`.
- Order confirmation success assertion: `"Congratulations! Your order has been confirmed!"`
- API responses are always HTTP 200 at transport level. Check `responseCode` inside the JSON body.
- This is a shared public site — always use a fresh `+` alias email for each demo run.

---

## 8. OUT OF SCOPE

- Real payment processing (no actual transactions occur)
- Email delivery / order notification emails
- Admin / back-office management features
- Performance and load testing

---

## 9. DEPENDENCIES & INTEGRATIONS

| System | Type | Tested in QA? | Notes |
|--------|------|--------------|-------|
| AutomationExercise REST API | Core API — 14 endpoints | Yes | Base: `https://automationexercise.com/api` — full list at `https://automationexercise.com/api_list` |
