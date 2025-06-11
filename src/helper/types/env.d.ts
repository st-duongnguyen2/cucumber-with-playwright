export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: 'chrome' | 'firefox' | 'webkit',
            ENV: 'stg' | 'prod' | 'test' | 'ci',
            BASEURL: string,
            HEADLESS: 'true' | 'false'
        }
    }
}
