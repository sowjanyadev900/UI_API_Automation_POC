import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();


// Open Library API configuration
export const API_CONFIG = {

    // ---------------------------------------------
    // Base URL
    // ---------------------------------------------

    baseURL: 'https://openlibrary.org',


    // ---------------------------------------------
    // API Endpoints
    // ---------------------------------------------

    endpoints: {

        // Search books
        search: '/search.json',

        // Login
        login: '/account/login.json',

        // Import book
        importBook: '/api/import',

        // Work endpoint
        work: (workId: string) =>
            `/works/${workId}.json`,

        // Author endpoint
        author: (authorId: string) =>
            `/authors/${authorId}.json`
    },


    // ---------------------------------------------
    // Authentication Credentials
    // ---------------------------------------------

    credentials: {

        access: process.env.OPENLIBRARY_ACCESS,

        secret: process.env.OPENLIBRARY_SECRET
    },


    // ---------------------------------------------
    // Common Headers
    // ---------------------------------------------

    headers: {

        contentType: 'application/json',

        accept: 'application/json',

        userAgent: 'Playwright-API-POC'
    }
};