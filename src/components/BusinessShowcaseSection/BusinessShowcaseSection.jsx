import React, { useEffect, useState } from "react";
import "./BusinessShowcaseSection.css";

import imgOne from "../../assets/Al-Nassaj.jpg";
import imgTwo from "../../assets/Al-Nassaj-1.jpg";
import imgThree from "../../assets/Al-Nassaj-2.jpg";
import imgFour from "../../assets/Al-Nassaj-3.jpg";
import imgFive from "../../assets/Al-Nassaj-4.jpg";

const fallbackContent = {
  ar: {
    badge: "",
    title: "",
    description: "",
    button_text: "",
  },
  en: {
    badge: "",
    title: "",
    description: "",
    button_text: "",
  },
};

const BusinessShowcaseSection = ({
  lang = "en",
  content = fallbackContent,
}) => {
  const [animateContent, setAnimateContent] = useState(false);

  const currentContent =
    content?.[lang] || content?.en || fallbackContent.en;

  const galleryImages = [
    { id: 1, src: imgOne, alt: "Textile fabric rolls" },
    { id: 2, src: imgTwo, alt: "Colored fabric rolls" },
    { id: 3, src: imgThree, alt: "Folded textile fabrics" },
    { id: 4, src: imgFour, alt: "Stacked home furnishing fabrics" },
    { id: 5, src: imgFive, alt: "Printed fabric collection" },
  ];

  const loopImages = [...galleryImages, ...galleryImages];

  useEffect(() => {
    setAnimateContent(true);
    const timer = setTimeout(() => {
      setAnimateContent(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <section
      className={`business-showcase-section ${
        lang === "ar" ? "arabic-business-showcase" : ""
      }`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="business-showcase-container">
        <div className="business-showcase-header">
          <div
            className={`business-showcase-text ${
              animateContent ? "content-switch" : ""
            }`}
          >
            <span className="business-showcase-badge">
              {currentContent.badge}
            </span>

            <h2 className="business-showcase-title">
              {currentContent.title}
            </h2>

            <p className="business-showcase-description">
              {currentContent.description}
            </p>
          </div>

          <div
            className={`business-showcase-action ${
              animateContent ? "content-switch" : ""
            }`}
          >
            <a
  href="https://alnassaj.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="business-showcase-button"
  aria-label={currentContent.button_text}
>
  <span>{currentContent.button_text}</span>

  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13 6L19 12L13 18"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</a>
          </div>
        </div>

        <div className="business-showcase-slider">
          <div className="business-showcase-track">
            {loopImages.map((image, index) => (
              <div
                className="business-showcase-card"
                key={`${image.id}-${index}`}
              >
                <img src={image.src} alt={image.alt} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessShowcaseSection;