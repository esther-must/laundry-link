import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingsPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || [];

  useEffect(() => {
    setBookings(getStoredData("bookings"));
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    if (deleteIndex === null) return;

    const updatedBookings = bookings.filter((_, i) => i !== deleteIndex);
    const updatedOrders = orders.filter((_, i) => i !== deleteIndex);

    setBookings(updatedBookings);
    setOrders(updatedOrders);

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    setShowModal(false);
    setDeleteIndex(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Home
      </button>

      <h2 className="text-3xl font-semibold text-blue-600">Your Bookings</h2>

      {bookings.length === 0 ? (
        <p className="mt-4 text-gray-600">No bookings found.</p>
      ) : (
        <>
          {/* Table view */}
          <div className="hidden sm:block overflow-x-auto mt-6">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-blue-100 text-blue-700 text-sm uppercase">
                  <th className="border p-4">#</th>
                  <th className="border p-4">Name</th>
                  <th className="border p-4">Pickup Date</th>
                  <th className="border p-4">Pickup Time</th>
                  <th className="border p-4">Address</th>
                  <th className="border p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="text-center border hover:bg-blue-50 transition"
                  >
                    <td className="border p-4">{index + 1}</td>
                    <td className="border p-4">{booking.customer || "N/A"}</td>
                    <td className="border p-4">{booking.date || "N/A"}</td>
                    <td className="border p-4">{booking.time || "N/A"}</td>
                    <td className="border p-4">{booking.address || "N/A"}</td>
                    <td className="border p-4">
                      <button
                        onClick={() => confirmDelete(index)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card view for smaller screens */}
          <div className="sm:hidden mt-6 space-y-4">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 shadow-lg bg-white hover:shadow-xl transition"
              >
                <h3 className="font-semibold text-xl text-blue-600 mb-4">{booking.customer || "N/A"}</h3>
                <p><span className="font-semibold">Date:</span> {booking.date || "N/A"}</p>
                <p><span className="font-semibold">Time:</span> {booking.time || "N/A"}</p>
                <p><span className="font-semibold">Address:</span> {booking.address || "N/A"}</p>
                <button
                  onClick={() => confirmDelete(index)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-semibold text-blue-600 mt-8">Successful Orders</h2>

          {orders.length === 0 ? (
            <p className="mt-4 text-gray-600">No successful orders found.</p>
          ) : (
            <div className="mt-6 space-y-4">
              {orders.map((order, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-6 shadow-lg bg-white hover:shadow-xl transition"
                >
                  <h3 className="font-semibold text-xl text-blue-600 mb-4">Order #{index + 1}</h3>
                  <p><span className="font-semibold">Order ID:</span> {order.orderId || "N/A"}</p>
                  <p><span className="font-semibold">Payment Method:</span> {order.paymentMethod || "N/A"}</p>
                  <p><span className="font-semibold">Delivery Method:</span> {order.deliveryMethod || "N/A"}</p>
                  <p><span className="font-semibold">Total:</span> ₦{order.totalPrice || "N/A"}</p>
                  <p><span className="font-semibold">Date:</span> {order.date || "N/A"}</p>
                </div>
              ))}
            </div>
          )}

        </>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-[90%] max-w-md">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this booking?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
