import {chromium} from "@playwright/test";
import * as dotenv from 'dotenv'

const createSection = async function (loginUrl: string, user: string, username: string, password: string) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(loginUrl);
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL('https://www2.starbucks.co.jp/');

    await context.storageState({ path: `src/helper/auth/${user}.json` });

    await browser.close();
};

async function generateAuth(env: string, user: string) {
    dotenv.config({ path: `src/helper/env/.env.${env}` });
    const loginUrl = process.env.LOGIN_URL;
    const userPassword = process.env.USER_PASSWORD;
    const users = {
        emptyLotteryUser : process.env.EMPTY_LOTTERY_USER,
        lotteryUser : process.env.LOTTERY_USER,
    }

    if (user) {
        await createSection(loginUrl, user, users[user], userPassword);
    } else {
        for (let key in users) {
            await createSection(loginUrl, key, users[key], userPassword);
        }
    }
}

const env = process.argv[2] as 'ci' | 'dev' | 'stg' | 'prod' || 'dev';
const user = process.argv[3] || ''; // create all user context if ''

generateAuth(env, user).then(r => {});
