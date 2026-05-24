import React, { useEffect, useRef, useState } from "react";
import "./LatestWritings.css";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import arrowLeft from "../../assets/arrow_left.png";
import arrowRight from "../../assets/arrow_right.png";

const fallbackLatestWritingsContent = {
  ar: {
    title: "",
    description: "",
  },
  en: {
    title: "",
    description: "",
  },
  zh: {
    title: "",
    description: "",
  },
};

const uiText = {
  ar: {
    loading: "جاري التحميل...",
    article: "مقال",
    previous: "السابق",
    next: "التالي",
  },
  en: {
    loading: "Loading...",
    article: "Article",
    previous: "Previous",
    next: "Next",
  },
  zh: {
    loading: "加载中...",
    article: "文章",
    previous: "上一项",
    next: "下一项",
  },
};

const getDirection = (currentLang) => {
  return currentLang === "ar" ? "rtl" : "ltr";
};

const getLocale = (currentLang) => {
  if (currentLang === "ar") return "ar-DZ";
  if (currentLang === "zh") return "zh-CN";
  return "en-GB";
};

const getLocalizedText = (content, currentLang, key) => {
  return (
    content?.[currentLang]?.[key] ||
    content?.en?.[key] ||
    fallbackLatestWritingsContent?.[currentLang]?.[key] ||
    fallbackLatestWritingsContent.en[key] ||
    ""
  );
};

const getLocalizedPost = (item, currentLang) => {
  const currentLanguageContent = item?.[currentLang] || {};
  const englishContent = item?.en || {};

  return {
    title: currentLanguageContent.title || englishContent.title || "",
    subtitle: currentLanguageContent.subtitle || englishContent.subtitle || "",
    excerpt: currentLanguageContent.excerpt || englishContent.excerpt || "",
  };
};

const LatestWritings = ({
  lang = "en",
  content = fallbackLatestWritingsContent,
}) => {
  const swiperRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUiText = uiText[lang] || uiText.en;

  const currentContent = {
    title: getLocalizedText(content, lang, "title"),
    description: getLocalizedText(content, lang, "description"),
  };

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
      swiper.slideTo(Math.max(posts.length - 1, 0), 800);
    } else {
      swiper.slidePrev(800);
    }
  };

  const formatDate = (dateString, currentLang) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date)) return "";

    return new Intl.DateTimeFormat(getLocale(currentLang), {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchLatestWritingsPosts = async () => {
      try {
        const postsRes = await fetch("/data/posts.json", {
          cache: "no-cache",
        });

        if (!postsRes.ok) {
          throw new Error("Failed to load posts.json");
        }

        const postsData = await postsRes.json();

        const filteredPosts = postsData
          .filter(
            (item) =>
              item.status === "published" && item.category === "article"
          )
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
          .slice(0, 8);

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error loading latest writings posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestWritingsPosts();
  }, []);

  return (
    <section
      className="latest-writings-section"
      dir={getDirection(lang)}
    >
      <div className="latest-writings-container">
        <h2 className="latest-writings-title">
          {currentContent.title || (loading ? currentUiText.loading : "")}
        </h2>

        <p className="latest-writings-subtitle">
          {currentContent.description ||
            (loading ? currentUiText.loading : "")}
        </p>

        <div className="latest-writings-slider-wrapper">
          <Swiper
            dir="ltr"
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            loop={false}
            speed={800}
            spaceBetween={30}
            slidesPerGroup={1}
            grabCursor={true}
            allowTouchMove={true}
            watchOverflow={false}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              576: {
                slidesPerView: 1.15,
                spaceBetween: 18,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 22,
              },
              1100: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1400: {
                slidesPerView: 3.25,
                spaceBetween: 32,
              },
            }}
            className="latest-writings-swiper"
          >
            {posts.map((item) => {
              const localizedPost = getLocalizedPost(item, lang);

              return (
                <SwiperSlide key={item.id}>
                  <Link
                    to={`/posts/${item.slug}`}
                    className="writing-card-link"
                    onClick={scrollToTop}
                    aria-label={localizedPost.title}
                  >
                    <article
                      className="writing-card"
                      dir={getDirection(lang)}
                    >
                      <div className="writing-card-image-box">
                        <img
                          src={item.featuredImageUrl}
                          alt={localizedPost.title}
                          className="writing-card-image"
                        />
                      </div>

                      <div className="writing-card-content">
                        <p className="writing-card-meta">
                          <span>{currentUiText.article}</span>
                          <span className="writing-dot">•</span>
                          <span>{formatDate(item.publishedAt, lang)}</span>
                        </p>

                        <div className="writing-card-title-row">
                          <h3 className="writing-card-title">
                            {localizedPost.title}
                          </h3>

                          <span
                            className="writing-card-arrow-link"
                            aria-hidden="true"
                          >
                            <span className="writing-card-arrow">↗</span>
                          </span>
                        </div>

                        <p className="writing-card-description">
                          {localizedPost.subtitle}
                        </p>
                      </div>
                    </article>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="latest-writings-arrows">
          <button
            className="latest-arrow-btn"
            aria-label={currentUiText.previous}
            type="button"
            onClick={handlePrev}
          >
            <img src={arrowLeft} alt="" />
          </button>

          <button
            className="latest-arrow-btn"
            aria-label={currentUiText.next}
            type="button"
            onClick={handleNext}
          >
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestWritings;