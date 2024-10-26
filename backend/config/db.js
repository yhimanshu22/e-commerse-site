import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connection established successfully.");
        client.release(); // Release the client after initial connection check
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

export const getConnectionCount = async () => {
    const res = await pool.query("SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';");
    return res.rows[0].count;
};

export const closeDB = async () => {
    await pool.end();
    console.log("Database connection closed.");
};

export default pool;

