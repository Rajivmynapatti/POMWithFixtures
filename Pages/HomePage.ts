import { type Locator, type Page, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly openMenu: Locator;
    readonly cartIcon: Locator;
    readonly allInventoryItems: Locator;
    readonly itemsName: Locator;

    constructor(page: Page) {

        this.page = page;
        this.openMenu = page.getByRole('button', { name: 'Open Menu' });
        this.cartIcon = page.locator("a.shopping_cart_link");
        this.allInventoryItems = page.locator(".inventory_item");
        this.itemsName = page.locator(".inventory_item .inventory_item_description a");
    }


    async logoutUser() {
    await this.page.waitForLoadState("networkidle");
    await this.openMenu.click();

    const navitems = this.page.locator(".bm-item-list a");
    const count = await navitems.count();

    let clicked = false;
    for (let i = 0; i < count; i++) {
        const itemText = (await navitems.nth(i).textContent())?.trim();
        if (itemText === "Logout") {
            await navitems.nth(i).click();
            clicked = true;
            break;
        }
    }

    if (!clicked) {
        throw new Error('Logout menu item not found');
    }
}

    async addItemsToCart() {
        await this.page.waitForLoadState("networkidle");

        const inventoryDesc = this.page.locator('.inventory_item_description');

        const inventoryLabel = inventoryDesc.locator('.inventory_item_label')
        const productsName = await inventoryLabel.locator("a div").allTextContents();
        console.log(productsName);

        const itemsCount = await inventoryLabel.count();

        for (let i = 0; i < itemsCount; i++) {
            const itemName = await inventoryLabel.nth(i).locator("a div").textContent();

            if (itemName?.trim() === "Sauce Labs Onesie") {
                const addToCartBtn = await inventoryDesc.nth(i).locator("div.pricebar button").textContent();
                expect(addToCartBtn).toBe("Add to cart")


                await inventoryDesc.nth(i).locator("div.pricebar button").click();
                const removeBtn = await inventoryDesc.nth(i).locator("div.pricebar button").textContent();

                expect(removeBtn).toBe("Remove")

                break;
            }
        }

        const cartitemsCount = this.page.locator(".shopping_cart_badge");
        const cartcount = await cartitemsCount.textContent();
        console.log(cartcount);
        expect(cartcount).toContain("1");

        await this.cartIcon.click();
    }

}