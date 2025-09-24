import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import useStore from "../zustand/store";

const StickyNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { cart } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSearchOpen && !event.target.closest(".search-overlay")) {
        setIsSearchOpen(false);
        setSearchTerm("");
        setSearchResults([]);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen]);

  // Search functionality
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setIsSearchOpen(false);
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Focus the input when opening
      setTimeout(() => {
        const input = document.getElementById("navbar-search-input");
        if (input) input.focus();
      }, 100);
    } else {
      // Clear search when closing
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const handleResultClick = (shoe) => {
    navigate(`/viewshoe/${shoe._id}`);
    setIsSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shoe" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 navbar-sticky transition-all duration-300 ${
          isScrolled ? "navbar-solid" : "navbar-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-gold-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-bold text-white group-hover:text-gold-500 transition-colors duration-300">
                Kasma
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-gold-500"
                      : "text-dark-200 hover:text-gold-400"
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500 rounded-full"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              {/* Search Icon */}
              <button
                onClick={handleSearchIconClick}
                className="p-3 rounded-full glass hover:bg-gold-500/20 transition-all duration-300 group"
                aria-label="Search"
              >
                <FaSearch className="text-dark-200 group-hover:text-gold-500 text-lg transition-colors duration-300" />
              </button>

              {/* Cart Icon */}
              <Link
                to="/cart"
                className="relative p-3 rounded-full glass hover:bg-gold-500/20 transition-all duration-300 group"
                aria-label="Shopping Cart"
              >
                <FaShoppingCart className="text-dark-200 group-hover:text-gold-500 text-lg transition-colors duration-300" />
                {cart.length > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold-500 text-dark-900 text-xs font-bold flex items-center justify-center animate-pulse">
                    {cart.length}
                  </div>
                )}
              </Link>

              {/* User Icon */}
              <Link
                to="/profile"
                className="p-3 rounded-full glass hover:bg-gold-500/20 transition-all duration-300 group"
                aria-label="Profile"
              >
                <FaUser className="text-dark-200 group-hover:text-gold-500 text-lg transition-colors duration-300" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-3 rounded-full glass hover:bg-gold-500/20 transition-all duration-300"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="text-dark-200 text-lg" />
                ) : (
                  <FaBars className="text-dark-200 text-lg" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-gold-500/20">
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-gold-500"
                      : "text-dark-200 hover:text-gold-400"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="search-overlay absolute top-full left-0 right-0 glass border-t border-gold-500/20 z-50">
            <div className="p-6">
              <form onSubmit={handleSearchSubmit} className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      id="navbar-search-input"
                      type="text"
                      placeholder="Search for shoes..."
                      value={searchTerm}
                      onChange={handleSearchInputChange}
                      className="w-full px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    />
                    {isSearching && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold-500"></div>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-3 rounded-xl glass hover:bg-gold-500/20 transition-all duration-300"
                  >
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-dark-200 text-lg"
                    />
                  </button>
                </div>
              </form>

              {/* Search Results */}
              {searchTerm && (
                <div className="mt-4 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold-500 mx-auto"></div>
                      <p className="text-dark-300 mt-2">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold text-white mb-3">
                        Search Results ({searchResults.length})
                      </h3>
                      {searchResults.slice(0, 5).map((shoe) => (
                        <div
                          key={shoe._id}
                          onClick={() => handleResultClick(shoe)}
                          className="flex items-center space-x-3 p-3 rounded-xl glass hover:bg-gold-500/10 cursor-pointer transition-all duration-300 group"
                        >
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-dark-700 flex-shrink-0">
                            {shoe.imgUrl && shoe.imgUrl[0] ? (
                              <img
                                src={shoe.imgUrl[0]}
                                alt={shoe.shoes_name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-dark-400">
                                <FaSearch className="text-lg" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium group-hover:text-gold-400 transition-colors duration-300 truncate">
                              {shoe.shoes_name}
                            </h4>
                            <div className="space-y-1">
                              <p className="text-dark-300 text-sm">
                                {shoe.shoes_type} •{" "}
                                {shoe.type?.replace("_", " ")} • Size{" "}
                                {shoe.shoe_Size}
                              </p>
                              <div className="flex items-center space-x-2">
                                {shoe.DiscountPercent > 0 ? (
                                  <>
                                    <span className="text-gold-500 font-semibold">
                                      $
                                      {Math.round(
                                        shoe.Price *
                                          (1 - shoe.DiscountPercent / 100)
                                      )}
                                    </span>
                                    <span className="text-dark-400 line-through text-sm">
                                      ${shoe.Price}
                                    </span>
                                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                      -{shoe.DiscountPercent}%
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-gold-500 font-semibold">
                                    ${shoe.Price}
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2">
                                {shoe.isSpecial && (
                                  <span className="bg-gold-500 text-dark-900 text-xs px-2 py-1 rounded-full font-medium">
                                    Special
                                  </span>
                                )}
                                {!shoe.isAvailable && (
                                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    Out of Stock
                                  </span>
                                )}
                                {shoe.isAvailable && (
                                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                                    In Stock
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      {searchResults.length > 5 && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full mt-3 py-2 text-gold-500 hover:text-gold-400 font-medium transition-colors duration-300"
                        >
                          View all {searchResults.length} results
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-dark-300">
                        No shoes found for &quot;{searchTerm}&quot;
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Popular Searches */}
              {!searchTerm && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Sneakers",
                      "Boots",
                      "Formal",
                      "Athletic",
                      "Heels",
                      "Loafers",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setSearchTerm(term);
                          handleSearch(term);
                        }}
                        className="px-4 py-2 bg-dark-800 hover:bg-gold-500/20 text-dark-200 hover:text-gold-400 rounded-lg transition-all duration-300"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default StickyNavbar;
