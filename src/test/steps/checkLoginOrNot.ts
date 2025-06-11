import { Given, Then, When } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { expect } from '@playwright/test';
import LoginPage from '../../pages/loginPage';

let loginPage: LoginPage;

Given('user go to secure page', async function () {
    loginPage = new LoginPage(fixture.page);
    await loginPage.navigateToLoginPage();
    await loginPage.loginUser('standard_user', 'secret_sauce');
    //await fixture.page.goto('https://www.saucedemo.com/inventory.html');
});
Then('user able to login page display success', async function () {
    expect(fixture.page.url()).toMatch('https://the-internet.herokuapp.com/secure');
});
