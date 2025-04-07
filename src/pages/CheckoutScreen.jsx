import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import PaystackPayment from "../components/PaystackPayment";
import BottomNav from "../components/BottomNav";
import cardImg from '../assets/card.png';

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const total = location.state?.totalPrice || 0;
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const deliveryFee = deliveryMethod === "pickup" ? 0 : 500;
  const totalCheckoutPrice = total + deliveryFee;

  const handlePaymentSuccess = (response) => {
    console.log("Payment successful:", response);
  
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
    const newOrder = {
      orderId: response.reference,
      businessName: location.state?.businessName,
      totalPrice: totalCheckoutPrice,
      paymentMethod,
      deliveryMethod,
      date: new Date().toLocaleString(),
    };
  
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
  
    navigate("/order-success");
  };  

  // Handle Confirm Order Click
  const handleConfirmOrder = () => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  
    const newOrder = {
      orderId: new Date().getTime(),
      businessName: location.state?.businessName,
      totalPrice: totalCheckoutPrice,
      paymentMethod,
      deliveryMethod,
      date: new Date().toLocaleString(),
    };
  
    existingOrders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(existingOrders));
  
    if (paymentMethod === "card") {
      navigate("/wallet", { state: { totalCheckoutPrice } });
    } else if (paymentMethod === "cod") {
      navigate("/order-success");
    }
  };  

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <button onClick={() => navigate(-1)} className="text-blue-600 text-lg flex items-center gap-2">
          <FiArrowLeft size={20} /> Checkout
        </button>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold border-b pb-2">Order Summary</h2>
        <div className="flex justify-between text-sm mt-2">
          <span>Total</span>
          <span className="font-semibold text-blue-600">₦{total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span>Delivery Fee</span>
          <span className="font-semibold text-blue-600">₦{deliveryFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold text-md mt-4 border-t pt-2">
          <span>Total Price</span>
          <span className="text-blue-600">₦{totalCheckoutPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold border-b pb-2">Payment Method</h2>
        <div className="flex flex-col gap-2 mt-2">
          {/* Card Payment */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            <img src={cardImg} alt="Card" className="w-60 h-36 rounded" />
          </label>

          {/* Paystack Payment Button */}
          {paymentMethod === "card" && (
            <PaystackPayment amount={totalCheckoutPrice * 100} email="user@example.com" onSuccess={handlePaymentSuccess} />
          )}

          {/* Pay on Delivery */}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            />
            <span>Pay on Delivery</span>
          </label>
        </div>
      </div>

      {/* Delivery Options */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold border-b pb-2">Delivery Options</h2>
        <div className="flex justify-between text-sm mt-2">
          {/* Delivery */}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="delivery"
              value="delivery"
              checked={deliveryMethod === "delivery"}
              onChange={() => setDeliveryMethod("delivery")}
            />
            <span>Delivery</span>
          </label>

          {/* Pickup */}
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="delivery"
              value="pickup"
              checked={deliveryMethod === "pickup"}
              onChange={() => setDeliveryMethod("pickup")}
            />
            <span>Pickup</span>
          </label>
        </div>
      </div>

      {/* Confirm Order Button */}
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold mt-6"
        onClick={handleConfirmOrder} // Handle navigation on click
      >
        Confirm Order
      </button>

      <BottomNav />
    </div>
  );
};

export default CheckoutScreen;
