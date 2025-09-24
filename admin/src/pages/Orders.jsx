import { useEffect, useState } from "react";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiSearch,
  FiFilter,
  FiCheck,
  FiX,
} from "react-icons/fi";
import useAdminStore from "../store/adminStore";
import { ordersAPI } from "../services/api";
import toast from "react-hot-toast";

const Orders = () => {
  const { orders, setOrders, updateOrder, deleteShoe } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await ordersAPI.update(orderId, {
        orderDeliverd: newStatus,
      });
      updateOrder(orderId, response.data);
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await ordersAPI.delete(orderId);
        setOrders(orders.filter((order) => order._id !== orderId));
        toast.success("Order deleted successfully");
      } catch (error) {
        toast.error("Failed to delete order");
      }
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phoneNumber.includes(searchTerm);
    const matchesFilter =
      filterStatus === "all" || order.orderDeliverd === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "deliverd":
        return "bg-green-100 text-green-800";
      case "notDeliverd":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "deliverd":
        return "Delivered";
      case "notDeliverd":
        return "Pending";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Orders Management
          </h1>
          <p className="text-gray-600">
            Manage customer orders and delivery status
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search orders by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="notDeliverd">Pending</option>
              <option value="deliverd">Delivered</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-gray-50">
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>Items</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="font-mono text-sm">{order._id.slice(-8)}</td>
                  <td>
                    <div>
                      <div className="font-medium text-gray-900">
                        {order.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {order.userId.slice(-8)}
                      </div>
                    </div>
                  </td>
                  <td className="text-sm text-gray-900">{order.phoneNumber}</td>
                  <td>
                    <span className="text-sm text-gray-900">
                      {order.shoes_id?.length || 0} item(s)
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        order.orderDeliverd
                      )}`}
                    >
                      {getStatusLabel(order.orderDeliverd)}
                    </span>
                  </td>
                  <td className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="View Details"
                      >
                        <FiEye size={16} />
                      </button>

                      {order.orderDeliverd === "notDeliverd" ? (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, "deliverd")
                          }
                          className="p-1 text-green-400 hover:text-green-600"
                          title="Mark as Delivered"
                        >
                          <FiCheck size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order._id, "notDeliverd")
                          }
                          className="p-1 text-yellow-400 hover:text-yellow-600"
                          title="Mark as Pending"
                        >
                          <FiX size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(order._id)}
                        className="p-1 text-red-400 hover:text-red-600"
                        title="Delete Order"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No orders found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterStatus !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Orders will appear here when customers place them."}
          </p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                Order Details
              </h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {selectedOrder._id}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      selectedOrder.orderDeliverd
                    )}`}
                  >
                    {getStatusLabel(selectedOrder.orderDeliverd)}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Name
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedOrder.fullName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedOrder.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {selectedOrder.userId}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Order Date
                  </label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shoe IDs
                </label>
                <div className="space-y-1">
                  {selectedOrder.shoes_id?.map((shoeId, index) => (
                    <div
                      key={index}
                      className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded"
                    >
                      {shoeId}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                {selectedOrder.orderDeliverd === "notDeliverd" ? (
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder._id, "deliverd");
                      setSelectedOrder(null);
                    }}
                    className="btn btn-primary"
                  >
                    Mark as Delivered
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder._id, "notDeliverd");
                      setSelectedOrder(null);
                    }}
                    className="btn btn-secondary"
                  >
                    Mark as Pending
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
