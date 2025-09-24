import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";
import { FaShoppingCart, FaHeart, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

export default function ShoeCard({ data }) {
  const { cart, setCart } = useStore();
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate(`/viewshoe/${data._id}`);
  };
  const isInCart = data && cart.some((item) => item.shoe._id === data._id);

  const handleAddtoCart = (e) => {
    e.stopPropagation();
    if (!isInCart && data) {
      const updatedCart = [...cart, { shoe: data, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    const updatedCart = cart.filter((item) => item.shoe._id !== data._id);
    setCart(updatedCart);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    // Add wishlist functionality here
    console.log("Toggle wishlist for:", data.shoes_name);
  };

  return (
    <div
      onClick={() => handleRoute()}
      className="product-card group relative bg-dark-800/50 rounded-2xl overflow-hidden glass cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={data.imgUrl[0]}
          alt={data.shoes_name}
          className="product-image w-full h-full object-cover"
        />

        {/* Quick View Overlay */}
        <div className="quick-view-overlay">
          <button className="px-6 py-3 bg-gold-500 text-dark-900 font-semibold rounded-full flex items-center gap-2 hover:bg-gold-400 transition-colors duration-300">
            <span>Quick View</span>
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-red-500/20 transition-all duration-300 group/wishlist"
        >
          <FaHeart className="text-dark-300 group-hover/wishlist:text-red-500 transition-colors duration-300" />
        </button>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gold-500 text-dark-900 text-xs font-bold rounded-full">
            {data.type}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
          {data.shoes_name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-gold-500 text-sm" />
            ))}
          </div>
          <span className="text-dark-400 text-sm">(4.8)</span>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-gold-500 text-sm font-medium">ETB</span>
            <span className="text-2xl font-bold text-white">{data.Price}</span>
          </div>

          <button
            onClick={isInCart ? handleRemoveFromCart : handleAddtoCart}
            className={`w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 group/cart ${
              isInCart
                ? "bg-red-500 text-white hover:bg-red-400"
                : "bg-gold-500 text-dark-900 hover:bg-gold-400"
            }`}
          >
            <FaShoppingCart className="text-lg group-hover/cart:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-300"></div>
    </div>
  );
}

ShoeCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    imgUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
    shoes_name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
  }).isRequired,
};
