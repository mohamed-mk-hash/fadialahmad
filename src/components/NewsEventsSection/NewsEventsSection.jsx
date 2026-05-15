import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NewsEventsSection.css";

const fallbackSectionText = {
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
  zh: {
    eyebrow: "最新",
    title: "新闻、活动与会议",
    description: "最新的行业新闻、采访、活动、技术与专业动态。",
    button: "查看所有文章",
    category: "新闻",
    fallbackTag: "领导力",
    readSuffix: "分钟阅读",
    loading: "加载中...",
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

const formatDate = (dateString, currentLang) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  return new Intl.DateTimeFormat(getLocale(currentLang), {
    month: "long",
    year: "numeric",
  }).format(date);
};

const getSortDate = (item) => {
  return new Date(item.createdAt || item.publishedAt || 0).getTime();
};

const getLocalizedPost = (item, currentLang) => {
  const currentLanguageContent = item?.[currentLang] || {};
  const englishContent = item?.en || {};
  const arabicContent = item?.ar || {};

  return {
    title:
      currentLanguageContent.title ||
      englishContent.title ||
      arabicContent.title ||
      "",
    subtitle:
      currentLanguageContent.subtitle ||
      englishContent.subtitle ||
      arabicContent.subtitle ||
      "",
    excerpt:
      currentLanguageContent.excerpt ||
      englishContent.excerpt ||
      arabicContent.excerpt ||
      "",
    locationText:
      currentLanguageContent.locationText ||
      englishContent.locationText ||
      arabicContent.locationText ||
      "",
  };
};

const getFirstTag = (item, currentLang, fallbackTag) => {
  const localizedTags = item?.[currentLang]?.tags;
  const globalTags = item?.tags;

  if (Array.isArray(localizedTags) && localizedTags.length > 0) {
    return localizedTags[0];
  }

  if (Array.isArray(globalTags) && globalTags.length > 0) {
    return globalTags[0];
  }

  return fallbackTag;
};

const mergeSectionText = (fallbackData, firebaseData) => {
  return {
    ...fallbackData,
    ...(firebaseData || {}),
  };
};

export default function NewsEventsSection({ lang = "en" }) {
  const [newsPosts, setNewsPosts] = useState([]);
  const [sectionContent, setSectionContent] = useState(fallbackSectionText);
  const [loading, setLoading] = useState(true);

  const direction = getDirection(lang);

  const t = mergeSectionText(
    fallbackSectionText[lang] || fallbackSectionText.en,
    sectionContent?.[lang] || sectionContent?.en || sectionContent?.ar
  );

  useEffect(() => {
    const fetchNewsEventsContent = async () => {
      try {
        const response = await fetch("/data/siteContent.json", {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to load siteContent.json");
        }

        const siteContentData = await response.json();

        setSectionContent(
          siteContentData?.newsEventsMeetings || fallbackSectionText
        );
      } catch (error) {
        console.error("Error loading news events section content:", error);
        setSectionContent(fallbackSectionText);
      }
    };

    const fetchNewsPosts = async () => {
      try {
        const response = await fetch("/data/posts.json", {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to load posts.json");
        }

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
      }
    };

    const fetchSectionData = async () => {
      try {
        setLoading(true);

        await Promise.all([fetchNewsEventsContent(), fetchNewsPosts()]);
      } finally {
        setLoading(false);
      }
    };

    fetchSectionData();
  }, []);

  return (
    <section className="news-events-section" dir={direction}>
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
              const localizedPost = getLocalizedPost(item, lang);
              const firstTag = getFirstTag(item, lang, t.fallbackTag);

              const readTime = Number(item.readTime || 0);
              const finalReadTime = readTime > 0 ? readTime : 8;

              const metaText =
                localizedPost.locationText ||
                formatDate(item.publishedAt || item.createdAt, lang);

              return (
                <article className="news-card" key={item.id} dir={direction}>
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
                        {finalReadTime} {t.readSuffix}
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