import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faStar,
  faTruck,
  faHeart,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import heart from "../assets/heart.png";
import red from "../assets/red.png";
import { useNavigate } from "react-router-dom";

export default function SpecialFood({ data }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleRoute = () => {
    navigate(`/viewshoe/${data._id}`);
  };

  return (
    <div
      onClick={() => handleRoute()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-3xl glass card-hover p-4 w-[320px] cursor-pointer overflow-hidden"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Special badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-neon-orange to-neon-pink text-white text-xs font-bold shadow-neon animate-pulse">
            <FontAwesomeIcon icon={faFire} className="mr-1" />
            Special
          </div>
        </div>
      </div>

      {/* Heart icon */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-10 h-10 rounded-full glass flex items-center justify-center backdrop-blur-sm hover:bg-neon-pink/20 transition-colors duration-300">
          <FontAwesomeIcon icon={faHeart} className="text-neon-pink text-lg" />
        </div>
      </div>

      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={data.imgUrl[0]}
            alt={data.shoes_name}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent"></div>
        </div>

        {/* Type badge */}
        <div className="absolute bottom-4 right-4">
          <div className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon">
            {data.type}
          </div>
        </div>
      </div>

      <div className="relative mt-4 space-y-3">
        <div className="space-y-2">
          <h3 className="text-dark-100 font-bold text-xl leading-tight group-hover:text-neon-blue transition-colors duration-300">
            {data.shoes_name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-neon-cyan text-sm font-medium">ETB</span>
              <span className="text-dark-100 text-2xl font-bold gradient-text">
                {data.Price}
              </span>
            </div>

            <div className="flex items-center space-x-1 text-neon-orange">
              <FontAwesomeIcon icon={faStar} className="text-sm" />
              <span className="text-sm font-semibold">4.8</span>
            </div>
          </div>

          <p className="text-dark-300 text-sm leading-relaxed">
            {data.description.slice(0, 90)}...
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <button className="flex items-center space-x-2 text-neon-blue hover:text-neon-cyan transition-colors duration-300">
            <FontAwesomeIcon icon={faTruck} className="text-sm" />
            <span className="text-sm font-medium">Free Delivery</span>
          </button>

          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold hover:shadow-neon transition-all duration-300">
            View Details
          </button>
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 rounded-3xl border border-neon-blue/0 group-hover:border-neon-blue/40 transition-all duration-500"></div>

      {/* Shimmer effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer"></div>
        </div>
      )}
    </div>
  );
}
