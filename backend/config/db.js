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
const createTables = async () => {
    try {
        // Example for creating tables and triggers
        await pool.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                price NUMERIC,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            );
            
            DO $$
            BEGIN
                IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_products_updated_at') THEN
                    CREATE TRIGGER update_products_updated_at
                    BEFORE UPDATE ON products
                    FOR EACH ROW
                    EXECUTE FUNCTION update_timestamp();
                END IF;
            END $$;
        `);
    } catch (error) {
        console.error("Error creating tables:", error.message);
    }
};

// Function to connect to the database
export const connectDB = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connection established successfully.");
        client.release(); // Release the client after initial connection check
        
        // Create tables if they don't exist
        await createTables();
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
    }
};

// Function to get active connection count
export const getConnectionCount = async () => {
    const res = await pool.query("SELECT COUNT(*) FROM pg_stat_activity WHERE state = 'active';");
    return res.rows[0].count;
};

// Function to close the database connection
export const closeDB = async () => {
    await pool.end();
    console.log("Database connection closed.");
};

export default pool;
