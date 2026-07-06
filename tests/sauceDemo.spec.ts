import { test } from "../Fixtures/POMFixtures"


test.describe('Test Login functionality', async() => {

    test.beforeEach("Open browser and enter url", async ({ loginPage }) => {
        await loginPage.openbrowserandenterURL();
    })

    test("Test valid login", async ({ loginPage }) => {
        await loginPage.validLogin();
    })

    test("Test invalid login", async ({ loginPage }) => {

        await loginPage.invalidLogin();
    })


    test("Login and logout", async ({ loginPage, homePage }) => {

        await loginPage.validLogin();
        await homePage.addItemsToCart();
        await homePage.logoutUser();

    });

    test("verify Cart page and remove items", async ({ loginPage, homePage, cartPage }) => {

        await loginPage.validLogin();
        await homePage.addItemsToCart();
        await cartPage.getCartPageTitle();
        await cartPage.getCartCount();
        await cartPage.removeItemInCart();


    })

})