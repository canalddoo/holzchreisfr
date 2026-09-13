"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Poele from "@/components/Poele";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* 1. Hero Carousel */}
      <Hero />

      {/* 2. Grille de Catégories */}
      <Categories />

      {/* 3. Section Best-Sellers */}
      <BestSellers />

      <Poele />

      {/* 4. Pourquoi HolzChreiz */}
      <WhyUs />

      {/* 5. Bannière Promotionnelle (Offre d'hiver) */}
      
      <section className="promo-banner-section">
  <div className="promo-banner-container">
    <div className="promo-banner-content">
      {/* Badge -50% */}
      <div className="promo-badge">
        <i className="fa-solid fa-bolt"></i>
        <span>-50%</span>
      </div>

      {/* Titre */}
      <h2 className="promo-title">
        Profitez de nos offres avec des économies allant jusqu'à 50 %
      </h2>

      {/* Sous-titre */}
      <p className="promo-subtitle">
        Offre d'hiver – jusqu'à épuisement des stocks.
      </p>
    </div>

    {/* Bouton CTA */}
    <Link href="/boutique" className="promo-btn">
      <span>Acheter maintenant</span>
      <i className="fa-solid fa-arrow-right"></i>
    </Link>
  </div>
</section>
      {/* 6. Témoignages */}
      <Testimonials />

      {/* 7. Section Bouton Retour en haut */}

      <section className="scroll-top-section">
        {/* Bouton Retour en haut fixe */}
<button
  onClick={scrollToTop}
  className="scroll-top-btn-fixed"
  aria-label="Retour en haut"
>
  <i className="fa-solid fa-arrow-up"></i>
  {/* <span>Retour en haut</span> */}
</button>
      </section>

    </main>
  );
}