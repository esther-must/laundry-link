import useStore from "../store/store";
import BusinessCard from "../components/BusinessCard";
import SearchBar from "../components/SearchBar";
import FilterOptions from "../components/FilterOptions";

const Home = () => {
  const { businesses, filteredBusinesses } = useStore();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Laundry Businesses</h1>

      {/* Search and Filter Inputs */}
      <div className="flex gap-4 mb-4">
        <SearchBar />
        <FilterOptions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {businesses.length > 0 ? (
          businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))
        ) : (
          <p>No businesses found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
