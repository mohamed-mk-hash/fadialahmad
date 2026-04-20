import React, { useRef } from "react";
import "./SuccessStories.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import bg1 from "../../assets/background_stories1.png";
import bg2 from "../../assets/background_stories2.png";

import storyImgOne from "../../assets/succes_story_2.jpg";
import storyImgThree from "../../assets/succes_story_1.jpg";

import storiesIcon from "../../assets/stories_icon.png";
import topLogo from "../../assets/swiper_logo_1.png";

import arrowLeft from "../../assets/arrow_left.png";
import arrowRight from "../../assets/arrow_right.png";

const fallbackStoriesContent = {
  ar: {
    title: "",
    description: "",
    card_title: "",
    number: "",
    description_card: "",
  },
  en: {
    title: "",
    description: "",
    card_title: "",
    number: "",
    description_card: "",
  },
};

const SuccessStories = ({ lang = "en", content = fallbackStoriesContent }) => {
  const swiperRef = useRef(null);

  const currentContent = content?.[lang] || content?.en || fallbackStoriesContent.en;

  const storiesData = [
    {
      id: 1,
      bg: storyImgOne,
      type: "image",
      title: currentContent.card_title,
      badge: currentContent.number,
      quote: currentContent.description_card,
    },
    {
      id: 2,
      bg: bg2,
      type: "pattern",
      title: currentContent.card_title,
      badge: currentContent.number,
      quote: currentContent.description_card,
    },
    {
      id: 3,
      bg: storyImgThree,
      type: "image",
      title: currentContent.card_title,
      badge: currentContent.number,
      quote: currentContent.description_card,
    },
    {
      id: 4,
      bg: bg1,
      type: "pattern",
      title: currentContent.card_title,
      badge: currentContent.number,
      quote: currentContent.description_card,
    },
  ];

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (swiper.isEnd) {
      swiper.slideTo(0, 800);
    } else {
      swiper.slideNext(800);
    }
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    if (!swiper) return;

    if (swiper.isBeginning) {
      swiper.slideTo(storiesData.length - 1, 800);
    } else {
      swiper.slidePrev(800);
    }
  };

  return (
    <section
      className="success-stories-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="success-stories-container">
        <img src={topLogo} alt="" className="success-top-logo" />

        <h2 className="success-stories-title">{currentContent.title}</h2>

        <p className="success-stories-subtitle">{currentContent.description}</p>

        <div className="success-stories-slider-wrapper">
          <Swiper
            dir="ltr"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={false}
            speed={800}
            slidesPerGroup={1}
            grabCursor={true}
            allowTouchMove={true}
            watchOverflow={false}
            breakpoints={{
              0: {
                slidesPerView: 1.08,
                spaceBetween: 16,
              },
              576: {
                slidesPerView: 1.35,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2.1,
                spaceBetween: 22,
              },
              1100: {
                slidesPerView: 3.15,
                spaceBetween: 24,
              },
              1400: {
                slidesPerView: 3.45,
                spaceBetween: 24,
              },
            }}
            className="success-stories-swiper"
          >
            {storiesData.map((story) => (
              <SwiperSlide key={story.id}>
                <div className="success-slide-inner">
                  <div
                    className={`success-story-card ${story.type === "image" ? "is-image-card" : "is-pattern-card"}`}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  >
                    <img
                      src={story.bg}
                      alt={story.title || "Success story"}
                      className="success-story-bg-image"
                    />

                    <div className="success-story-overlay"></div>

                    <div className="success-story-header">
                      <img
                        src={storiesIcon}
                        alt="Story icon"
                        className="success-story-icon"
                      />
                      <h3>{story.title}</h3>
                    </div>

                    <div className="success-story-content">
                      <span className="success-story-badge">{story.badge}</span>
                      <p className="success-story-quote">{story.quote}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="success-stories-arrows">
          <button
            className="success-arrow-btn"
            aria-label={lang === "ar" ? "السابق" : "Previous"}
            type="button"
            onClick={handlePrev}
          >
            <img src={arrowLeft} alt={lang === "ar" ? "السابق" : "Previous"} />
          </button>

          <button
            className="success-arrow-btn"
            aria-label={lang === "ar" ? "التالي" : "Next"}
            type="button"
            onClick={handleNext}
          >
            <img src={arrowRight} alt={lang === "ar" ? "التالي" : "Next"} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;