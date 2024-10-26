jest.setTimeout(50000);

import request from 'supertest';
import jwt from 'jsonwebtoken';
import app from '../app'; // Adjust the path based on your app's structure
import { connectDB, closeDB, getConnectionCount } from '../config/db'; // Adjust the path based on your structure

// Mock user data and token generation
const testUser = {
    id: 1,
    username: 'testuser' 
}; // Adjust user data as needed for your auth
const token = jwt.sign(testUser, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generates a token for testing

beforeAll(async () => {
    await connectDB(); // Connect to the database before running tests
});

describe('Product API', () => {
    let productId;

    // Test for creating a product
    test('POST /products - Create a product', async () => {
        const response = await request(app)
            .post('/products')
            .set('Authorization', `Bearer ${token}`) // Include token in header
            .send({
                name: 'Test Product',
                description: 'This is a test product.',
                price: 9.99,
                quantity: 10,
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('product');
        expect(response.body.product).toHaveProperty('id');
        productId = response.body.product.id;
    }, 20000);

    // Test for getting all products
    test('GET /products - Get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    }, 20000);

    // Test for updating a product
    test('PUT /products/:id - Update a product', async () => {
        const response = await request(app)
            .put(`/products/${productId}`)
            .set('Authorization', `Bearer ${token}`) // Include token in header
            .send({
                name: 'Updated Test Product',
                description: 'This is an updated test product.',
                price: 12.99,
                quantity: 5,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Test Product');
    }, 20000);

    // Test for deleting a product
    test('DELETE /products/:id - Delete a product', async () => {
        const response = await request(app)
            .delete(`/products/${productId}`)
            .set('Authorization', `Bearer ${token}`); // Include token in header

        expect(response.statusCode).toBe(204);
    }, 20000);
});

afterAll(async () => {
    console.log(`Active connections before closing: ${await getConnectionCount()}`);
    await closeDB();
});

