import React from "react";
import StickyNavbar from "../component/StickyNavbar";
import LuxuryFooter from "../component/LuxuryFooter";

const About = () => {
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sticky Navigation */}
      <StickyNavbar />

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-500/10 to-red-500/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">
            About
            <span className="block gradient-text">Kasma</span>
          </h1>
          <p
            className="text-dark-300 text-xl max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Crafting luxury footwear for the modern lifestyle
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                Our
                <span className="block gradient-text">Story</span>
              </h2>
              <p className="text-dark-300 text-lg leading-relaxed mb-6">
                Founded with a passion for exceptional footwear, Kasma has been
                at the forefront of luxury shoe design in Ethiopia. We believe
                that great shoes are more than just footwear – they're a
                statement of style, comfort, and quality.
              </p>
              <p className="text-dark-300 text-lg leading-relaxed mb-8">
                Our carefully curated collection features premium materials and
                timeless designs that elevate your everyday look. From classic
                formal shoes to modern sneakers, each piece is crafted with
                attention to detail and commitment to excellence.
              </p>
            </div>

            <div className="animate-fade-in-right">
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden glass">
                  <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Our story"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-dark-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 animate-fade-in-up">
              Our
              <span className="block gradient-text">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-dark-900 font-bold text-2xl">★</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Quality</h3>
              <p className="text-dark-300">
                We use only the finest materials and craftsmanship to ensure
                every pair meets our high standards.
              </p>
            </div>

            <div
              className="text-center animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-dark-900 font-bold text-2xl">❤</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Passion</h3>
              <p className="text-dark-300">
                Our love for footwear drives us to continuously innovate and
                create exceptional products.
              </p>
            </div>

            <div
              className="text-center animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-dark-900 font-bold text-2xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Sustainability
              </h3>
              <p className="text-dark-300">
                We're committed to responsible practices that protect our planet
                for future generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LuxuryFooter />
    </div>
  );
};

export default About;
