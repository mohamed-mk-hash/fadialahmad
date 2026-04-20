import React, { useEffect, useState } from "react";
import "./SinglePost.css";
import { useParams } from "react-router-dom";
import LatestWritings from "../../components/LatestWritings/LatestWritings";
import profileimage from '../../assets/About_me_center.png'

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

  if (conclusionIndex === -1) {
    return wrapper.innerHTML;
  }

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

function SinglePostPage({ lang = "en" }) {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]); // needed for LatestWritings
  const [siteContent, setSiteContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // ✅ FETCH FROM JSON FILES
        const [postsRes, contentRes] = await Promise.all([
          fetch("/data/posts.json"),
          fetch("/data/siteContent.json"),
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

  // ✅ FIXED DATE (string instead of Firestore timestamp)
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
    if (isNaN(date)) return "";

    return new Intl.DateTimeFormat(lang === "ar" ? "ar-DZ" : "en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="single-post-page">
        <section className="post-hero">
          <p className="post-date">Loading...</p>
          <h1 className="post-title">Loading...</h1>
          <p className="post-subtitle">Loading...</p>
        </section>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="single-post-page">
        <section className="post-hero">
          <p className="post-date">
            {lang === "ar" ? "المقال غير موجود" : "Post not found"}
          </p>
        </section>
      </div>
    );
  }

  const localized = post[lang] || post.en || post.ar || {};
  const processedBottomHtml = transformBottomHtml(localized.contentBottomHtml || "");

  return (
    <>
      <div className="single-post-page" dir={lang === "ar" ? "rtl" : "ltr"}>
        <section className="post-hero">
          <p className="post-date">
            {post.publishedAt
              ? `${lang === "ar" ? "نشر" : "Published"} ${formatDate(post.publishedAt)}`
              : ""}
          </p>

          <h1 className="post-title">{localized.title || ""}</h1>
          <p className="post-subtitle">{localized.subtitle || ""}</p>

          <div className="post-image-wrapper">
            <img
              src={post.featuredImageUrl || ""}
              alt={localized.title || "Post image"}
              className="post-image"
            />
          </div>
        </section>

        <section className="post-content">
          <div
            className="post-rich-content"
            dangerouslySetInnerHTML={{
              __html: localized.contentTopHtml || "",
            }}
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
            dangerouslySetInnerHTML={{
              __html: processedBottomHtml,
            }}
          />

          <div className="post-author">
            <div className="author-info">
              <img src={profileimage} alt="Author" />
              <div>
                <p className="author-name">
                  {post.createdBy || "Fadi Al Ahmad"}
                </p>
                <p className="author-role">
                  {lang === "ar" ? "كاتب المقال" : "Post author"}
                </p>
              </div>
            </div>

            <div className="author-actions">
              <button
                className="copy-btn"
                onClick={() =>
                  navigator.clipboard.writeText(window.location.href)
                }
              >
                {lang === "ar" ? "نسخ الرابط" : "Copy link"}
              </button>

              <div className="socials">
                <span>f</span>
                <span>t</span>
                <span>in</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="divider"></div>

      {/* ✅ PASS DATA TO LatestWritings */}
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