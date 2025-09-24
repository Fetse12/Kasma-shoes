// src/components/SearchBar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div
        className={`relative glass rounded-2xl overflow-hidden transition-all duration-300 ${
          isFocused ? "shadow-neon-lg border-neon-blue/50" : "shadow-dark"
        }`}
      >
        <div className="flex items-center">
          <div className="pl-4 pr-2">
            <FontAwesomeIcon
              icon={faSearch}
              className={`text-lg transition-colors duration-300 ${
                isFocused ? "text-neon-blue" : "text-dark-400"
              }`}
            />
          </div>

          <input
            type="text"
            placeholder="Search for shoes..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-grow px-3 py-4 bg-transparent text-dark-100 placeholder-dark-400 focus:outline-none text-lg"
          />

          {searchTerm && (
            <button
              onClick={handleClear}
              className="px-3 py-2 text-dark-400 hover:text-neon-pink transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTimes} className="text-sm" />
            </button>
          )}

          <button
            onClick={handleSearch}
            className="btn-neon px-6 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold transition-all duration-300 hover:shadow-neon-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!searchTerm.trim()}
          >
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </button>
        </div>

        {/* Focus indicator */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple transition-all duration-300 ${
            isFocused ? "opacity-100" : "opacity-0"
          }`}
        ></div>
      </div>

      {/* Search suggestions (placeholder for future enhancement) */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 glass rounded-2xl border border-neon-blue/20 backdrop-blur-xl z-10">
          <div className="p-4">
            <div className="text-sm text-dark-400 mb-2">Popular searches</div>
            <div className="space-y-2">
              {["Sneakers", "Boots", "Formal", "Athletic"].map((suggestion) => (
                <div
                  key={suggestion}
                  onClick={() => {
                    setSearchTerm(suggestion);
                    navigate(`/search/${suggestion}`);
                  }}
                  className="px-3 py-2 rounded-lg hover:bg-dark-800/50 cursor-pointer transition-colors duration-300 text-dark-200"
                >
                  {suggestion}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
