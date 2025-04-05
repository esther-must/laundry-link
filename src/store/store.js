import { create } from "zustand";

const useStore = create((set, get) => ({
  businesses: [],
  bookings: [],
  userOrders: [],
  searchQuery: "",
  selectedCategory: "All",
  sortOption: "name-asc",
  isLoading: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSortOption: (option) => set({ sortOption: option }),

  fetchBusinesses: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("http://localhost:5000/businesses");
      if (!response.ok) throw new Error("Failed to fetch businesses");
      const data = await response.json();
      set({ businesses: data, isLoading: false });
    } catch (error) {
      console.error("Error fetching businesses:", error);
      set({ isLoading: false });
    }
  },

  fetchUserOrders: async () => {
    try {
      const response = await fetch("http://localhost:5000/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      const data = await response.json();
      set({ userOrders: data });
    } catch (error) {
      console.error("Error fetching user orders:", error);
    }
  },

  addUserOrder: (newOrder) =>
    set((state) => ({
      userOrders: [...state.userOrders, newOrder],
    })),

  addBooking: async (booking) => {
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(booking),
      });

      if (!response.ok) throw new Error("Failed to add booking");

      const newBooking = await response.json();
      set((state) => ({ bookings: [...state.bookings, newBooking] }));
    } catch (error) {
      console.error("Error adding booking:", error);
    }
  },

  getFilteredBusinesses: () => {
    const { businesses, searchQuery, selectedCategory, sortOption } = get();

    let filtered = businesses.filter((business) => {
      const matchesSearch =
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.location.toLowerCase().includes(searchQuery.toLowerCase()); // Search by location as well
      const matchesCategory =
        selectedCategory === "All" || business.services.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });

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
