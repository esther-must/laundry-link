import { Link } from "react-router-dom";
import useStore from "../store/store";

const OrdersTab = () => {
  const userOrders = useStore((state) => state.userOrders) || [];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold mb-4">Your Orders</h2>

      {userOrders.length === 0 ? (
        <p className="text-center text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <p className="font-semibold">{order.service}</p>
              <p className="text-gray-600 text-sm">Status: {order.status}</p>
              
              <Link
                to={`/track-order/${order.id}`}
                className="mt-2 inline-block bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition"
              >
                Track Order
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersTab;
