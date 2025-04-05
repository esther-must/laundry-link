import { useState } from "react";
import BusinessModal from "./BusinessModal";

const BusinessCard = ({ business }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* Business Card */}
      <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src={business.image}
        alt={business.name}
        className="w-full h-40 object-cover rounded-t-lg"
      />
      <div className="p-4">
        {/* Business Name and Location */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{business.name}</h2>
          <span className="text-sm text-gray-600">{business.location}</span>
        </div>

        <p className="text-gray-600">{business.services.join(", ")}</p>

        {/* Ratings & Price */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-yellow-500 text-lg font-bold">
            ⭐ {business.ratings || "N/A"}
          </span>
          <span className="text-gray-700 font-semibold">{business.price}</span>
        </div>

        {/* Open Modal Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          View Details
        </button>
      </div>
    </div>

      {/* Business Modal */}
      <BusinessModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        business={business}
      />
    </>
  );
};

export default BusinessCard;
