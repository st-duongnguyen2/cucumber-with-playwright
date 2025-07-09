import {Given, When, Then, setDefaultTimeout} from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import LotteryPage from '../../pages/lotteryPage';

let lotteryPage: LotteryPage;

setDefaultTimeout(30000);

Given('User goto Lottery Page', async function () {
    lotteryPage = new LotteryPage(fixture.page);
    await lotteryPage.navigateToLotteryPage();
});
Then('User should see empty lottery display {string}', async function (text: string) {
    await lotteryPage.emptyLotteryDisplay(text);
});
Then('User should see lottery display', async function () {
    await lotteryPage.verifyLotteryDisplay();
});
When('User process checkout', async function () {
    await lotteryPage.addLotteryToCart();
});
Then('User should see add lottery to cart successfully', async function () {
    await lotteryPage.addLotterySuccess();
});
