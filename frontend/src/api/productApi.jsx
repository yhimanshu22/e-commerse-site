import axios from 'axios';

const API_URL = 'https://e-commerse-site-m1a3.onrender.com'; // Base URL for the API

// Get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Set up axios instance for authenticated requests
const apiClient = axios.create({
    baseURL: API_URL, // Base URL for the authenticated requests
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }
});

// Product-related API calls
export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`); // Fetch products
    return response.data;
};

export const createProduct = async (product) => {
    const response = await apiClient.post('/products', product); // Create a product
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await apiClient.put(`/products/${id}`, product); // Update a product by ID
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await apiClient.delete(`/products/${id}`); // Delete a product by ID
    if (response.status !== 204) {
        throw new Error('Failed to delete product');
    }
    return response.data;
};

// User authentication API calls
export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData); // Register a user
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData); // Login a user
    return response.data;
};
