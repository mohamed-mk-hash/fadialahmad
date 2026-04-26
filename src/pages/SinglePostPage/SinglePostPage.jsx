import React, { useEffect, useMemo, useState } from "react";
import "./SinglePost.css";
import { Link, useParams } from "react-router-dom";
import LatestWritings from "../../components/LatestWritings/LatestWritings";
import profileimage from "../../assets/About_me_center.png";

const pageText = {
  en: {
    loading: "Loading...",
    notFound: "Post not found",
    published: "Published",
    category: "Category",
    readTime: "min read",
    tags: "Tags",
    eventStart: "Event start",
    eventEnd: "Event end",
    source: "Source",
    sourceDate: "Source date",
    videoChannel: "Channel",
    videoDate: "Video date",
    watchVideo: "Watch video",
    copyLink: "Copy link",
    authorRole: "Post author",
    latestTitle: "Latest articles",
    categoryLabels: {
      article: "Article",
      news: "News",
      event: "Event",
      media: "Media",
      interview: "Interview",
    },
  },
  ar: {
    loading: "جارٍ التحميل...",
    notFound: "المنشور غير موجود",
    published: "نُشر في",
    category: "التصنيف",
    readTime: "دقائق قراءة",
    tags: "الوسوم",
    eventStart: "بداية الفعالية",
    eventEnd: "نهاية الفعالية",
    source: "المصدر",
    sourceDate: "تاريخ المصدر",
    videoChannel: "القناة",
    videoDate: "تاريخ الفيديو",
    watchVideo: "مشاهدة الفيديو",
    copyLink: "نسخ الرابط",
    authorRole: "كاتب المنشور",
    latestTitle: "أحدث المقالات",
    categoryLabels: {
      article: "مقال",
      news: "خبر",
      event: "فعالية",
      media: "مرئي",
      interview: "مقابلة",
    },
  },
};

const transformBottomHtml = (html = "") => {
  if (!html || typeof window === "undefined") return html;

  const parser = new DOMParser();
  const doc = parser.parseFromString(`<div id="wrapper">${html}</div>`, "text/html");
  const wrapper = doc.getElementById("wrapper");

  if (!wrapper) return html;

  const nodes = Array.from(wrapper.children);

  const isConclusionHeading = (node) => {
    if (!node) return false;
    const tag = node.tagName?.toLowerCase();
    if (!["h2", "h3", "h4"].includes(tag)) return false;

    const text = (node.textContent || "").trim().toLowerCase();
    return text === "conclusion" || text === "الخاتمة";
  };

  const conclusionIndex = nodes.findIndex(isConclusionHeading);

  if (conclusionIndex === -1) return wrapper.innerHTML;

  const conclusionBox = doc.createElement("div");
  conclusionBox.className = "post-conclusion";

  for (let i = conclusionIndex; i < nodes.length; i += 1) {
    conclusionBox.appendChild(nodes[i].cloneNode(true));
  }

  const newWrapper = doc.createElement("div");

  for (let i = 0; i < conclusionIndex; i += 1) {
    newWrapper.appendChild(nodes[i].cloneNode(true));
  }

  newWrapper.appendChild(conclusionBox);

  return newWrapper.innerHTML;
};

const getYouTubeEmbedUrl = (url = "") => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      const id = parsedUrl.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    if (parsedUrl.hostname.includes("youtube.com")) {
      const id = parsedUrl.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : "";
    }

    return "";
  } catch {
    return "";
  }
};

