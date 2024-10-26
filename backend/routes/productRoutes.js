import express from 'express';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    registerUser,
    loginUser
} from '../controllers/productController.js';

const router = express.Router();

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Product routes
router.get('/products', getProducts);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
