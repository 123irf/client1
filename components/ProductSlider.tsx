"use client";

import { useRef } from "react";
import ProductCard from "./ProductCard";
import "./ProductSlider.css";

interface Product {
  _id: string;
  title: string;
  image: string;
  price: number;
  discount?: number;
  description?: string;
  ageRange?: string;
  rating?: number;
  reviews?: number;
}

interface ProductSliderProps {
  products: Product[];
}

export default function ProductSlider({ products = [] }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  if (!products.length) {
    return <p style={{ padding: "20px" }}>No products</p>;
  }

  return (
    <div className="slider-wrapper">
      {/* SLIDER */}
      <div className="slider" ref={sliderRef}>
        {products.map((p, i) => (
          <ProductCard
            key={p._id || i}
            id={p._id || String(i + 1)}
            title={p.title}
            image={p.image}
            price={p.price}
            discount={p.discount}
            description={p.description}
            ageRange={p.ageRange}
            rating={p.rating}
            reviews={p.reviews}
          />
        ))}
      </div>
    </div>
  );
}
