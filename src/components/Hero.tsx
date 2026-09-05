"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface Slide {
  id: number;
  badge: string;
  badgeIcon: string;
  title: string;
  description: string;
  btnPrimaryText: string;
  btnPrimaryLink: string;
  btnSecondaryText: string;
  btnSecondaryLink: string;
  bgImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    badge: "HOLZCHREIZ",
    badgeIcon: "fa-tree",
    title: "Une chaleur naturelle pour votre foyer",
    description: "Bois de chauffage de premier choix, livré dans toute la Suisse.",
    btnPrimaryText: "Acheter maintenant",
    btnPrimaryLink: "/bois-de-chauffage",
    btnSecondaryText: "Nos catégories",
    btnSecondaryLink: "#categories",
    bgImage: "/img/hero-1.jpeg",
  },
  {
    id: 2,
    badge: "BOIS DE CHAUFFAGE PREMIUM",
    badgeIcon: "fa-fire",
    title: "Bois séché au séchoir",
    description: "Pouvoir calorifique élevé, taux d'humidité résiduelle inférieur à 18 %.",
    btnPrimaryText: "Voir les produits",
    btnPrimaryLink: "/bois-de-chauffage",
    btnSecondaryText: "Nos catégories",
    btnSecondaryLink: "#categories",
    bgImage: "/img/hero-2.jpeg",
  },
  {
    id: 3,
    badge: "LIVRAISON GRATUITE",
    badgeIcon: "fa-truck-fast",
    title: "Rapide dans toute la Suisse",
    description: "Commandez aujourd'hui, livraison sous 24 à 72 heures.",
    btnPrimaryText: "Découvrir",
    btnPrimaryLink: "/granules",
    btnSecondaryText: "Nos catégories",
    btnSecondaryLink: "#categories",
    bgImage: "/img/hero-3.jpeg",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  // Gestion du Drag / Swipe
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Autoplay (s'arrête au survol)
  useEffect(() => {
    if (isHovered || isDragging) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, isHovered, isDragging]);

  // Événements Tactiles et Souris pour le Swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - startX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset < -50) nextSlide();
    else if (dragOffset > 50) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    if (dragOffset < -50) nextSlide();
    else if (dragOffset > 50) prevSlide();
    setIsDragging(false);
    setDragOffset(0);
  };

  return (
    <section 
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
        setDragOffset(0);
      }}
    >
      <div 
        className="hero-slider"
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))`,
          transition: isDragging ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {slides.map((slide) => (
          <div 
            key={slide.id} 
            className="hero-slide"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* Overlay sombre pour améliorer la lisibilité */}
            <div className="hero-overlay"></div>

            <div className="hero-content-container">
              <div className="hero-content">
                {/* Badge */}
                <div className="hero-badge">
                  <i className={`fa-solid ${slide.badgeIcon}`}></i>
                  <span>{slide.badge}</span>
                </div>

                {/* Titre principal */}
                <h1 className="hero-title">{slide.title}</h1>

                {/* Description */}
                <p className="hero-description">{slide.description}</p>

                {/* Boutons d'action */}
                <div className="hero-buttons">
                  <Link href={slide.btnPrimaryLink} className="btn-hero-primary">
                    {slide.btnPrimaryText}
                    <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                  <Link href={slide.btnSecondaryLink} className="btn-hero-secondary">
                    {slide.btnSecondaryText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Points de navigation en bas au centre */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${currentSlide === index ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>

      {/* Flèches de navigation en bas à droite */}
      <div className="hero-nav-buttons">
        <button className="hero-arrow-btn" onClick={prevSlide} aria-label="Diapositive précédente">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button className="hero-arrow-btn" onClick={nextSlide} aria-label="Diapositive suivante">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}