import {
    test as base,
    Page
} from '@playwright/test';

import fs from 'fs';
import path from 'path';

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { EmployeePage } from '../pages/EmployeePage';
import { ENV } from '../config/env';

type OrangeHRMFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    authenticatedPage: Page;
    employeePage: EmployeePage;
};

type OrangeHRMWorkerFixtures = {
    authStorageState: string;
};

export const test = base.extend<
    OrangeHRMFixtures,
    OrangeHRMWorkerFixtures
>({

    // =========================================================
    // WORKER-SCOPED AUTHENTICATION
    // Login happens once per worker
    // =========================================================
    authStorageState: [
        async ({ browser }, use, workerInfo) => {

            const authDir = path.resolve('playwright/.auth');

            if (!fs.existsSync(authDir)) {
                fs.mkdirSync(authDir, {
                    recursive: true
                });
            }

            const authFile = path.join(
                authDir,
                `user-${workerInfo.workerIndex}.json`
            );

            console.log(
                `[AUTH] Worker ${workerInfo.workerIndex}: Logging in...`
            );

            const context = await browser.newContext();

            const page = await context.newPage();

            const loginPage = new LoginPage(page);

            await loginPage.goto();

            await loginPage.login(
                ENV.username,
                ENV.password
            );

            // Wait for successful login using URL.
            await page.waitForURL(
                '**/web/index.php/dashboard/index',
                {
                    timeout: 15000
                }
            );

            console.log(
                `[AUTH] Worker ${workerInfo.workerIndex}: Login successful`
            );

            console.log(
                `[AUTH] URL: ${page.url()}`
            );

            // Save authenticated state.
            await context.storageState({
                path: authFile
            });

            await context.close();

            await use(authFile);
        },

        {
            scope: 'worker'
        }
    ],

    // =========================================================
    // AUTHENTICATED PAGE
    // =========================================================
    authenticatedPage: async (
        { browser, authStorageState },
        use
    ) => {

        const context = await browser.newContext({
            storageState: authStorageState
        });

        const page = await context.newPage();

        // Open dashboard using authenticated session.
        await page.goto(
            '/web/index.php/dashboard/index'
        );

        // Make sure dashboard URL is reached.
        await page.waitForURL(
            '**/web/index.php/dashboard/index',
            {
                timeout: 15000
            }
        );

        await use(page);

        await context.close();
    },

    // =========================================================
    // LOGIN PAGE
    // =========================================================
    loginPage: async ({ page }, use) => {

        const loginPage = new LoginPage(page);

        await use(loginPage);
    },

    // =========================================================
    // DASHBOARD PAGE
    // =========================================================
    dashboardPage: async ({ page }, use) => {

        const dashboardPage = new DashboardPage(page);

        await use(dashboardPage);
    },

    // =========================================================
    // EMPLOYEE PAGE
    // =========================================================
    employeePage: async (
        { authenticatedPage },
        use
    ) => {

        const employeePage =
            new EmployeePage(authenticatedPage);

        await use(employeePage);
    }
});

export { expect } from '@playwright/test';