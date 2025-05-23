import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import useStore from "../store/store";

const OrderSuccessScreen = () => {
  const navigate = useNavigate();
  const { addBooking } = useStore();

  // Retrieve order details from localStorage (or any temporary state like sessionStorage)
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || {};

  useEffect(() => {
    if (orderDetails) {
      // Add the order to bookings
      addBooking({
        orderId: orderDetails.orderId,
        businessName: orderDetails.businessName,
        totalPrice: orderDetails.totalPrice,
        paymentMethod: orderDetails.paymentMethod,
        deliveryMethod: orderDetails.deliveryMethod,
        status: "Confirmed",
        date: new Date().toISOString(), // Add the current date
      });

      // Optionally clear order details after adding to bookings
      localStorage.removeItem("orderDetails");
    }
  }, [orderDetails, addBooking]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Success Icon */}
      <FiCheckCircle className="text-green-500 text-6xl animate-bounce" />

      {/* Success Message */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">Order Placed Successfully!</h2>
      <p className="text-gray-600 mt-2 text-center">Your order has been received and is being processed.</p>

      {/* Order Details (Optional) */}
      <div className="bg-white p-4 mt-6 rounded-lg shadow-md w-full max-w-md text-center">
        <p className="text-lg font-medium text-gray-700">Estimated Delivery: <span className="font-semibold">2-3 days</span></p>
        <p className="text-gray-500 text-sm mt-1">You'll receive an update when your cloth/clothes is/are ready.</p>
      </div>

      {/* Back to Home Button */}
      <button
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg"
        onClick={() => navigate("/home")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccessScreen;
