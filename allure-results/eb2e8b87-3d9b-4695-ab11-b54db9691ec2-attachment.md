# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sauceDemo.spec.ts >> Test Login functionality >> verify Cart page and remove items
- Location: tests\sauceDemo.spec.ts:28:9

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('span.shopping_cart_badge')
Expected: not visible
Received: visible

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('span.shopping_cart_badge')

```

# Test source

```ts
  1  | import { type Locator, type Page, expect } from "@playwright/test";
  2  | 
  3  | export class CartPage {
  4  |     readonly page: Page;
  5  |     readonly yourCartTitle: Locator;
  6  |     readonly continueShoppingBtn: Locator;
  7  |     readonly checkoutBtn: Locator;
  8  |     readonly cartBtn: Locator;
  9  |     readonly cartCount: Locator;
  10 | 
  11 |     constructor(page: Page) {
  12 | 
  13 |         this.page = page;
  14 |         this.yourCartTitle = page.getByText("Your Cart");
  15 |         this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
  16 |         this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
  17 |         this.cartBtn = page.locator("a.shopping_cart_link");
  18 |         this.cartCount = page.locator("span.shopping_cart_badge");
  19 |     }
  20 | 
  21 |     async getCartCount() {
  22 |         await this.page.waitForLoadState('networkidle');
  23 |         const count = await this.cartCount.textContent();
  24 |         expect(count).toBe("1");
  25 |     }
  26 | 
  27 |     async getCartPageTitle() {
  28 |         await this.page.waitForLoadState('networkidle');
  29 |         const title = await this.yourCartTitle.textContent();
  30 |         expect(title).toContain("Your Cart");
  31 | 
  32 |     }
  33 | 
  34 |     async clickContinueShoppingBtn() {
  35 |         await this.continueShoppingBtn.click();
  36 | 
  37 |     }
  38 | 
  39 |     async clickCheckoutBtn() {
  40 |         await this.checkoutBtn.click();
  41 |     }
  42 | 
  43 |     async removeItemInCart() {
  44 | 
  45 |         const allItems = this.page.locator(".cart_item");
  46 |         const count = await allItems.count();
  47 | 
  48 |         for (let i = 0; i < count; i++) {
  49 |             const itemName = await allItems.nth(i).locator("a").textContent();
  50 |             if (itemName?.trim() === "Sauce Labs Onesie") {
  51 |                 await allItems.nth(i).locator("div:nth-child(3) button").click();
  52 | 
  53 |             }
  54 |             break;
  55 | 
  56 |         }
  57 | 
> 58 |         expect(await this.cartCount).not.toBeVisible();
     |                                          ^ Error: expect(locator).not.toBeVisible() failed
  59 | 
  60 | 
  61 |     }
  62 | 
  63 | }
```