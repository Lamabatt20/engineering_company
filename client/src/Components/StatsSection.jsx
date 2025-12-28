import React, { useEffect, useRef, useState } from "react";
import {
  FiBriefcase,
  FiUsers,
  FiSettings,
  FiLayers,
  FiTrendingUp,
} from "react-icons/fi";
import "./StatsSection.css";

const statsData = [
  {
    value: 200,
    suffix: "+",
    label: "Projects Delivered",
    icon: <FiBriefcase />,
  },
  {
    value: 18,
    suffix: "+",
    label: "Clients Worldwide",
    icon: <FiUsers />,
  },
  {
    value: 45,
    suffix: "+",
    label: "Engineering Solutions",
    icon: <FiSettings />,
  },
  {
    value: 12,
    suffix: "+",
    label: "Industries Served",
    icon: <FiLayers />,
  },
  {
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    icon: <FiTrendingUp />,
  },
];

function StatItem({ value, suffix, label, icon, visible, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const duration = 1200;
    const stepTime = 20;
    const increment = value / (duration / stepTime);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div
      className={`stat-item ${visible ? "show" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="stat-icon">{icon}</div>

      <h3 className="stat-number">
        {count}
        {suffix}
      </h3>

      <p className="stat-label">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={sectionRef}>
      <h2 className="stats-title">Achievements</h2>

      <div className="stats-grid">
        {statsData.map((item, index) => (
          <StatItem
            key={index}
            {...item}
            visible={visible}
            delay={index * 120}
          />
        ))}
      </div>
    </section>
  );
}
