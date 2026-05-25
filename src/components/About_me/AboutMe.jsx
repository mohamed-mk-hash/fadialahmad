import React from "react";
import "./AboutMe.css";
import aboutCenter from "../../assets/About_me_center.png";

const fallbackAboutContent = {
  ar: {
    title: "",
    description: "",
    experience_number: "",
    experience_title: "",
    foundation_number: "",
    foundation_title: "",
    third_number: "",
    third_title: "",
    image_description: "",
    button_text: "",
    button_link: "",
  },
  en: {
    title: "",
    description: "",
    experience_number: "",
    experience_title: "",
    foundation_number: "",
    foundation_title: "",
    third_number: "",
    third_title: "",
    image_description: "",
    button_text: "",
    button_link: "",
  },
};

const AboutMe = ({ lang = "en", content = fallbackAboutContent }) => {
  const currentContent =
    content?.[lang] || content?.en || fallbackAboutContent.en;

  const aboutButtonText =
    currentContent.button_text || (lang === "ar" ? "السيرة الذاتية" : "Biography");

  const aboutButtonLink = currentContent.button_link || "#biography";

  return (
    <section className="about-me-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="about-me-container">
        <div className="about-me-left">
          <h2 className="about-me-title">{currentContent.title}</h2>

          <p className="about-me-text">{currentContent.description}</p>

          <a
  href={aboutButtonLink}
  className="about-me-button"
  target="_blank"
  rel="noopener noreferrer"
>
  {aboutButtonText}
</a>
        </div>

        <div className="about-me-center">
          <img
            src={aboutCenter}
            alt="About me center"
            className="about-me-center-image"
          />

          <div className="about-me-image-overlay">
            <p className="about-me-overlay-text">
              {currentContent.image_description}
            </p>
          </div>
        </div>

        <div className="about-me-right">
          <div className="about-stat">
            <h3>{currentContent.experience_number}</h3>
            <p>{currentContent.experience_title}</p>
          </div>

          <div className="about-stat">
            <h3>{currentContent.foundation_number}</h3>
            <p>{currentContent.foundation_title}</p>
          </div>

          <div className="about-stat">
            <h3>{currentContent.third_number}</h3>
            <p>{currentContent.third_title}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;