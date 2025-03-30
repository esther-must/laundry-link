import { useState, useEffect } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);

  // Helper function to fetch from localStorage
  const getStoredData = (key) => JSON.parse(localStorage.getItem(key)) || [];

  // Fetch bookings & orders from localStorage on mount
  useEffect(() => {
    setBookings(getStoredData("bookings"));
    setOrders(getStoredData("orders"));
  }, []);

  // Delete a booking with confirmation
  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    const updatedBookings = bookings.filter((_, i) => i !== index);
    const updatedOrders = orders.filter((_, i) => i !== index);

    setBookings(updatedBookings);
    setOrders(updatedOrders);

    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800">📌 Your Bookings</h2>

      {bookings.length === 0 ? (
        <p className="mt-4 text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                <th className="border p-2">#</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Pickup Date</th>
                <th className="border p-2">Pickup Time</th>
                <th className="border p-2">Address</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index} className="text-center border hover:bg-gray-50 transition">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{booking.name || "N/A"}</td>
                  <td className="border p-2">{booking.date || "N/A"}</td>
                  <td className="border p-2">{booking.time || "N/A"}</td>
                  <td className="border p-2">{booking.address || "N/A"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
