"use client";

import { useState, useEffect } from "react";
import { getAboutCards } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/client";
import "./AboutCards.css";

// Fallback data if Sanity has no content yet
const fallbackCards = [
  {
    title: "What We Do",
    text: "We design intelligent, AI-based learning tools that support early education, creativity, and cognitive development—helping kids learn smarter from the very beginning.",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350",
  },
  {
    title: "Why Parents Trust KidZoFi",
    points: [
      "Intelligent, AI-inspired learning solutions",
      "Designed for early learners and growing minds",
      "Safe, child-friendly materials and features",
      "Encourages creativity, thinking, and problem-solving",
      "Perfect balance of fun and learning",
    ],
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
  },
  {
    title: "Who We Serve",
    text: "Made for children, trusted by parents, and loved by educators—KidZoFi is ideal for kids starting their learning journey and schools that value future-ready education.",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
  },
  {
    title: "Brand Promise",
    text: "At KidZoFi, we promise learning tools that are thoughtful, intelligent and designed to grow with your child—because every child deserves a smarter beginning.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74",
  },
];

const testimonials = [
  {
    name: "Anita • Parent of 6-year-old",
    role: "Bangalore",
    emoji: "👩",
    color: "orange" as const,
    quote: "My son thinks it\u2019s a game, but I can see his reading and number skills growing every week.",
  },
  {
    name: "Mr. Lewis • Kindergarten Teacher",
    role: "Private school",
    emoji: "👨‍🏫",
    color: "green" as const,
    quote: "KidZoFi gives us instant insight into how every child is doing—without extra prep time.",
  },
  {
    name: "Laura • Parent of 4-year-old",
    role: "Mumbai",
    emoji: "👩",
    color: "blue" as const,
    quote: "The activities are short, sweet, and screen-safe—perfect for our evening routine.",
  },
];

interface Card {
  title: string;
  text?: string;
  points?: string[];
  image: string;
}

export default function AboutCards() {
  const [cards, setCards] = useState<Card[]>(fallbackCards);

  useEffect(() => {
    getAboutCards().then((data) => {
      if (data && data.length > 0) {
        setCards(
          data.map((card: any) => ({
            title: card.title,
            text: card.content,
            points: card.bulletPoints,
            image: card.image ? urlFor(card.image).width(600).url() : undefined,
          }))
        );
      }
    });
  }, []);

  return (
    <section className="about-section">
      {/* Header */}
      <div className="about-section-header">
        <h2 className="about-section-title">Why Choose KidZoFi</h2>
        <p className="about-section-subtitle">
          Thoughtful, AI-powered learning tools that blend play, safety, and smart technology so every child can begin their journey with confidence.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="about-grid">
        {cards.map((card, index) => (
          <div className="about-card" key={index}>
            <div
              className="card-image"
              style={{ backgroundImage: `url(${card.image})` }}
            />
            <div className="card-content">
              <h3>{card.title}</h3>
              {card.text && <p>{card.text}</p>}
              {card.points && (
                <ul className="why-list">
                  {card.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="testimonials">
        <h3 className="testimonials-title">Loved by Kids. Trusted by Parents.</h3>
        <p className="testimonials-subtitle">
          See how KidZoFi fits naturally into busy family routines while keeping children curious and inspired.
        </p>

        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <div className="testimonial-header">
                <div className={`testimonial-avatar ${t.color}`}>
                  {t.emoji}
                </div>
                <div className="testimonial-info">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
              <div className="testimonial-stars">★★★★★</div>
              <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
