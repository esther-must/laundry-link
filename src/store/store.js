import { create } from "zustand";
import businesses from "../data/businesses.json";

const useStore = create((set) => ({
  businesses,
  searchQuery: "",
  selectedCategory: "All",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  filteredBusinesses: () =>
    set((state) => ({
      businesses: businesses.filter((business) => {
        const matchesSearch = business.name
          .toLowerCase()
          .includes(state.searchQuery.toLowerCase());
        const matchesCategory =
          state.selectedCategory === "All" ||
          business.services.includes(state.selectedCategory);

        return matchesSearch && matchesCategory;
      }),
    })),
}));

export default useStore;
