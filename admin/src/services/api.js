import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.get("/auth/signout"),
};

// Shoes API
export const shoesAPI = {
  getAll: () => api.get("/shoes"),
  getById: (id) => api.get(`/shoes/${id}`),
  create: (data) => api.post("/shoes", data),
  createMultiple: (data) => api.post("/shoes/multiple", data),
  update: (id, data) => api.put(`/shoes/${id}`, data),
  delete: (id) => api.delete(`/shoes/${id}`),
};

// Orders API
export const ordersAPI = {
  getAll: () => api.get("/orders/orders"),
  getById: (id) => api.get(`/orders/orders/${id}`),
  update: (id, data) => api.put(`/orders/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/orders/${id}`),
};

// Users API (we'll need to create this endpoint)
export const usersAPI = {
  getAll: () => api.get("/admin/users"),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

// Stats API (we'll need to create this endpoint)
export const statsAPI = {
  getDashboard: () => api.get("/admin/stats"),
};

export default api;
