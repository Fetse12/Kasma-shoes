import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import PropTypes from "prop-types";

export default function Food2Card({ data }) {
  const navigate = useNavigate();
  const [discription, setDiscription] = useState();
  const handleAddtoCart = () => {
    // Navigate to product detail page for size selection
    navigate(`/viewshoe/${data._id}`);
  };

  useEffect(() => {
    try {
      setDiscription(data.discription.slice(0, 70));
    } catch (error) {
      console.log(error);
    }
  }, [data.discription]);
  // Navigate to the detailed page for the food item
  const handleRoute = () => {
    navigate(`/viewshoe/${data._id}`);
  };

  return (
    <div
      onClick={handleRoute}
      className="group product-card bg-dark-800/50 backdrop-blur-sm border border-dark-700/50 hover:border-gold-500/30 p-3 flex flex-col justify-between w-full shadow-luxury hover:shadow-luxury-lg rounded-2xl transition-all duration-300"
    >
      <div className="relative">
        <div className="w-full relative flex justify-center overflow-hidden rounded-xl">
          <div className="absolute px-2 py-1 rounded-lg text-[10px] text-white bg-gradient-to-r from-gold-500 to-gold-600 shadow-lg top-2 right-2 z-10">
            {data.type}
          </div>
          <img
            className="w-full h-32 lg:h-80 object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300"
            src={data.imgUrl[0]}
            alt={data.shoes_name}
          />
          {/* Quick view overlay */}
          <div className="quick-view-overlay rounded-xl">
            <div className="text-gold-400 text-sm font-medium">Quick View</div>
          </div>
        </div>
        <div className="text-sm lg:text-xl mt-3 mb-2 leading-tight font-semibold text-dark-200 group-hover:text-gold-300 transition-colors duration-300">
          {data.shoes_name}
        </div>
        <p className="text-[10px] pb-2 text-dark-400 leading-relaxed">
          {discription}
        </p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-end">
          <div className="text-xl text-gold-400 font-bold">
            <span className="text-xs lg:text-lg font-normal text-dark-400">
              ETB
            </span>{" "}
            {data.Price}
          </div>
          <div className="text-[10px] lg:text-md text-dark-500">
            Premium Quality
          </div>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleAddtoCart();
          }}
          className="px-3 py-2 flex gap-2 items-center text-[11px] lg:text-xl font-semibold w-fit rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-gold-500 to-gold-600 text-white hover:from-gold-400 hover:to-gold-500 shadow-luxury"
        >
          <FaShoppingCart className="text-[10px] lg:text-2xl" />
        </div>
      </div>
    </div>
  );
}

Food2Card.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    shoes_name: PropTypes.string.isRequired,
    Price: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    imgUrl: PropTypes.array.isRequired,
    discription: PropTypes.string.isRequired,
  }).isRequired,
};
