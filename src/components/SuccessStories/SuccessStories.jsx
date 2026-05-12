import React, { useMemo } from "react";
import "./SuccessStories.css";

import storiesIcon from "../../assets/stories_icon.png";

const fallbackStoriesContent = {
  ar: {
    title: "",
    description: "",
    items: [],
  },
  en: {
    title: "",
    description: "",
    items: [],
  },
};

const normalizeItems = (items = []) => {
  if (!Array.isArray(items)) return [];

  return items
    .map((item, index) => ({
      id: `${index}-${item.card_title || item.number || "story"}`,
      title: item.card_title || "",
      badge: item.number || "",
      quote: item.description_card || "",
      image: item.imageLink || "",
    }))
    .filter((item) => item.title || item.badge || item.quote || item.image);
};

const SuccessStories = ({ lang = "en", content = fallbackStoriesContent }) => {
  const currentContent =
    content?.[lang] || content?.en || fallbackStoriesContent.en;

  const storiesData = useMemo(() => {
    return normalizeItems(currentContent.items);
  }, [currentContent.items]);

  const marqueeStories = useMemo(() => {
    return [...storiesData, ...storiesData];
  }, [storiesData]);

  return (
    <section
      className="success-stories-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="success-stories-container">

        <h2 className="success-stories-title">{currentContent.title}</h2>

        <p className="success-stories-subtitle">
          {currentContent.description}
        </p>

        {marqueeStories.length > 0 && (
          <div className="success-stories-slider-wrapper">
            <div className="success-stories-track">
              {marqueeStories.map((story, index) => (
                <div className="success-story-marquee-item" key={`${story.id}-${index}`}>
                  <article
                    className="success-story-card"
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    {story.image && (
                      <img
                        src={story.image}
                        alt={story.title || "Success story"}
                        className="success-story-bg-image"
                      />
                    )}

                    <div className="success-story-dark-layer"></div>

                    <div className="success-story-header">
                      <span className="success-story-icon-wrap">
                        <img
                          src={storiesIcon}
                          alt=""
                          className="success-story-icon"
                        />
                      </span>

                      <h3>{story.title}</h3>
                    </div>

                    <div className="success-story-content">
                      {story.badge && (
                        <span className="success-story-badge">
                          {story.badge}
                        </span>
                      )}

                      {story.quote && (
                        <p className="success-story-quote">{story.quote}</p>
                      )}
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;