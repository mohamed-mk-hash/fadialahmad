import React, { useMemo, useRef } from "react";
import "./SuccessStories.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import storiesIcon from "../../assets/stories_icon.png";
import topLogo from "../../assets/swiper_logo_1.png";

import arrowLeft from "../../assets/arrow_left.png";
import arrowRight from "../../assets/arrow_right.png";

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
  const swiperRef = useRef(null);

  const currentContent =
    content?.[lang] || content?.en || fallbackStoriesContent.en;

  const storiesData = useMemo(() => {
    return normalizeItems(currentContent.items);
  }, [currentContent.items]);

  const handleNext = () => {
    const swiper = swiperRef.current;
    if (!swiper || storiesData.length === 0) return;

    if (swiper.isEnd) {
      swiper.slideTo(0, 800);
    } else {
      swiper.slideNext(800);
    }
  };

  const handlePrev = () => {
    const swiper = swiperRef.current;
    if (!swiper || storiesData.length === 0) return;

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

        <p className="success-stories-subtitle">
          {currentContent.description}
        </p>

        {storiesData.length > 0 && (
          <>
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
                            <p className="success-story-quote">
                              {story.quote}
                            </p>
                          )}
                        </div>
                      </article>
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
                <img
                  src={arrowLeft}
                  alt={lang === "ar" ? "السابق" : "Previous"}
                />
              </button>

              <button
                className="success-arrow-btn"
                aria-label={lang === "ar" ? "التالي" : "Next"}
                type="button"
                onClick={handleNext}
              >
                <img
                  src={arrowRight}
                  alt={lang === "ar" ? "التالي" : "Next"}
                />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default SuccessStories;