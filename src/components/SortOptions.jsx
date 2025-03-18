import useStore from "../store/store";

const SortOptions = () => {
  const { sortOption, setSortOption } = useStore();

  return (
    <select
      value={sortOption}
      onChange={(e) => setSortOption(e.target.value)}
      className="border p-2 rounded-md"
    >
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
    </select>
  );
};

export default SortOptions;
