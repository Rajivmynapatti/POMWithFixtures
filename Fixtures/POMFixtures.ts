import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";
import { HomePage } from "../Pages/HomePage";
import { CartPage } from "../Pages/CartPage";

type myfixture = {
    loginPage: LoginPage;
    homePage: HomePage;
    cartPage: CartPage;
}

export const test = baseTest.extend<myfixture>({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);

    },
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await use(homePage);

    },

    cartPage: async({page}, use) =>{
        const cartPage = new CartPage(page);
        await use(cartPage);
    }


});