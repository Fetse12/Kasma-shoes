import { useEffect, useState } from "react";
import {
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
} from "react-icons/fi";
import useAdminStore from "../store/adminStore";
import { shoesAPI } from "../services/api";
import toast from "react-hot-toast";
import ShoeModal from "../components/ShoeModal";

const Shoes = () => {
  const { shoes, setShoes, deleteShoe, addShoe, updateShoe } = useAdminStore();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingShoe, setEditingShoe] = useState(null);

  useEffect(() => {
    fetchShoes();
  }, []);

  const fetchShoes = async () => {
    try {
      setLoading(true);
      const response = await shoesAPI.getAll();
      setShoes(response.data);
    } catch (error) {
      toast.error("Failed to fetch shoes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this shoe?")) {
      try {
        await shoesAPI.delete(id);
        deleteShoe(id);
        toast.success("Shoe deleted successfully");
      } catch (error) {
        toast.error("Failed to delete shoe");
      }
    }
  };

  const handleEdit = (shoe) => {
    setEditingShoe(shoe);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingShoe(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingShoe(null);
  };

  const handleSave = async (shoeData) => {
    try {
      if (editingShoe) {
        const response = await shoesAPI.update(editingShoe._id, shoeData);
        updateShoe(editingShoe._id, response.data);
        toast.success("Shoe updated successfully");
      } else {
        const response = await shoesAPI.create(shoeData);
        addShoe(response.data);
        toast.success("Shoe added successfully");
      }
      setShowModal(false);
      setEditingShoe(null);
    } catch (error) {
      toast.error("Failed to save shoe");
    }
  };

  const filteredShoes = shoes.filter((shoe) => {
    const matchesSearch =
      shoe.shoes_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      shoe.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all" || shoe.shoes_type === filterType;
    return matchesSearch && matchesFilter;
  });

  const shoeTypes = ["men", "women", "boy", "girl"];

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
          <h1 className="text-2xl font-bold text-gray-900">Shoes Management</h1>
          <p className="text-gray-600">Manage your shoe inventory</p>
        </div>
        <button
          onClick={handleAdd}
          className="btn btn-primary flex items-center"
        >
          <FiPlus className="mr-2" size={20} />
          Add New Shoe
        </button>
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
                placeholder="Search shoes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="input"
            >
              <option value="all">All Types</option>
              {shoeTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Shoes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredShoes.map((shoe) => (
          <div
            key={shoe._id}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-12 mb-4">
              {shoe.imgUrl && shoe.imgUrl.length > 0 ? (
                <img
                  src={shoe.imgUrl[0]}
                  alt={shoe.shoes_name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <FiPackage className="h-12 w-12 text-gray-400" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {shoe.shoes_name}
              </h3>
              <p className="text-sm text-gray-600 capitalize">
                {shoe.shoes_type} • {shoe.type}
              </p>
              <p className="text-lg font-bold text-primary-600">
                ${shoe.Price}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    shoe.isAvailable
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {shoe.isAvailable ? "Available" : "Out of Stock"}
                </span>
                {shoe.isSpecial && (
                  <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                    Special
                  </span>
                )}
              </div>
            </div>

            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(shoe)}
                className="flex-1 btn btn-secondary flex items-center justify-center"
              >
                <FiEdit size={16} />
              </button>
              <button
                onClick={() => handleDelete(shoe._id)}
                className="flex-1 btn btn-danger flex items-center justify-center"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredShoes.length === 0 && (
        <div className="text-center py-12">
          <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No shoes found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by adding a new shoe."}
          </p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <ShoeModal
          shoe={editingShoe}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Shoes;
