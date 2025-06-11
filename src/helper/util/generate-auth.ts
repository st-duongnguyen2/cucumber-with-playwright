import {chromium, expect} from "@playwright/test";
import * as dotenv from 'dotenv'

async function generateAuth(env: string) {
    dotenv.config({ path: `src/helper/env/.env.${env}` });

    const username = process.env.USERNAME;
    const password = process.env.USERPASSWORD;
    const baseUrl = process.env.BASEURL;

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseUrl);

    await page.locator('input[placeholder="Username"]').fill(username);
    await page.locator('input[placeholder="Password"]').fill(password);
    await page.locator('input[type="submit"]').click();
    expect(page.url()).toMatch('https://www.saucedemo.com/inventory.html');

    await context.storageState({ path: 'src/helper/auth/user.json' });

    await browser.close();
}

const env = process.argv[2] as 'ci' | 'dev' | 'stg' | 'prod' || 'dev';

generateAuth(env).then(r => {});
