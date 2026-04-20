import React, { useEffect, useState } from "react";
import "./ExperienceSection.css";

const defaultExperienceData = {
  ar: {
    badge: "",
    title: "",
    description: "",
    items: [],
  },
  en: {
    badge: "",
    title: "",
    description: "",
    items: [],
  },
};

const ExperienceSection = ({
  lang = "en",
  content = defaultExperienceData,
}) => {
  const [animateContent, setAnimateContent] = useState(false);

  const currentContent =
    content?.[lang] || content?.en || defaultExperienceData.en;

  useEffect(() => {
    setAnimateContent(true);
    const timer = setTimeout(() => {
      setAnimateContent(false);
    }, 450);

    return () => clearTimeout(timer);
  }, [lang]);

  const experienceItems = Array.isArray(currentContent.items)
    ? currentContent.items.filter(
        (item) =>
          item &&
          (item.company ||
            item.role ||
            item.period ||
            item.description ||
            (Array.isArray(item.tags) && item.tags.length > 0))
      )
    : [];

  return (
    <section
      className={`experience-section ${lang === "ar" ? "arabic-experience" : ""}`}
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="experience-container">
        <div className={`experience-top ${animateContent ? "content-switch" : ""}`}>
          <div className="experience-top-left">
            <span className="experience-badge">{currentContent.badge}</span>

            <h2 className="experience-title">{currentContent.title}</h2>
          </div>

          <div className="experience-top-right">
            <p className="experience-intro">{currentContent.description}</p>
          </div>
        </div>

        <div className="experience-list">
          {experienceItems.length > 0 ? (
            experienceItems.map((item, index) => (
              <div className="experience-row" key={index}>
                <div className="experience-col experience-col-company">
                  <h3 className="experience-company">{item.company || ""}</h3>
                  <p className="experience-role">{item.role || ""}</p>
                  <p className="experience-period">{item.period || ""}</p>
                </div>

                <div className="experience-col experience-col-description">
                  <p className="experience-description">{item.description || ""}</p>
                </div>

                <div className="experience-col experience-col-tags">
                  <div className="experience-tags">
                    {(Array.isArray(item.tags) ? item.tags : [])
                      .filter(Boolean)
                      .map((tag, tagIndex) => (
                        <span className="experience-tag" key={tagIndex}>
                          {tag}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="experience-row">
              <div className="experience-col" style={{ width: "100%" }}>
                <p className="experience-description">
                  {lang === "ar" ? "لا توجد عناصر حالياً" : "No items available yet"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;