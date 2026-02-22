"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

import { FaRobot, FaShieldAlt, FaUsers } from "react-icons/fa";
import "./HeroBanner.css";

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
  return (
    <section className="hero-banner">
      {/* Background Image */}
      <div className="hero-background">
        <Image
          src="/herobanner.png"
          alt="Child learning with robot"
          fill
          priority
          className="hero-bg-image"
        />
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content">
        {/* Main Heading */}
        <h1 className="hero-heading">
          Inspiring{" "}
          <span className="highlight">Intelligent Learning</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          AI-powered smart learning tools that make early education joyful, safe, and brilliantly engaging for kids aged 3–10.
        </p>

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
              <span className="search-arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href="/products"
              className="category-pill"
            >
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
