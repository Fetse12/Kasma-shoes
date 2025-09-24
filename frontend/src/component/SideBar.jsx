import React from "react";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";

export default function SideBar({ setMenuOpen }) {
  const { selected, setSelected } = useStore();
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    setMenuOpen(false);
    navigate("/shoeType", {
      state: { isShoeType: type === "men" || type === "women", type },
    });
    setSelected(type);
  };

  const menuItems = [
    {
      type: "men",
      label: "Men",
      icon: "👨",
      gradient: "from-neon-blue to-neon-cyan",
    },
    {
      type: "women",
      label: "Women",
      icon: "👩",
      gradient: "from-neon-pink to-neon-purple",
    },
    {
      type: "kids",
      label: "Kids",
      icon: "👶",
      gradient: "from-neon-green to-neon-cyan",
    },
    {
      type: "formal_shoes",
      label: "Formal",
      icon: "👔",
      gradient: "from-neon-purple to-neon-blue",
    },
    {
      type: "sneakers",
      label: "Sneakers",
      icon: "👟",
      gradient: "from-neon-orange to-neon-pink",
    },
    {
      type: "boots",
      label: "Boots",
      icon: "🥾",
      gradient: "from-neon-cyan to-neon-green",
    },
    {
      type: "athletic_shoes",
      label: "Athletic",
      icon: "🏃",
      gradient: "from-neon-green to-neon-blue",
    },
    {
      type: "heels",
      label: "Heels",
      icon: "👠",
      gradient: "from-neon-pink to-neon-orange",
    },
  ];

  return (
    <div className="w-80 h-screen glass backdrop-blur-xl z-40 fixed top-0 left-0 transition-all duration-300 border-r border-neon-blue/20">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-neon-blue/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple flex items-center justify-center">
            <span className="text-white text-xl font-bold">ጫ</span>
          </div>
          <h2 className="text-2xl font-bold gradient-text">ማ</h2>
        </div>
        <button
          onClick={() => setMenuOpen(false)}
          className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-neon-blue/20 transition-colors duration-300"
        >
          <MdClose className="text-dark-300 text-xl" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-4">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const isSelected = selected === item.type;
            return (
              <div
                key={item.type}
                onClick={() => handleNavigation(item.type)}
                className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? `bg-gradient-to-r ${item.gradient} shadow-neon`
                    : "hover:bg-dark-800/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Background glow for selected item */}
                {isSelected && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-20 animate-pulse-neon"></div>
                )}

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${
                        isSelected
                          ? "bg-white/20"
                          : "bg-dark-800/50 group-hover:bg-dark-700/50"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={`text-lg font-semibold transition-colors duration-300 ${
                          isSelected
                            ? "text-white"
                            : "text-dark-200 group-hover:text-neon-blue"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`text-sm transition-colors duration-300 ${
                          isSelected
                            ? "text-white/70"
                            : "text-dark-400 group-hover:text-dark-300"
                        }`}
                      >
                        {item.type.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-300 ${
                      isSelected
                        ? "text-white scale-110"
                        : "text-dark-400 group-hover:text-neon-blue"
                    }`}
                  >
                    <MdKeyboardArrowDown className="text-xl" />
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 rounded-2xl border border-neon-blue/0 group-hover:border-neon-blue/30 transition-all duration-300"></div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-6 left-4 right-4">
        <div className="glass rounded-2xl p-4 border border-neon-blue/20">
          <div className="text-center">
            <div className="text-sm text-dark-400 mb-2">
              Explore our collection
            </div>
            <div className="w-full h-1 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
