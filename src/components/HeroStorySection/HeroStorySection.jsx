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

const HeroStorySection = ({
  lang = "en",
  heroContent = fallbackHeroContent,
}) => {
  const [animateContent, setAnimateContent] = useState(false);

  const currentContent =
    heroContent?.[lang] || heroContent?.en || fallbackHeroContent.en;

  const heroStats =
    lang === "ar"
      ? [
          {
            number: "+25",
            label: currentContent.stat_one || "سنة من الخبرة",
          },
          {
            number: "+50",
            label: currentContent.stat_two || "دولة حول العالم",
          },
          {
            number: "+28",
            label: currentContent.stat_three || "مشروع وشركة",
          },
        ]
      : [
          {
            number: "+25",
            label: currentContent.stat_one || "Years of experience",
          },
          {
            number: "+50",
            label: currentContent.stat_two || "Countries worldwide",
          },
          {
            number: "+28",
            label: currentContent.stat_three || "Projects & companies",
          },
        ];

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

        <div
  className={`hero-story-highlight ${
    animateContent ? "content-switch" : ""
  }`}
>
  <div className="hero-story-highlight-card">
    <span className="hero-story-highlight-label">
      {lang === "ar" ? "من حلب إلى العالم" : "From Aleppo to the world"}
    </span>

    <p>
      {lang === "ar"
        ? "رحلة صناعية بدأت من مدينة تحمل إرث النسيج، وامتدت إلى الصين والخليج وأوروبا لبناء حضور عالمي قائم على الجودة والثقة."
        : "An industrial journey that began in a city shaped by textile heritage, then expanded to China, the Gulf, and Europe through quality and trust."}
    </p>
  </div>
</div>
      </div>
    </section>
  );
};

export default HeroStorySection;