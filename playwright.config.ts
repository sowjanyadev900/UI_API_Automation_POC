import {
    defineConfig,
    devices
} from '@playwright/test';

import { ENV } from './config/env';

export default defineConfig({

    testDir: './tests',

    timeout: 30_000,

    expect: {
        timeout: 5_000
    },

    fullyParallel: false,
    workers:1,

    reporter: [
        [
            'html',
            {
                outputFolder: 'playwright-report',
                open: 'never'
            }
        ],
        ['list']
    ],

    use: {

        trace: 'retain-on-failure',

        screenshot: 'only-on-failure',

        video: 'retain-on-failure'
    },

    projects: [

        // Login UI tests
        {
            name: 'login',

            testMatch: '**/ui/login.spec.ts',

            use: {
                ...devices['Desktop Chrome'],
                baseURL: ENV.baseUrl
            }
        },

        // Employee UI tests
        {
            name: 'employee',

            testMatch: '**/ui/employee.spec.ts',

            use: {
                ...devices['Desktop Chrome'],
                baseURL: ENV.baseUrl
            }
        },

        // Open Library API tests
        {
            name: 'api',

            testMatch: '**/api/*.spec.ts',

            use: {
                baseURL: 'https://openlibrary.org'
            }
        }
    ]
});