function SinglePostPage({ lang = "en" }) {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const t = pageText[lang] || pageText.en;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [postsRes, contentRes] = await Promise.all([
          fetch("/data/posts.json", { cache: "no-cache" }),
          fetch("/data/siteContent.json", { cache: "no-cache" }),
        ]);

        const postsData = await postsRes.json();
        const contentData = await contentRes.json();

        setPosts(postsData || []);
        setSiteContent(contentData || null);

        const foundPost = postsData.find((item) => item.slug === slug);
        setPost(foundPost || null);
      } catch (error) {
        console.error("Error loading post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "";

    return new Intl.DateTimeFormat(lang === "ar" ? "ar-DZ" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const localized = post?.[lang] || post?.en || post?.ar || {};
  const category = post?.category || "article";
  const categoryLabel = t.categoryLabels[category] || category;
  const processedBottomHtml = useMemo(
    () => transformBottomHtml(localized.contentBottomHtml || ""),
    [localized.contentBottomHtml]
  );

  const youtubeEmbedUrl = getYouTubeEmbedUrl(post?.videoUrl || "");
  const hasTags = Array.isArray(post?.tags) && post.tags.length > 0;

  if (loading) {
    return (
      <div className="single-post-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <section className="post-hero">
          <p className="post-date">{t.loading}</p>
          <h1 className="post-title">{t.loading}</h1>
          <p className="post-subtitle">{t.loading}</p>
        </section>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="single-post-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <section className="post-hero">
          <p className="post-date">{t.notFound}</p>
        </section>
      </div>
    );
  }

  return (
    <>
      <div className="single-post-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <section className="post-hero">
          <div className={`post-category-badge post-category-${category}`}>
            ✦ {categoryLabel}
          </div>

          <p className="post-date">
            {post.publishedAt ? `${t.published} ${formatDate(post.publishedAt)}` : ""}
          </p>

          <h1 className="post-title">{localized.title || ""}</h1>

          <p className="post-subtitle">
            {localized.subtitle || localized.excerpt || ""}
          </p>

          <div className="post-meta-row">
            {Number(post.readTime || 0) > 0 && (
              <span>
                {post.readTime} {t.readTime}
              </span>
            )}

            {localized.locationText && <span>{localized.locationText}</span>}
          </div>

          {hasTags && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <div className="post-image-wrapper">
            {post.featuredImageUrl ? (
              <img
                src={post.featuredImageUrl}
                alt={localized.title || "Post image"}
                className="post-image"
              />
            ) : null}
          </div>
        </section>

        {(category === "event" || category === "interview" || category === "media") && (
          <section className="post-type-info">
            {category === "event" && (
              <>
                {post.eventDate && (
                  <div className="post-info-card">
                    <strong>{t.eventStart}</strong>
                    <span>{formatDate(post.eventDate)}</span>
                  </div>
                )}

                {post.eventEndDate && (
                  <div className="post-info-card">
                    <strong>{t.eventEnd}</strong>
                    <span>{formatDate(post.eventEndDate)}</span>
                  </div>
                )}
              </>
            )}

            {category === "interview" && (
              <>
                {post.sourceName && (
                  <div className="post-info-card">
                    <strong>{t.source}</strong>
                    {post.sourceUrl ? (
                      <a href={post.sourceUrl} target="_blank" rel="noreferrer">
                        {post.sourceName}
                      </a>
                    ) : (
                      <span>{post.sourceName}</span>
                    )}
                  </div>
                )}

                {post.sourcePublishedAt && (
                  <div className="post-info-card">
                    <strong>{t.sourceDate}</strong>
                    <span>{formatDate(post.sourcePublishedAt)}</span>
                  </div>
                )}
              </>
            )}

            {category === "media" && (
              <>
                {post.videoChannel && (
                  <div className="post-info-card">
                    <strong>{t.videoChannel}</strong>
                    <span>{post.videoChannel}</span>
                  </div>
                )}

                {post.videoPublishedAt && (
                  <div className="post-info-card">
                    <strong>{t.videoDate}</strong>
                    <span>{formatDate(post.videoPublishedAt)}</span>
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {category === "media" && youtubeEmbedUrl && (
          <section className="post-video-section">
            <div className="post-video-wrapper">
              <iframe
                src={youtubeEmbedUrl}
                title={localized.title || "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>
        )}

        <section className="post-content">
          <div
            className="post-rich-content"
            dangerouslySetInnerHTML={{ __html: localized.contentTopHtml || "" }}
          />
        </section>

        <section className="post-extra">
          {post.middleImageUrl ? (
            <div className="post-inner-image large">
              <img
                src={post.middleImageUrl}
                alt={localized.middleImageCaption || localized.title || "Post"}
              />

              {localized.middleImageCaption ? (
                <p className="image-caption">{localized.middleImageCaption}</p>
              ) : null}
            </div>
          ) : null}

          <div
            className="post-rich-content"
            dangerouslySetInnerHTML={{ __html: processedBottomHtml }}
          />

          <div className="post-author">
            <div className="author-info">
              <img src={profileimage} alt="Author" />
              <div>
                <p className="author-name">{post.createdBy || "Fadi Al Ahmad"}</p>
                <p className="author-role">{t.authorRole}</p>
              </div>
            </div>

            <div className="author-actions">
              <button
                className="copy-btn"
                type="button"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                {t.copyLink}
              </button>

              <div className="socials">
                <span>f</span>
                <span>x</span>
                <span>in</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="divider"></div>

      <div className="latestwriting">
        <LatestWritings
          lang={lang}
          content={siteContent?.articles}
          posts={posts}
        />
      </div>
    </>
  );
}

export default SinglePostPage;