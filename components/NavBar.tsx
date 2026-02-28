"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaShoppingCart, FaSearch, FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "./providers/CartProvider";
import "./NavBar.css";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const { totalItems } = useCart();
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className={`navbar ${isHome ? "navbar-transparent" : "navbar-green"}`}>
      {/* Left */}
        <div className="navbar-left">
        <Image src="/Logo.png" alt="KidZoFi Logo" width={100} height={100} className="logo" />
      </div>

      {/* Center (Desktop menu) */}
      <nav className="navbar-center">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/products">Products</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      {/* Right (Search + cart + auth) */}
      <div className="navbar-right">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
          <FaSearch className="search-icon" />
        </div>

        <Link href="/cart" className="cart">
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        {status === "loading" ? (
          <div className="auth-skeleton" />
        ) : session?.user ? (
          <div className="user-menu">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={32}
                height={32}
                className="user-avatar"
              />
            ) : (
              <FaUserCircle className="user-avatar-icon" />
            )}
            <span className="user-name">{session.user.name?.split(" ")[0]}</span>
            <button className="btn login" onClick={() => signOut({ callbackUrl: "/" })}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/login"><button className="btn login">Login</button></Link>
            <Link href="/signup"><button className="btn signup">Sign Up</button></Link>
          </>
        )}
      </div>

      {/* Mobile: Right section with search, cart, auth, and burger */}
      <div className="mobile-nav-right">
        <div
          className="mobile-search-icon"
          onClick={() => setSearchExpanded(!searchExpanded)}
        >
          <FaSearch />
        </div>

        <Link href="/cart" className="mobile-cart-icon">
          <FaShoppingCart />
          {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>

        {/* Mobile Avatar (logged in only) */}
        {status !== "loading" && session?.user && (
          <div className="mobile-avatar-wrapper">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User"}
                width={28}
                height={28}
                className="mobile-avatar"
              />
            ) : (
              <FaUserCircle className="mobile-user-icon" />
            )}
          </div>
        )}

        {/* Burger */}
        <div className="burger" onClick={() => setOpen(!open)}>
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Mobile Expanded Search */}
      {searchExpanded && (
        <div className="mobile-search-expanded">
          <input
            type="text"
            placeholder="Search..."
            className="mobile-search-input"
            autoFocus
          />
        </div>
      )}

      {/* Mobile menu */}
      <nav className={`mobile-menu ${open ? "show" : ""} ${searchExpanded ? "search-expanded" : ""}`}>
        {/* Menu Links */}
        <Link href="/" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
        <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

        {/* Divider + Auth Buttons */}
        <div className="mobile-auth-divider" />
        {status === "loading" ? null : session?.user ? (
          <>
            <div className="mobile-user-info">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  width={28}
                  height={28}
                  className="user-avatar"
                />
              ) : (
                <FaUserCircle className="user-avatar-icon" />
              )}
              <span className="mobile-user-name">{session.user.name}</span>
            </div>
            <button className="btn login" onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" onClick={() => setOpen(false)}>
              <button className="btn login">Login</button>
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)}>
              <button className="btn signup">Sign Up</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
