import { Product } from '../models/productModel.js';

export const getProducts = async (req, res) => {
    const result = await Product.getAll();
    res.json(result.rows);
};

export const createProduct = async (req, res) => {
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
};


export const updateProduct = async (req, res) => {
    const { name, description, price, quantity } = req.body;
    const result = await Product.update(req.params.id, name, description, price, quantity);
    res.json(result.rows[0]);
};

export const deleteProduct = async (req, res) => {
    await Product.delete(req.params.id);
    res.sendStatus(204);
};
