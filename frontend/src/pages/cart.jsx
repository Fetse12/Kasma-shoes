import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import useStore from "../zustand/store";

export default function Cart() {
  const { cart, setCart, setUserLocation, setLocationError } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleAddItem = (id) => {
    setCart(
      cart.map((item) =>
        item.shoe._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setCart(false);
  //     }, 2000);

  //     return () => clearTimeout(timer);
  // }, [cart]);

  const handleRemoveItem = (id) => {
    setCart(
      cart.map((item) =>
        item.shoe._id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeshoe = (id) => {
    setCart(cart.filter((item) => item.shoe._id !== id));
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationError(
              "You need to allow location access to use this feature."
            );
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setLocationError("Location information is unavailable.");
          } else {
            setLocationError("An unknown error occurred.");
          }
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleAddMoreshoe = () => {
    navigate("/shoe");
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.shoe.Price * item.quantity,
    0
  );

  return (
    <div className="flex relative flex-col justify-between h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5"></div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-10 w-24 h-24 rounded-full bg-neon-blue/10 blur-xl animate-float"></div>
      <div
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-neon-purple/10 blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>

      {error && (
        <div className="absolute z-50 top-20 right-4 glass px-4 py-3 rounded-2xl border border-neon-pink/50 shadow-neon">
          <div className="flex items-center space-x-2 text-neon-pink">
            <span className="text-sm font-semibold">{error}</span>
          </div>
        </div>
      )}

      <div className="relative z-10 flex-grow p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-12 h-12 rounded-2xl glass flex items-center justify-center hover:bg-neon-blue/20 transition-colors duration-300"
          >
            <FaArrowLeft className="text-xl text-neon-blue" />
          </button>

          <div className="text-center">
            <h1 className="text-3xl font-bold gradient-text">My Cart</h1>
            <p className="text-dark-400 text-sm mt-1">{cart.length} items</p>
          </div>

          <button
            onClick={handleAddMoreshoe}
            className="w-12 h-12 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-2xl flex justify-center items-center hover:shadow-neon transition-all duration-300"
          >
            +
          </button>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 h-[70vh] overflow-y-scroll pr-2">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 rounded-full glass flex items-center justify-center mb-6">
                <FaShoppingCart className="text-4xl text-neon-blue" />
              </div>
              <h3 className="text-xl font-bold text-dark-200 mb-2">
                Your cart is empty
              </h3>
              <p className="text-dark-400 mb-6">
                Add some shoes to get started!
              </p>
              <button
                onClick={handleAddMoreshoe}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-neon transition-all duration-300"
              >
                Browse Shoes
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.shoe._id}
                className="glass rounded-3xl p-4 hover:shadow-neon transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      className="w-24 h-24 object-cover rounded-2xl"
                      src={item.shoe.imgUrl[0] || item.shoe.imgUrl}
                      alt=""
                    />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-r from-neon-pink to-neon-orange text-white text-xs font-bold flex items-center justify-center">
                      {item.quantity}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-dark-100 group-hover:text-neon-blue transition-colors duration-300">
                        {item.shoe.shoe_name || item.shoe.drink_name}
                      </h3>
                      <button
                        onClick={() => removeshoe(item.shoe._id)}
                        className="p-2 rounded-lg hover:bg-neon-pink/20 transition-colors duration-300"
                      >
                        <FaTrash className="text-neon-pink hover:text-red-500 text-lg" />
                      </button>
                    </div>

                    <div className="text-dark-400 text-sm mb-3">
                      Size: {item.shoe.shoe_Size}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline space-x-1">
                        <span className="text-neon-cyan text-sm font-medium">
                          ETB
                        </span>
                        <span className="text-xl font-bold gradient-text">
                          {item.shoe.Price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleRemoveItem(item.shoe._id)}
                          className="w-8 h-8 rounded-lg glass flex justify-center items-center hover:bg-neon-blue/20 transition-colors duration-300"
                        >
                          <span className="text-neon-blue font-bold">-</span>
                        </button>
                        <span className="text-lg font-bold text-dark-100 min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleAddItem(item.shoe._id)}
                          className="w-8 h-8 rounded-lg glass flex justify-center items-center hover:bg-neon-blue/20 transition-colors duration-300"
                        >
                          <span className="text-neon-blue font-bold">+</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="relative z-10 glass border-t border-neon-blue/20 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-dark-400 font-semibold">Total:</span>
              <span className="text-3xl font-bold gradient-text">
                {totalPrice.toFixed(2)}
              </span>
              <span className="text-sm text-dark-400">ETB</span>
            </div>

            <button
              onClick={() => {
                if (cart.length > 0) {
                  navigate("/checkout");
                  getUserLocation();
                } else {
                  setError("Please Select Products To CheckOut");
                }
              }}
              className="btn-neon px-8 py-4 rounded-2xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-lg hover:shadow-neon-lg transition-all duration-300"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
