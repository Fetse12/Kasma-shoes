import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaSearch, FaPlay, FaPause } from "react-icons/fa";

const Hero = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Try to load and play video
    const video = document.getElementById("hero-video");
    if (video) {
      // Add event listeners
      video.addEventListener("loadeddata", () => {
        console.log("Video loaded successfully");
        console.log(
          "Video dimensions:",
          video.videoWidth,
          "x",
          video.videoHeight
        );
        console.log("Video duration:", video.duration);
        video.play().catch((e) => {
          console.log("Video autoplay failed:", e);
          setShowFallback(true);
        });
      });

      video.addEventListener("canplay", () => {
        console.log("Video can play");
      });

      video.addEventListener("error", (e) => {
        console.log("Video error:", e);
        console.log("Video error details:", video.error);
        setVideoError(true);
        setShowFallback(true);
      });

      video.addEventListener("loadstart", () => {
        console.log("Video load started");
      });

      // Try to play immediately
      video.play().catch((e) => {
        console.log("Immediate play failed:", e);
        setShowFallback(true);
      });
    }
  }, []);

  const toggleVideo = () => {
    const video = document.getElementById("hero-video");
    if (video && !showFallback) {
      if (isVideoPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Background Video */}
      {!showFallback && (
        <video
          id="hero-video"
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 1,
          }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          <source
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          <source
            src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Fallback Background Image */}
      {showFallback && (
        <div
          id="hero-fallback"
          className="hero-video bg-cover bg-center bg-no-repeat"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80')",
            zIndex: 1,
          }}
        >
          {/* Fallback gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700"></div>
        </div>
      )}

      {/* Dark Overlay */}
      <div className="hero-overlay" style={{ zIndex: 2 }}></div>

      {/* Video Controls - Only show if video is available */}
      {!showFallback && (
        <button
          onClick={toggleVideo}
          className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-gold-500/20 transition-all duration-300 group"
          aria-label={isVideoPlaying ? "Pause video" : "Play video"}
        >
          {isVideoPlaying ? (
            <FaPause className="text-gold-500 text-lg group-hover:text-gold-400" />
          ) : (
            <FaPlay className="text-gold-500 text-lg group-hover:text-gold-400" />
          )}
        </button>
      )}

      {/* Hero Content */}
      <div
        className="relative h-full flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <div className="text-center px-6 max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 animate-fade-in-up">
            <span className="block">LUXURY</span>
            <span className="block gradient-text">FOOTWEAR</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-dark-200 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Discover our curated collection of premium shoes crafted for the
            modern lifestyle
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Link
              to="/shoe"
              className="btn-luxury px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3 hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <FaShoppingBag className="text-base sm:text-lg" />
              Shop Collection
            </Link>

            <Link
              to="/search"
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-gold-500 text-gold-500 font-semibold text-base sm:text-lg flex items-center gap-2 sm:gap-3 hover:bg-gold-500 hover:text-dark-900 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <FaSearch className="text-base sm:text-lg" />
              Explore
            </Link>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-gold-500 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gold-500 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gold-500/10 blur-xl animate-float"></div>
      <div
        className="absolute top-40 right-20 w-16 h-16 rounded-full bg-red-500/10 blur-xl animate-float"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-40 left-1/4 w-12 h-12 rounded-full bg-gold-500/10 blur-xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
    </section>
  );
};

export default Hero;
