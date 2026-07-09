import { expect, type Locator, type Page } from '@playwright/test';
import testData from "../TestData/UserData.json";

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
        this.loginLogo = page.getByText(testData.TITLE);
        this.userNameInput = page.getByRole("textbox", { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: "Password" });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMsg = page.locator("h3[data-test='error']");
    }

    async openbrowserandenterURL() {
        await this.page.goto(testData.URL);
        expect(await this.page.title()).toBe(testData.TITLE);
        const h2 = await this.loginLogo.textContent();
        expect(h2).toContain(testData.TITLE);

    }

    async validLogin() {
        await this.userNameInput.fill(testData.VALID_USERNAME);
        await this.passwordInput.fill(testData.VALID_PASSWORD);
        await this.loginButton.click();
        await this.page.waitForLoadState("networkidle");
        expect(this.page).toHaveURL(testData.EXPECTED_URL);

    }

    async invalidLogin() {
        await this.userNameInput.fill(testData.INVALID_USERNAME);
        await this.passwordInput.fill(testData.INVALID_PASSWORD);
        await this.loginButton.click();
        await this.errorMsg.isVisible()
        const errorMsg = await this.errorMsg.textContent();
        console.log(errorMsg);

    }

}


