import { useState, useEffect } from "react";
import useStore from "../store/store";
import BusinessCard from "../components/BusinessCard";
import SearchBar from "../components/SearchBar";
import FilterOptions from "../components/FilterOptions";
import SortOptions from "../components/SortOptions";

const Home = () => {
  const { businesses, fetchBusinesses, getFilteredBusinesses, isLoading } = useStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Set pagination limit

  useEffect(() => {
    fetchBusinesses(); // Fetch data from json-server when component mounts
  }, []);

  const filteredBusinesses = getFilteredBusinesses(); // ✅ Get filtered businesses correctly
  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);

  // Slice businesses for current page
  const displayedBusinesses = filteredBusinesses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) { // ✅ Now placed AFTER hooks are called
    return <p className="text-center text-gray-500">Loading businesses...</p>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Laundry Services</h1>

      {/* Search, Filter, and Sort Inputs */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar />
        <FilterOptions />
        <SortOptions />
      </div>

      {/* Display Filtered Businesses */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBusinesses.length > 0 ? (
          displayedBusinesses.map((business) => (
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
          onClick={() => setCurrentPage((prev) => prev - 1)} 
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
            <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-md mx-1 ${currentPage === index + 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
                {index + 1}
            </button>
        ))}

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2rounded-md ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
