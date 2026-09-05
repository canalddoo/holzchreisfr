"use client";

import Image from "next/image";
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
    id: "poele-toron-50",
    discount: "-38 %",
    category: "Poêles à bois",
    title: "TORON 50 8 kW – Poêle à bois DEVILLE",
    rating: 5,
    reviewsCount: 214,
    oldPrice: 1342.00,
    price: 939.40,
    image: "/img/prod/poele-bois-deville-toron-50-8-1-2-300x300.webp",
  },
  {
    id: "poele-sara-12",
    discount: "-44 %",
    category: "Poêles à bois",
    title: "Poêle à bois SARA 12 kW – INTERSTOVES",
    rating: 5,
    reviewsCount: 431,
    oldPrice: 577.00,
    price: 403.90,
    image: "/img/prod/poele-bois-interstoves-sara-12-300x300.webp",
  },
  {
    id: "poele-sandy-8",
    discount: "-20 %",
    category: "Poêles à bois",
    title: "Poêle à bois SANDY 8 kW – LAB – DEVILLE",
    rating: 4.5,
    reviewsCount: 1142,
    price: 799.40,
    image: "/img/prod/poele-bois-deville-sandy-8-300x300.webp",
  },
  {
    id: "poele-lya-12",
    discount: "-22 %",
    category: "Poêles à bois",
    title: "Poêle à bois LYA 12 kW – INTERSTOVES",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 489.00,
    price: 342.30,
    image: "/img/prod/poele-bois-interstoves-lya-12-300x300.webp",
  },
  {
    id: "poele-alessia-14",
    discount: "-45 %",
    category: "Poêles à bois",
    title: "ALESSIA 14 kW – Poêle à bois d'INTERSTOVES",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 577.00,
    price: 403.90,
    image: "/img/prod/poele-bois-interstoves-alessia-14-2-300x300.webp",
  },
  {
    id: "poele-eguzki-6",
    discount: "-37 %",
    category: "Poêles à bois",
    title: "Poêle à bois étanche EGUZKI 6 kW – DEVILLE",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 2600.00,
    price: 1820.00,
    image: "/img/prod/poele-bois-deville-eguzki-6-300x300.webp",
  },
];

export default function Poele() {
  const { addToCart } = useCart();

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-container">
        {/* En-tête */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">Nos meilleurs poêles à bois</h2>
          <p className="bestsellers-subtitle">
            Soigneusement sélectionnés, testés et disponibles immédiatement.
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
      </div>
    </section>
  );
}