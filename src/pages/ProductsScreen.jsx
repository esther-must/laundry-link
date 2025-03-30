import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductsScreen = ({ addToCart }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);  // ✅ Use the function passed from App.js
    navigate("/orders"); // ✅ Navigate to the OrderScreen
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <img src={product.img} alt={product.name} className="w-full h-32 object-cover" />
            <h3 className="text-md font-bold mt-2">{product.name}</h3>
            <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-600 text-white py-2 mt-2 rounded-lg w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsScreen;
