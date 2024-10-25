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

// Optionally, you can export a method to connect if needed
export const connectDB = async () => {
    try {
        await pool.connect();
        console.log("Database connection established successfully.");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

export const closeDB = async () => {
    await pool.end();
    console.log("Database connection closed.");
};  

export default pool;
