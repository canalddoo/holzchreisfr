"use client";

import { useState } from "react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  initials: string;
  name: string;
  city: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      "« Les meilleures bûches compressées que j'ai eues. Longue durée de combustion et très peu de cendres. »",
    initials: "M",
    name: "Marco Bernasconi",
    city: "Lugano",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "« Du bois sec, une livraison ponctuelle et un service impeccable. Je commande chaque année. »",
    initials: "A",
    name: "Andrea Meier",
    city: "Zürich",
  },
  {
    id: 3,
    rating: 5,
    quote:
      "« Les pellets brûlent très proprement. Le rapport qualité-prix est excellent. »",
    initials: "L",
    name: "Luc Rochat",
    city: "Lausanne",
  },
  {
    id: 4,
    rating: 5,
    quote:
      "« Les conseils par téléphone étaient excellents. Mon nouveau poêle à bois a été livré en parfait état. »",
    initials: "S",
    name: "Sandra Bühler",
    city: "Bern",
  },
];

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(2); // 3e puce active par défaut

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Titre centré */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">Ce que disent nos clients</h2>
        </div>

        {/* Grille de cartes */}
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.id} className="testimonial-card">
              {/* Évaluation par étoiles */}
              <div className="testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>

              {/* Texte de l'avis client */}
              <p className="testimonial-quote">{item.quote}</p>

              {/* Auteur */}
              <div className="testimonial-author">
                <div className="author-avatar">{item.initials}</div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-city">{item.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation centrée (Puces) */}
        <div className="testimonials-pagination">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`pagination-dot ${
                activeDot === index ? "active" : ""
              }`}
              onClick={() => setActiveDot(index)}
              aria-label={`Aller à la diapositive ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}