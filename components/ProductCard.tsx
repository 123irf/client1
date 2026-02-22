"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { useCart } from "./providers/CartProvider";
import "./ProductCard.css";

interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  price: number;
  discount?: number;
  category?: string;
  description?: string;
  ageRange?: string;
  rating?: number;
  reviews?: number;
}

export default function ProductCard({
  id,
  title,
  image,
  price,
  discount,
  category = "Educational",
  description,
  ageRange,
  rating = 4.5,
  reviews,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({ id, title, image, price, discount: discount || 0 });
  }

  const discountedPrice = discount
    ? Math.round(price * (1 - discount / 100))
    : price;

  return (
    <div className="product-card">
      {/* Green Top Border */}
      <div className="card-top-border" />

      {/* Badge & Wishlist Row */}
      <div className="card-top-row">
        {discount && discount > 0 ? (
          <span className="discount-badge">{discount}% Off</span>
        ) : (
          <span className="badge-placeholder" />
        )}
        <button
          className="wishlist-btn"
          onClick={() => setIsWishlisted(!isWishlisted)}
        >
          {isWishlisted ? (
            <FaHeart className="heart-filled" />
          ) : (
            <FaRegHeart className="heart-outline" />
          )}
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/product/${id}`} className="product-image-link">
        <Image
          src={image}
          alt={title}
          width={260}
          height={180}
          className="product-image"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </Link>

      {/* Product Info */}
      <div className="product-info">
        <Link href={`/product/${id}`} className="product-title-link">
          <h3 className="product-title">{title}</h3>
        </Link>

        {/* Price + Rating Row */}
        <div className="price-rating-row">
          <div className="product-price">
            <span className="current-price">₹{discountedPrice.toLocaleString()}</span>
            {discount && discount > 0 && (
              <span className="original-price">₹{price.toLocaleString()}</span>
            )}
          </div>
          <div className="product-rating">
            <FaStar className="star-icon" />
            <span className="rating-value">{rating}</span>
            {reviews !== undefined && (
              <span className="review-count">• {reviews}+ reviews</span>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="product-desc">{description}</p>
        )}
      </div>

      {/* Bottom Row: Age Range + Add to Cart */}
      <div className="card-bottom-row">
        {ageRange && (
          <span className="age-badge">{ageRange}</span>
        )}
        <button className="add-cart-btn" onClick={handleAddToCart}>
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}
