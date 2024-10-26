import axios from 'axios';

const API_URL = 'http://localhost:5000/products';
const AUTH_URL = 'http://localhost:5000';

// Get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Set up axios instance for authenticated requests
const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}` // Include token in the headers
    }
});

// Product-related API calls
export const fetchProducts = async () => {
    const response = await axios.get(API_URL); // Use axios directly without auth
    return response.data;
};

export const createProduct = async (product) => {
    const response = await apiClient.post('/', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await apiClient.put(`/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await apiClient.delete(`/${id}`);
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
