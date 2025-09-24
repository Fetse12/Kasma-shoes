import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import useStore from "../zustand/store";
import fetchShoes from "../hook/fetchShoes";
import Hero from "../component/Hero";
import StickyNavbar from "../component/StickyNavbar";
import LuxuryProductGrid from "../component/LuxuryProductGrid";
import LuxuryFooter from "../component/LuxuryFooter";

export default function Home() {
  const navigate = useNavigate();
  const { shoes } = useStore();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search functionality
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // hooks
  fetchShoes();

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

  // Remove handleSearchClick as it's no longer needed

  const handleResultClick = (shoe) => {
    navigate(`/viewshoe/${shoe._id}`);
    setIsSearchOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  };

  // Close search overlay when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isSearchOpen &&
        !event.target.closest(".home-search-overlay") &&
        !event.target.closest("#home-search-input")
      ) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    // Check if shoes is an array before filtering
    if (Array.isArray(shoes)) {
      setIsLoading(false);

      if (shoes.length > 0) {
        // Filter featured products (special offers)
        const featured = shoes.filter((item) => item.isSpecial);
        setFeaturedProducts(featured);

        // Filter new arrivals (recently added)
        const newProducts = shoes.slice(0, 8);
        setNewArrivals(newProducts);
      } else {
        // Set empty arrays if no shoes available
        setFeaturedProducts([]);
        setNewArrivals([]);
      }
    }
  }, [shoes]);

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sticky Navigation */}
      <StickyNavbar />

      {/* Hero Section */}
      <Hero />

      {/* Search Section */}
      <section className="py-16 px-6 bg-dark-800/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Your Perfect Pair
            </h2>
            <p className="text-dark-300 text-lg">
              Discover our curated collection of premium footwear
            </p>
          </div>
          <div
            className="animate-fade-in-up relative"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Search Input */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="relative glass rounded-2xl overflow-hidden transition-all duration-300 shadow-neon-lg border-neon-blue/50">
                <div className="flex items-center">
                  <div className="pl-4 pr-2">
                    <FontAwesomeIcon
                      icon={faSearch}
                      className="text-lg text-neon-blue"
                    />
                  </div>

                  <input
                    id="home-search-input"
                    type="text"
                    placeholder="Search for shoes..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onFocus={() => setIsSearchOpen(true)}
                    className="flex-grow px-3 py-4 bg-transparent text-dark-100 placeholder-dark-400 focus:outline-none text-lg"
                  />

                  {searchTerm && (
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSearchResults([]);
                      }}
                      className="px-3 py-2 text-dark-400 hover:text-neon-pink transition-colors duration-300"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-sm" />
                    </button>
                  )}

                  <button
                    onClick={handleSearchSubmit}
                    className="btn-neon px-6 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold transition-all duration-300 hover:shadow-neon-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!searchTerm.trim()}
                  >
                    <FontAwesomeIcon icon={faSearch} className="text-lg" />
                  </button>
                </div>

                {/* Focus indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple opacity-100"></div>
              </div>
            </div>

            {/* Search Overlay */}
            {isSearchOpen && (
              <div className="home-search-overlay absolute top-full left-0 right-0 mt-4 glass rounded-2xl border border-gold-500/20 z-50">
                <div className="p-6">
                  {/* Loading indicator in overlay */}
                  {isSearching && (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-500"></div>
                      <span className="ml-3 text-dark-300">Searching...</span>
                    </div>
                  )}

                  {/* Search Results */}
                  {searchTerm && !isSearching && (
                    <div className="mt-4 max-h-96 overflow-y-auto">
                      {searchResults.length > 0 ? (
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
                                    <FontAwesomeIcon
                                      icon={faSearch}
                                      className="text-lg"
                                    />
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
                  {!searchTerm && !isSearching && (
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
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {isLoading ? (
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-dark-800 rounded mb-8 max-w-md mx-auto"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-dark-800 rounded-2xl h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {featuredProducts.length > 0 && (
            <LuxuryProductGrid
              products={featuredProducts}
              title="Featured Collection"
              columns={4}
            />
          )}

          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <section className="py-16 px-6 bg-dark-800/30">
              <LuxuryProductGrid
                products={newArrivals}
                title="New Arrivals"
                columns={4}
              />
            </section>
          )}
        </>
      )}

      {/* Brand Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Crafted for
                <span className="block gradient-text">Excellence</span>
              </h2>
              <p className="text-dark-300 text-lg leading-relaxed mb-8">
                At Kasma, we believe that great shoes are more than just
                footwear – they&apos;re a statement of style, comfort, and
                quality. Our carefully curated collection features premium
                materials and timeless designs that elevate your everyday look.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="btn-luxury px-8 py-4 rounded-full text-white font-semibold text-lg">
                  Our Story
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-gold-500 text-gold-500 font-semibold text-lg hover:bg-gold-500 hover:text-dark-900 transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden glass">
                  <img
                    src="/api/placeholder/600/600"
                    alt="Luxury shoes showcase"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gold-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-dark-900 font-bold text-2xl">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-500/10 to-red-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 animate-fade-in-up">
            Stay in Style
          </h2>
          <p
            className="text-dark-300 text-xl mb-8 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Get exclusive access to new collections, special offers, and style
            tips.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-dark-800 border border-gold-500/30 rounded-full text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300"
            />
            <button className="btn-luxury px-8 py-4 rounded-full text-white font-semibold text-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LuxuryFooter />
    </div>
  );
}
