import {Pool} from "pg";

export const dbPool = new Pool({
    user: "postgres",
    host:"localhost",
    database: "practice_database",
    password: "123456789",
    port: 5432,
});

export async function query(text: string, params?: any[]) {
    const client = await dbPool.connect();
    try {
        const res = await client.query(text, params);
        return res;
    } finally {
        client.release();
    }
}