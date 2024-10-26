import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
    const [productToEdit, setProductToEdit] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleEdit = (product) => setProductToEdit(product);
    const handleFormSubmit = () => setProductToEdit(null);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
                <Route 
                    path="/" 
                    element={
                        <>
                            <ProductForm productToEdit={productToEdit} onSubmit={handleFormSubmit} />
                            <ProductList onEdit={handleEdit} />
                        </>
                    } 
                />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register onRegister={handleLogin} />} />
            </Routes>
        </Router>
    );
}

export default App;
