import axios from 'axios';

const API_URL = 'http://localhost:5000/products';
const AUTH_URL = 'http://localhost:5000';

// Product-related API calls
export const fetchProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createProduct = async (product) => {
    const response = await axios.post(API_URL, product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await axios.put(`${API_URL}/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
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
