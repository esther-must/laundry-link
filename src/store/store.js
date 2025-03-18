import { create } from "zustand";
import businesses from "../data/businesses.json";

const useStore = create((set) => ({
  businesses,
}));

export default useStore;
