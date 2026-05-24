import React, { useEffect, useRef, useState } from "react";
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
  const [repeatCount, setRepeatCount] = useState(4);
  const [groupWidth, setGroupWidth] = useState(0);

  const sliderRef = useRef(null);
  const firstGroupRef = useRef(null);

  const currentContent =
    content?.[lang] || content?.en || fallbackContent.en;

  const galleryImages = [
    { id: 1, src: imgOne, alt: "Textile fabric rolls" },
    { id: 2, src: imgTwo, alt: "Colored fabric rolls" },
    { id: 3, src: imgThree, alt: "Folded textile fabrics" },
    { id: 4, src: imgFour, alt: "Stacked home furnishing fabrics" },
    { id: 5, src: imgFive, alt: "Printed fabric collection" },
  ];

  useEffect(() => {
    setAnimateContent(true);

    const timer = setTimeout(() => {
      setAnimateContent(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [lang]);

  useEffect(() => {
    const calculateMarquee = () => {
      const slider = sliderRef.current;
      const firstGroup = firstGroupRef.current;

      if (!slider || !firstGroup) return;

      const sliderWidth = slider.offsetWidth;
      const measuredGroupWidth = firstGroup.scrollWidth;

      if (!sliderWidth || !measuredGroupWidth) return;

      /*
        نكرر المجموعة حسب عرض الشاشة الحقيقي.
        +3 معناها نترك نسخ إضافية احتياطية حتى لا يظهر فراغ أثناء الحركة.
      */
      const neededRepeats =
        Math.ceil((sliderWidth * 2) / measuredGroupWidth) + 3;

      setRepeatCount(Math.max(neededRepeats, 4));
      setGroupWidth(measuredGroupWidth);
    };

    calculateMarquee();

    const resizeObserver = new ResizeObserver(() => {
      calculateMarquee();
    });

    if (sliderRef.current) {
      resizeObserver.observe(sliderRef.current);
    }

    if (firstGroupRef.current) {
      resizeObserver.observe(firstGroupRef.current);
    }

    window.addEventListener("resize", calculateMarquee);

    const images = firstGroupRef.current?.querySelectorAll("img") || [];

    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", calculateMarquee);
      }
    });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateMarquee);

      images.forEach((img) => {
        img.removeEventListener("load", calculateMarquee);
      });
    };
  }, []);

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

        <div className="business-showcase-slider" ref={sliderRef}>
          <div
            className="business-showcase-track"
            style={{
              "--business-marquee-distance": `${groupWidth}px`,
            }}
          >
            <div
              className="business-showcase-group"
              ref={firstGroupRef}
            >
              {galleryImages.map((image) => (
                <div
                  className="business-showcase-card"
                  key={`original-${image.id}`}
                >
                  <img src={image.src} alt={image.alt} draggable="false" />
                </div>
              ))}
            </div>

            {Array.from({ length: repeatCount - 1 }).map((_, groupIndex) => (
              <div
                className="business-showcase-group"
                key={`copy-group-${groupIndex}`}
                aria-hidden="true"
              >
                {galleryImages.map((image) => (
                  <div
                    className="business-showcase-card"
                    key={`copy-${groupIndex}-${image.id}`}
                  >
                    <img src={image.src} alt="" draggable="false" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessShowcaseSection;