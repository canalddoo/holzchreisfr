"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { productsData, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ShopGrid() {
  const { addToCart } = useCart();

  // Pagination et contrôle d'affichage
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sortOption, setSortOption] = useState<string>("standard");

  // États des filtres
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(0);

  // Extraire la liste unique des catégories depuis les données
  const categories = useMemo(() => {
    const cats = new Set(productsData.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Application des filtres et du tri
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // 1. Filtre par catégorie
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Filtre par prix maximum
    result = result.filter((p) => p.price <= maxPrice);

    // 3. Filtre par note minimale
    if (minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    // 4. Tri des produits
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, maxPrice, minRating, sortOption]);

  // Produits affichés selon la pagination
  const displayedProducts = filteredProducts.slice(0, itemsPerPage);

  // Réinitialiser les filtres
  const resetFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setMinRating(0);
    setSortOption("standard");
  };

  return (
    <section className="shop-section">
      <div className="shop-container">
        {/* BARRE D'OUTILS ET FILTRES */}
        <div className="shop-toolbar">
          <div className="shop-breadcrumb">
            <Link href="/">Accueil</Link>
            <span className="separator">/</span>
            <span className="current">Boutique</span>
          </div>

          <div className="shop-controls">
            <div className="items-per-page">
              <span>Afficher :</span>
              {[24, 36, 45, 55].map((num) => (
                <button
                  key={num}
                  onClick={() => setItemsPerPage(num)}
                  className={itemsPerPage === num ? "active" : ""}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="sort-select-wrapper">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="standard">Tri par défaut</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="rating-desc">Meilleures notes</option>
              </select>
            </div>

            <button
              className={`filter-btn ${showFilterPanel ? "active" : ""}`}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <i className="fa-solid fa-sliders"></i>
              <span>Filtres</span>
            </button>
          </div>
        </div>

        {/* PANNEAU DE FILTRES */}
        {showFilterPanel && (
          <div className="filter-panel">
            <div className="filter-group">
              <label className="filter-label">Catégorie :</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Toutes les catégories</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Prix max. : <strong>{maxPrice.toFixed(2)} €</strong>
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="filter-range"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Note minimale :</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="filter-select"
              >
                <option value={0}>Toutes les notes</option>
                <option value={4}>4 étoiles et plus</option>
                <option value={4.5}>4.5 étoiles et plus</option>
                <option value={5}>5 étoiles</option>
              </select>
            </div>

            <button className="btn-reset-filters" onClick={resetFilters}>
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* COMPTEUR DE RÉSULTATS */}
        <div className="results-count">
          Affichage de <strong>{displayedProducts.length}</strong> sur{" "}
          <strong>{filteredProducts.length}</strong> produit(s)
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="products-grid">
          {displayedProducts.map((product: Product) => (
            <div key={product.id} className="product-card">
              {/* Image & Badge Promo */}
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

                {/* Évaluations */}
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star ${
                          i < Math.floor(product.rating || 0) ? "active" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  {product.reviewsCount !== undefined && (
                    <span className="reviews-count">({product.reviewsCount})</span>
                  )}
                </div>

                {/* Prix */}
                <div className="product-price-box">
                  {product.oldPrice && (
                    <span className="old-price">
                      {product.oldPrice.toFixed(2)} €
                    </span>
                  )}
                  <span className="current-price">
                    {product.price.toFixed(2)} €
                  </span>
                </div>

                {/* Bouton Ajouter au panier */}
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

        {displayedProducts.length === 0 && (
          <div className="no-products-found">
            <p>Aucun produit ne correspond à vos critères de recherche.</p>
            <button className="btn-reset-filters" onClick={resetFilters}>
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}