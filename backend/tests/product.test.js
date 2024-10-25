//jest.setTimeout(20000);

import request from 'supertest';
import app from '../app'; // Adjust the path based on your app's structure
import { connectDB, closeDB } from '../config/db'; // Assuming you have your db config

beforeAll(async () => {
    await connectDB(); // Connect to the database before running tests
}, 20000);

afterAll(async () => {
    await closeDB(); // Disconnect from the database after tests
}, 20000);


describe('Product API', () => {
    let productId;

    // Test for creating a product
    test('POST /products - Create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Test Product',
                description: 'This is a test product.',
                price: 9.99,
                quantity: 10,
            });

        expect(response.statusCode).toBe(201);
        expect(response.body.product).toHaveProperty('id');
        productId = response.body.product.id; // Use correct path for product ID

    },20000);

    // Test for getting all products
    test('GET /products - Get all products', async () => {
        const response = await request(app).get('/products');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    },20000);

    // Test for updating a product
    test('PUT /products/:id - Update a product', async () => {
        const response = await request(app)
            .put(`/products/${productId}`)
            .send({
                name: 'Updated Test Product',
                description: 'This is an updated test product.',
                price: 12.99,
                quantity: 5,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('name', 'Updated Test Product');
    },20000);

    // Test for deleting a product
    test('DELETE /products/:id - Delete a product', async () => {
        const response = await request(app).delete(`/products/${productId}`);
        expect(response.statusCode).toBe(204); // No Content
    },20000);


});

