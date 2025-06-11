import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class LoginPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        userInput: 'input[placeholder="Username"]',
        passwordInput: 'input[placeholder="Password"]',
        loginBtn: 'input[type="submit"]',
    }

    async navigateToLoginPage() {
        await this.base.goto('https://www.saucedemo.com/inventory.html');
        await expect(this.page).toHaveTitle('Swag Labs');
    }
    async enterUserName(user: string) {
        await this.page.locator(this.Elements.userInput).fill(user);
    }
    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    async loginUser(user: string, password: string) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}
