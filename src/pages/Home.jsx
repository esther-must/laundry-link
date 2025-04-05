import { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import BusinessCard from "../components/BusinessCard";
import SearchBar from "../components/SearchBar";
import FilterOptions from "../components/FilterOptions";
import SortOptions from "../components/SortOptions";
import BottomNav from "../components/BottomNav";

const Home = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Picked Up");
  const { businesses, fetchBusinesses, getFilteredBusinesses, isLoading, userOrders, fetchUserOrders } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [notifications, setNotifications] = useState([
    { id: 1, message: "Your order is ready for delivery!" },
    { id: 2, message: "Your clothes are being washed." },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const demoOrders = {
    "Picked Up": [
      { id: 1, item: "5 Shirts & 2 Trousers", date: "March 24", eta: "March 27" },
      { id: 2, item: "Bed Sheets & Duvet", date: "March 23", eta: "March 26" }
    ],
    "Washing": [
      { id: 3, item: "6 T-shirts & Jeans", date: "March 22", eta: "March 25" },
      { id: 4, item: "Office Suits & Blazers", date: "March 21", eta: "March 24" }
    ],
    "Ready for Delivery": [
      { id: 5, item: "Casual Wear & Towels", date: "March 20", eta: "Out for delivery" },
      { id: 6, item: "Children’s Clothes", date: "March 19", eta: "Out for delivery" }
    ]
  };

  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/50");

  useEffect(() => {
    fetchBusinesses();
    fetchUserOrders();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

    // Retrieve profilePic from localStorage on component mount
    const storedProfilePic = localStorage.getItem('profilePic');
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }

    return () => unsubscribe();
  }, []);

  const filteredBusinesses = getFilteredBusinesses();
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  const displayedBusinesses = filteredBusinesses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* USER GREETING */}
{user && (
  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg rounded-lg p-5 md:p-6 mb-4 flex items-center gap-4 transition transform hover:scale-105">
    <img
      src={profilePic}
      alt="Profile"
      className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 border-white"
    />
    <div>
      <p className="text-lg md:text-2xl font-bold flex items-center">
        Welcome back, {user.displayName ? user.displayName : user.email ? user.email.split('@')[0] : "User"}!
      </p>
      <p className="text-sm md:text-md opacity-90">Let’s track your laundry journey.</p>
    </div>

    {/* NOTIFICATION BUTTON */}
    <div className="relative ml-auto">
      <button onClick={toggleDropdown} className="relative p-2">
        <FiBell size={24} className="text-white-700" />
        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
            {notifications.length}
          </span>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-3">
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id} className="text-sm text-gray-700 mb-2">
                {notification.message}
              </li>
            ))}
          </ul>
          {notifications.length === 0 && <p className="text-xs text-gray-500">No new notifications</p>}
        </div>
      )}
    </div>
  </div>
)}

      {/* ORDER TRACKING */}
      <div className="bg-white p-5 md:p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-lg md:text-xl font-semibold mb-3">Active Orders</h2>

        <div className="flex gap-3 md:gap-5 text-sm md:text-md border-b pb-3 overflow-x-auto">
          {["Picked Up", "Washing", "Ready for Delivery"].map((status) => (
            <button
              key={status}
              className={`px-4 py-2 rounded-full transition font-semibold ${
                activeTab === status ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setActiveTab(status)}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Display Orders Based on Selected Tab */}
        <div className="mt-4">
          {demoOrders[activeTab].length > 0 ? (
            demoOrders[activeTab].map((order) => (
              <div
                key={order.id}
                className="bg-gray-100 p-4 rounded-lg flex justify-between items-center mb-2 transition hover:bg-gray-200"
              >
                <div>
                  <p className="text-md font-semibold">{order.item}</p>
                  <p className="text-sm text-gray-600">Picked: {order.date}</p>
                  <p className="text-sm text-gray-600">ETA: {order.eta}</p>
                </div>
                <span className="text-lg">{order.statusIcon}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      </div>

      {/* CTA BUTTON */}
      <button
        onClick={() => navigate("/bookings")}
        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition"
      >
        View All Orders →
      </button>

      {/* BUSINESS LISTINGS */}
      <div className="mt-8 bg-white p-5 md:p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 mb-4">
          <SearchBar />
          <FilterOptions />
          <SortOptions />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedBusinesses.length > 0 ? (
            displayedBusinesses.map((business) => <BusinessCard key={business.id} business={business} />)
          ) : (
            <p className="text-center col-span-full text-gray-500 text-sm md:text-md">No businesses found.</p>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-6 mb-12 space-x-3">
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      <BottomNav />

  </div>
  );
};

export default Home;
