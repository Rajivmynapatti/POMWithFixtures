import { test as base, Page } from "@playwright/test";
import { LoginPage } from "../Pages/LoginPage";

type newFixture = {
    newPage: LoginPage;
}

export const test = base.extend<newFixture>({

    newPage: async({ page}, use)=>{

        const newPage = new LoginPage(page);
        await use(newPage);
    },
});