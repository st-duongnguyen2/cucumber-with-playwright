import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import {Browser, BrowserContext, Page, devices} from '@playwright/test';
import { fixture } from './pageFixture';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
import * as path from 'node:path';
import * as fs from 'fs';

const userTagRegex = /@user=(\w+)/;

const deviceName = process.env.DEVICE || '';
const device = deviceName ? devices[deviceName] : null;

let browser: Browser;
let context: BrowserContext;
let page: Page;

const setupContext = async function (role: string) {
    if (role === 'guest') {
        context = await browser.newContext({
            ...device || {}
        });
    } else {
        context = await browser.newContext({
            ...(device || {}),
            storageState: `src/helper/auth/${role}.json`
        });
    }
    page = await context.newPage();
    fixture.page = page;
}

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before( async function ({ pickle }) {
    const tags = pickle.tags.map(tag => tag.name);
    const userTag = tags.find(tag => userTagRegex.test(tag));

    if (userTag) {
        const match = userTag.match(userTagRegex);
        const roleKey = match?.[1];
        return setupContext(roleKey);
    } else {
        return setupContext('guest');
    }
});

After(async function ({ pickle, result }) {
   if (result.status === Status.FAILED) {
        const img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' });
        this.attach(img, 'image/png');
   }
    // let videoPath: string;
    // let img: Buffer;
    // const path = `./test-results/trace/${pickle.id}.zip`;
    // if (result?.status == Status.PASSED) {
    //     img = await fixture.page.screenshot(
    //         { path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' })
    //     videoPath = await fixture.page.video().path();
    // }
    // await context.tracing.stop({ path: path });

    // if (result?.status == Status.PASSED) {
    //     await this.attach(
    //         img, 'image/png'
    //     );
    //     await this.attach(
    //         fs.readFileSync(videoPath),
    //         'video/webm'
    //     );
    //     const traceFileLink = `<a href='https://trace.playwright.dev/'>Open ${path}</a>`
    //     await this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    // }
    await fixture.page.close();
    await context.close();
});

AfterAll(async function () {
    //await new Promise(resolve => {}) ;
    await browser.close();
});
