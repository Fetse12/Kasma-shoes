const express = require("express");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats,
  getAnalytics,
} = require("../controller/admin.controller.js");

const router = express.Router();

// User management routes
router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Dashboard and analytics routes
router.get("/stats", getDashboardStats);
router.get("/analytics", getAnalytics);

module.exports = router;
