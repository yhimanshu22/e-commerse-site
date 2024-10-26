import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchProducts, deleteProduct } from '../api/productApi';

function ProductList({ onEdit }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const result = await fetchProducts();
                setProducts(result || []); // Update based on expected API response
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);


    if (loading) return <div className="text-white">Loading products...</div>;
    if (error) {
        return (
            <div className="flex items-center justify-center p-4 bg-red-600 text-white rounded-md shadow-md">
                <div>
                    <h3 className="font-semibold">Error:</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => window.location.reload()} // You can replace this with a retry function if applicable
                        className="mt-2 px-4 py-2 bg-red-700 rounded hover:bg-red-800 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }
    

    return (
        <div className="container mx-auto p-4 bg-gray-800 min-h-screen">
            <h2 className="text-2xl font-bold mb-4 text-white">Product List</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    {products.map((product) => (
        <div 
            key={product.id} 
            className="bg-gray-800 border border-gray-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-4 flex flex-col justify-between"
        >
            <h3 className="text-lg font-semibold text-white">{product.name}</h3>
            <p className="text-gray-400">{product.description}</p>
            <p className="text-gray-300">${product.price} - Qty: {product.quantity}</p>
            <div className="mt-4 flex space-x-2">
                <button 
                    onClick={() => onEdit(product)} 
                    className="flex-1 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                >
                    Edit
                </button>
                <button
    type="button"
    onClick={async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            try {
                await deleteProduct(product.id); // Make sure this function is defined in your API file
                setProducts(products.filter((p) => p.id !== product.id)); // Update the product list
            } catch (error) {
                console.error("Error deleting product:", error);
                setError("Failed to delete product");
            }
        }
    }}
    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
>
    Delete
</button>

               
            </div>
        </div>
    ))}
</div>

        </div>
    );
}
ProductList.propTypes = {
    onEdit: PropTypes.func.isRequired,
};


export default ProductList;



