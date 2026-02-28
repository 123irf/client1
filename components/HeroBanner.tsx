"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaRobot, FaShieldAlt, FaUsers } from "react-icons/fa";
import "./HeroBanner.css";

const slides = [
  {
    image: "/herobanner.png",
    heading: "Inspiring",
    highlight: "Intelligent Learning",
    subtitle:
      "AI-powered smart learning tools that make early education joyful, safe, and brilliantly engaging for kids aged 3\u201310.",
  },
  {
    image: "/herobanner2.jpg",
    heading: "Discover",
    highlight: "Smart Play for Kids",
    subtitle:
      "Fun, safe, and interactive gadgets designed to spark curiosity and creativity in young minds.",
  },
  {
    image: "/herobanner3.jpg",
    heading: "Empowering",
    highlight: "Future-Ready Kids",
    subtitle:
      "Give your child a head start with AI-driven educational tools trusted by thousands of parents.",
  },
];

const categories = [
  "Interactive Devices",
  "AI Learning Tablets",
  "Digital Writing Tools",
  "Educational Kits",
];

const stats = [
  { icon: FaRobot, value: "10K+", label: "AI-Powered Learning" },
  { icon: FaUsers, value: "15K+", label: "Trusted by Parents" },
  { icon: FaShieldAlt, value: "98%", label: "Safe for Kids" },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-banner">
      {/* Sliding Background Images */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-background ${i === current ? "active" : ""}`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${i + 1}`}
            fill
            priority={i === 0}
            className="hero-bg-image"
          />
          <div className="hero-overlay" />
        </div>
      ))}

      {/* Content */}
      <div className="hero-content">
        {/* Sliding Text */}
        <div className="hero-text-slider">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={`hero-text-slide ${i === current ? "active" : ""}`}
            >
              <h1 className="hero-heading">
                {slide.heading}{" "}
                <span className="highlight">{slide.highlight}</span>
              </h1>
              <p className="hero-subtitle">{slide.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Search Bar */}
        <div className="hero-search">
          <div className="search-input-wrapper">
            <FaSearch className="search-input-icon" />
            <input
              type="text"
              placeholder="Search product, brand or SKU..."
              className="hero-search-input"
            />
            <Link href="/products" className="search-btn">
              <span>Explore Products</span>
              <span className="search-arrow">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((cat, i) => (
            <Link key={i} href="/products" className="category-pill">
              {cat}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="hero-stats">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon-wrapper">
                <stat.icon className="stat-icon" />
              </div>
              <div className="stat-content">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
