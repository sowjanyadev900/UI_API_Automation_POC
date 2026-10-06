import { expect } from '@playwright/test';
import Ajv from 'ajv';


// Reusable API assertion and AJV validation class
export class ApiAssertions {

    // ==================================================
    // Status Code Validation
    // ==================================================

    static validateStatus(
        actualStatus: number,
        expectedStatus: number
    ): void {

        expect(actualStatus).toBe(expectedStatus);
    }


    // ==================================================
    // Property Validation
    // ==================================================

    static validateProperty(
        responseBody: object,
        propertyName: string
    ): void {

        expect(responseBody).toHaveProperty(propertyName);
    }


    // ==================================================
    // Array Validation
    // ==================================================

    static validateArray(
        value: unknown
    ): void {

        expect(Array.isArray(value)).toBeTruthy();
    }


    // ==================================================
    // Non-Empty Array Validation
    // ==================================================

    static validateArrayNotEmpty(
        value: unknown[]
    ): void {

        expect(value.length).toBeGreaterThan(0);
    }


    // ==================================================
    // Book Title Validation
    // ==================================================

    static validateBookTitle(
        books: any[],
        expectedKeyword: string
    ): void {

        const matchingBook = books.some(
            book =>
                (book.title ?? '')
                    .toLowerCase()
                    .includes(
                        expectedKeyword.toLowerCase()
                    )
        );

        expect(matchingBook).toBeTruthy();
    }


    // ==================================================
    // AJV JSON Schema Validation
    // ==================================================

    static validateSchema(
        responseBody: unknown,
        schema: object
    ): void {

        // Create AJV instance
        const ajv = new Ajv({
            allErrors: true
        });

        // Compile JSON schema
        const validate = ajv.compile(schema);

        // Validate response against schema
        const isValid = validate(responseBody);

        // If validation fails, print detailed errors
        if (!isValid) {

            console.error(
                'AJV Validation Failed'
            );

            console.error(
                JSON.stringify(
                    validate.errors,
                    null,
                    2
                )
            );
        }

        // Fail the Playwright test if schema is invalid
        expect(isValid).toBeTruthy();
    }
}