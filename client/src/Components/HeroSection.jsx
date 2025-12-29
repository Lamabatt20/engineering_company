import React from "react";
import { Link } from "react-router-dom";
import "./HeroSection.css";
import heroVideo from "../assets/videos/v.mp4";

function HeroSection() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <span className="hero-slogan">
          Your Product. Our Engineering
        </span>

        <h1 className="hero-title">
          Smart Hardware & Embedded Solutions <br />
          for Real-World Problems.
        </h1>

        <Link to="/contact" className="btn primary">
          Contact Us
        </Link>

        <h2 className="hero-subtitle">
          We design and develop reliable mechanical and embedded systems for
          businesses across the globe — from concept to production.
        </h2>

        
        <button
          className="btn secondary"
          onClick={() => {
            const section = document.getElementById("projects");
            if (section) {
              section.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }
          }}
        >
          Our Projects
        </button>
      </div>
    </section>
  );
}

export default HeroSection;
