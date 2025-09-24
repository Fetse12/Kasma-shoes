import { useState, useEffect } from "react";
import { FiX, FiUpload } from "react-icons/fi";

const ShoeModal = ({ shoe, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    shoes_name: "",
    shoes_type: "men",
    type: "sneakers",
    Price: "",
    isSpecial: false,
    isAvailable: true,
    shoe_Size: "",
    DiscountPercent: 0,
    description: "",
    imgUrl: [],
    tags: [],
  });

  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (shoe) {
      setFormData({
        shoes_name: shoe.shoes_name || "",
        shoes_type: shoe.shoes_type || "men",
        type: shoe.type || "sneakers",
        Price: shoe.Price || "",
        isSpecial: shoe.isSpecial || false,
        isAvailable: shoe.isAvailable || true,
        shoe_Size: shoe.shoe_Size || "",
        DiscountPercent: shoe.DiscountPercent || 0,
        description: shoe.description || "",
        imgUrl: shoe.imgUrl || [],
        tags: shoe.tags || [],
      });
    }
  }, [shoe]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url && url.trim()) {
      setFormData((prev) => ({
        ...prev,
        imgUrl: [...prev.imgUrl, url.trim()],
      }));
    }
  };

  const handleRemoveImageUrl = (index) => {
    setFormData((prev) => ({
      ...prev,
      imgUrl: prev.imgUrl.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.shoes_name || !formData.Price || !formData.description) {
      alert("Please fill in all required fields");
      return;
    }

    onSave(formData);
  };

  const shoeTypes = [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
    { value: "boy", label: "Boy" },
    { value: "girl", label: "Girl" },
  ];

  const shoeCategories = [
    { value: "sneakers", label: "Sneakers" },
    { value: "formal_shoes", label: "Formal Shoes" },
    { value: "boots", label: "Boots" },
    { value: "heels", label: "Heels" },
    { value: "athletic_shoes", label: "Athletic Shoes" },
    { value: "flip_flops", label: "Flip Flops" },
    { value: "sandals", label: "Sandals" },
    { value: "running_shoes", label: "Running Shoes" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {shoe ? "Edit Shoe" : "Add New Shoe"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shoe Name *
              </label>
              <input
                type="text"
                name="shoes_name"
                value={formData.shoes_name}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price *
              </label>
              <input
                type="number"
                name="Price"
                value={formData.Price}
                onChange={handleChange}
                className="input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shoe Type *
              </label>
              <select
                name="shoes_type"
                value={formData.shoes_type}
                onChange={handleChange}
                className="input"
                required
              >
                {shoeTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input"
                required
              >
                {shoeCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size *
              </label>
              <input
                type="number"
                name="shoe_Size"
                value={formData.shoe_Size}
                onChange={handleChange}
                className="input"
                min="1"
                max="50"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Percent
              </label>
              <input
                type="number"
                name="DiscountPercent"
                value={formData.DiscountPercent}
                onChange={handleChange}
                className="input"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input"
              rows="3"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URLs
            </label>
            <div className="space-y-2">
              {formData.imgUrl.map((url, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="input flex-1"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(index)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="btn btn-secondary flex items-center"
              >
                <FiUpload className="mr-2" size={16} />
                Add Image URL
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <FiX size={14} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag"
                className="input flex-1"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="btn btn-secondary"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isSpecial"
                checked={formData.isSpecial}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Special Item</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">Available</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {shoe ? "Update Shoe" : "Add Shoe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShoeModal;
