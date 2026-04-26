import React, { useEffect, useRef, useState } from "react";
import "./LatestWritings.css";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import arrowLeft from "../../assets/arrow_left.png";
import arrowRight from "../../assets/arrow_right.png";

const LatestWritings = ({ lang = "en" }) => {
  const swiperRef = useRef(null);

  const [latestWritingsContent, setLatestWritingsContent] = useState({
    ar: {
      title: "",
      description: "",
    },
    en: {
      title: "",
      description: "",
    },
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentContent =
    latestWritingsContent[lang] || latestWritingsContent.en;

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

    return new Intl.DateTimeFormat(
      currentLang === "ar" ? "ar-DZ" : "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    ).format(date);
  };

  useEffect(() => {
    const fetchLatestWritingsData = async () => {
      try {
        const [contentRes, postsRes] = await Promise.all([
          fetch("/data/siteContent.json"),
          fetch("/data/posts.json"),
        ]);

        const contentData = await contentRes.json();
        const postsData = await postsRes.json();

        setLatestWritingsContent({
          ar: contentData.articles?.ar || { title: "", description: "" },
          en: contentData.articles?.en || { title: "", description: "" },
        });

        const filteredPosts = postsData
          .filter(
            (item) =>
              item.status === "published" && item.category === "article"
          )
          .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
          .slice(0, 8);

        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error loading JSON data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestWritingsData();
  }, []);

  return (
    <section
      className="latest-writings-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="latest-writings-container">
        <h2 className="latest-writings-title">
          {loading ? "Loading..." : currentContent.title}
        </h2>

        <p className="latest-writings-subtitle">
          {loading ? "Loading..." : currentContent.description}
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
              const localizedPost = item[lang] || item.en;

              return (
                <SwiperSlide key={item.id}>
                  <article
                    className="writing-card"
                    dir={lang === "ar" ? "rtl" : "ltr"}
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
                        <span>{lang === "ar" ? "مقال" : "Article"}</span>
                        <span className="writing-dot">•</span>
                        <span>{formatDate(item.publishedAt, lang)}</span>
                      </p>

                      <div className="writing-card-title-row">
                        <h3 className="writing-card-title">
                          {localizedPost.title}
                        </h3>

                        <Link
                          to={`/posts/${item.slug}`}
                          className="writing-card-arrow-link"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          <span className="writing-card-arrow">↗</span>
                        </Link>
                      </div>

                      <p className="writing-card-description">
                        {localizedPost.subtitle}
                      </p>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="latest-writings-arrows">
          <button
            className="latest-arrow-btn"
            aria-label={lang === "ar" ? "السابق" : "Previous"}
            type="button"
            onClick={handlePrev}
          >
            <img src={arrowLeft} alt="" />
          </button>

          <button
            className="latest-arrow-btn"
            aria-label={lang === "ar" ? "التالي" : "Next"}
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