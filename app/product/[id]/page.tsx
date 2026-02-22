"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaShoppingCart, FaMinus, FaPlus, FaArrowLeft, FaStar, FaLock, FaTruck, FaHeadset } from "react-icons/fa";
import { getProductById } from "@/lib/sanity/queries";
import { useCart } from "@/components/providers/CartProvider";
import "@/components/ProductDetail.css";


export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    getProductById(id).then((data) => {
      if (data) {
        setProduct({
          ...data,
          images: data.images && data.images.length > 0 ? data.images : (data.image ? [data.image] : []),
        });
      }
    });
  }, [id]);

  if (!product) {
    return (
      <main className="product-detail-page">
        <div className="detail-loading">Loading...</div>
      </main>
    );
  }

  const youSave = product.originalPrice - product.price;

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product._id,
        title: product.title,
        image: product.images?.[0] || product.image,
        price: product.price,
        discount: product.discount || 0,
      });
    }
  }

  function handleBuyNow() {
    handleAddToCart();
    router.push("/cart");
  }

  return (
    <main className="product-detail-page">
      <div className="detail-container">
        {/* Left Side - Images */}
        <div className="detail-left">
          <div className="main-image-wrapper">
            {product.discount > 0 && (
              <span className="detail-discount-badge">{product.discount}% OFF</span>
            )}
            <Image
              src={product.images?.[selectedImage] || product.image}
              alt={product.title}
              width={500}
              height={450}
              className="detail-main-image"
              priority
            />
          </div>
          
          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="thumbnail-gallery">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  className={`thumbnail-btn ${selectedImage === i ? 'active' : ''}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    src={img}
                    alt={`${product.title} - Image ${i + 1}`}
                    width={80}
                    height={80}
                    className="thumbnail-image"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side - Product Info */}
        <div className="detail-right">
          <h1 className="detail-title">{product.title}</h1>
          
          <p className="detail-short-desc">{product.shortDesc}</p>
          
          {/* Price */}
          <div className="detail-price-section">
            <span className="detail-current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="detail-original-price">₹{product.originalPrice}</span>
            )}
            {youSave > 0 && (
              <span className="detail-savings">You save ₹{youSave}</span>
            )}
          </div>
          
          {/* Description */}
          <p className="detail-description">{product.description}</p>
          
          {/* Quantity */}
          <div className="detail-quantity">
            <span className="qty-label">Quantity</span>
            <div className="qty-selector">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <FaMinus />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                <FaPlus />
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="detail-actions">
            <button className="btn-add-cart" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="btn-buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
          
          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge-item">
              <FaLock className="badge-icon" />
              <span>Secure checkout</span>
            </div>
            <div className="badge-item">
              <FaTruck className="badge-icon" />
              <span>Free shipping over ₹5000</span>
            </div>
            <div className="badge-item">
              <FaHeadset className="badge-icon" />
              <span>24/7 parent support</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="detail-bottom">
        {/* Product Highlights */}
        <div className="highlights-section">
          <h2 className="section-title">Product Highlights</h2>
          <ul className="highlights-list">
            {product.highlights?.map((highlight: string, i: number) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
        </div>
        
        {/* Details & Ratings */}
        <div className="details-section">
          <h2 className="section-title">Details & Ratings</h2>
          
          {/* Rating */}
          <div className="rating-row">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'} />
              ))}
            </div>
            <span className="rating-text">{product.rating} / 5 • {product.reviews} parent reviews</span>
          </div>
          
          {/* Specs Grid */}
          <div className="specs-grid">
            <div className="spec-item">
              <span className="spec-label">Recommended Age</span>
              <span className="spec-value">{product.specs?.age}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Subjects</span>
              <span className="spec-value">{product.specs?.subjects}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Connectivity</span>
              <span className="spec-value">{product.specs?.connectivity}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Safety</span>
              <span className="spec-value">{product.specs?.safety}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Battery Life</span>
              <span className="spec-value">{product.specs?.battery}</span>
            </div>
            <div className="spec-item">
              <span className="spec-label">Warranty</span>
              <span className="spec-value">{product.specs?.warranty}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
