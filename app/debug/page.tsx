"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts, getHeroSlides, getAboutCards } from "@/lib/sanity/queries";

export default function DebugPage() {
  const [status, setStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const [products, heroSlides, aboutCards] = await Promise.all([
          getProducts(),
          getHeroSlides(),
          getAboutCards(),
        ]);

        setStatus({
          products: {
            count: products.length,
            items: products,
          },
          heroSlides: {
            count: heroSlides.length,
            items: heroSlides,
          },
          aboutCards: {
            count: aboutCards.length,
            items: aboutCards,
          },
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    checkConnection();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "100px 40px", textAlign: "center" }}>
        <h1>Checking Sanity Connection...</h1>
        <p>Please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "100px 40px", color: "red" }}>
        <h1>❌ Sanity Connection Failed</h1>
        <p>Error: {error}</p>
        <hr />
        <h3>Troubleshooting:</h3>
        <ul>
          <li>Check your internet connection</li>
          <li>Verify .env.local has correct Sanity credentials</li>
          <li>Make sure your Sanity project is public or has correct token</li>
        </ul>
      </div>
    );
  }

  return (
    <div style={{ padding: "100px 40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>✅ Sanity Connection Status</h1>
      
      {/* Products Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2>🛍️ Products ({status?.products?.count} found)</h2>
        {status?.products?.count === 0 ? (
          <p style={{ color: "orange" }}>No products found in Sanity. Please upload products.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
            {status?.products?.items.map((product: any) => (
              <div key={product._id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px" }}>
                {product.image ? (
                  <Image 
                    src={product.image} 
                    alt={product.title} 
                    width={200} 
                    height={150}
                    style={{ objectFit: "cover", borderRadius: "8px", width: "100%" }}
                  />
                ) : (
                  <div style={{ background: "#f0f0f0", height: "150px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
                    No Image
                  </div>
                )}
                <h3>{product.title}</h3>
                <p>₹{product.price}</p>
                <p style={{ fontSize: "12px", color: "#666" }}>ID: {product._id}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr />

      {/* Hero Slides Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2>🖼️ Hero Slides ({status?.heroSlides?.count} found)</h2>
        {status?.heroSlides?.count === 0 ? (
          <p style={{ color: "orange" }}>No hero slides found in Sanity.</p>
        ) : (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {status?.heroSlides?.items.map((slide: any) => (
              <div key={slide._id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px", width: "300px" }}>
                {slide.image ? (
                  <Image 
                    src={slide.image} 
                    alt={slide.heading} 
                    width={280} 
                    height={160}
                    style={{ objectFit: "cover", borderRadius: "8px", width: "100%" }}
                  />
                ) : (
                  <div style={{ background: "#f0f0f0", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
                    No Image
                  </div>
                )}
                <h3>{slide.heading}</h3>
                <p>{slide.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr />

      {/* About Cards Section */}
      <section style={{ marginBottom: "40px" }}>
        <h2>📋 About Cards ({status?.aboutCards?.count} found)</h2>
        {status?.aboutCards?.count === 0 ? (
          <p style={{ color: "orange" }}>No about cards found in Sanity.</p>
        ) : (
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {status?.aboutCards?.items.map((card: any) => (
              <div key={card._id} style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "16px", width: "300px" }}>
                {card.image ? (
                  <Image 
                    src={card.image} 
                    alt={card.title} 
                    width={280} 
                    height={160}
                    style={{ objectFit: "cover", borderRadius: "8px", width: "100%" }}
                  />
                ) : (
                  <div style={{ background: "#f0f0f0", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px" }}>
                    No Image
                  </div>
                )}
                <h3>{card.title}</h3>
                <p>{card.content?.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <hr />

      <div style={{ background: "#f0f8ff", padding: "20px", borderRadius: "12px", marginTop: "40px" }}>
        <h3>ℹ️ Sanity Project Info</h3>
        <p><strong>Project ID:</strong> {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not set"}</p>
        <p><strong>Dataset:</strong> {process.env.NEXT_PUBLIC_SANITY_DATASET || "production"}</p>
        <p><strong>CDN:</strong> Enabled (Public Access)</p>
      </div>
    </div>
  );
}
