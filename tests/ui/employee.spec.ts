import {
    test,
    expect
} from '../../fixtures/testFixtures';

import employeeData from '../../testData/employeeData.json';

test.describe(
    'OrangeHRM - Employee Management',
    () => {

        test.beforeEach(async ({ employeePage }) => {

            await employeePage.openPIM();

            await expect(
                employeePage.getPimHeading()
            ).toBeVisible();

            await employeePage.clickAddEmployee();

            await expect(
                employeePage.getAddEmployeeHeading()
            ).toBeVisible();
        });

        test(
            'TC007 - Add employee with valid details',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.validEmployee.firstName,
                    employeeData.validEmployee.middleName,
                    employeeData.validEmployee.lastName
                );

                await expect(
                    employeePage.getSuccessMessage()
                ).toBeVisible();
            }
        );

        test(
            'TC008 - Add employee without first name',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.employeeWithoutFirstName.firstName,
                    employeeData.employeeWithoutFirstName.middleName,
                    employeeData.employeeWithoutFirstName.lastName
                );

                await expect(
                    employeePage.getRequiredMessage().first()
                ).toBeVisible();
            }
        );

        test(
            'TC009 - Add employee without last name',
            async ({ employeePage }) => {

                await employeePage.addEmployee(
                    employeeData.employeeWithoutLastName.firstName,
                    employeeData.employeeWithoutLastName.middleName,
                    employeeData.employeeWithoutLastName.lastName
                );

                await expect(
                    employeePage.getRequiredMessage().first()
                ).toBeVisible();
            }
        );

    test(
    'TC010 - Add employee without any details',
    async ({ employeePage }) => {

        await employeePage.addEmployee(
            employeeData.emptyEmployee.firstName,
            employeeData.emptyEmployee.middleName,
            employeeData.emptyEmployee.lastName
        );

        await expect(
            employeePage.getRequiredMessage()
        ).toHaveCount(2);
    }
);
    }
);