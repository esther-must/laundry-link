import { useEffect, useState } from "react";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const OrderScreen = ({ cart }) => {
  const navigate = useNavigate();
  const PICKUP_FEE = 1000; // Fixed pickup fee
  const [pickupBill, setPickupBill] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // ✅ Load cart from localStorage when component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // ✅ Update cartItems when cart from `App.js` changes
  useEffect(() => {
    if (cart && cart.length > 0) {
      setCartItems(cart);
    }
  }, [cart]);

  // ✅ Save updated cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Increase or decrease quantity
  const handleQuantityChange = (id, type) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  // ❌ Remove an item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // 🛒 Totals
  const totalItems = (cartItems || []).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = (cartItems || []).reduce((sum, item) => sum + item.price * item.quantity, 0) + pickupBill;

  return (
    <div className="p-4 md:p-6 bg-gradient-to-t from-gray-50 to-blue-50 min-h-screen max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <button onClick={() => navigate(-1)} className="text-blue-600 text-lg flex items-center gap-2">
          <FiArrowLeft size={20} /> Orders
        </button>
      </div>

      {/* PickUp / Drop Off */}
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => setPickupBill(PICKUP_FEE)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all"
        >
          PickUp
        </button>
        <button
          onClick={() => setPickupBill(0)}
          className="flex-1 bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-all"
        >
          Drop Off
        </button>
      </div>

      {/* Your Order Section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold text-gray-800">Your Order</h2>
          {cartItems.length > 0 && (
            <FiTrash2
              className="text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => setCartItems([])}
            />
          )}
        </div>

        {/* Order Items */}
        <div className="mt-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center">No items in your order.</p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-all"
              >
                <img src={item.img} alt={item.name} className="w-12 h-12 rounded-md" />
                <div className="flex-1 ml-3">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-gray-600">₦{item.price.toLocaleString()}</p>
                </div>
                {/* Quantity Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, "decrease")}
                    className="bg-gray-300 px-2 rounded-md hover:bg-gray-400"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, "increase")}
                    className="bg-gray-300 px-2 rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
                <FiTrash2
                  className="text-red-500 cursor-pointer ml-2 hover:text-red-700"
                  onClick={() => removeItem(item.id)}
                />
              </div>
            ))
          )}
        </div>

        {/* Add More Button */}
        <button
          onClick={() => navigate("/products")}
          className="w-full mt-4 border-2 border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-600 hover:text-white transition-all"
        >
          Add More +
        </button>
      </div>

      {/* Bill Details */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Bill Details</h2>
        <div className="flex justify-between text-sm mt-2">
          <span>Subtotal</span>
          <span className="font-semibold text-blue-600">₦{totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Selected Items</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        {/* Pickup Bill */}
        {pickupBill > 0 && (
          <div className="flex justify-between text-sm mt-2">
            <span>Pickup Fee</span>
            <span className="font-semibold text-blue-600">₦{pickupBill.toLocaleString()}</span>
          </div>
        )}

        <div className="flex justify-between font-semibold text-md mt-4 border-t pt-2">
          <span>Total Price</span>
          <span className="text-blue-600">₦{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => navigate("/checkout", { state: { totalPrice } })}
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold mt-6 hover:bg-blue-700 transition-all"
        disabled={cartItems.length === 0}
      >
        {cartItems.length === 0 ? "Cart is Empty" : "Check Out"}
      </button>

      <BottomNav />
    </div>
  );
};

export default OrderScreen;
