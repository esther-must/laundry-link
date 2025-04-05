import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const WalletScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const totalCheckoutPrice = location.state?.totalCheckoutPrice || 0;

  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setAddress] = useState("");

  // Handle Confirm Order Click
  const handleConfirmOrder = () => {
    // Simple form validation
    if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
      alert("Please fill in all card details before proceeding.");
      return;
    }

    // Navigate to order success screen
    navigate("/order-success");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <button onClick={() => navigate(-1)} className="text-blue-600 text-lg flex items-center gap-2">
          <FiArrowLeft size={20} /> Add Card
        </button>
      </div>

      {/* Card Input Fields */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4 space-y-3">
        {/* Card Number */}
        <div>
          <label className="text-sm font-medium">Card number</label>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1 text-gray-700"
          />
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="text-sm font-medium">Cardholder name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full p-2 border rounded-lg mt-1 text-gray-700"
          />
        </div>

        {/* Expiry Date & CVV */}
        <div className="flex gap-2">
          <div className="w-1/2">
            <label className="text-sm font-medium">Expiry date</label>
            <input
              type="text"
              placeholder="MM / YYYY"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1 text-gray-700"
            />
          </div>
          <div className="w-1/2">
            <label className="text-sm font-medium">CVV / CVC</label>
            <input
              type="text"
              placeholder="3-4 digits"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="w-full p-2 border rounded-lg mt-1 text-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Address Input */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h2 className="text-lg font-semibold border-b pb-2">Deliver to</h2>
        <input
          type="text"
          placeholder="Enter your address/location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded-lg mt-2 text-gray-700"
        />
      </div>

      {/* Total Price */}
      <div className="flex justify-between text-lg font-semibold mt-6">
        <span>Total Price</span>
        <span className="text-blue-600">₦{totalCheckoutPrice.toLocaleString()}</span>
      </div>

      {/* Confirm Order Button */}
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold mt-6"
        onClick={handleConfirmOrder} // ✅ Handle navigation on click
      >
        Confirm Order
      </button>

      <BottomNav />
    </div>
  );
};

export default WalletScreen;
