"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroBanner from "@/components/HeroBanner";
import ProductSlider from "@/components/ProductSlider";
import AboutCards from "@/components/AboutCards";
import BrandPromise from "@/components/BrandPromise";
import { getProducts } from "@/lib/sanity/queries";

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
      <section style={{ padding: "60px 20px", backgroundColor: "#f8f9fa" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "40px", maxWidth: "1400px", marginLeft: "auto", marginRight: "auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "2.5rem", color: "#333", margin: 0 }}>
            Our Products
          </h2>
          <Link
            href="/products"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 24px",
              border: "2px solid #43b028",
              borderRadius: "8px",
              color: "#43b028",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: "600",
              backgroundColor: "transparent",
              transition: "all 0.3s",
            }}
          >
            View All <span style={{ fontSize: "1.2rem" }}>&rarr;</span>
          </Link>
        </div>
        {loading ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#999" }}>Loading products...</p>
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
