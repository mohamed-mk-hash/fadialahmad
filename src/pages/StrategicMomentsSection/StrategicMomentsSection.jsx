import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StrategicMomentsSection.css";

import moment1 from "../../assets/moments_bottom_1.jpg";
import moment2 from "../../assets/moments_bottom_2.jpg";
import moment3 from "../../assets/moments_bottom_3.jpg";
import moment4 from "../../assets/moments_bottom_4.jpg";
import moment5 from "../../assets/moments_bottom_5.jpg";
import moment6 from "../../assets/moments_bottom_6.jpg";
import ContactSection from "../../components/ContactSection/ContactSection";

const topMoments = [moment1, moment2, moment3, moment4, moment5, moment6];

const pageText = {
  en: {
    heroTitle: "News, Events &\nStrategic Meetings",
    heroText:
      "Staying actively engaged across global markets through strategic meetings, industry events, and investment forums that shape partnerships and drive business growth.",
    exploreAll: "Explore all",
    downloadCv: "Cv",

    recentTitle: "The Recent activity",
    recentSubtitle:
      "A curated overview of the latest engagements, events, and professional milestones, showcasing ongoing involvement in strategic initiatives, partnerships, and industry-focused activities.",
    publishedOn: "Published on",

    tabs: {
      all: "View all",
      event: "Events",
      media: "Meetings",
      news: "News",
      article: "Articles",
      interview: "Interviews",
    },

    sortMostRecent: "Most recent",
    sortOldest: "Oldest",
    sortAZ: "A to Z",

    previous: "Previous",
    next: "Next",
    minRead: "min read",
    loading: "Loading...",
    noPosts: "No posts found.",
  },

  ar: {
    heroTitle: "الأخبار، الفعاليات\nوالاجتماعات الاستراتيجية",
    heroText:
      "متابعة مستمرة للأسواق العالمية من خلال الاجتماعات الاستراتيجية، والفعاليات الصناعية، والمنتديات الاستثمارية التي تصنع الشراكات وتدعم نمو الأعمال.",
    exploreAll: "استكشف الكل",
    downloadCv: "السيرة",

    recentTitle: "أحدث النشاطات",
    recentSubtitle:
      "نظرة مختصرة على أحدث المشاركات والفعاليات والمحطات المهنية، مع إبراز الحضور المستمر في المبادرات الاستراتيجية والشراكات والأنشطة الصناعية.",
    publishedOn: "نُشر في",

    tabs: {
      all: "عرض الكل",
      event: "الفعاليات",
      media: "المرئيات",
      news: "الأخبار",
      article: "المقالات",
      interview: "المقابلات",
    },

    sortMostRecent: "الأحدث",
    sortOldest: "الأقدم",
    sortAZ: "أبجديًا",

    previous: "السابق",
    next: "التالي",
    minRead: "دقائق قراءة",
    loading: "جارٍ التحميل...",
    noPosts: "لا توجد منشورات.",
  },

  zh: {
    heroTitle: "新闻、活动与\n战略会议",
    heroText:
      "通过战略会议、行业活动和投资论坛，持续参与全球市场，推动合作伙伴关系并促进业务增长。",
    exploreAll: "查看全部",
    downloadCv: "简历",

    recentTitle: "最新动态",
    recentSubtitle:
      "精选展示最新参与活动、行业事件和职业里程碑，体现对战略倡议、合作伙伴关系和行业活动的持续参与。",
    publishedOn: "发布于",

    tabs: {
      all: "查看全部",
      event: "活动",
      media: "会议",
      news: "新闻",
      article: "文章",
      interview: "采访",
    },

    sortMostRecent: "最新",
    sortOldest: "最早",
    sortAZ: "A 到 Z",

    previous: "上一页",
    next: "下一页",
    minRead: "分钟阅读",
    loading: "加载中...",
    noPosts: "暂无文章。",
  },
};

const categoryClass = {
  news: "news",
  event: "event",
  article: "article",
  media: "meeting",
  interview: "meeting",
};

function getDirection(currentLang) {
  return currentLang === "ar" ? "rtl" : "ltr";
}

function getLocale(currentLang) {
  if (currentLang === "ar") return "ar-DZ";
  if (currentLang === "zh") return "zh-CN";
  return "en-GB";
}

