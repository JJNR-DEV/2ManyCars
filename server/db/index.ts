import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE
});

export default async (
    text: string, 
    params: any[], 
) => {
    try {
        const client = await pool.connect();
        const response = await client.query(text, params);
        client.release(true);
        return response.rows;
    } catch(err) {
        throw Error(err.message);
    }
};