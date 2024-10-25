import pool from '../config/db.js';

export const Product = {
    getAll: async () => await pool.query("SELECT * FROM products"),
    create: async (name, description, price, quantity) => 
        await pool.query("INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *", 
        [name, description, price, quantity]),
    update: async (id, name, description, price, quantity) => 
        await pool.query("UPDATE products SET name=$1, description=$2, price=$3, quantity=$4 WHERE id=$5 RETURNING *", 
        [name, description, price, quantity, id]),
    delete: async (id) => await pool.query("DELETE FROM products WHERE id=$1", [id]),
};
