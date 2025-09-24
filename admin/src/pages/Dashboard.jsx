import { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiCreditCard,
  FiPlus,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import useAdminStore from "../store/adminStore";
import { shoesAPI, ordersAPI, statsAPI } from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { stats, setStats, setShoes, setOrders } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [receiverAccounts, setReceiverAccounts] = useState([]);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountForm, setAccountForm] = useState({
    paymentMethod: "",
    accountName: "",
    accountNumber: "",
    description: "",
    bankName: "",
    phoneNumber: "",
    displayName: "",
    instructions: "",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch shoes, orders, and receiver accounts in parallel
      const [shoesRes, ordersRes, accountsRes] = await Promise.all([
        shoesAPI.getAll(),
        ordersAPI.getAll(),
        fetch("/api/admin/receiver-accounts").then((res) => res.json()),
      ]);

      setShoes(shoesRes.data);
      setOrders(ordersRes.data);
      setReceiverAccounts(accountsRes.data || []);

      // Calculate stats
      const totalShoes = shoesRes.data.length;
      const totalOrders = ordersRes.data.length;
      const pendingOrders = ordersRes.data.filter(
        (order) => order.orderDeliverd === "notDeliverd"
      ).length;
      const totalRevenue = ordersRes.data.reduce(
        (sum, order) => sum + (order.totalAmount || 0),
        0
      );

      setStats({
        totalShoes,
        totalOrders,
        totalUsers: 0, // We'll implement user management later
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      toast.error("Failed to fetch dashboard data");
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Receiver Account Management
  const handleCreateAccount = () => {
    setEditingAccount(null);
    setAccountForm({
      paymentMethod: "",
      accountName: "",
      accountNumber: "",
      description: "",
      bankName: "",
      phoneNumber: "",
      displayName: "",
      instructions: "",
    });
    setShowAccountModal(true);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setAccountForm({
      paymentMethod: account.paymentMethod,
      accountName: account.accountName,
      accountNumber: account.accountNumber,
      description: account.description || "",
      bankName: account.bankName || "",
      phoneNumber: account.phoneNumber || "",
      displayName: account.displayName,
      instructions: account.instructions || "",
    });
    setShowAccountModal(true);
  };

  const handleSaveAccount = async () => {
    try {
      const url = editingAccount
        ? `/api/admin/receiver-accounts/${editingAccount._id}`
        : "/api/admin/receiver-accounts";

      const method = editingAccount ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountForm),
      });

      if (response.ok) {
        toast.success(
          editingAccount
            ? "Account updated successfully"
            : "Account created successfully"
        );
        setShowAccountModal(false);
        fetchDashboardData();
      } else {
        toast.error("Failed to save account");
      }
    } catch (error) {
      toast.error("Failed to save account");
      console.error("Save account error:", error);
    }
  };

  const handleDeleteAccount = async (accountId) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        const response = await fetch(
          `/api/admin/receiver-accounts/${accountId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          toast.success("Account deleted successfully");
          fetchDashboardData();
        } else {
          toast.error("Failed to delete account");
        }
      } catch (error) {
        toast.error("Failed to delete account");
        console.error("Delete account error:", error);
      }
    }
  };

  const statCards = [
    {
      title: "Total Shoes",
      value: stats.totalShoes,
      icon: FiPackage,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FiShoppingCart,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: FiTrendingUp,
      color: "bg-yellow-500",
      change: "-3%",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: FiDollarSign,
      color: "bg-purple-500",
      change: "+15%",
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
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to Kasma Shoes Admin Panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders and Payment Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Orders
          </h3>
          <div className="space-y-3">
            {stats.orders?.slice(0, 5).map((order) => (
              <div
                key={order._id}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.fullName}</p>
                  <p className="text-sm text-gray-500">{order.phoneNumber}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    order.orderDeliverd === "deliverd"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {order.orderDeliverd === "deliverd" ? "Delivered" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors">
              <div className="flex items-center">
                <FiPackage className="h-5 w-5 text-primary-600 mr-3" />
                <span className="font-medium text-primary-900">
                  Add New Shoe
                </span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <FiShoppingCart className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-green-900">
                  View All Orders
                </span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <FiUsers className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-purple-900">
                  Manage Users
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Payment Accounts Management */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Payment Accounts
          </h3>
          <button
            onClick={handleCreateAccount}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <FiPlus className="h-4 w-4 mr-2" />
            Add Account
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Display Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account/Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receiverAccounts.map((account) => (
                <tr key={account._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiCreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {account.paymentMethod.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {account.displayName}
                    </div>
                    {account.description && (
                      <div className="text-sm text-gray-500">
                        {account.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {account.paymentMethod === "cbe" ||
                      account.paymentMethod === "boa"
                        ? account.accountNumber
                        : account.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        account.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {account.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditAccount(account)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FiEdit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Modal */}
      {showAccountModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingAccount ? "Edit Account" : "Add New Account"}
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    value={accountForm.paymentMethod}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cbe">Commercial Bank of Ethiopia</option>
                    <option value="cbebirr">CBEBirr</option>
                    <option value="boa">Bank of Abyssinia</option>
                    <option value="telebirr">Telebirr</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={accountForm.displayName}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        displayName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., Main CBE Account"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={accountForm.accountName}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        accountName: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="e.g., KASMA SHOES"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {accountForm.paymentMethod === "cbe" ||
                    accountForm.paymentMethod === "boa"
                      ? "Account Number"
                      : "Phone Number"}
                  </label>
                  <input
                    type="text"
                    value={
                      accountForm.paymentMethod === "cbe" ||
                      accountForm.paymentMethod === "boa"
                        ? accountForm.accountNumber
                        : accountForm.phoneNumber
                    }
                    onChange={(e) => {
                      if (
                        accountForm.paymentMethod === "cbe" ||
                        accountForm.paymentMethod === "boa"
                      ) {
                        setAccountForm({
                          ...accountForm,
                          accountNumber: e.target.value,
                        });
                      } else {
                        setAccountForm({
                          ...accountForm,
                          phoneNumber: e.target.value,
                        });
                      }
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder={
                      accountForm.paymentMethod === "cbe" ||
                      accountForm.paymentMethod === "boa"
                        ? "Enter account number"
                        : "Enter phone number"
                    }
                  />
                </div>

                {(accountForm.paymentMethod === "cbe" ||
                  accountForm.paymentMethod === "boa") && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={accountForm.bankName}
                      onChange={(e) =>
                        setAccountForm({
                          ...accountForm,
                          bankName: e.target.value,
                        })
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="e.g., Commercial Bank of Ethiopia"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={accountForm.description}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        description: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Optional description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Instructions
                  </label>
                  <textarea
                    value={accountForm.instructions}
                    onChange={(e) =>
                      setAccountForm({
                        ...accountForm,
                        instructions: e.target.value,
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    rows="3"
                    placeholder="Instructions for customers (optional)"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAccountModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAccount}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  {editingAccount ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
