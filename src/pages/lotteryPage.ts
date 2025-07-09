import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";

export default class LotteryPage {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private get Elements() {
        return {
            emptyLotteryLbl: this.page.locator('main p'),
            lotteryList: this.page.locator('ul[class^="LotteryHistoryScreen_list"]'),
            addLotteryToCartBtn: this.page.locator('ul[class^="LotteryHistoryScreen_list"] li button'),
            cartItem: this.page.locator('li > div[class^="CartItemNormal"]'),
            backBtn: this.page.locator('a[class*="MainSection_backButton"]'),
            deleteLotteryItemBtn: this.page.locator('button[class*="CartItemNormal_deleteButton"]'),
            emptyCartTextBbl: this.page.locator('p[class^="CartSection_noItemText"]'),
            checkoutBtn: this.page.locator('button[class*="MainSection_goButton"]'),
        };
    }

    async navigateToLotteryPage() {
        await this.base.goto(process.env.LOTTERY_URL);
    }

    async emptyLotteryDisplay(text: string) {
        await expect(this.Elements.emptyLotteryLbl).toHaveText(text);
    }

    async verifyLotteryDisplay() {
        await expect(this.Elements.lotteryList).toBeVisible();
    }

    async addLotteryToCart(): Promise<void> {
        await this.Elements.addLotteryToCartBtn.click();
        await this.base.waitAndClick(this.Elements.addLotteryToCartBtn);
    }

    async addLotterySuccess(): Promise<void> {
        await this.page.waitForURL('**/lottery_cart');
        await expect(this.Elements.cartItem).toBeVisible({ timeout: 10000 });
    }

}
