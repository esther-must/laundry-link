import { useEffect, useState } from "react";
import useStore from "../store/store";

const OrderTracking = ({ orderId }) => {
  const orders = useStore((state) => state.orders);
  const order = orders.find((o) => o.id === orderId);
  const [status, setStatus] = useState(order?.status || "Pending");
  const [estimatedTime, setEstimatedTime] = useState("Calculating...");

  useEffect(() => {
    if (!order) return;
    
    // Mock estimated delivery time calculation
    if (order.status === "Processing") setEstimatedTime("30-45 mins");
    if (order.status === "Out for Delivery") setEstimatedTime("15-30 mins");
    if (order.status === "Delivered") setEstimatedTime("Arrived");

    // Simulating real-time tracking updates (replace with backend integration)
    const interval = setInterval(() => {
      setStatus((prev) => {
        if (prev === "Pending") return "Processing";
        if (prev === "Processing") return "Out for Delivery";
        if (prev === "Out for Delivery") return "Delivered";
        return prev;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [order]);

  if (!order) return <p>Order not found.</p>;

  const statusSteps = ["Pending", "Processing", "Out for Delivery", "Delivered"];
  const currentStep = statusSteps.indexOf(status);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Tracking</h2>
      <p className="text-gray-700 mb-2"><strong>Order ID:</strong> {order.id}</p>
      <p className="text-gray-700 mb-2"><strong>Service:</strong> {order.service}</p>
      <p className="text-gray-700 mb-2"><strong>Estimated Delivery:</strong> {estimatedTime}</p>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          {statusSteps.map((step, index) => (
            <span key={index} className={index <= currentStep ? "text-green-600 font-semibold" : "text-gray-400"}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Support Button */}
      <button
        className="mt-6 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        onClick={() => alert("Contacting support...")}
      >
        Contact Support
      </button>
    </div>
  );
};

export default OrderTracking;
