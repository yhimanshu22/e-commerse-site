import axios from 'axios';

const AUTH_URL = 'https://e-commerse-site-m1a3.onrender.com';

// Get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Set up axios instance for authenticated requests
const apiClient = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
    }
});

// Product-related API calls
export const fetchProducts = async () => {
    const response = await axios.get(`${AUTH_URL}/products`);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await apiClient.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    if (response.status !== 204) {
        throw new Error('Failed to delete product');
    }
    return response.data;
};

// User authentication API calls
export const registerUser = async (userData) => {
    const response = await axios.post(`${AUTH_URL}/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${AUTH_URL}/login`, userData);
    return response.data;
};
