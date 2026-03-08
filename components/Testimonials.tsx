"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getTestimonials } from "@/lib/sanity/queries";
import "./Testimonials.css";

const fallbackTestimonials = [
  {
    _id: "1",
    name: "Anita \u2022 Parent of 6-year-old",
    location: "Bangalore",
    image: null,
    emoji: "\uD83D\uDC69",
    color: "orange",
    quote: "My son thinks it\u2019s a game, but I can see his reading and number skills growing every week.",
    rating: 5,
  },
  {
    _id: "2",
    name: "Mr. Lewis \u2022 Kindergarten Teacher",
    location: "Private school",
    image: null,
    emoji: "\uD83D\uDC68\u200D\uD83C\uDFEB",
    color: "green",
    quote: "KidZoFi gives us instant insight into how every child is doing\u2014without extra prep time.",
    rating: 5,
  },
  {
    _id: "3",
    name: "Laura \u2022 Parent of 4-year-old",
    location: "Mumbai",
    image: null,
    emoji: "\uD83D\uDC69",
    color: "blue",
    quote: "The activities are short, sweet, and screen-safe\u2014perfect for our evening routine.",
    rating: 5,
  },
];

const avatarColors = ["orange", "green", "blue"];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>(fallbackTestimonials);

  useEffect(() => {
    getTestimonials().then((data) => {
      if (data && data.length > 0) {
        setTestimonials(
          data.map((t: any, i: number) => ({
            ...t,
            color: avatarColors[i % avatarColors.length],
          }))
        );
      }
    });
  }, []);

  return (
    <section className="testimonials-section">
      <h3 className="testimonials-title">Loved by Kids. Trusted by Parents.</h3>
      <p className="testimonials-subtitle">
        See how KidZoFi fits naturally into busy family routines while keeping children curious and inspired.
      </p>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t._id}>
            <div className="testimonial-header">
              <div className={`testimonial-avatar ${t.color}`}>
                {t.image ? (
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="testimonial-avatar-img"
                  />
                ) : (
                  <span>{t.emoji || "\uD83D\uDC64"}</span>
                )}
              </div>
              <div className="testimonial-info">
                <span className="testimonial-name">{t.name}</span>
                <span className="testimonial-role">{t.location}</span>
              </div>
            </div>
            <div className="testimonial-stars">
              {"★".repeat(t.rating || 5)}{"☆".repeat(5 - (t.rating || 5))}
            </div>
            <div className="testimonial-quote">&ldquo;{t.quote}&rdquo;</div>
          </div>
        ))}
      </div>
    </section>
  );
}
