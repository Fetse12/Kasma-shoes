import { useEffect, useState } from "react";
import { FaArrowLeft, FaFilter, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Category from "../component/Catagory";
import Food2Card from "../component/Food2Card";
import useStore from "../zustand/store";

export default function Shoe() {
  const { shoes, cart } = useStore();

  const [shoe, setShoe] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setShoe(shoes);
  }, [shoes]);

  const HandeleShoeType = (type) => {
    const filterdShoes = shoes.filter((fo) => fo.type === type);
    setShoe(filterdShoes);
  };

  return (
    <div className="min-h-screen bg-dark-gradient overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gold-500/10 via-transparent to-red-500/10"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>
      {/* Luxury Header Section */}
      <div className="relative z-10 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 border-b border-gold-500/20">
        <div className="absolute inset-0 bg-luxury-gradient opacity-5"></div>
        <div className="relative flex justify-between px-6 py-4 items-center">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="group p-3 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft className="text-xl text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
          </button>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text">
              Shoe Collection
            </h1>
            <p className="text-sm text-dark-300 mt-1">
              Discover Premium Footwear
            </p>
          </div>

          {/* Cart Button */}
          <Link
            to={"/cart"}
            className="group relative p-3 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-gold-500/20 shadow-luxury hover:shadow-luxury-lg transition-all duration-300 hover:scale-105"
          >
            <FaShoppingCart className="text-xl text-gold-400 group-hover:text-gold-300 transition-colors duration-300" />
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 text-[10px] text-center w-5 h-5 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-red-500 to-red-600 shadow-lg animate-pulse-gold">
                {cart.length}
              </div>
            )}
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="relative z-10 bg-dark-800/30 backdrop-blur-sm border-b border-gold-500/10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold text-gold-400">Categories</h2>
            <div className="flex items-center gap-2">
              <div className="text-xs bg-gold-500/20 px-3 py-1 rounded-full flex gap-2 items-center text-gold-300 font-medium border border-gold-500/30">
                <FaFilter className="text-[10px]" />
                Filter
              </div>
            </div>
          </div>
          <Category HandeleShoeType={HandeleShoeType} />
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="relative z-10 flex-1 bg-dark-gradient">
        <div className="px-6 py-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dark-200">
              {shoe.length} {shoe.length === 1 ? "Product" : "Products"}{" "}
              Available
            </h3>
            <div className="text-sm text-dark-400">Premium Collection</div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide">
            {shoe.map((data, index) => (
              <div
                key={data._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Food2Card data={data} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {shoe.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-24 h-24 bg-dark-700 rounded-full flex items-center justify-center mb-4">
                <FaShoppingCart className="text-4xl text-gold-500/50" />
              </div>
              <h3 className="text-xl font-semibold text-dark-300 mb-2">
                No Products Found
              </h3>
              <p className="text-dark-400">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
