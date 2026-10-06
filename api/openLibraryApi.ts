import { API_CONFIG } from '../config/apiconfig';
import {
    APIRequestContext,
    APIResponse
} from '@playwright/test';


// Open Library API service
export class OpenLibraryApi {

    constructor(
        private request: APIRequestContext
    ) {}


    // GET - Search books
    async searchBooks(
        searchQuery: string
    ): Promise<APIResponse> {

        return await this.request.get(
            API_CONFIG.endpoints.search,
            {
                params: {
                    q: searchQuery
                }
            }
        );
    }


    // POST - Login
    async login(): Promise<APIResponse> {

        return await this.request.post(
            API_CONFIG.endpoints.login,
            {
                headers: {
                    'Content-Type':
                        API_CONFIG.headers.contentType,

                    'Accept':
                        API_CONFIG.headers.accept
                },

                data: {
                    access:
                        API_CONFIG.credentials.access,

                    secret:
                        API_CONFIG.credentials.secret
                }
            }
        );
    }


    // POST - Import book
    async importBook(
        bookData: object
    ): Promise<APIResponse> {

        return await this.request.post(
            API_CONFIG.endpoints.importBook,
            {
                headers: {
                    'Content-Type':
                        API_CONFIG.headers.contentType,

                    'Accept':
                        API_CONFIG.headers.accept,

                    'User-Agent':
                        API_CONFIG.headers.userAgent
                },

                data: bookData
            }
        );
    }


    // PUT - Update work
    async updateWork(
        workId: string,
        bookData: object
    ): Promise<APIResponse> {

        return await this.request.put(
            API_CONFIG.endpoints.work(workId),
            {
                headers: {
                    'Content-Type':
                        API_CONFIG.headers.contentType,

                    'Accept':
                        API_CONFIG.headers.accept,

                    'User-Agent':
                        API_CONFIG.headers.userAgent
                },

                data: bookData
            }
        );
    }


    // PATCH - Update work
    async patchWork(
        workId: string,
        data: object
    ): Promise<APIResponse> {

        return await this.request.patch(
            API_CONFIG.endpoints.work(workId),
            {
                headers: {
                    'Content-Type':
                        API_CONFIG.headers.contentType,

                    'Accept':
                        API_CONFIG.headers.accept,

                    'User-Agent':
                        API_CONFIG.headers.userAgent
                },

                data
            }
        );
    }


    // DELETE - Delete author
    async deleteAuthor(
        authorId: string,
        deleteData?: object
    ): Promise<APIResponse> {

        return await this.request.delete(
            API_CONFIG.endpoints.author(authorId),
            {
                headers: {
                    'Content-Type':
                        API_CONFIG.headers.contentType,

                    'Accept':
                        API_CONFIG.headers.accept,

                    'User-Agent':
                        API_CONFIG.headers.userAgent
                },

                data: deleteData
            }
        );
    }
}