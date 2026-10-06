import {
    Page,
    Locator
} from '@playwright/test';

export class DashboardPage {

    private readonly page: Page;

    private readonly dashboardHeading: Locator;
    private readonly userDropdown: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {

        this.page = page;

        this.dashboardHeading =
            page.getByRole('heading', {
                name: 'Dashboard'
            });

        this.userDropdown =
            page.locator(
                '.oxd-userdropdown-name'
            );

        this.logoutLink =
            page.getByRole('menuitem', {
                name: 'Logout'
            });
    }

    async goto(): Promise<void> {

        await this.page.goto(
            '/web/index.php/dashboard/index'
        );
    }

    async logout(): Promise<void> {

        await this.userDropdown.click();

        await this.logoutLink.click();
    }

    // =====================================================
    // GETTERS
    // Locators remain private
    // Assertions remain in spec files
    // =====================================================

    getDashboardHeading(): Locator {
        return this.dashboardHeading;
    }
}