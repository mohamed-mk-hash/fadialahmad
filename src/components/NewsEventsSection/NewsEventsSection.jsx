import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NewsEventsSection.css";

const sectionText = {
  ar: {
    eyebrow: "الأحدث",
    title: "الأخبار، الفعاليات والاجتماعات",
    description:
      "أحدث الأخبار واللقاءات والفعاليات المهنية، مع تغطية موجزة لأبرز المشاركات والتحديثات.",
    button: "عرض كل المنشورات",
    category: "خبر",
    fallbackTag: "قيادة",
    readSuffix: "دقائق قراءة",
    loading: "جارٍ التحميل...",
  },
  en: {
    eyebrow: "Latest",
    title: "News, Events & Meetings",
    description:
      "The latest industry news, interviews, events, technologies, and professional updates.",
    button: "View all posts",
    category: "News",
    fallbackTag: "Leadership",
    readSuffix: "min read",
    loading: "Loading...",
  },
};

const formatDate = (dateString, currentLang) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  return new Intl.DateTimeFormat(currentLang === "ar" ? "ar-DZ" : "en-GB", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const getSortDate = (item) => {
  return new Date(item.createdAt || item.publishedAt || 0).getTime();
};

export default function NewsEventsSection({ lang = "en" }) {
  const [newsPosts, setNewsPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const t = sectionText[lang] || sectionText.en;

  useEffect(() => {
    const fetchNewsPosts = async () => {
      try {
        const response = await fetch("/data/posts.json");
        const postsData = await response.json();

        const latestNews = postsData
          .filter(
            (item) => item.status === "published" && item.category === "news"
          )
          .sort((a, b) => getSortDate(b) - getSortDate(a))
          .slice(0, 2);

        setNewsPosts(latestNews);
      } catch (error) {
        console.error("Error loading latest news:", error);
        setNewsPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsPosts();
  }, []);

  return (
    <section
      className="news-events-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="news-events-container">
        <div className="news-events-left">
          <span className="news-events-eyebrow">{t.eyebrow}</span>

          <h2 className="news-events-title">{t.title}</h2>

          <p className="news-events-description">{t.description}</p>

          <Link
            to="/strategicmoments"
            className="news-events-button"
            onClick={() => window.scrollTo(0, 0)}
          >
            {t.button}
          </Link>
        </div>

        <div className="news-events-right">
          {loading ? (
            <p className="news-events-loading">{t.loading}</p>
          ) : (
            newsPosts.map((item) => {
              const localizedPost = item[lang] || item.en || item.ar || {};
              const firstTag = Array.isArray(item.tags) && item.tags.length > 0
                ? item.tags[0]
                : t.fallbackTag;

              const readTime = Number(item.readTime || 0);
              const metaText =
                localizedPost.locationText ||
                formatDate(item.publishedAt || item.createdAt, lang);

              return (
                <article
                  className="news-card"
                  key={item.id}
                  dir={lang === "ar" ? "rtl" : "ltr"}
                >
                  <Link
                    to={`/posts/${item.slug}`}
                    className="news-card-image-wrapper"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    {item.featuredImageUrl ? (
                      <img
                        src={item.featuredImageUrl}
                        alt={localizedPost.title || ""}
                        className="news-card-image"
                      />
                    ) : (
                      <div className="news-card-image-placeholder" />
                    )}
                  </Link>

                  <div className="news-card-content">
                    <div className="news-card-category">
                      <span className="news-card-category-icon">✦</span>
                      <span>{t.category}</span>
                    </div>

                    <div className="news-card-pills">
                      <span className="news-pill-tag">{firstTag}</span>
                      <span className="news-pill-text">
                        {readTime > 0
                          ? `${readTime} ${t.readSuffix}`
                          : `8 ${t.readSuffix}`}
                      </span>
                    </div>

                    <Link
                      to={`/posts/${item.slug}`}
                      className="news-card-title-row"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <h3 className="news-card-title">
                        {localizedPost.title}
                      </h3>
                      <span className="news-card-arrow">
                        {lang === "ar" ? "↖" : "↗"}
                      </span>
                    </Link>

                    <p className="news-card-text">
                      {localizedPost.excerpt || localizedPost.subtitle}
                    </p>

                    <div className="news-card-meta">{metaText}</div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}