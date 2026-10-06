import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    baseUrl: process.env.BASE_URL || '',
    username: process.env.ORANGE_USERNAME || '',
    password: process.env.ORANGE_PASSWORD || ''
};