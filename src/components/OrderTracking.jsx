import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useStore from "../store/store";

const OrderTracking = () => {
  const { orderId } = useParams();
  const userOrders = useStore((state) => state.userOrders) || [];
  const fetchUserOrders = useStore((state) => state.fetchUserOrders);

  const [order, setOrder] = useState(null);
  const [status, setStatus] = useState("Pending");
  const [estimatedTime, setEstimatedTime] = useState("Calculating...");

  useEffect(() => {
    if (userOrders.length === 0) {
      fetchUserOrders();
    }
  }, [userOrders, fetchUserOrders]);

  useEffect(() => {
    if (userOrders.length > 0) {
      const foundOrder = userOrders.find((o) => o.id === Number(orderId));
      setOrder(foundOrder);
      setStatus(foundOrder?.status || "Pending");
    }
  }, [userOrders, orderId]);

  useEffect(() => {
    if (!order) return;

    if (order.status === "Processing") setEstimatedTime("30-45 mins");
    if (order.status === "Out for Delivery") setEstimatedTime("15-30 mins");
    if (order.status === "Delivered") setEstimatedTime("Arrived");

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

  if (!userOrders.length) return <p className="text-center py-4">Loading orders...</p>;
  if (!order) {
    return (
      <div className="p-4 sm:p-6 text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-red-500">Order Not Found</h2>
        <p className="text-gray-600">The order ID you entered does not exist.</p>
      </div>
    );
  }

  const statusSteps = ["Pending", "Processing", "Out for Delivery", "Delivered"];
  const currentStep = statusSteps.indexOf(status);

  return (
    <div className="max-w-lg w-full mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center sm:text-left">Order Tracking</h2>
      <p className="text-gray-700 text-sm sm:text-base"><strong>Order ID:</strong> {order.id}</p>
      <p className="text-gray-700 text-sm sm:text-base"><strong>Service:</strong> {order.service}</p>
      <p className="text-gray-700 text-sm sm:text-base"><strong>Estimated Delivery:</strong> {estimatedTime}</p>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(currentStep / (statusSteps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-2">
          {statusSteps.map((step, index) => (
            <span key={index} className={index <= currentStep ? "text-green-600 font-semibold" : "text-gray-400"}>
              {step}
            </span>
          ))}
        </div>
      </div>

      {/* Support Button */}
      <button
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        onClick={() => alert("Contacting support...")}
      >
        Contact Support
      </button>
    </div>
  );
};

export default OrderTracking;
