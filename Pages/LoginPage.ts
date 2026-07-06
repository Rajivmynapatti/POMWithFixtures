import { expect, type Locator, type Page } from '@playwright/test';

const URL = "https://www.saucedemo.com/";
const TITLE = "Swag Labs";
const VALID_USERNAME = "standard_user";
const VALID_PASSWORD = "secret_sauce";
const INVALID_USERNAME= "TEST";
const INVALID_PASSWORD = "TEST";
const EXPECTED_URL = "https://www.saucedemo.com/inventory.html";

export class LoginPage {

    readonly page: Page;
    readonly loginLogo: Locator;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMsg: Locator;


    constructor(page: Page) {
        this.page = page;
        this.loginLogo = page.getByText("Swag Labs");
        this.userNameInput = page.getByRole("textbox", { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: "Password" });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMsg = page.locator("h3[data-test='error']");
    }

    async openbrowserandenterURL() {
        await this.page.goto("https://www.saucedemo.com/");
        expect(await this.page.title()).toBe("Swag Labs");
        const h2 = await this.loginLogo.textContent();
        expect(h2).toContain("Swag Labs");

    }

    async validLogin() {
        await this.userNameInput.fill("standard_user");
        await this.passwordInput.fill("secret_sauce");
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
        expect(this.page).toHaveURL("https://www.saucedemo.com/inventory.html");

    }

    async invalidLogin() {
        await this.userNameInput.fill("TEST");
        await this.passwordInput.fill("TEST");
        await this.loginButton.click();
        await this.errorMsg.isVisible()
        const errorMsg = await this.errorMsg.textContent();
        console.log(errorMsg);

    }

}


