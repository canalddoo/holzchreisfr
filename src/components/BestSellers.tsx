"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

interface Product {
  id: string;
  discount?: string;
  category: string;
  title: string;
  rating: number;
  reviewsCount: number;
  oldPrice?: number;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: "bestseller-esche-25cm",
    discount: "-24 %",
    category: "Frêne – Bois de chauffage",
    title: "Palette de bois de frêne fendu et séché au séchoir, 25 cm",
    rating: 5,
    reviewsCount: 214,
    oldPrice: 439.00,
    price: 307.30,
    image: "/img/prod/hele-pallet-essenhout-schuin-transparant-light-2-2-1.jpg",
  },
  {
    id: "bestseller-eiche-25cm",
    discount: "-21 %",
    category: "Chêne – Bois de chauffage",
    title: "Palette de bois de chêne fendu et séché au séchoir, 25 cm",
    rating: 5,
    reviewsCount: 431,
    oldPrice: 429.00,
    price: 300.30,
    image: "/img/prod/hele-pallet-eikenhout-schuin-transparant-light-1.jpg",
  },
  {
    id: "bestseller-esche-halb",
    category: "Frêne – Bois de chauffage",
    title: "Demi-palette de bois de chauffage fendu",
    rating: 4.5,
    reviewsCount: 279,
    price: 195.30,
    image: "/img/prod/halve-pallet-berken-essen-mix-schuin-transparant-light.jpg",
  },
  {
    id: "bestseller-haagbuche-25cm",
    discount: "-22 %",
    category: "Charme – Bois de chauffage",
    title: "Palette de bois de chauffage fendu et séché au séchoir, 25 cm",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 449.00,
    price: 314.30,
    image: "/img/prod/hele-pallet-haagbeuk-schuin-transparant-light_2-1.jpg",
  },
  {
    id: "bestseller-buche-25cm",
    discount: "-18 %",
    category: "Hêtre – Bois de chauffage",
    title: "Palette de bois de hêtre fendu et séché au séchoir, 25 cm",
    rating: 5,
    reviewsCount: 312,
    oldPrice: 459.00,
    price: 376.38,
    image: "/img/prod/hele-pallet-essenhout-schuin-transparant-light-2-2-1.jpg",
  },
  {
    id: "bestseller-holzpellets-15kg",
    discount: "-15 %",
    category: "Pellets de bois",
    title: "Pellets de bois Premium ENplus A1 – 66 sacs de 15 kg (990 kg)",
    rating: 5,
    reviewsCount: 189,
    oldPrice: 499.00,
    price: 424.15,
    image: "/img/prod/hele-pallet-eikenhout-schuin-transparant-light-1.jpg",
  },
  {
    id: "bestseller-holzbriketts-ruf",
    discount: "-20 %",
    category: "Bûches compressées",
    title: "Bûches compressées RUF bois feuillu – Palette de 960 kg",
    rating: 4.5,
    reviewsCount: 145,
    oldPrice: 420.00,
    price: 336.00,
    image: "/img/prod/halve-pallet-berken-essen-mix-schuin-transparant-light.jpg",
  },
  {
    id: "bestseller-birke-30cm",
    discount: "-25 %",
    category: "Bouleau – Bois de chauffage",
    title: "Palette de bois de bouleau fendu, 30 cm",
    rating: 4.5,
    reviewsCount: 98,
    oldPrice: 399.00,
    price: 299.25,
    image: "/img/prod/hele-pallet-haagbeuk-schuin-transparant-light_2-1.jpg",
  },
  {
    id: "bestseller-pini-kay-briketts",
    discount: "-12 %",
    category: "Bûches compressées",
    title: "Bûches de bois feuillu Pini-Kay avec trou central – Palette de 960 kg",
    rating: 5,
    reviewsCount: 87,
    oldPrice: 460.00,
    price: 404.80,
    image: "/img/prod/hele-pallet-essenhout-schuin-transparant-light-2-2-1.jpg",
  },
  {
    id: "bestseller-mischholz-25cm",
    category: "Mélange de bois",
    title: "Palette de mélange de bois feuillus séché au séchoir, 25 cm",
    rating: 4,
    reviewsCount: 164,
    price: 285.00,
    image: "/img/prod/hele-pallet-eikenhout-schuin-transparant-light-1.jpg",
  },
];

export default function BestSellers() {
  const { addToCart } = useCart();

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-container">
        {/* En-tête */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">Meilleures Ventes</h2>
          <p className="bestsellers-subtitle">
            Soigneusement sélectionnés, contrôlés et prêts à être livrés.
          </p>
          <div className="bestsellers-line"></div>
        </div>

        {/* Grille de produits */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Image & Badge de réduction */}
              <div className="product-image-wrap">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="product-image"
                />
                {product.discount && (
                  <span className="badge-discount">{product.discount}</span>
                )}
              </div>

              {/* Détails du produit */}
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>

                {/* Avis */}
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star ${
                          i < Math.floor(product.rating) ? "active" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="reviews-count">({product.reviewsCount})</span>
                </div>

                {/* Prix */}
                <div className="product-price-box">
                  {product.oldPrice && (
                    <span className="old-price">
                      {product.oldPrice.toFixed(2).replace(".", ",")} €
                    </span>
                  )}
                  <span className="current-price">
                    {product.price.toFixed(2).replace(".", ",")} €
                  </span>
                </div>

                {/* Bouton d'ajout */}
                <button
                  className="btn-add-cart"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      category: product.category,
                      price: product.price,
                      oldPrice: product.oldPrice,
                      image: product.image,
                      // quantity: 1,
                    })
                  }
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton "Voir tout" en bas */}
        <div className="bestsellers-footer" style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/boutique" className="btn-view-all">
            Voir tous les produits <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}