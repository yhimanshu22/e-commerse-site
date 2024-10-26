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

// Function to create users and products tables
const createTables = async () => {
    const usersQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const productsQuery = `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            price DECIMAL(10, 2) NOT NULL,
            quantity INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const updateTriggerFunction = `
        CREATE OR REPLACE FUNCTION update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `;

    const triggerQuery = `
        CREATE TRIGGER update_products_updated_at
        BEFORE UPDATE ON products
        FOR EACH ROW
        EXECUTE PROCEDURE update_updated_at_column();
    `;

    try {
        await pool.query(usersQuery);
        await pool.query(productsQuery);
        await pool.query(updateTriggerFunction);
        await pool.query(triggerQuery);
        console.log('Users and products tables created successfully.');
    } catch (error) {
        console.error('Error creating tables:', error);
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
