import { useState, useEffect } from 'react';
import { createProduct, updateProduct } from '../api/productApi';

function ProductForm({ productToEdit, onSubmit }) {
    const [product, setProduct] = useState({ name: '', description: '', price: '', quantity: '' }); // Initialize with empty strings

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct({ name: '', description: '', price: '', quantity: '' }); // Reset state if no product to edit
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let result;
            const { id, name, description, price, quantity } = product;
    
            if (id) {
                result = await updateProduct(id, { name, description, price: parseFloat(price), quantity: parseInt(quantity) });
            } else {
                result = await createProduct({ name, description, price: parseFloat(price), quantity: parseInt(quantity) });
            }
            console.log("Product Added/Updated:", result); 
            onSubmit(); 
            
            
            window.location.reload();
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to submit the product. Please try again."); // Inform user of error
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-white text-xl mb-4">{product.id ? "Edit Product" : "Add Product"}</h2>
            <input
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="block w-full mb-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <input
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="block w-full mb-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <input
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="block w-full mb-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <input
                name="quantity"
                type="number"
                value={product.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
                className="block w-full mb-4 p-2 rounded border border-gray-600 bg-gray-700 text-white"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                {product.id ? "Update" : "Add"} Product
            </button>
        </form>
    );
}

export default ProductForm;

