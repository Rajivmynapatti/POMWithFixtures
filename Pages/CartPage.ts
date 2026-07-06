import { type Locator, type Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly yourCartTitle: Locator;
    readonly continueShoppingBtn: Locator;
    readonly checkoutBtn: Locator;
    readonly cartBtn: Locator;
    readonly cartCount: Locator;

    constructor(page: Page) {

        this.page = page;
        this.yourCartTitle = page.getByText("Your Cart");
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
        this.cartBtn = page.locator("a.shopping_cart_link");
        this.cartCount = page.locator("span.shopping_cart_badge");
    }

    async getCartCount() {
        await this.page.waitForLoadState('networkidle');
        const count = await this.cartCount.textContent();
        expect(count).toBe("1");
    }

    async getCartPageTitle() {
        await this.page.waitForLoadState('networkidle');
        const title = await this.yourCartTitle.textContent();
        expect(title).toContain("Your Cart");

    }

    async clickContinueShoppingBtn() {
        await this.continueShoppingBtn.click();

    }

    async clickCheckoutBtn() {
        await this.checkoutBtn.click();
    }

    async removeItemInCart() {

        const allItems = this.page.locator(".cart_item");
        const count = await allItems.count();

        let clicked = false;
        for (let i = 0; i < count; i++) {
            const itemName = await allItems.nth(i).locator("a").textContent();
            if (itemName?.trim() === "Sauce Labs Onesie") {
                await allItems.nth(i).locator("div:nth-child(3) button").click();
                clicked = true;
                break;

            }
            if (!clicked) {
            throw new Error('iteamname  not found');
    }

        }

        await expect(this.cartCount).not.toBeVisible();


    }

}