"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();

  const shippingCost = subtotal > 150 || cart.length === 0 ? 0 : 15.0;
  const grandTotal = subtotal + shippingCost;

  return (
    <>
      <main className="cart-page">
        <div className="cart-container">
          <h1 className="cart-page-title">Mon Panier</h1>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fa-solid fa-basket-shopping empty-icon"></i>
              <h2>Votre panier est vide</h2>
              <p>Découvrez nos produits et faites votre choix.</p>
              <Link href="/" className="btn-primary-cart">
                Retour à la boutique
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Liste des articles */}
              <div className="cart-items-section">
                <div className="cart-items-header">
                  <span>Produit</span>
                  <span>Prix</span>
                  <span>Quantité</span>
                  <span>Total</span>
                  <span></span>
                </div>

                {cart.map((item) => (
                  <div key={item.id} className="cart-item-row">
                    {/* Produit */}
                    <div className="cart-item-info">
                      <div className="cart-item-image">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <p className="cart-item-category">{item.category}</p>
                        <h4 className="cart-item-title">{item.title}</h4>
                      </div>
                    </div>

                    {/* Prix Unitaire */}
                    <div className="cart-item-price">
                      {item.price.toFixed(2).replace(".", ",")} €
                    </div>

                    {/* Quantité */}
                    <div className="cart-item-quantity">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Total Unitaire */}
                    <div className="cart-item-total">
                      {(item.price * item.quantity).toFixed(2).replace(".", ",")} €
                    </div>

                    {/* Supprimer */}
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Supprimer"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                ))}

                <div className="cart-actions-bottom">
                  <button className="btn-clear" onClick={clearCart}>
                    Vider le panier
                  </button>
                  <Link href="/" className="btn-continue">
                    <i className="fa-solid fa-arrow-left"></i> Continuer mes achats
                  </Link>
                </div>
              </div>

              {/* Récapitulatif Commande */}
              <div className="cart-summary-card">
                <h3>Récapitulatif de la commande</h3>

                <div className="summary-row">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2).replace(".", ",")} €</span>
                </div>

                <div className="summary-row">
                  <span>Livraison</span>
                  <span>
                    {shippingCost === 0
                      ? "Gratuite"
                      : `${shippingCost.toFixed(2).replace(".", ",")} €`}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total (TTC)</span>
                  <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
                </div>

                <button className="btn-checkout">
                  Commander
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}