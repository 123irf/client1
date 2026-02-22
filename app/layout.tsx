import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "KidZoFi - Smart Learning for Kids",
  description: "Inspiring intelligent learning with smart, fun, and safe AI-powered educational products for kids.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <NavBar />
            {children}
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