function formatDate(dateString, lang) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(getLocale(lang), {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getSortDate(post) {
  return new Date(post.createdAt || post.publishedAt || 0).getTime();
}

function getLocalizedPost(post, lang) {
  return post?.[lang] || post?.en || post?.ar || post?.zh || {};
}

function getFirstTag(post, lang, fallbackTag = "Leadership") {
  const localizedTags = post?.[lang]?.tags;
  const globalTags = post?.tags;

  if (Array.isArray(localizedTags) && localizedTags.length > 0) {
    return localizedTags[0];
  }

  if (Array.isArray(globalTags) && globalTags.length > 0) {
    return globalTags[0];
  }

  return fallbackTag;
}

function getCategoryLabel(category, t, lang) {
  if (lang === "ar") {
    if (category === "news") return "خبر";
    if (category === "event") return "فعالية";
    if (category === "article") return "مقال";
    if (category === "interview") return "مقابلة";
    if (category === "media") return "مرئي";
    return category;
  }

  if (lang === "zh") {
    if (category === "news") return "新闻";
    if (category === "event") return "活动";
    if (category === "article") return "文章";
    if (category === "interview") return "采访";
    if (category === "media") return "会议";
    return category;
  }

  if (category === "news") return "News";
  if (category === "event") return "Event";
  if (category === "article") return "Article";
  if (category === "interview") return "Interview";
  if (category === "media") return "Meeting";

  return category;
}

function ListingCard({ post, lang, t }) {
  const localizedPost = getLocalizedPost(post, lang);
  const firstTag = getFirstTag(
    post,
    lang,
    lang === "zh" ? "领导力" : lang === "ar" ? "قيادة" : "Leadership"
  );

  const category = post.category || "article";
  const cardTypeClass = categoryClass[category] || "article";

  return (
    <article className="listing-card" dir={getDirection(lang)}>
      <Link
        to={`/posts/${post.slug}`}
        className="listing-card-image-wrap"
        onClick={() => window.scrollTo(0, 0)}
      >
        {post.featuredImageUrl ? (
          <img
            src={post.featuredImageUrl}
            alt={localizedPost.title || ""}
            className="listing-card-image"
          />
        ) : (
          <div className="listing-card-image-placeholder" />
        )}
      </Link>

      <div className={`listing-card-type ${cardTypeClass}`}>
        <span className="listing-card-type-icon">✦</span>
        <span>{getCategoryLabel(category, t, lang)}</span>
      </div>

      <div className="listing-card-pills">
        <span className="listing-pill">{firstTag}</span>
        <span className="listing-pill-text">
          {Number(post.readTime || 0) || 8} {t.minRead}
        </span>
      </div>

      <Link
        to={`/posts/${post.slug}`}
        className="listing-card-title-row"
        onClick={() => window.scrollTo(0, 0)}
      >
        <h3 className="listing-card-title">{localizedPost.title}</h3>
        <span className="listing-card-arrow">{lang === "ar" ? "↖" : "↗"}</span>
      </Link>

      <p className="listing-card-description">
        {localizedPost.excerpt || localizedPost.subtitle}
      </p>

      <div className="listing-card-meta">
        {localizedPost.locationText || formatDate(post.publishedAt, lang)}
      </div>
    </article>
  );
}

export default function StrategicMomentsSection({
  lang = "en",
  contactContent = {},
}) {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortMode, setSortMode] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const t = pageText[lang] || pageText.en;
  const direction = getDirection(lang);
  const postsPerPage = 6;

  const scrollToPosts = () => {
    const section = document.getElementById("all-posts-section");
    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const goToBiography = () => {
    sessionStorage.setItem("scrollToSection", "biography");
    navigate("/");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/data/posts.json", {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to load posts.json");
        }

        const data = await response.json();

        const publishedPosts = data.filter(
          (post) => post.status === "published"
        );

        setPosts(publishedPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (activeCategory !== "all") {
      result = result.filter((post) => post.category === activeCategory);
    }

    if (sortMode === "recent") {
      result.sort((a, b) => getSortDate(b) - getSortDate(a));
    }

    if (sortMode === "oldest") {
      result.sort((a, b) => getSortDate(a) - getSortDate(b));
    }

    if (sortMode === "az") {
      result.sort((a, b) => {
        const aTitle = (
          a[lang]?.title ||
          a.en?.title ||
          a.ar?.title ||
          a.zh?.title ||
          ""
        ).toLowerCase();

        const bTitle = (
          b[lang]?.title ||
          b.en?.title ||
          b.ar?.title ||
          b.zh?.title ||
          ""
        ).toLowerCase();

        return aTitle.localeCompare(bTitle);
      });
    }

    return result;
  }, [posts, activeCategory, sortMode, lang]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * postsPerPage;
    return filteredPosts.slice(start, start + postsPerPage);
  }, [filteredPosts, currentPage]);

  const recentPost = filteredPosts[0];
  const recentLocalized = getLocalizedPost(recentPost, lang);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (value) => {
    setSortMode(value);
    setCurrentPage(1);
  };

  return (
    <section className="strategic-moments-section" dir={direction}>
      <div className="strategic-moments-wrapper">
        <div className="strategic-hero">
          <div className="strategic-hero-left">
            <h2 className="strategic-hero-title">
              {t.heroTitle.split("\n").map((line) => (
                <React.Fragment key={line}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </h2>

            <p className="strategic-hero-text">{t.heroText}</p>

            <div className="strategic-hero-actions">
              <button
                className="strategic-btn strategic-btn-primary"
                type="button"
                onClick={scrollToPosts}
              >
                {t.exploreAll}
              </button>

              <button
                className="strategic-btn strategic-btn-outline"
                type="button"
                onClick={goToBiography}
              >
                {t.downloadCv}
              </button>
            </div>
          </div>

          <div className="strategic-hero-right">
            <div className="strategic-image-grid">
              {topMoments.map((image, index) => (
                <div className="strategic-image-card" key={index}>
                  <img
                    src={image}
                    alt={`Strategic moment ${index + 1}`}
                    className="strategic-image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {recentPost && (
          <div className="recent-activity">
            <div className="recent-activity-header">
              <h3 className="recent-activity-title">{t.recentTitle}</h3>
              <p className="recent-activity-subtitle">{t.recentSubtitle}</p>
            </div>

            <div className="recent-activity-content">
              <Link
                to={`/posts/${recentPost.slug}`}
                className="recent-activity-image-wrap"
                onClick={() => window.scrollTo(0, 0)}
              >
                {recentPost.featuredImageUrl ? (
                  <img
                    src={recentPost.featuredImageUrl}
                    alt={recentLocalized.title || ""}
                    className="recent-activity-image"
                  />
                ) : (
                  <div className="recent-activity-image-placeholder" />
                )}
              </Link>

              <div className="recent-activity-card">
                <div
                  className={`recent-activity-category ${
                    categoryClass[recentPost.category] || "article"
                  }`}
                >
                  <span className="recent-activity-category-icon">✦</span>
                  <span>{getCategoryLabel(recentPost.category, t, lang)}</span>
                </div>

                <div className="recent-activity-pills">
                  <span className="recent-pill-tag">
                    {getFirstTag(
                      recentPost,
                      lang,
                      lang === "zh"
                        ? "领导力"
                        : lang === "ar"
                        ? "قيادة"
                        : "Leadership"
                    )}
                  </span>
                  <span className="recent-pill-text">
                    {Number(recentPost.readTime || 0) || 8} {t.minRead}
                  </span>
                </div>

                <div className="recent-activity-date">
                  {t.publishedOn} {formatDate(recentPost.publishedAt, lang)}
                </div>

                <Link
                  to={`/posts/${recentPost.slug}`}
                  className="recent-activity-link"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {recentLocalized.title}
                </Link>

                <p className="recent-activity-description">
                  {recentLocalized.excerpt || recentLocalized.subtitle}
                </p>

                <div className="recent-activity-meta">
                  {recentLocalized.locationText}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="news-listing-block" id="all-posts-section">
          <div className="news-listing-toolbar">
            <div className="news-listing-tabs">
              {[
                ["all", t.tabs.all],
                ["event", t.tabs.event],
                ["media", t.tabs.media],
                ["news", t.tabs.news],
                ["article", t.tabs.article],
                ["interview", t.tabs.interview],
              ].map(([key, label]) => (
                <button
                  key={key}
                  className={`listing-tab ${
                    activeCategory === key ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => handleCategoryChange(key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="news-listing-filter">
              <select
                className="listing-select"
                value={sortMode}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="recent">{t.sortMostRecent}</option>
                <option value="oldest">{t.sortOldest}</option>
                <option value="az">{t.sortAZ}</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="news-listing-message">{t.loading}</p>
          ) : paginatedPosts.length === 0 ? (
            <p className="news-listing-message">{t.noPosts}</p>
          ) : (
            <div className="news-listing-grid">
              {paginatedPosts.map((post) => (
                <ListingCard key={post.id} post={post} lang={lang} t={t} />
              ))}
            </div>
          )}

          {filteredPosts.length > postsPerPage && (
            <div className="news-listing-pagination">
              <button
                className="listing-page-nav"
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
              >
                {lang === "ar" ? "→" : "←"} {t.previous}
              </button>

              <div className="listing-page-numbers">
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      className={`page-number ${
                        currentPage === pageNumber ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                className="listing-page-nav"
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => Math.min(page + 1, totalPages))
                }
              >
                {t.next} {lang === "ar" ? "←" : "→"}
              </button>
            </div>
          )}
        </div>
      </div>

      <ContactSection lang={lang} content={contactContent} />
    </section>
  );
}