import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaEye, FaStar } from "react-icons/fa";
import useStore from "../zustand/store";

const LuxuryProductGrid = ({
  products,
  title = "Featured Products",
  columns = 4,
}) => {
  const { cart, setCart } = useStore();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const isInCart = cart.some((item) => item.shoe._id === product._id);
    if (!isInCart) {
      const updatedCart = [...cart, { shoe: product, quantity: 1 }];
      setCart(updatedCart);
    }
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    // Add wishlist functionality here
    console.log("Toggle wishlist for:", product.shoes_name);
  };

  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-500 to-red-500 mx-auto rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {products.map((product, index) => (
            <Link
              key={product._id}
              to={`/viewshoe/${product._id}`}
              className="product-card group relative bg-dark-800/50 rounded-2xl overflow-hidden glass animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Product Image Container */}
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={product.imgUrl[0]}
                  alt={product.shoes_name}
                  className="product-image w-full h-full object-cover"
                />

                {/* Quick View Overlay */}
                <div className="quick-view-overlay">
                  <button className="px-6 py-3 bg-gold-500 text-dark-900 font-semibold rounded-full flex items-center gap-2 hover:bg-gold-400 transition-colors duration-300">
                    <FaEye className="text-lg" />
                    Quick View
                  </button>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => handleToggleWishlist(e, product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-red-500/20 transition-all duration-300 group/wishlist"
                >
                  <FaHeart className="text-dark-300 group-hover/wishlist:text-red-500 transition-colors duration-300" />
                </button>

                {/* Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gold-500 text-dark-900 text-xs font-bold rounded-full">
                    {product.type}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                  {product.shoes_name}
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
                    <span className="text-gold-500 text-sm font-medium">
                      ETB
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {product.Price}
                    </span>
                  </div>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-12 h-12 rounded-full bg-gold-500 text-dark-900 flex items-center justify-center hover:bg-gold-400 hover:scale-110 transition-all duration-300 group/cart"
                  >
                    <FaShoppingCart className="text-lg group-hover/cart:scale-110 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border border-gold-500/0 group-hover:border-gold-500/30 transition-all duration-300"></div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div
          className="text-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <Link
            to="/shoe"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gold-500 text-gold-500 font-semibold text-lg rounded-full hover:bg-gold-500 hover:text-dark-900 transition-all duration-300"
          >
            View All Products
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LuxuryProductGrid;
