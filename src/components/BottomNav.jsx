import { useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiPackage, FiUser, FiCreditCard } from "react-icons/fi"; // Import icons
import path from "path";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "Home", icon: <FiHome size={22} /> },
    { path: "/orders", label: "Orders", icon: <FiPackage size={22} /> },
    { path: "/wallet", label: "Wallet", icon: <FiCreditCard size={22} /> },
    { path: "/profile", label: "Profile", icon: <FiUser size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg p-3 flex justify-around border-t text-gray-600 text-xs md:text-sm">
      {navItems.map((tab, index) => {
        const isActive = location.pathname === tab.path; // 🔹 STRICT MATCH

        return (
          <button
            key={index}
            onClick={() => navigate(tab.path)}
            role="button"
            aria-label={tab.label}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-md transition-all duration-300 flex-1 ${
              isActive ? "text-blue-600 font-bold" : "text-gray-500"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
