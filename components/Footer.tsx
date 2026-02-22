import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-section">
          <h3 className="footer-logo">KidZoFi</h3>
          <p className="footer-text">
            Inspiring intelligent learning with smart, fun, and safe
            AI-powered educational products for kids.
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <ul>
            <li><Link href="#">FAQ</Link></li>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} KidZoFi. All rights reserved.
      </div>
    </footer>
  );
}
