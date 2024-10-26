import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, onLogout }) {
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div>
                <Link to="/" className="text-white font-semibold hover:text-gray-300">
                    Product Dekho
                </Link>
            </div>
            <div className="flex space-x-4">
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="text-white hover:text-gray-300">
                            Login
                        </Link>
                        <Link to="/register" className="text-white hover:text-gray-300">
                            Register
                        </Link>
                    </>
                ) : (
                    <button 
                        onClick={onLogout} 
                        className="text-white hover:text-gray-300"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
