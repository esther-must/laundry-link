import { useState } from "react";
import useStore from "../store/store";
import BusinessCard from "../components/BusinessCard";
import SearchBar from "../components/SearchBar";
import FilterOptions from "../components/FilterOptions";
import SortOptions from "../components/SortOptions";

const Home = () => {
  const getFilteredBusinesses = useStore().getFilteredBusinesses(); // ✅ Call function properly
  const itemsPerPage = 6; // ✅ Set pagination limit
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil(getFilteredBusinesses.length / itemsPerPage);

  // Slice businesses for current page
  const displayedBusinesses = getFilteredBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Laundry Businesses</h1>

      {/* Search, Filter, and Sort Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar />
        <FilterOptions />
        <SortOptions />
      </div>

      {/* Display Filtered Businesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredBusinesses.length > 0 ? (
          getFilteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No businesses found.
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>

        <span className="px-4 py-2 bg-gray-100 rounded-md">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
