import React, { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import StickyNavbar from "../component/StickyNavbar";
import LuxuryFooter from "../component/LuxuryFooter";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sticky Navigation */}
      <StickyNavbar />

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gold-500/10 to-red-500/10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 animate-fade-in-up">
            Contact
            <span className="block gradient-text">Us</span>
          </h1>
          <p
            className="text-dark-300 text-xl max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Get in touch with our team
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="animate-fade-in-left">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                Get in
                <span className="block gradient-text">Touch</span>
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <FaPhone className="text-dark-900 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Phone</h3>
                    <p className="text-dark-300">+251 911 234 567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <FaEnvelope className="text-dark-900 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Email</h3>
                    <p className="text-dark-300">info@kasma.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-dark-900 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      Address
                    </h3>
                    <p className="text-dark-300">Addis Ababa, Ethiopia</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                    <FaClock className="text-dark-900 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">Hours</h3>
                    <p className="text-dark-300">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-dark-300">
                      Sat - Sun: 10:00 AM - 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-right">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-white font-semibold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-white font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-white font-semibold mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-semibold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-800 border border-gold-500/30 rounded-lg text-white placeholder-dark-400 focus:outline-none focus:border-gold-500 transition-colors duration-300 resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury w-full px-8 py-4 rounded-lg text-white font-semibold text-lg hover:scale-105 transition-all duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LuxuryFooter />
    </div>
  );
};

export default Contact;
