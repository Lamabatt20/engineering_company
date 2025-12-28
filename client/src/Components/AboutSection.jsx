import React, { useEffect, useRef } from "react";
import "./AboutSection.css";
import aboutImage from "../assets/images/PCB-Designing1.jpg";

function AboutSection() {
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
  }, []);

  return (
    <section className="about">
      <div className="about-half-circle"></div>

      <div className="about-wrapper">
        <div className="about-content reveal" ref={contentRef}>
          <h2 className="about-title">About Nexus</h2>

          <p className="about-text">
            Nexus Design Lab is an engineering studio specializing in mechanical
            design, embedded systems, and product development. We help companies
            turn ideas into working products through precise engineering, rapid
            prototyping, and hands-on experience across multiple industries.
          </p>

          <p className="about-text">
            From concept to manufacturing, our team delivers reliable,
            real-world solutions—built to perform, built to last.
          </p>
        </div>

        <div className="about-image">
          <img src={aboutImage} alt="Engineering Workspace" />
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
