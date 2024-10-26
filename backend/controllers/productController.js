import { Product } from '../models/productModel.js';
import { authenticate } from '../middleware/authMiddleware.js';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js'; // Assume a User model exists

// User registration
export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create(username, hashedPassword); // Add your user creation logic

    res.status(201).json({ message: "User registered successfully" });
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
        
        // Check if required fields are present
        if (!name || !description || price == null || quantity == null) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Attempt to create the product
        const result = await Product.create(name, description, price, quantity);
        
        // Check if the product was created successfully
        if (result && result.rows && result.rows[0]) {
            return res.status(201).json({ message: "Product created successfully", product: result.rows[0] });
        } else {
            return res.status(500).json({ error: "Product creation failed" });
        }

    } catch (error) {
        // Error handling
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
}];


export const updateProduct = [authenticate,async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const result = await Product.update(req.params.id, name, description, price, quantity);
    res.json(result.rows[0]);
}];

export const deleteProduct = [authenticate,async (req, res) => {
    await Product.delete(req.params.id);
    res.sendStatus(204);
}];
