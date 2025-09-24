import { Link, useLocation } from "react-router-dom";
import useStore from "../zustand/store";
import ShoeCard from "../component/ShoeCard";
import StickyNavbar from "../component/StickyNavbar";
import LuxuryFooter from "../component/LuxuryFooter";

export default function TypeShoe() {
  const { shoes } = useStore();
  const location = useLocation();

  const data = location.state;
  let filteredShoes = [];
  if (data.isShoeType) {
    filteredShoes = shoes.filter((shoe) => shoe.shoes_type === data.type);
  } else {
    filteredShoes = shoes.filter((shoe) => shoe.type === data.type);
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sticky Navigation */}
      <StickyNavbar />

      {/* Page Header */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-500/10 to-red-500/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">
            {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
            <span className="block gradient-text">Collection</span>
          </h1>
          <p
            className="text-dark-300 text-xl max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our curated selection of premium {data.type.toLowerCase()}{" "}
            footwear
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {filteredShoes && filteredShoes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredShoes.map((shoeData, index) => (
                <div
                  key={shoeData._id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ShoeCard data={shoeData} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-32 h-32 rounded-full glass flex items-center justify-center mb-8 mx-auto animate-fade-in-up">
                <svg
                  className="w-16 h-16 text-gold-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3
                className="text-3xl font-bold text-white mb-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                No Shoes Found
              </h3>
              <p
                className="text-dark-300 text-lg mb-8 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                No shoes available in this category at the moment.
              </p>
              <Link
                to="/shoe"
                className="btn-luxury px-8 py-4 rounded-full text-white font-semibold text-lg inline-flex items-center gap-3 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                Browse All Products
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <LuxuryFooter />
    </div>
  );
}
