"use client";

import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Quelles essences de bois HolzChreiz propose-t-il ?",
      answer:
        "Nous proposons principalement des bois durs à haut pouvoir calorifique : chêne, hêtre, charme et frêne. Ces essences brûlent longtemps et de manière homogène, ce qui les rend idéales pour les poêles, cheminées et foyers fermés.",
    },
    {
      question: "Le bois est-il sec et prêt à l'emploi ?",
      answer:
        "Oui, l'ensemble de notre bois de chauffage est séché en séchoir (taux d'humidité résiduelle inférieur à 20 %) et utilisable dès la livraison pour une combustion optimale et sans fumée excessives.",
    },
    {
      question: "Quelles longueurs de bûches sont disponibles ?",
      answer:
        "Nos bûches sont coupées de manière standard en 25 cm ou 33 cm, ce qui est idéal pour la majorité des poêles et cheminées modernes.",
    },
    {
      question: "Proposez-vous la livraison à domicile ?",
      answer:
        "Tout à fait. Nous livrons vos palettes de bois directement chez vous et les déposons à l'aide d'un transpalette au plus près de votre zone de stockage.",
    },
    {
      question: "Quelle quantité de bois dois-je commander ?",
      answer:
        "Pour une utilisation occasionnelle, une demi-palette suffit généralement. Si vous vous chauffez principalement au bois tout au long de l'hiver, nous recommandons 2 à 3 palettes complètes selon la taille de votre foyer.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          
          {/* COLONNE GAUCHE: FAQ */}
          <div className="faq-column">
            <span className="section-subtitle">INFORMATIONS & QUESTIONS</span>
            <h2 className="section-title">FOIRE AUX QUESTIONS</h2>

            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`faq-item ${openFaq === index ? "active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <i className={`fa-solid fa-chevron-${openFaq === index ? "up" : "down"}`}></i>
                  </button>
                  <div 
                    className="faq-answer-wrapper"
                    style={{ 
                      maxHeight: openFaq === index ? "200px" : "0",
                      opacity: openFaq === index ? 1 : 0
                    }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SÉPARATEUR VERTICAL */}
          <div className="vertical-divider"></div>

          {/* COLONNE DROITE: FORMULAIRE */}
          <div className="form-column">
            <span className="section-subtitle">À PROPOS</span>
            <h2 className="section-title">
              N'hésitez pas à nous contacter pour toute question.
            </h2>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              {/* Champ complet avec bordure arrondie */}
              <input
                type="text"
                className="input-full-bordered"
                placeholder=""
              />

              {/* Grille à 2 colonnes pour les champs de saisie */}
              <div className="input-grid">
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Votre nom"
                  required
                />
                <input
                  type="email"
                  className="input-underline"
                  placeholder="Votre adresse e-mail"
                  required
                />
                <input
                  type="tel"
                  className="input-underline"
                  placeholder="Numéro de téléphone"
                />
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Sujet"
                />
              </div>

              {/* Zone de texte avec soulignement */}
              <textarea
                className="input-underline textarea"
                placeholder="Votre message"
                rows={3}
                required
              ></textarea>

              <button type="submit" className="btn-submit-contact">
                POSER UNE QUESTION
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}