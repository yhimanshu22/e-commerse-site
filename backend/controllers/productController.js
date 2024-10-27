import { Product } from '../models/productModel.js';
import { authenticate } from '../middleware/authMiddleware.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js'; // Assume a User model exists

// User registration
export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findByUsername(username);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Register new user
        const newUser = await User.register(username, password);
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Registration failed, please try again' });
    }
};
// User login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findByUsername(username); // Find user logic

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};


export const getProducts = async (req, res) => {
    const result = await Product.getAll();
    res.json(result.rows);
};

export const createProduct = [authenticate, async (req, res) => {
    try {
        const { name, description, price, quantity } = req.body;

        if (!name || !description || price == null || quantity == null) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const product = await Product.create(name, description, price, quantity);
        
        if (product) {
            return res.status(201).json({ message: "Product created successfully", product });
        } else {
            return res.status(500).json({ error: "Product creation failed" });
        }

    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
}];


export const updateProduct = [authenticate,async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const result = await Product.update(req.params.id, name, description, price, quantity);
    res.json(result.rows[0]);
}];

export const deleteProduct = [
    authenticate,
    async (req, res) => {
        try {
            const { id } = req.params;
            const deleteResult = await Product.delete(id);

            // Check if product exists and was deleted
            if (!deleteResult.rowCount) {
                return res.status(404).json({ error: "Product not found or already deleted" });
            }

            // Successful deletion
            res.sendStatus(204);
        } catch (error) {
            console.error("Error deleting product:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
];
