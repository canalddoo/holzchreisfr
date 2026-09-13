"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalItems } = useCart();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
    { name: "Boutique", path: "/boutique" },
    { name: "Catégories", path: "/boutique" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/img/logo.png"
            alt="HolzChreiz"
            width={120}
            height={45}
            priority
          />
        </Link>

        {/* Navigation Bureau */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions à droite */}
        <div className="navbar-actions">
          {/* Recherche */}
          <button className="icon-btn search-btn" aria-label="Rechercher">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Panier avec badge */}
          <Link
            href="/panier"
            className="icon-btn cart-btn"
            aria-label="Panier"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* Burger Button (Mobile) */}
          <button
            className="menu-burger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Ouvrir le menu"
          >
            <i
              className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            ></i>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <Image
                src="/img/logo.png"
                alt="HolzChreiz"
                width={100}
                height={35}
              />
              <div className="mobile-menu-actions">
                <Link
                  href="/panier"
                  className="icon-btn cart-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </Link>
                <button
                  className="close-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`mobile-nav-link ${
                    isActive(link.path) ? "active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}