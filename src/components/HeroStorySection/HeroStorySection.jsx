import React, { useEffect, useState } from "react";
import "./HeroStorySection.css";
import storyVideo from "../../assets/hero-video.mp4";

const fallbackHeroContent = {
  ar: {
    badge: "",
    title: "",
    description: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonLink: "",
    stat_one: "مشروع مكتمل",
    stat_two: "مشروع مكتمل",
  },
  en: {
    badge: "",
    title: "",
    description: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonLink: "",
    stat_one: "Projects completed",
    stat_two: "Projects completed",
  },
};

const HeroStorySection = ({ lang = "en", heroContent = fallbackHeroContent }) => {
  const [animateContent, setAnimateContent] = useState(false);

  const currentContent = heroContent?.[lang] || heroContent?.en || fallbackHeroContent.en;

  useEffect(() => {
    setAnimateContent(true);
    const timer = setTimeout(() => {
      setAnimateContent(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [lang]);

  return (
    <section
      className={`hero-story-section ${lang === "ar" ? "arabic-hero" : ""}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="hero-story-container">
        <video
          className="hero-story-video-bg"
          src={storyVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        <div className="hero-story-overlay"></div>

        <div className={`hero-story-content ${animateContent ? "content-switch" : ""}`}>
          <div className="hero-story-badge">
            <span className="hero-story-badge-dot"></span>
            <span>{currentContent.badge}</span>
          </div>

          <h1 className="hero-story-title">{currentContent.title}</h1>

          <p className="hero-story-text">{currentContent.description}</p>

          <div className="hero-story-actions">
            <a
              href={currentContent.primaryButtonLink || "#contact"}
              className="hero-story-btn hero-story-btn-primary"
            >
              {currentContent.primaryButtonText}
            </a>

            <a
              href={currentContent.secondaryButtonLink || "#"}
              className="hero-story-btn hero-story-btn-secondary"
            >
              {currentContent.secondaryButtonText}
            </a>
          </div>
        </div>

        <div className={`hero-story-stats ${animateContent ? "content-switch" : ""}`}>
          <div className="hero-story-stat">
            <h3>400+</h3>
            <p>{currentContent.stat_one}</p>
          </div>

          <div className="hero-story-stat">
            <h3>400+</h3>
            <p>{currentContent.stat_two}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStorySection;