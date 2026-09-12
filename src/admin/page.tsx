// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import "./admin.css";

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  status: string;
  createdAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Vérification de la session
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const res = await fetch("/api/admin/check");
      if (res.ok) {
        setIsAuthenticated(true);
        loadOrders();
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadOrders();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Échec de la connexion");
      }
    } catch {
      setLoginError("Une erreur est survenue.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des commandes :", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="admin-loading">
        <p>Chargement...</p>
      </div>
    );
  }

  // ÉCRAN DE CONNEXION
  if (!isAuthenticated) {
    return (
      <main className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <i className="fa-solid fa-lock admin-login-icon"></i>
            <h1 className="admin-login-title">Connexion Admin</h1>
            <p className="admin-login-subtitle">Administration HolzChreiz</p>
          </div>

          {loginError && (
            <div className="admin-login-error">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="username">Nom d'utilisateur</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="admin-btn-primary">
              Se connecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TABLEAU DE BORD ADMIN
  return (
    <main className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-header-title">Commandes</h1>
          <p className="admin-header-desc">Aperçu de toutes les commandes clients reçues</p>
        </div>

        <button onClick={handleLogout} className="admin-btn-logout">
          <i className="fa-solid fa-right-from-bracket"></i> Se déconnecter
        </button>
      </div>

      {loadingOrders ? (
        <p className="admin-loading">Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <div className="admin-empty-state">
          Aucune commande disponible.
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>N° de commande</th>
                <th>Client</th>
                <th>Adresse de livraison</th>
                <th>Contact</th>
                <th>Montant total</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-order-id">{order.id}</td>
                  <td>
                    <strong>{order.firstName} {order.lastName}</strong>
                    <br />
                    <span className="admin-customer-sub">{order.country}</span>
                  </td>
                  <td>{order.streetAddress}</td>
                  <td>
                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-whatsapp-link"
                    >
                      <i className="fa-brands fa-whatsapp"></i> {order.whatsapp}
                    </a>
                    <br />
                    <span className="admin-customer-sub">{order.email}</span>
                  </td>
                  <td className="admin-price">
                    CHF {order.grandTotal.toFixed(2)}
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("fr-CH")}
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge-${order.status}`}>
                      {order.status === "pending" ? "En attente" : order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}