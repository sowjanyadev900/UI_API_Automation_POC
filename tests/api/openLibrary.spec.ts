import { test } from '@playwright/test';
import dotenv from 'dotenv';

import testData from '../../testData/books.json';
import importBookData from '../../testData/import-book.json';
import putBookData from '../../testData/put-book.json';
import patchBookData from '../../testData/patch-book.json';
import deleteData from '../../testData/authorDelete.json';

import searchBooksSchema from '../../schemas/searchBooks.schema.json';
import errorSchema from '../../schemas/error.schema.json';

import { OpenLibraryApi } from '../../api/openLibraryApi';
import { ApiAssertions } from '../../utils/apiAssertions';

// Load environment variables
dotenv.config();


// ==================================================
// TestCase 1: GET - Search Books
// ==================================================

test(
    'TC001 - GET - Search books with schema validation',
    async ({ request }) => {

        // Create API service instance
    const api = new OpenLibraryApi(request);

    // Get search data from test data
    const {
        searchQuery,
        expectedKeyword
    } = testData[0];

    // Send GET request
    const response =
        await api.searchBooks(searchQuery);

    // ------------------------------------------
    // 1. Validate Status Code
    // ------------------------------------------

    ApiAssertions.validateStatus(
        response.status(),
        200
    );

    // ------------------------------------------
    // 2. Get Response Body
    // ------------------------------------------

    const responseBody =
        await response.json();

    // ------------------------------------------
    // 3. AJV Schema Validation
    // ------------------------------------------

    ApiAssertions.validateSchema(
        responseBody,
        searchBooksSchema
    );

    // ------------------------------------------
    // 4. Existing Functional Validations
    // ------------------------------------------

    ApiAssertions.validateProperty(
        responseBody,
        'num_found'
    );

    ApiAssertions.validateProperty(
        responseBody,
        'docs'
    );

    ApiAssertions.validateArray(
        responseBody.docs
    );

    ApiAssertions.validateArrayNotEmpty(
        responseBody.docs
    );

    ApiAssertions.validateBookTitle(
        responseBody.docs,
        expectedKeyword
    );

        console.log(
            'GET Search API validation successful'
        );
    }
);


// ==================================================
// TestCase 2: POST - Login
// ==================================================

test(
    'TC002 - POST - Login with Open Library credentials',
    async ({ request }) => {

        const api = new OpenLibraryApi(request);

        // Validate credentials are available
        const access =
            process.env.OPENLIBRARY_ACCESS;

        const secret =
            process.env.OPENLIBRARY_SECRET;

        if (!access || !secret) {
            throw new Error(
                'Open Library credentials are missing in .env'
            );
        }

        // Send login request
        const response =
            await api.login();

        // Log response
        console.log(
            'Login Status:',
            response.status()
        );

        console.log(
            'Login Response:',
            await response.text()
        );

        // Validate successful authentication
        ApiAssertions.validateStatus(
            response.status(),
            200
        );
    }
);


// ==================================================
// TestCase 3: POST - Import Book
// ==================================================

test(
    'TC003 - POST - Import book - Unauthorized',
    async ({ request }) => {
        const api = new OpenLibraryApi(request);

        // ------------------------------------------
        // Login
        // ------------------------------------------

        const loginResponse =
            await api.login();

        ApiAssertions.validateStatus(
            loginResponse.status(),
            200
        );

        // ------------------------------------------
        // Import book
        // ------------------------------------------

        const response =
            await api.importBook(importBookData);

        console.log(
            'Import Status:',
            response.status()
        );

        const responseText =
            await response.text();

        console.log(
            'Import Response:',
            responseText
        );

        // ------------------------------------------
        // Validate status
        // ------------------------------------------

        ApiAssertions.validateStatus(
            response.status(),
            403
        );

        // ------------------------------------------
        // AJV validation
        // ------------------------------------------

        // Import API returned an empty response body.
        // AJV cannot validate an empty/non-JSON response.

        if (responseText.trim() !== '') {

            const responseBody =
                JSON.parse(responseText);

            ApiAssertions.validateSchema(
                responseBody,
                errorSchema
            );

        } else {

            console.log(
                'Import API returned an empty response body. AJV JSON schema validation is not applicable.'
            );
        }
    }
);


// ==================================================
// TestCase 4: PUT - Update Work
// ==================================================

test(
    'TC004 - PUT - Update work - Unauthorized',
    async ({ request }) => {

        const api = new OpenLibraryApi(request);

        // Work ID used for update
        const workId = 'OL15626917W';

        // Send PUT request
        const response =
            await api.updateWork(
                workId,
                putBookData
            );

        // Log response
        console.log(
            'PUT Status:',
            response.status()
        );

        console.log(
            'PUT Response:',
            await response.text()
        );

        // Expected restricted operation
        ApiAssertions.validateStatus(
            response.status(),
            403
        );
    }
);


// ==================================================
// TestCase 5: PATCH - Update Work
// ==================================================

test(
    'TC005 - PATCH - Update work - Unauthorized',
    async ({ request }) => {

        const api = new OpenLibraryApi(request);

        // Work ID
        const workId = 'OL45804W';

        // Send PATCH request
        const response =
            await api.patchWork(
                workId,
                patchBookData
            );

        // Log response
        console.log(
            'PATCH Status:',
            response.status()
        );

        console.log(
            'PATCH Response:',
            await response.text()
        );

        // Expected restricted operation
        ApiAssertions.validateStatus(
            response.status(),
            405
        );
    }
);


// ==================================================
// TestCase 6: DELETE - Delete Author
// ==================================================

test(
    'TC006 - DELETE - Delete author - Unauthorized',
    async ({ request }) => {

        const api = new OpenLibraryApi(request);

        // Author ID
        const authorId = 'OL23919A';

        // Send DELETE request
        const response =
            await api.deleteAuthor(
                authorId,
                deleteData
            );

        // Log response
        console.log(
            'DELETE Status:',
            response.status()
        );

        console.log(
            'DELETE Response:',
            await response.text()
        );

        // Expected restricted operation
        ApiAssertions.validateStatus(
            response.status(),
            405
        );
    }
);

