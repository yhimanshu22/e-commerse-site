import axios from 'axios';

// Define base URL for the API
const AUTH_URL = 'https://e-commerse-site-m1a3.onrender.com';

// Function to retrieve token from local storage
const getAuthToken = () => localStorage.getItem('token');

// Create Axios instance
const apiClient = axios.create({
    baseURL: AUTH_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add interceptor to attach token to each request (for protected routes only)
apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Product-related API calls
export const fetchProducts = async () => {
    // Public route for fetching all products (no auth required)
    const response = await axios.get(`${AUTH_URL}/products`);
    return response.data;
};

export const createProduct = async (product) => {
    // Protected route
    const response = await apiClient.post('/products', product);
    return response.data;
};

export const updateProduct = async (id, product) => {
    // Protected route
    const response = await apiClient.put(`/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    // Protected route
    const response = await apiClient.delete(`/products/${id}`);
    if (response.status !== 204) {
        throw new Error('Failed to delete product');
    }
    return response.data;
};

// User authentication API calls
export const registerUser = async (userData) => {
    const response = await apiClient.post('/register', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await apiClient.post('/login', userData);
    return response.data;
};
