"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useCart } from "@/components/providers/CartProvider";
import "@/components/CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, totalItems, totalPrice } = useCart();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <FaShoppingCart className="cart-empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
          <Link href="/products" className="cart-shop-btn">
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  async function handleCheckout() {
    if (!session) {
      router.push("/login?callbackUrl=/cart");
      return;
    }

    setLoading(true);
    try {
      // 1. Create order on backend
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalPrice),
          items: cart.map((item) => ({
            id: item.id,
            title: item.title,
            qty: item.qty,
            price: item.discount
              ? Math.round(item.price * (1 - item.discount / 100))
              : item.price,
          })),
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Failed to create order. Please try again.");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay checkout modal
      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "KidZoFi",
        description: `Order - ${totalItems} item(s)`,
        order_id: data.order.id,
        handler: async function (response: any) {
          // 3. Verify payment on backend
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              router.push(
                `/payment-status?status=success&orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}`
              );
            } else {
              router.push(
                `/payment-status?status=failed&orderId=${response.razorpay_order_id}`
              );
            }
          } catch {
            router.push(
              `/payment-status?status=failed&orderId=${response.razorpay_order_id}`
            );
          }
        },
        prefill: {},
        theme: {
          color: "#ff6f61",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        router.push(
          `/payment-status?status=failed&orderId=${response.error.metadata.order_id}&reason=${encodeURIComponent(response.error.description)}`
        );
      });

      rzp.open();
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="cart-page">
      <div className="cart-back">
        <Link href="/products">
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>

      <h1 className="cart-heading">Shopping Cart ({totalItems} items)</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => {
            const discountedPrice = item.discount
              ? Math.round(item.price * (1 - item.discount / 100))
              : item.price;

            return (
              <div className="cart-item" key={item.id}>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={100}
                  className="cart-item-image"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />

                <div className="cart-item-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-price-row">
                    <span className="cart-item-price">₹{discountedPrice}</span>
                    {item.discount > 0 && (
                      <span className="cart-item-original">₹{item.price}</span>
                    )}
                  </div>

                  <div className="cart-item-qty">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  <span className="cart-item-subtotal">
                    ₹{discountedPrice * item.qty}
                  </span>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({totalItems})</span>
            <span>₹{Math.round(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className="free-delivery">FREE</span>
          </div>
          <div className="summary-divider" />
          <div className="summary-row summary-total">
            <span>Total</span>
            <span>₹{Math.round(totalPrice)}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={loading}
            onClick={handleCheckout}
          >
            {loading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </main>
  );
}
