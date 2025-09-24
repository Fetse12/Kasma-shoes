import { create } from "zustand";

const useAdminStore = create((set, get) => ({
  // Auth state
  isAuthenticated: false,
  admin: null,

  // Data state
  shoes: [],
  orders: [],
  users: [],
  stats: {
    totalShoes: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  },

  // UI state
  loading: false,
  error: null,
  sidebarOpen: true,

  // Actions
  setAuthenticated: (isAuth, adminData = null) =>
    set({
      isAuthenticated: isAuth,
      admin: adminData,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  setShoes: (shoes) => set({ shoes }),

  setOrders: (orders) => set({ orders }),

  setUsers: (users) => set({ users }),

  setStats: (stats) => set({ stats }),

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Add shoe
  addShoe: (shoe) =>
    set((state) => ({
      shoes: [...state.shoes, shoe],
    })),

  // Update shoe
  updateShoe: (id, updatedShoe) =>
    set((state) => ({
      shoes: state.shoes.map((shoe) =>
        shoe._id === id ? { ...shoe, ...updatedShoe } : shoe
      ),
    })),

  // Delete shoe
  deleteShoe: (id) =>
    set((state) => ({
      shoes: state.shoes.filter((shoe) => shoe._id !== id),
    })),

  // Update order
  updateOrder: (id, updatedOrder) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order._id === id ? { ...order, ...updatedOrder } : order
      ),
    })),

  // Logout
  logout: () =>
    set({
      isAuthenticated: false,
      admin: null,
      shoes: [],
      orders: [],
      users: [],
      stats: {
        totalShoes: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalRevenue: 0,
        pendingOrders: 0,
      },
    }),
}));

export default useAdminStore;
