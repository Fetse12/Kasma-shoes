// RectangleWithHalfCircle.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ data }) => {
  const navigate = useNavigate();

  const handleRoute = () => {
    navigate("/viewfood");
  };
  return (
    <div onClick={() => handleRoute()} className="flex items-center ">
      <div className="bg-white w-48  rounded-2xl shadow-lg relative  flex items-center  ">
        <div>
          <div className="p-3 px-5">
            <div className="flex  font-bold text-[17px] leading-tight flex-col">
              <span>{data.name}</span>
              <span>{data.name2}</span>
            </div>
            <div className="text-gray-400 text-[12px]">
              {data.cal}cal - {data.gram}g
            </div>
          </div>
          <div className="bg-black text-white font-bold text-center w-20 text-xl rounded-tr-2xl rounded-bl-2xl">
            25$
          </div>
        </div>
        <div className="absolute z-20 -right-8">
          <img className="w-28 h-20 object-scale-down" src={data.img} alt="" />
        </div>
      </div>
      <div className="bg-white w-8 h-16 shadow-lg rounded-r-full z-10"></div>
    </div>
  );
};

export default FoodCard;
