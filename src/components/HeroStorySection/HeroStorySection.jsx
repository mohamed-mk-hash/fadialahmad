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
    stat_one: "سنة من الخبرة",
    stat_two: "دولة حول العالم",
    stat_three: "مشروع وشركة",
    hero_note:
      "رحلة صناعية بدأت من حلب، وامتدت إلى الصين والخليج وأوروبا، لبناء منظومات أعمال قائمة على الجودة والثقة والاستدامة.",
  },
  en: {
    badge: "",
    title: "",
    description: "",
    primaryButtonText: "",
    secondaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonLink: "",
    stat_one: "Years of experience",
    stat_two: "Countries worldwide",
    stat_three: "Projects & companies",
    hero_note:
      "An industrial journey that started in Aleppo and expanded to China, the Gulf, and Europe through quality, trust, and sustainable growth.",
  },
};

const renderTextWithBreaks = (text = "") => {
  return text.split("/").map((part, index, array) => (
    <React.Fragment key={index}>
      {part.trim()}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
};

const HeroStorySection = ({
  lang = "en",
  heroContent = fallbackHeroContent,
}) => {
  const [animateContent, setAnimateContent] = useState(false);

  const currentContent =
    heroContent?.[lang] || heroContent?.en || fallbackHeroContent.en;

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

        <div
          className={`hero-story-content ${
            animateContent ? "content-switch" : ""
          }`}
        >
          <div className="hero-story-badge">
            <span className="hero-story-badge-dot"></span>
            <span>{currentContent.badge}</span>
          </div>

          <h1 className="hero-story-title">
        {renderTextWithBreaks(currentContent.title)}
         </h1>

          <p className="hero-story-text">
        {renderTextWithBreaks(currentContent.description)}
         </p>

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
      </div>
    </section>
  );
};

export default HeroStorySection;