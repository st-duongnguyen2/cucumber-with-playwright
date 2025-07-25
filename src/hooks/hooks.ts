import { BeforeAll, AfterAll, Before, After } from '@cucumber/cucumber';
import {Browser, BrowserContext, Page} from '@playwright/test';
import { fixture } from './pageFixture';
import { invokeBrowser } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { createLogger } from 'winston';
import { options } from '../helper/util/logger';
import * as path from 'node:path';
import * as fs from 'fs';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before( async function ({ pickle }) {
    const tags = pickle.tags.map(tag => tag.name);
    let role: 'user' | 'guest' = 'guest';
    if (tags.includes('@user')) role = 'user';

    switch (role) {
        case 'guest':
            return setupContext('guest')
        case 'user':
            return setupContext('user')
        default:
            throw new Error('Cannot find role tag')
    }
});

const setupContext = async function (role: string) {
    if (role === 'guest') {
        context = await browser.newContext();
    } else {
        context = await browser.newContext({
            storageState: `src/helper/auth/${role}.json`
        });
    }
    page = await context.newPage();
    fixture.page = page;
}

After(async function ({ pickle, result }) {
   // if (result.status === Status.FAILED) {
        const img = await fixture.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' });
        this.attach(img, 'image/png');
    //}
    // let videoPath: string;
    // let img: Buffer;
    // const path = `./test-results/trace/${pickle.id}.zip`;
    // if (result?.status == Status.PASSED) {
    //     img = await fixture.page.screenshot(
    //         { path: `./test-results/screenshots/${pickle.name}.png`, type: 'png' })
    //     videoPath = await fixture.page.video().path();
    // }
    // await context.tracing.stop({ path: path });
    await fixture.page.close();
    await context.close();
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
});

AfterAll(async function () {
    //await new Promise(resolve => {}) ;
    await browser.close();
});
