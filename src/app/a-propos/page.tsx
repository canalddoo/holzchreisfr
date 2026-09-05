import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* SECTION 1: MISSION & COLONNES */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-grid-3">
            {/* Colonne 1: Notre mission */}
            <div className="about-col">
              <span className="about-subtitle-tag">
                À propos – HolzChreiz
              </span>
              <h1 className="about-col-title">Notre Mission</h1>
              <p className="about-text">
                Chez HolzChreiz, nous sommes convaincus que le chauffage au bois
                doit être économique, confortable et respectueux de l'environnement.
                C'est pourquoi nous sélectionnons des combustibles de haute qualité issus
                de sources responsables, afin de garantir une chaleur constante et une
                performance optimale à chaque utilisation.
              </p>
            </div>

            {/* Colonne 2: Expertise */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Nous mettons notre expertise au service de votre confort.
                  Faites des économies grâce à nos services.
                </h3>
                <p className="about-text">
                  Fort de plusieurs années d'expérience dans la distribution de bois de chauffage,
                  HolzChreiz accompagne les particuliers et les entreprises
                  dans tous leurs besoins en chauffage.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                VISITER LA BOUTIQUE
              </Link>
            </div>

            {/* Colonne 3: Sélection de produits */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Une sélection de produits responsable et soigneusement choisie
                </h3>
                <p className="about-text">
                  Qu'il s'agisse de bois de chauffage, de bûches compressées de hêtre, de pellets de bois,
                  de bois densifié ou poêles à bois – nous proposons des produits
                  soigneusement sélectionnés qui se distinguent par leur performance et leur fiabilité.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                VISITER LA BOUTIQUE
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: AVEC HOLZCHREIZ, VOUS CHOISISSEZ */}
      <section className="about-feature-section">
        <div className="about-container">
          <div className="about-feature-grid">
            {/* Image d'entrepôt bois */}
            <div className="about-image-wrapper">
              <Image
                src="/img/about.jpeg"
                alt="Stockage de bois HolzChreiz"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="about-img"
                priority
              />
            </div>

            {/* Contenu texte */}
            <div className="about-feature-content">
              <span className="about-subtitle-tag">
                Votre spécialiste des systèmes de chauffage au bois
              </span>
              <h2 className="about-main-title">
                Avec HolzChreiz, vous optez pour :
              </h2>

              <p className="about-highlight-text">
                La qualité, la performance, la durabilité et un service personnalisé. Nous
                sommes fiers de contribuer à un système de chauffage plus naturel, plus économique et
                plus responsable.
              </p>

              <p className="about-text">
                La qualité est au cœur de toutes nos activités. Nous
                collaborons avec des partenaires engagés dans une
                gestion forestière durable, et garantissons des combustibles à pouvoir
                calorifique élevé, faible taux d'humidité résiduelle, propres et d'une
                qualité constante.
              </p>

              <p className="about-text">
                Ils offrent une combustion optimisée et de haute qualité. Chaque
                produit est testé pour garantir une expérience de chauffage
                optimale en toute saison.
              </p>

              {/* Réseaux sociaux */}
              <div className="about-social-divider">
                <div className="about-social-links">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}