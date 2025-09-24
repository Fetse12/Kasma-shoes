const User = require("../models/user.js");
const Order = require("../models/orders.js");
const Shoes = require("../models/shoes.js");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    }).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

// Get dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalShoes = await Shoes.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({
      orderDeliverd: "notDeliverd",
    });

    // Calculate total revenue (assuming we have price data in orders)
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => {
      // This is a simplified calculation - in real app you'd calculate based on shoe prices
      return sum + (order.totalAmount || 0);
    }, 0);

    const stats = {
      totalUsers,
      totalShoes,
      totalOrders,
      pendingOrders,
      totalRevenue,
    };

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

// Get analytics data
const getAnalytics = async (req, res) => {
  try {
    // Sales by month
    const salesByMonth = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    // Top selling shoes
    const topShoes = await Order.aggregate([
      { $unwind: "$shoes_id" },
      {
        $group: {
          _id: "$shoes_id",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "shoes",
          localField: "_id",
          foreignField: "_id",
          as: "shoe",
        },
      },
      {
        $unwind: "$shoe",
      },
      {
        $project: {
          shoeName: "$shoe.shoes_name",
          count: 1,
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    // Order status distribution
    const orderStatusDistribution = await Order.aggregate([
      {
        $group: {
          _id: "$orderDeliverd",
          count: { $sum: 1 },
        },
      },
    ]);

    const analytics = {
      salesByMonth,
      topShoes,
      orderStatusDistribution,
    };

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats,
  getAnalytics,
};
