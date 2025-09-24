import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
// import Loader from '../utils/Loader';
import useStore from "../zustand/store";
import gif from "../assets/new.gif";
import Food2Card from "../component/Food2Card";

export default function Viewshoe() {
  const navigate = useNavigate();
  const { cart, setCart, shoes } = useStore();
  const { id } = useParams();
  const [shoe, setShoe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/shoes/${id}`);
        const data = await response.json();
        setShoe(data);

        // Get related items based on the same type
        if (data && data.type) {
          const related = shoes
            .filter((item) => item.type === data.type && item._id !== data._id)
            .slice(0, 4); // Show max 4 related items
          setRelatedItems(related);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, shoes]);

  // const isInCart = false
  const isInCart =
    shoe &&
    cart.some(
      (item) => item.shoe._id === shoe._id && item.selectedSize === selectedSize
    );

  const handleAddtoCart = () => {
    if (!isInCart && shoe && selectedSize !== null) {
      const updatedCart = [...cart, { shoe, quantity: 1, selectedSize }];
      setCart(updatedCart);
    }
  };

  const handleBuyNow = () => {
    if (shoe && selectedSize !== null) {
      if (!isInCart) {
        const updatedCart = [...cart, { shoe, quantity: 1, selectedSize }];
        setCart(updatedCart);
      }
      navigate("/cart");
    }
  };

  const handleRemoveFromCart = () => {
    const updatedCart = cart.filter(
      (item) =>
        !(item.shoe._id === shoe._id && item.selectedSize === selectedSize)
    );
    setCart(updatedCart);
  };

  const handleGoBack = () => {
    console.log("Back button clicked - navigating to home"); // Debug log
    // Navigate directly to home page
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-gradient flex items-center justify-center relative">
        <div className="absolute inset-0 bg-luxury-gradient opacity-5"></div>
        <div className="relative text-center">
          <img src={gif} alt="Loading..." className="mx-auto mb-4 w-20 h-20" />
          <div className="text-gold-400 text-lg font-semibold">Loading...</div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-dark-gradient flex items-center justify-center relative">
        <div className="absolute inset-0 bg-luxury-gradient opacity-5"></div>
        <div className="relative glass rounded-3xl p-8 text-center">
          <div className="text-red-500 text-xl font-bold mb-2">Error</div>
          <div className="text-dark-200">{error}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex relative flex-col min-h-screen bg-dark-gradient">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dark-gradient"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-luxury-gradient opacity-5"></div>

      {/* Floating luxury orbs */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-gold-500/10 blur-xl animate-float"></div>
      <div
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-red-500/10 blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-gold-500/5 blur-2xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div className="relative z-10 flex-1">
        <div className="relative bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 h-[50vh] mb-6 mx-4 rounded-3xl overflow-hidden shadow-luxury-lg">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={shoe.imgUrl[0]}
            alt={shoe.shoes_name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent"></div>

          <div className="absolute top-6 left-6 z-30">
            <button
              onClick={handleGoBack}
              className="w-12 h-12 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 flex items-center justify-center hover:bg-gold-500/20 hover:border-gold-400/40 transition-all duration-300 cursor-pointer active:scale-95 shadow-luxury hover:shadow-luxury-lg"
              style={{ pointerEvents: "auto" }}
            >
              <FaArrowLeft className="text-xl text-gold-400 pointer-events-none" />
            </button>
          </div>

          <Link
            to={"/cart"}
            className="absolute top-6 right-6 p-3 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 hover:border-gold-400/40 transition-all duration-300 group shadow-luxury hover:shadow-luxury-lg"
          >
            <div className="relative">
              <FaShoppingCart className="text-xl text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-pulse-gold">
                  {cart.length}
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="px-6 space-y-6 pb-6">
          {/* Product Title and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-dark-100 gradient-text mb-2">
                {shoe.shoes_name}
              </h1>
              <div className="text-sm text-gold-400 font-medium">
                Premium Quality • {shoe.type}
              </div>
            </div>
            <button
              onClick={() => {
                isInCart ? handleRemoveFromCart() : handleAddtoCart();
              }}
              disabled={!isInCart && selectedSize === null}
              className={`px-6 py-3 flex items-center gap-3 text-lg font-semibold rounded-2xl transition-all duration-300 hover:scale-105 ${
                isInCart
                  ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-luxury hover:shadow-luxury-lg"
                  : selectedSize === null
                  ? "bg-dark-600 text-dark-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-luxury hover:shadow-luxury-lg"
              }`}
            >
              <FaShoppingCart className="text-lg" />
              {isInCart
                ? "Remove"
                : selectedSize === null
                ? "Select Size First"
                : "Add to Cart"}
            </button>
          </div>

          {/* Product Description */}
          <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
            <h3 className="text-xl font-bold text-gold-400 mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
              Description
            </h3>
            <p className="text-dark-300 leading-relaxed text-sm">
              {shoe.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
            <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
              Select Size
            </h3>
            <div className="flex flex-wrap gap-3">
              {shoe.shoe_Size && Array.isArray(shoe.shoe_Size) ? (
                shoe.shoe_Size.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-luxury hover:shadow-luxury-lg border-2 border-gold-400"
                        : "bg-dark-700 hover:bg-gold-500/20 text-gold-300 border border-gold-500/30 hover:border-gold-400/50"
                    }`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <div className="text-dark-400 text-sm">No sizes available</div>
              )}
            </div>
            {selectedSize && (
              <div className="mt-4 text-sm text-gold-400 font-medium">
                Selected Size:{" "}
                <span className="text-gold-300">{selectedSize}</span>
              </div>
            )}
          </div>

          {/* Product Tags */}
          <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
            <h3 className="text-xl font-bold text-gold-400 mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
              Features
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                "Premium Quality",
                "Comfortable",
                "Durable",
                "Stylish",
                "Best Fit",
                "Luxury",
              ].map((tag, index) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-500/20 to-gold-600/20 border border-gold-500/30 text-gold-300 text-sm font-semibold hover:shadow-luxury transition-all duration-300 hover:scale-105"
                >
                  #{tag}
                </div>
              ))}
            </div>
          </div>

          {/* Related Items Section */}
          {relatedItems.length > 0 && (
            <div className="mt-8">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 rounded-2xl p-6 shadow-luxury">
                <h3 className="text-xl font-bold text-gold-400 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-gold-500 to-gold-600 rounded-full"></div>
                  Related Items
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {relatedItems.map((item, index) => (
                    <div
                      key={item._id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <Food2Card data={item} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Purchase Section */}
      <div className="relative z-10 bg-dark-800/50 backdrop-blur-sm border-t border-gold-500/20 p-6 shadow-luxury-lg">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className="text-gold-400 text-sm font-medium">ETB</span>
              <span className="text-4xl font-bold gradient-text">
                {shoe.Price}
              </span>
            </div>
            <div className="text-dark-400 text-sm mt-1">
              Premium Quality • Free Shipping
            </div>
          </div>

          <button
            onClick={() => handleBuyNow()}
            disabled={selectedSize === null}
            className={`px-8 py-4 rounded-2xl font-bold text-lg shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:scale-105 ${
              selectedSize === null
                ? "bg-dark-600 text-dark-400 cursor-not-allowed"
                : "bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500"
            }`}
          >
            {selectedSize === null ? "Select Size First" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
