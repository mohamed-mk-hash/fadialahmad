import React from "react";
import "./StorySection.css";

const fallbackStoryContent = {
  ar: {
    title: "",
    description: "",
  },
  en: {
    title: "",
    description: "",
  },
};

const StorySection = ({ lang = "en", content = fallbackStoryContent }) => {
  const currentContent =
    content?.[lang] || content?.en || fallbackStoryContent.en;

  // Put your YouTube video ID here
  const youtubeVideoId = "O8CUIW52kQA";

  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&playsinline=1`;

  return (
    <section className="story-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="story-header">
        <h2 className="story-title">{currentContent.title}</h2>
        <p className="story-subtitle">{currentContent.description}</p>
      </div>

      <div className="story-wrapper">
        <div className="story-video-card">
          <div className="story-video-inner">
            <iframe
              className="story-video-iframe"
              src={youtubeEmbedUrl}
              title="Story Video"
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;