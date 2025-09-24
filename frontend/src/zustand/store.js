import { create } from "zustand";

const useStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")),
  setUser: (user) => set({ user }),
  shoes: JSON.parse(localStorage.getItem("shoes")) || [],
  setShoes: (shoes) => {
    set(() => ({ shoes }));
    localStorage.setItem("shoes", JSON.stringify(shoes));
  },
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  setCart: (newCart) => {
    set(() => ({ cart: newCart }));
    localStorage.setItem("cart", JSON.stringify(newCart));
  },
  isEng: JSON.parse(localStorage.getItem("isEng")),
  setIsEng: (isEng) => set({ isEng }),
  Favorite: [], // Ensure this is initialized as an array
  setFavorite: (newFavorite) =>
    set({ Favorite: Array.isArray(newFavorite) ? newFavorite : [] }), // Only accept arrays
  userLocation: null, // Store user's location here
  setUserLocation: (userLocation) => set({ userLocation }),
  locationError: null,
  setLocationError: (locationError) => set({ locationError }),
  selected: null,
  setSelected: (selected) => set({ selected }),
}));

export default useStore;
