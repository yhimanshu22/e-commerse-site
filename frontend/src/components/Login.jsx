import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { loginUser } from '../api/productApi';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ username, password });
            localStorage.setItem('token', response.token); // Store the JWT token
            onLogin(); // Call parent login function
            navigate('/'); // Redirect to homepage after login
        } catch (error) {
            setMessage(error.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form 
                onSubmit={handleLogin} 
                className="bg-gray-800 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
            >
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="border border-gray-600 rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border border-gray-600 rounded w-full py-2 px-3 text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Login
                </button>
            </form>
            {message && <p className="text-red-500">{message}</p>}
        </div>
    );
};

export default Login;



