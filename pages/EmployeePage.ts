import {
    Page,
    Locator
} from '@playwright/test';

export class EmployeePage {

    private readonly page: Page;

    private readonly pimMenu: Locator;
    private readonly addEmployeeButton: Locator;

    private readonly pimHeading: Locator;
    private readonly addEmployeeHeading: Locator;

    private readonly firstNameInput: Locator;
    private readonly middleNameInput: Locator;
    private readonly lastNameInput: Locator;

    private readonly saveButton: Locator;

    private readonly requiredMessage: Locator;
    private readonly successMessage: Locator;

    constructor(page: Page) {

        this.page = page;

        this.pimMenu = page.getByRole('link', {
            name: 'PIM'
        });

        this.addEmployeeButton = page.getByRole('link', {
            name: 'Add Employee'
        });

        this.pimHeading = page.getByRole('heading', {
            name: 'PIM'
        });

        this.addEmployeeHeading = page.getByRole('heading', {
            name: 'Add Employee'
        });

        this.firstNameInput = page.getByPlaceholder(
            'First Name'
        );

        this.middleNameInput = page.getByPlaceholder(
            'Middle Name'
        );

        this.lastNameInput = page.getByPlaceholder(
            'Last Name'
        );

        this.saveButton = page.getByRole('button', {
            name: 'Save'
        });

        this.requiredMessage = page.locator(
            '.oxd-input-group__message'
        );

        this.successMessage = page.locator(
            '.oxd-toast-content'
        );
    }

    async openPIM(): Promise<void> {

        await this.pimMenu.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.pimMenu.click();
    }

    async clickAddEmployee(): Promise<void> {

        await this.addEmployeeButton.waitFor({
            state: 'visible',
            timeout: 15000
        });

        await this.addEmployeeButton.click();
    }

    async addEmployee(
        firstName: string,
        middleName: string,
        lastName: string
    ): Promise<void> {

        await this.firstNameInput.fill(firstName);

        await this.middleNameInput.fill(middleName);

        await this.lastNameInput.fill(lastName);

        await this.saveButton.click();
    }

    // =====================================================
    // Public getters
    // Locators remain private
    // Assertions remain in spec files
    // =====================================================

    getPimHeading(): Locator {
        return this.pimHeading;
    }

    getAddEmployeeHeading(): Locator {
        return this.addEmployeeHeading;
    }

    getRequiredMessage(): Locator {
        return this.requiredMessage;
    }

    getSuccessMessage(): Locator {
        return this.successMessage;
    }
}