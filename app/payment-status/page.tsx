"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaCheckCircle, FaTimesCircle, FaHome, FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/components/providers/CartProvider";
import "@/components/PaymentStatus.css";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); // success | failed
  const orderId = searchParams.get("orderId");
  const paymentId = searchParams.get("paymentId");
  const reason = searchParams.get("reason");
  const { clearCart } = useCart();

  useEffect(() => {
    if (status === "success") {
      clearCart();
    }
  }, [status, clearCart]);

  return (
    <main className="payment-status-page">
      <div className="status-card">
        {status === "success" && (
          <>
            <FaCheckCircle className="status-icon success-icon" />
            <h1>Payment Successful!</h1>
            <p>Your order has been placed successfully.</p>
            {orderId && <p className="order-id">Order ID: {orderId}</p>}
            {paymentId && <p className="order-id">Payment ID: {paymentId}</p>}
            <Link href="/" className="status-home-btn">
              <FaHome /> Back to Home
            </Link>
          </>
        )}

        {status === "failed" && (
          <>
            <FaTimesCircle className="status-icon failed-icon" />
            <h1>Payment Failed</h1>
            <p>{reason || "Your payment could not be processed. Please try again."}</p>
            {orderId && <p className="order-id">Order ID: {orderId}</p>}
            <Link href="/cart" className="status-retry-btn">
              <FaShoppingCart /> Go to Cart
            </Link>
          </>
        )}

        {!status && (
          <>
            <FaTimesCircle className="status-icon failed-icon" />
            <h1>Invalid Request</h1>
            <p>No payment information found.</p>
            <Link href="/" className="status-home-btn">
              <FaHome /> Back to Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}

export default function PaymentStatus() {
  return (
    <Suspense fallback={
      <main className="payment-status-page">
        <div className="status-card">
          <div className="detail-loading">Loading...</div>
        </div>
      </main>
    }>
      <PaymentStatusContent />
    </Suspense>
  );
}
