import React, { useEffect, useState } from "react";
import burger from "../assets/burgur.png";
import injera from "../assets/injera.png";
import snickers from "../assets/snickers.png";
import fromal from "../assets/formal.png";
import boots from "../assets/boots.png";
import heels from "../assets/heels.png";
import athletic from "../assets/athletic.png";
import flipflop from "../assets/flipflop.png";
import loafers from "../assets/loafers.png";
import work from "../assets/work.png";
import running from "../assets/running.png";

export default function Category({ HandeleShoeType }) {
  const [selected, setSelected] = useState(() => {
    return JSON.parse(localStorage.getItem("selectedCatagory")) || "sneakers";
  });

  const categories = [
    { id: "sneakers", label: "Sneakers", img: snickers },
    { id: "boots", label: "Boots", img: boots },
    { id: "formal_shoes", label: "Formal", img: fromal },
    { id: "heels", label: "Heels", img: heels },
    { id: "athletic_shoes", label: "Athletic", img: athletic },
    { id: "flip_flops", label: "Flip-Flops", img: flipflop },
    { id: "sandals", label: "Sandals", img: loafers },
    { id: "running_shoes", label: "Running", img: running },
  ];

  useEffect(() => {
    const label = categories.find((category) => category.id === selected);
    HandeleShoeType(label.id);
  }, [selected, HandeleShoeType]); // Update effect dependency

  const handleCategorySelect = (category) => {
    setSelected(category.id);
    HandeleShoeType(category.id);
    localStorage.setItem("selectedCatagory", JSON.stringify(category.id));
  };

  return (
    <div>
      {/* Category Scrollable List */}
      <div className="w-full overflow-x-auto py-2 flex gap-4 scrollbar-hide snap-x snap-mandatory">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => handleCategorySelect(category)}
            className={`group flex py-4 flex-col flex-none gap-2 items-center rounded-2xl 
                            ${
                              selected === category.id
                                ? "bg-gradient-to-br from-gold-500 to-gold-600 shadow-luxury-lg"
                                : "bg-dark-700/50 hover:bg-dark-700/70 border border-dark-600/50 hover:border-gold-500/30"
                            } 
                            p-3 cursor-pointer snap-center transition-all duration-300 hover:scale-105 min-w-[80px]`}
          >
            <div
              className={`p-2 rounded-xl transition-all duration-300 ${
                selected === category.id
                  ? "bg-white/20 shadow-lg"
                  : "bg-dark-600/50 group-hover:bg-gold-500/20"
              }`}
            >
              <img
                className="w-12 h-10 object-cover rounded-lg"
                src={category.img}
                alt={category.label}
              />
            </div>
            <div
              className={`text-xs text-center font-medium transition-colors duration-300 ${
                selected === category.id
                  ? "text-white font-semibold"
                  : "text-dark-300 group-hover:text-gold-300"
              }`}
            >
              {category.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
