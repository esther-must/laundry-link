import { useState, useEffect } from "react";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  // Fetch bookings from localStorage
  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  // Delete a booking
  const handleDelete = (index) => {
    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
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
              <tr className="bg-gray-100">
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
                <tr key={index} className="text-center border">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{booking.name}</td>
                  <td className="border p-2">{booking.date}</td>
                  <td className="border p-2">{booking.time}</td>
                  <td className="border p-2">{booking.address}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
