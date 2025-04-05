import { useState } from "react";
import { PaystackButton } from "react-paystack";

const PaystackPayment = ({ amount, email, onSuccess }) => {
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [paymentStatus, setPaymentStatus] = useState("");

  const handleSuccess = (response) => {
    setPaymentStatus("Payment Successful! ✅");
    onSuccess(response);
  };

  const handleClose = () => {
    setPaymentStatus("Payment window closed ❌");
  };

  const componentProps = {
    email,
    amount: amount,
    publicKey,
    text: "Pay Now",
    onSuccess: handleSuccess,
    onClose: handleClose,
  };

  return (
    <div>
      <PaystackButton {...componentProps} className="bg-blue-600 text-white p-2 rounded-lg" />
      {paymentStatus && <p className="mt-2 text-sm text-gray-700">{paymentStatus}</p>}
    </div>
  );
};

export default PaystackPayment;
