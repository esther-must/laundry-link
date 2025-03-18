import useStore from "../store/store";

const FilterOptions = () => {
  const { selectedCategory, setSelectedCategory } = useStore();

  const categories = ["All", "Dry Cleaning", "Ironing", "Washing", "Folding"];

  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border p-2 rounded-md"
    >
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default FilterOptions;
