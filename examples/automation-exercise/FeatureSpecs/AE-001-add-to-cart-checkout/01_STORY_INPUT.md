# QAForge Story Input

## STORY IDENTITY

| Field | Value |
|-------|-------|
| **Ticket ID** | AE-001 |
| **Story Title** | Add Product to Cart and Complete Checkout |
| **Priority** | P0 |
| **Sprint** | Sprint 1 |
| **Epic / Feature** | Shopping Cart & Checkout |

---

## USER STORY

As a registered user,
I want to search for a product, add it to my cart, and complete the checkout process,
So that I can successfully place an order and receive an order confirmation.

---

## ACCEPTANCE CRITERIA

- **AC-01:** A logged-in user can search for a product by keyword and see matching results on the search results page.
- **AC-02:** The user can add a product from the search results to the cart. A success modal appears confirming the item was added.
- **AC-03:** Navigating to the cart shows the correct product with the expected name and quantity.
- **AC-04:** The user can proceed to checkout from the cart page.
- **AC-05:** The checkout page displays the delivery address associated with the logged-in account.
- **AC-06:** The user can enter payment details (card number, name on card, CVC, expiry month and year) and place the order.
- **AC-07:** After placing the order, the confirmation page displays the message "Congratulations! Your order has been confirmed!"
- **AC-08:** A guest (non-logged-in) user who attempts to proceed to checkout is redirected to the login page.

---

## SCOPE

**In scope:**
- [x] UI (browser / web)
- [x] API (REST)
- [ ] Database / ETL
- [ ] Mobile
- [ ] Accessibility

**Not in scope for this story:** Mobile breakpoints, payment gateway integration, order history retrieval.

---

## TECH CONTEXT HINTS

**Primary URL / endpoint:** https://automationexercise.com/products (search), /view_cart (cart), /checkout (checkout)

**Key API endpoints that support this story:**

    POST https://automationexercise.com/api/verifyLogin    — verify user is authenticated
    POST https://automationexercise.com/api/searchProduct  — search_product param = keyword
    GET  https://automationexercise.com/api/productsList   — full product list for data setup

**Known edge cases or business rules:**

    - BR-01: User must be logged in to proceed to checkout — guest redirects to login
    - BR-02: API responseCode is in the JSON body — NOT the HTTP status code
    - BR-04: Adding the same product twice increments quantity, does not duplicate the row
    - BR-05: Checkout requires 3 steps: address confirmation -> payment entry -> place order
    - BR-07: API POST /searchProduct requires "search_product" form param — missing = responseCode 400
    - Payment fields accept any value — this is a practice app, no real processing

**Test data hints:**

    - Search keyword: "T-Shirt" (returns multiple results — pick the first)
    - Test account: qaforge+demo@gmail.com / QAForge123!
      (update email to match what you registered in PROJECT_CONTEXT.md pre-flight)
    - Payment: Card 4111111111111111 / Name: QAForge Demo / CVC: 123 / Expiry: 12/2027

**Devices / breakpoints in scope:**

    Desktop only (1280x720) — mobile is out of scope for this story
