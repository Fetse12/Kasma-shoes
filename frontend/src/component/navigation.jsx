// src/components/Navigation.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faStore } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const navItems = [
    {
      path: "/",
      icon: faHome,
      label: "Home",
      gradient: "from-neon-blue to-neon-cyan",
    },
    {
      path: "/shoe",
      icon: faStore,
      label: "Shoe",
      gradient: "from-neon-purple to-neon-pink",
    },
  ];

  const isActive = (item) => {
    if (item.matchPaths) {
      return item.matchPaths.includes(activePath) || activePath === item.path;
    }
    return activePath === item.path;
  };

  return (
    <div className="fixed bottom-0 z-40 left-0 w-full glass backdrop-blur-xl border-t border-neon-blue/20">
      <div className="flex justify-around py-4 px-2">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center group relative"
            >
              {/* Background glow for active item */}
              {active && (
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r opacity-20 animate-pulse-neon"></div>
              )}

              {/* Icon container */}
              <div
                className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  active
                    ? `bg-gradient-to-r ${item.gradient} shadow-neon scale-110`
                    : "bg-dark-800/50 group-hover:bg-dark-700/50"
                }`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`text-xl transition-all duration-300 ${
                    active
                      ? "text-white scale-110"
                      : "text-dark-400 group-hover:text-neon-blue"
                  }`}
                />

                {/* Ripple effect */}
                {active && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r opacity-30 animate-ping"></div>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs mt-2 font-semibold transition-all duration-300 ${
                  active
                    ? "text-neon-blue scale-105"
                    : "text-dark-400 group-hover:text-dark-200"
                }`}
              >
                {item.label}
              </span>

              {/* Active indicator */}
              {active && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-neon-blue animate-pulse"></div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
