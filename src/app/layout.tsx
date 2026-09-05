import type { Metadata } from "next";
import "./globals.css";
import "./layout.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "HolzChreiz - Vente de bois de chauffage & pellets de bois",
  description:
    "Combustibles suisses de haute qualité, directement issus de forêts gérées durablement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link rel="shortcut icon" href="/img/log.png" type="image/x-icon" />
      </head>
      <body>
        <CartProvider>
          <div
            className="app-container"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* En-tête de navigation */}
            <Navbar />

            {/* Contenu principal */}
            <main className="main-content" style={{ flex: 1 }}>
              {children}
            </main>

            {/* Pied de page */}
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}