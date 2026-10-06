import {
    test,
    expect
} from '../../fixtures/testFixtures';

import loginData from '../../testData/LoginData.json';

test.describe('OrangeHRM - Login Test Suite', () => {

    test.beforeEach(async ({ loginPage }) => {

        await loginPage.goto();

        await expect(
            loginPage.getLoginButton()
        ).toBeVisible();

        await expect(
            loginPage.getUsernameInput()
        ).toBeVisible();

        await expect(
            loginPage.getPasswordInput()
        ).toBeVisible();
    });

    test('TC001 - Login with valid credentials', async ({
        loginPage,
        dashboardPage
    }) => {

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await expect(
            dashboardPage.getDashboardHeading()
        ).toBeVisible();
    });

    test('TC002 - Login with invalid credentials', async ({
        loginPage
    }) => {

        await loginPage.login(
            loginData.invalidUser.username,
            loginData.invalidUser.password
        );

        await expect(
            loginPage.getErrorMessage()
        ).toContainText('Invalid credentials');
    });

    test('TC003 - Valid username with invalid password', async ({
        loginPage
    }) => {

        await loginPage.login(
            loginData.invalidPassword.username,
            loginData.invalidPassword.password
        );

        await expect(
            loginPage.getErrorMessage()
        ).toContainText('Invalid credentials');
    });

    test('TC004 - Login with empty username', async ({
        loginPage
    }) => {

        await loginPage.login(
            loginData.emptyUsername.username,
            loginData.emptyUsername.password
        );

        await expect(
            loginPage.getRequiredMessage().first()
        ).toContainText('Required');
    });

    test('TC005 - Login with empty password', async ({
        loginPage
    }) => {

        await loginPage.login(
            loginData.emptyPassword.username,
            loginData.emptyPassword.password
        );

        await expect(
            loginPage.getRequiredMessage().first()
        ).toContainText('Required');
    });

    test('TC006 - Login with empty username and password', async ({
        loginPage
    }) => {

        await loginPage.login(
            loginData.emptyCredentials.username,
            loginData.emptyCredentials.password
        );

        await expect(
            loginPage.getRequiredMessage().first()
        ).toContainText('Required');
    });
});