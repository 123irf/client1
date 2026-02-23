"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import ProductSlider from "@/components/ProductSlider";
import AboutCards from "@/components/AboutCards";
import BrandPromise from "@/components/BrandPromise";
import { getProducts } from "@/lib/sanity/queries";
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* New Static Hero Banner */}
      <HeroBanner />

      {/* Products Section */}
      <section className="products-section">
        <div className="products-section-header">
          <h2 className="products-section-title">Our Products</h2>
          <Link href="/products" className="products-view-all">
            View All <span className="arrow">&rarr;</span>
          </Link>
        </div>
        {loading ? (
          <p className="products-loading">Loading products...</p>
        ) : (
          <ProductSlider products={products} />
        )}
      </section>

      {/* Why Choose KidZoFi + Testimonials */}
      <AboutCards />

      {/* Brand Promise Section */}
      <BrandPromise />
    </main>
  );
}
