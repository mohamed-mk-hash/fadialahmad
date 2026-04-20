import React from "react";
import "./MomentsMilestones.css";

import top1 from "../../assets/moments_top_1.jpg";
import top2 from "../../assets/moments_top_2.jpg";
import top3 from "../../assets/moments_top_3.jpg";
import top4 from "../../assets/moments_top_4.jpg";
import top5 from "../../assets/moments_top_5.jpg";

import bottom1 from "../../assets/moments_bottom_1.jpg";
import bottom2 from "../../assets/moments_bottom_2.jpg";
import bottom3 from "../../assets/moments_bottom_3.jpg";
import bottom4 from "../../assets/moments_bottom_4.jpg";
import bottom5 from "../../assets/moments_bottom_5.jpg";
import bottom6 from "../../assets/moments_bottom_6.jpg";

const topImages = [top1, top2, top3, top4, top5];
const bottomImages = [bottom1, bottom2, bottom3, bottom4, bottom5, bottom6];

const fallbackMomentsContent = {
  ar: {
    title: "",
    description: "",
  },
  en: {
    title: "",
    description: "",
  },
};

const MomentsMilestones = ({
  lang = "en",
  content = fallbackMomentsContent,
}) => {
  const currentContent =
    content?.[lang] || content?.en || fallbackMomentsContent.en;

  return (
    <section
      className="moments-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="moments-container">
        <div className="moments-header">
          <h2 className="moments-title">{currentContent.title}</h2>

          <p className="moments-description">
            {currentContent.description}
          </p>
        </div>

        <div className="moments-gallery">
          <div className="moments-row moments-row-top">
            {topImages.map((image, index) => (
              <div className="moments-card top-card" key={index}>
                <img
                  src={image}
                  alt={`Moment top ${index + 1}`}
                  className="moments-image"
                />
              </div>
            ))}
          </div>

          <div className="moments-row moments-row-bottom">
            {bottomImages.map((image, index) => (
              <div className="moments-card bottom-card" key={index}>
                <img
                  src={image}
                  alt={`Moment bottom ${index + 1}`}
                  className="moments-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MomentsMilestones;