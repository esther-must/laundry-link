import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const BusinessModal = ({ isOpen, closeModal, business }) => {
  if (!business) return null; // Prevents errors if business is undefined

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
