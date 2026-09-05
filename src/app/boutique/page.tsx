import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Boutique | HolzChreiz",
  description: "Découvrez notre sélection complète de bois de chauffage, pellets de bois et bûches compressées.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}