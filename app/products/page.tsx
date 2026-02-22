"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { getProducts } from "@/lib/sanity/queries";
import { useCart } from "@/components/providers/CartProvider";
import "@/components/ProductsPage.css";

function ProductGridCard({ product, onAddToCart }: { product: any; onAddToCart: (p: any) => void }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="product-grid-card">
      {/* Wishlist Heart */}
      <button 
        className="wishlist-btn-grid"
        onClick={() => setIsWishlisted(!isWishlisted)}
      >
        {isWishlisted ? <FaHeart className="heart-filled" /> : <FaRegHeart className="heart-outline" />}
      </button>

      {/* Product Image */}
      <Link href={`/product/${product._id}`} className="product-grid-image-link">
        <Image
          src={product.image}
          alt={product.title}
          width={280}
          height={200}
          className="grid-product-image"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </Link>

      {/* Product Info */}
      <div className="product-grid-info">
        <Link href={`/product/${product._id}`} className="product-grid-title-link">
          <h3 className="grid-product-title">{product.title}</h3>
        </Link>
        
        <span className="grid-product-category">{product.category || "Educational"}</span>
        
        <div className="grid-product-price">
          <span className="grid-current-price">₹{product.price}</span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button 
        className="grid-add-cart-btn"
        onClick={() => onAddToCart(product)}
      >
        <FaShoppingCart /> Add to Cart
      </button>
    </div>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(
            data.map((p: any) => ({
              ...p,
              category: p.category || "Educational",
            }))
          );
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function handleAddToCart(product: any) {
    addToCart({
      id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      discount: 0,
    });
  }

  return (
    <main className="products-page">
      <div className="products-hero">
        <h1>Our Products</h1>
        <p>Discover educational toys and gadgets that make learning fun</p>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", padding: "60px", color: "#999" }}>Loading products...</p>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <ProductGridCard
              key={product._id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </main>
  );
}
