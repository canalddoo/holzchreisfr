export default function LegalNoticePage() {
  return (
    <article className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Informations sur le site</span>
        <h1 className="legal-title">Mentions légales</h1>
        <p className="legal-intro">
          Les informations suivantes sont publiées conformément aux obligations
          applicables aux sites marchands.
        </p>

        <section className="legal-section">
          <h2>Éditeur du site</h2>
          <p>
            HolzChreiz
            <br />
            Adresse : 38420 Le Versoud, France
            <br />
            E-mail : info@holzchreiz.fr
            <br />
            Téléphone : +41767529493
          </p>
          <p>
            Les informations d’identification de la société (forme juridique,
            numéro d’immatriculation et numéro de TVA le cas échéant) doivent
            être complétées par l’éditeur avant la mise en ligne définitive.
          </p>
        </section>
        <section className="legal-section">
          <h2>Hébergement</h2>
          <p>
            Les coordonnées de l’hébergeur du site et de son siège social
            doivent être complétées par l’éditeur avec les informations fournies
            par le prestataire d’hébergement.
          </p>
        </section>
        <section className="legal-section">
          <h2>Propriété intellectuelle</h2>
          <p>
            Les textes, visuels, marques, logos et éléments du site sont
            protégés par les règles applicables à la propriété intellectuelle.
            Toute reproduction ou utilisation non autorisée est interdite.
          </p>
        </section>
        <section className="legal-section">
          <h2>Responsabilité</h2>
          <p>
            HolzChreiz s’efforce de maintenir des informations exactes et à
            jour. Le site peut toutefois être temporairement indisponible ou
            contenir des erreurs. Les liens vers des sites tiers ne valent pas
            validation de leur contenu.
          </p>
        </section>
        <p className="legal-updated">
          Dernière mise à jour : 17 septembre 2026
        </p>
      </div>
    </article>
  );
}
