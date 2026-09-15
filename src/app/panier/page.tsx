"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type Customer = {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
};
const emptyCustomer: Customer = {
  firstName: "",
  lastName: "",
  country: "Suisse",
  streetAddress: "",
  whatsapp: "",
  email: "",
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [paymentMethod, setPaymentMethod] = useState<
    "stripe" | "bank_transfer"
  >("stripe");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const shippingCost = subtotal > 150 || cart.length === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (!sessionId) return;
    fetch("/api/checkout/stripe/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok && data.paid) {
          clearCart();
          setMessage(
            "Paiement Stripe confirmé. Votre commande est enregistrée.",
          );
          window.history.replaceState({}, "", "/panier");
        }
      })
      .catch(() => undefined);
  }, [clearCart]);
  const updateCustomer = (field: keyof Customer, value: string) =>
    setCustomer((current) => ({ ...current, [field]: value }));

  const checkout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const endpoint =
        paymentMethod === "stripe"
          ? "/api/checkout/stripe"
          : "/api/checkout/bank-transfer";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Une erreur est survenue.");
      if (paymentMethod === "stripe") {
        window.location.href = data.url;
      } else {
        setMessage(
          `Commande ${data.orderId} enregistrée. Effectuez le virement de ${data.grandTotal.toFixed(2)} € avec ce numéro en référence. Les coordonnées bancaires vous seront confirmées par email.`,
        );
        clearCart();
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Une erreur est survenue.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-page-title">Mon Panier</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            {message && <p className="checkout-message">{message}</p>}
            <i className="fa-solid fa-basket-shopping empty-icon"></i>
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos produits et faites votre choix.</p>
            <Link href="/boutique" className="btn-primary-cart">
              Retour à la boutique
            </Link>
          </div>
        ) : (
          <form className="cart-layout" onSubmit={checkout}>
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
                  <div className="cart-item-price">
                    {item.price.toFixed(2).replace(".", ",")} €
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}{" "}
                    €
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Supprimer"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
              <div className="cart-actions-bottom">
                <button type="button" className="btn-clear" onClick={clearCart}>
                  Vider le panier
                </button>
                <Link href="/boutique" className="btn-continue">
                  <i className="fa-solid fa-arrow-left"></i> Continuer mes
                  achats
                </Link>
              </div>
              <section className="checkout-customer">
                <h2>Vos informations</h2>
                <div className="checkout-fields">
                  {(
                    [
                      ["firstName", "Prénom"],
                      ["lastName", "Nom"],
                      ["email", "Email"],
                      ["whatsapp", "Téléphone / WhatsApp"],
                      ["streetAddress", "Adresse de livraison"],
                      ["country", "Pays"],
                    ] as [keyof Customer, string][]
                  ).map(([field, label]) => (
                    <label key={field}>
                      {label}
                      <input
                        required
                        type={field === "email" ? "email" : "text"}
                        value={customer[field]}
                        onChange={(event) =>
                          updateCustomer(field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>
            </div>
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
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />{" "}
                  Carte bancaire avec Stripe
                </label>
                <label>
                  <input
                    type="radio"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={() => setPaymentMethod("bank_transfer")}
                  />{" "}
                  Virement bancaire
                </label>
              </div>
              {paymentMethod === "bank_transfer" && (
                <p className="bank-transfer-note">
                  Votre commande sera mise en attente. Les coordonnées bancaires
                  et la référence de paiement seront confirmées par email.
                </p>
              )}
              {message && <p className="checkout-message">{message}</p>}
              <button className="btn-checkout" type="submit" disabled={loading}>
                {loading
                  ? "Traitement..."
                  : paymentMethod === "stripe"
                    ? "Payer avec Stripe"
                    : "Confirmer la commande"}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
