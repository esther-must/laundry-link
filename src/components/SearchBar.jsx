import useStore from "../store/store";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <input
      type="text"
      placeholder="Search laundry services, locations..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
      }}
      className="border p-2 rounded-md w-full"
    />
  );
};

export default SearchBar;
