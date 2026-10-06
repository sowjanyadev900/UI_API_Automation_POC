import {
    Page,
    Locator
} from '@playwright/test';

export class LoginPage {

    private readonly page: Page;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly requiredMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.usernameInput =
            page.getByPlaceholder('Username');

        this.passwordInput =
            page.getByPlaceholder('Password');

        this.loginButton =
            page.getByRole('button', {
                name: 'Login'
            });

        this.errorMessage =
            page.locator(
                '.oxd-alert-content-text'
            );

        this.requiredMessage =
            page.locator(
                '.oxd-input-group__message'
            );
    }

    async goto(): Promise<void> {

        await this.page.goto(
            '/web/index.php/auth/login'
        );
    }

    async login(
        username: string,
        password: string
    ): Promise<void> {

        await this.usernameInput.fill(username);

        await this.passwordInput.fill(password);

        await this.loginButton.click();
    }

    // =====================================================
    // GETTERS
    // =====================================================

    getLoginButton(): Locator {
        return this.loginButton;
    }

    getUsernameInput(): Locator {
        return this.usernameInput;
    }

    getPasswordInput(): Locator {
        return this.passwordInput;
    }

    getErrorMessage(): Locator {
        return this.errorMessage;
    }

    getRequiredMessage(): Locator {
        return this.requiredMessage;
    }
}