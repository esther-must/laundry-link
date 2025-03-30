import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import BookingsPage from "./pages/BookingsPage";
import OrderTracking from "./components/OrderTracking";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./components/LandingPage";
import Onboarding from "./components/Onboarding";
import OrderScreen from "./pages/OrderScreen";
import CheckoutScreen from "./pages/CheckoutScreen";
import WalletScreen from "./pages/WalletScreen";
import OrderSuccessScreen from "./pages/OrderSuccessScreen";
import ProductsScreen from "./pages/ProductsScreen";

function App() {
  // 🛒 Cart state (shared between ProductsScreen & OrderScreen)
  const [cart, setCart] = useState([]);

  // ➕ Function to add items to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already exists in cart
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        // Increase quantity if already exists
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Add new product with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/track-order/:orderId" element={<OrderTracking />} />
          <Route path="/orders" element={<OrderScreen cart={cart} />} />
          <Route path="/checkout" element={<CheckoutScreen />} />
          <Route path="/wallet" element={<WalletScreen />} />
          <Route path="/order-success" element={<OrderSuccessScreen />} />
          
          {/* ✅ Pass addToCart as a prop to ProductsScreen */}
          <Route path="/products" element={<ProductsScreen addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
