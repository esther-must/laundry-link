import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useStore from "../store/store";

const servicePrices = {
  "Wash & Fold": 2000,
  "Ironing": 1500,
  "Dry Cleaning": 2500,
};
const validDiscountCodes = { "SAVE10": 10, "FIRST50": 50 };

const BusinessModal = ({ isOpen, closeModal, business }) => {
  const addUserOrder = useStore((state) => state.addUserOrder);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  if (!business) return null;

  const [booking, setBooking] = useState({
    name: "",
    date: "",
    time: "",
    address: "",
    service: "Wash & Fold",
    notes: "",
    price: servicePrices["Wash & Fold"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({
      ...prev,
      [name]: value,
      price: name === "service" ? servicePrices[value] - discountAmount : prev.price,
    }));
  };

  const applyDiscount = () => {
    if (validDiscountCodes[discountCode]) {
      setDiscountAmount(validDiscountCodes[discountCode]);
      setBooking((prev) => ({
        ...prev,
        price: servicePrices[prev.service] - validDiscountCodes[discountCode],
      }));
    } else {
      alert("Invalid discount code");
      setDiscountAmount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!booking.name || !booking.date || !booking.time || !booking.address) {
      alert("Please fill in all required fields.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      service: business.name,
      customer: booking.name,
      date: booking.date,
      time: booking.time,
      address: booking.address,
      notes: booking.notes,
      price: booking.price,
      status: "Pending",
    };

    addUserOrder(newOrder);
    localStorage.setItem("bookings", JSON.stringify([...JSON.parse(localStorage.getItem("bookings")) || [], newOrder]));

    try {
      const response = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) throw new Error("Failed to save order");
      setIsSubmitted(true);
      setTimeout(() => { setIsSubmitted(false); closeModal(); }, 2000);
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4">
          <Dialog.Panel className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <Dialog.Title className="text-2xl font-bold">{business.name}</Dialog.Title>
            <img src={business.image || "https://via.placeholder.com/300"} alt={business.name} className="w-full h-56 object-cover rounded-md mt-4" />
            <div className="mt-4">
              <p className="text-gray-600">{business.description}</p>
              <p className="mt-2 text-gray-700"><strong>Services:</strong> {business.services?.join(", ") || "N/A"}</p>
              <p className="mt-2 text-gray-700"><strong>Location:</strong> {business.location || "Not available"}</p>
            </div>
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold">Request a Pickup</h3>
              {isSubmitted ? (
                <p className="text-green-600 font-bold mt-2">✅ Booking successful!</p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-3 space-y-3">
                  <input type="text" name="name" value={booking.name} onChange={handleChange} placeholder="Your Name" required className="w-full p-2 border rounded-md" />
                  <div className="flex gap-2">
                    <input type="date" name="date" value={booking.date} onChange={handleChange} required className="w-1/2 p-2 border rounded-md" />
                    <input type="time" name="time" value={booking.time} onChange={handleChange} required className="w-1/2 p-2 border rounded-md" />
                  </div>
                  <input type="text" name="address" value={booking.address} onChange={handleChange} placeholder="Pickup Address" required className="w-full p-2 border rounded-md" />
                  <label className="block font-medium">Select Service:</label>
                  <select name="service" value={booking.service} onChange={handleChange} className="w-full p-2 border rounded-md">
                    {Object.keys(servicePrices).map(service => <option key={service} value={service}>{service}</option>)}
                  </select>
                  <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="Enter discount code" className="w-full p-2 border rounded-md" />
                  <button type="button" onClick={applyDiscount} className="bg-blue-500 text-white py-1 px-3 rounded-md">Apply Discount</button>
                  <p className="mt-2 text-gray-700 font-semibold">Total Price: <span className="text-green-600">₦{booking.price}</span></p>
                  <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">Submit Request</button>
                </form>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Close</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BusinessModal;
