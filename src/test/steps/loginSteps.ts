import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

Given('user go to login page', async function () {
    await fixture.page.goto('https://the-internet.herokuapp.com/login');
    //fixture.logger.info("Navigated to the application")
})
When('user login with validate {string} and {string}', async function ( username: string, password: string ) {
    await fixture.page.locator('#username').fill(username);
    await fixture.page.locator('#password').fill(password);
    await fixture.page.locator('button[type="submit"]').click();
});
Then('user able to login success', async function () {
    expect(fixture.page.url()).toContain('https://the-internet.herokuapp.com/secure');
})
