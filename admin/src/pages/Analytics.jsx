import { useEffect, useState } from "react";
import {
  FiBarChart,
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
} from "react-icons/fi";
import useAdminStore from "../store/adminStore";
import { statsAPI } from "../services/api";
import toast from "react-hot-toast";

const Analytics = () => {
  const { stats, shoes, orders } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    salesByMonth: [],
    topShoes: [],
    orderStatusDistribution: {},
    revenueGrowth: 0,
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);

      // Calculate analytics from existing data
      const salesByMonth = calculateSalesByMonth();
      const topShoes = calculateTopShoes();
      const orderStatusDistribution = calculateOrderStatusDistribution();
      const revenueGrowth = calculateRevenueGrowth();

      setAnalyticsData({
        salesByMonth,
        topShoes,
        orderStatusDistribution,
        revenueGrowth,
      });
    } catch (error) {
      toast.error("Failed to fetch analytics data");
    } finally {
      setLoading(false);
    }
  };

  const calculateSalesByMonth = () => {
    const monthlyData = {};
    orders.forEach((order) => {
      const month = new Date(order.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
      monthlyData[month] = (monthlyData[month] || 0) + 1;
    });
    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
    }));
  };

  const calculateTopShoes = () => {
    const shoeCounts = {};
    orders.forEach((order) => {
      order.shoes_id?.forEach((shoeId) => {
        const shoe = shoes.find((s) => s._id === shoeId);
        if (shoe) {
          shoeCounts[shoe.shoes_name] = (shoeCounts[shoe.shoes_name] || 0) + 1;
        }
      });
    });
    return Object.entries(shoeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const calculateOrderStatusDistribution = () => {
    const distribution = { delivered: 0, pending: 0 };
    orders.forEach((order) => {
      if (order.orderDeliverd === "deliverd") {
        distribution.delivered++;
      } else {
        distribution.pending++;
      }
    });
    return distribution;
  };

  const calculateRevenueGrowth = () => {
    // Mock calculation - in real app, you'd compare with previous period
    return 15.5;
  };

  const analyticsCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: "bg-green-500",
      change: `+${analyticsData.revenueGrowth}%`,
      changeType: "positive",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FiBarChart,
      color: "bg-blue-500",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: FiTrendingUp,
      color: "bg-yellow-500",
      change: "-3%",
      changeType: "negative",
    },
    {
      title: "Total Products",
      value: stats.totalShoes,
      icon: FiBarChart,
      color: "bg-purple-500",
      change: "+12%",
      changeType: "positive",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">
          Business insights and performance metrics
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {analyticsCards.map((card, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${card.color}`}>
                <card.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {card.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {card.value}
                </p>
                <div className="flex items-center">
                  {card.changeType === "positive" ? (
                    <FiTrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <FiTrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <p
                    className={`text-sm ${
                      card.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Month */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Sales by Month
          </h3>
          <div className="space-y-3">
            {analyticsData.salesByMonth.length > 0 ? (
              analyticsData.salesByMonth.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.month}
                  </span>
                  <div className="flex items-center">
                    <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (item.count /
                              Math.max(
                                ...analyticsData.salesByMonth.map(
                                  (s) => s.count
                                )
                              )) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No sales data available</p>
            )}
          </div>
        </div>

        {/* Top Selling Shoes */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Top Selling Shoes
          </h3>
          <div className="space-y-3">
            {analyticsData.topShoes.length > 0 ? (
              analyticsData.topShoes.map((shoe, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {shoe.name}
                  </span>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{
                          width: `${
                            (shoe.count / analyticsData.topShoes[0].count) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {shoe.count}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No sales data available</p>
            )}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Order Status Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">
                  Delivered
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {analyticsData.orderStatusDistribution.delivered}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                <span className="text-sm font-medium text-gray-700">
                  Pending
                </span>
              </div>
              <span className="text-sm font-medium text-gray-900">
                {analyticsData.orderStatusDistribution.pending}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Stats
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Average Order Value</span>
              <span className="text-sm font-medium text-gray-900">
                $
                {stats.totalOrders > 0
                  ? (stats.totalRevenue / stats.totalOrders).toFixed(2)
                  : "0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Delivery Rate</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.totalOrders > 0
                  ? (
                      (analyticsData.orderStatusDistribution.delivered /
                        stats.totalOrders) *
                      100
                    ).toFixed(1)
                  : "0"}
                %
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total Customers</span>
              <span className="text-sm font-medium text-gray-900">
                {stats.totalUsers}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
