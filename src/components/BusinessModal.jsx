import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const BusinessModal = ({ isOpen, closeModal, business }) => {
  if (!business) return null; // Prevents errors if business is undefined

   // Booking Form State
   const [booking, setBooking] = useState({
    name: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle Form Input Change
  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulating saving to localStorage (Replace with API call later)
    const bookings = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...bookings, booking]));

    // Show confirmation message
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setIsSubmitted(false);
      setBooking({ name: "", date: "", time: "", address: "", notes: "" });
      closeModal();
    }, 2000);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            {/* Modal Header */}
            <Dialog.Title className="text-2xl font-bold">
              {business.name}
            </Dialog.Title>

            {/* Business Image */}
            <img
              src={business.image || "https://via.placeholder.com/300"}
              alt={business.name}
              className="w-full h-56 object-cover rounded-md mt-4"
            />

            {/* Business Details */}
            <div className="mt-4">
              <p className="text-gray-600">{business.description}</p>
              <p className="mt-2 text-gray-700">
                <strong>Services:</strong> {business.services.join(", ")}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Location:</strong> {business.location}
              </p>
              <p className="mt-2 text-yellow-500">
                <strong>⭐ Rating:</strong> {business.rating || "N/A"}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Price:</strong> ₦{business.price}
              </p>
            </div>

             {/* Booking Form */}
             <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Request a Pickup</h3>

              {isSubmitted ? (
                <p className="text-green-600 font-bold mt-2">
                  ✅ Booking successful! We'll contact you soon.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                  
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    value={booking.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                    className="w-full p-2 border rounded-md"
                  />

                  {/* Date & Time */}
                  <div className="flex gap-2">
                    <input
                      type="date"
                      name="date"
                      value={booking.date}
                      onChange={handleChange}
                      required
                      className="w-1/2 p-2 border rounded-md"
                    />
                    <input
                      type="time"
                      name="time"
                      value={booking.time}
                      onChange={handleChange}
                      required
                      className="w-1/2 p-2 border rounded-md"
                    />
                  </div>

                  {/* Address */}
                  <input
                    type="text"
                    name="address"
                    value={booking.address}
                    onChange={handleChange}
                    placeholder="Pickup Address"
                    required
                    className="w-full p-2 border rounded-md"
                  />

                  {/* Additional Notes */}
                  <textarea
                    name="notes"
                    value={booking.notes}
                    onChange={handleChange}
                    placeholder="Any additional notes..."
                    rows="3"
                    className="w-full p-2 border rounded-md"
                  ></textarea>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
                  >
                    Submit Request
                  </button>
                </form>
              )}
            </div>

            {/* Close Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BusinessModal;
