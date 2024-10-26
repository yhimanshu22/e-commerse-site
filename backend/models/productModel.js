import pool from '../config/db.js';

export const Product = {
    getAll: async () => {
        try {
            return await pool.query("SELECT * FROM products");
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error; // Rethrow or handle as needed
        }
    },
    
    create: async (name, description, price, quantity) => {
        try {
            const result = await pool.query(
                "INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *", 
                [name, description, price, quantity]
            );
            return result.rows[0]; // Return the created product
        } catch (error) {
            console.error("Error creating product:", error);
            throw error; // Rethrow or handle as needed
        }
    },

    update: async (id, name, description, price, quantity) => {
        try {
            const result = await pool.query(
                "UPDATE products SET name=$1, description=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *", 
                [name, description, price, quantity, id]
            );
            return result.rows[0]; // Return the updated product
        } catch (error) {
            console.error("Error updating product:", error);
            throw error; // Rethrow or handle as needed
        }
    },

    delete: async (id) => {
        try {
            await pool.query("DELETE FROM products WHERE id=$1", [id]);
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error; // Rethrow or handle as needed
        }
    },
};
