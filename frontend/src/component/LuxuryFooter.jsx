import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";

const LuxuryFooter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    shop: [
      { name: "All Products", path: "/shoe" },
      { name: "Men's Shoes", path: "/shoe?category=men" },
      { name: "Women's Shoes", path: "/shoe?category=women" },
      { name: "Kids' Shoes", path: "/shoe?category=kids" },
      { name: "Sale", path: "/shoe?sale=true" },
    ],
    support: [
      { name: "Size Guide", path: "/size-guide" },
      { name: "Shipping Info", path: "/shipping" },
      { name: "Returns", path: "/returns" },
      { name: "Contact Us", path: "/contact" },
      { name: "FAQ", path: "/faq" },
    ],
    company: [
      { name: "About Us", path: "/about" },
      { name: "Careers", path: "/careers" },
      { name: "Press", path: "/press" },
      { name: "Sustainability", path: "/sustainability" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
  };

  const socialLinks = [
    { name: "Facebook", icon: FaFacebook, href: "#" },
    { name: "Twitter", icon: FaTwitter, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "LinkedIn", icon: FaLinkedin, href: "#" },
  ];

  return (
    <footer className="bg-dark-900 border-t border-gold-500/20">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gold-500 to-red-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <span className="text-3xl font-bold text-white group-hover:text-gold-500 transition-colors duration-300">
                Kasma
              </span>
            </Link>

            <p className="text-dark-300 mb-6 leading-relaxed">
              Discover luxury footwear crafted for the modern lifestyle. Premium
              quality, exceptional comfort, timeless style.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-dark-300">
                <FaMapMarkerAlt className="text-gold-500" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-3 text-dark-300">
                <FaPhone className="text-gold-500" />
                <span>+251 911 234 567</span>
              </div>
              <div className="flex items-center gap-3 text-dark-300">
                <FaEnvelope className="text-gold-500" />
                <span>info@kasma.com</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-gold-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-dark-300 hover:text-gold-500 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Stay Updated</h3>
            <p className="text-dark-300 mb-6">
              Subscribe to our newsletter for exclusive offers and new arrivals.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-l-full text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gold-500 text-dark-900 font-semibold rounded-r-full hover:bg-gold-400 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>

              {isSubscribed && (
                <p className="text-gold-500 text-sm animate-fade-in">
                  Thank you for subscribing!
                </p>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold-500/20 hover:text-gold-500 transition-all duration-300 group"
                    aria-label={social.name}
                  >
                    <social.icon className="text-dark-300 group-hover:text-gold-500 transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gold-500/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-dark-400">
              <span>© 2024 Kasma. Made with</span>
              <FaHeart className="text-red-500 animate-pulse" />
              <span>in Ethiopia</span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-dark-400 hover:text-gold-500 transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-dark-400 hover:text-gold-500 transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-dark-400 hover:text-gold-500 transition-colors duration-300"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;
