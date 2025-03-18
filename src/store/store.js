import { create } from "zustand";
import businesses from "../data/businesses.json";

const useStore = create((set, get) => ({
  businesses, // Original business list
  searchQuery: "",
  selectedCategory: "All",
  sortOption: "name-asc", // Default sorting

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortOption: (option) => set({ sortOption: option }),

  getFilteredBusinesses: () => {
    const { businesses, searchQuery, selectedCategory, sortOption } = get(); // ✅ Use get() correctly

    let filtered = businesses.filter((business) => {
      const matchesSearch = business.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || business.services.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

    // Sorting logic
    filtered.sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      return 0;
    });

    return filtered;
  },
}));

export default useStore;
