import React from "react";
import "./AreasOfExpertise.css";

import image1 from "../../assets/expertise_image_1.jpg";
import image2 from "../../assets/expertise_image_2.jpg";
import image3 from "../../assets/expertise_image_3.png";

const fallbackExpertiseContent = {
  ar: {
    title: "",
    title_one: "",
    description_one: "",
    title_two: "",
    description_two: "",
    title_three: "",
    description_three: "",
    title_four: "",
    description_four: "",
  },
  en: {
    title: "",
    title_one: "",
    description_one: "",
    title_two: "",
    description_two: "",
    title_three: "",
    description_three: "",
    title_four: "",
    description_four: "",
  },
};

const AreasOfExpertise = ({ lang = "en", content = fallbackExpertiseContent }) => {
  const currentContent = content?.[lang] || content?.en || fallbackExpertiseContent.en;

  return (
    <section
      className="expertise-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="expertise-wrapper">
        <h2 className="expertise-title">{currentContent.title}</h2>

        <div className="expertise-content">
          <div className="expertise-left">
            <div className="expertise-shape-box"></div>

            <div className="expertise-texts">
              <div className="expertise-item">
                <h3>{currentContent.title_one}</h3>
                <p>{currentContent.description_one}</p>
              </div>

              <div className="expertise-item">
                <h3>{currentContent.title_two}</h3>
                <p>{currentContent.description_two}</p>
              </div>

              <div className="expertise-item">
                <h3>{currentContent.title_three}</h3>
                <p>{currentContent.description_three}</p>
              </div>

              <div className="expertise-item">
                <h3>{currentContent.title_four}</h3>
                <p>{currentContent.description_four}</p>
              </div>
            </div>
          </div>

          <div className="expertise-right">
            <div className="expertise-top-images">
              <img
                src={image1}
                alt="Expertise 1"
                className="expertise-img top-img"
              />
              <img
                src={image2}
                alt="Expertise 2"
                className="expertise-img top-img"
              />
            </div>

            <div className="expertise-bottom-image">
              <img
                src={image3}
                alt="Expertise 3"
                className="expertise-img bottom-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreasOfExpertise;