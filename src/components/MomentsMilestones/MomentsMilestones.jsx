import React from "react";
import "./MomentsMilestones.css";

import top1 from "../../assets/moments_top_1.jpg";
import top2 from "../../assets/moments_top_2.jpg";
import top3 from "../../assets/moments_top_3.jpg";
import top4 from "../../assets/moments_top_4.jpg";
import top5 from "../../assets/moments_top_5.jpg";

import bottom1 from "../../assets/about_me_7.jpg";
import bottom5 from "../../assets/moments_bottom_5.jpg";

/* New images used in the biography/about page */
import aboutImageOne from "../../assets/about_me_2.jpg";
import aboutImageFour from "../../assets/about_me_4.jpg";
import aboutImageFive from "../../assets/about_me_5.jpg";

const topImages = [
  { src: top1, className: "" },
  { src: top2, className: "" },
  { src: top3, className: "" },
  { src: top4, className: "" },
  { src: top5, className: "" },
];

const bottomImages = [
  {
    src: bottom1,
    className: "",
  },
  {
    src: aboutImageOne,
    className: "moments-image--focus-about-one",
  },
  {
    src: aboutImageFour,
    className: "moments-image--focus-about-four",
  },
  {
    src: bottom5,
    className: "",
  },
  {
    src: aboutImageFive,
    className: "moments-image--focus-about-five",
  },
];

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
    <section className="moments-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="moments-container">
        <div className="moments-header">
          <h2 className="moments-title">{currentContent.title}</h2>

          <p className="moments-description">{currentContent.description}</p>
        </div>

        <div className="moments-gallery">
          <div className="moments-row moments-row-top">
            {topImages.map((image, index) => (
              <div className="moments-card top-card" key={`top-${index}`}>
                <img
                  src={image.src}
                  alt={`Moment top ${index + 1}`}
                  className={`moments-image ${image.className}`}
                />
              </div>
            ))}
          </div>

          <div className="moments-row moments-row-bottom">
            {bottomImages.map((image, index) => (
              <div className="moments-card bottom-card" key={`bottom-${index}`}>
                <img
                  src={image.src}
                  alt={`Moment bottom ${index + 1}`}
                  className={`moments-image ${image.className}`}
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