import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { initializeApp } from "firebase/app";
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseConfig = {
  apiKey: "AIzaSyBkOFHvs9YcEyWSuXg1XHkHc6vsPIxQJ_o",
  authDomain: "fadialahmad-d625c.firebaseapp.com",
  projectId: "fadialahmad-d625c",
  messagingSenderId: "659291377843",
  appId: "1:659291377843:web:742a137da4116ddfb9e0c6",
  measurementId: "G-B0C68FSYYW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const languages = ["ar", "en", "zh"];

const emptyHeader = {
  language_button: "",
  menu_one: "",
  menu_two: "",
  menu_three: "",
  menu_four: "",
  menu_five: "",
  menu_six: "",
  menu_seven: "",
  menu_eight: "",
  menu_nine: "",
  menu_ten: "",
};

const emptyHero = {
  badge: "",
  title: "",
  description: "",
  primaryButtonText: "",
  secondaryButtonText: "",
  primaryButtonLink: "",
  secondaryButtonLink: "",
  stat_one: "",
  stat_two: "",
};

const emptyBusinessShowcase = {
  badge: "",
  title: "",
  description: "",
  button_text: "",
};

const emptySimpleSection = {
  title: "",
  description: "",
};

const emptyNewsEventsMeetings = {
  eyebrow: "",
  title: "",
  description: "",
  button: "",
  category: "",
  fallbackTag: "",
  readSuffix: "",
  loading: "",
};

const emptyFaq = {
  title: "",
  description: "",
  button_text: "",
  question_one: "",
  answer_one: "",
  question_two: "",
  answer_two: "",
  question_three: "",
  answer_three: "",
  question_four: "",
  answer_four: "",
  question_five: "",
  answer_five: "",
};

const defaultSiteContent = {
  header: {
    ar: {
      ...emptyHeader,
      language_button: "العربية",
    },
    en: {
      ...emptyHeader,
      language_button: "English",
    },
    zh: {
      ...emptyHeader,
      language_button: "中文",
    },
  },

  footer: {
    ar: {},
    en: {},
    zh: {},
  },

  hero: {
    ar: {
      ...emptyHero,
      stat_one: "مشروع مكتمل",
      stat_two: "مشروع مكتمل",
    },
    en: {
      ...emptyHero,
      stat_one: "Projects completed",
      stat_two: "Projects completed",
    },
    zh: {
      ...emptyHero,
      stat_one: "已完成项目",
      stat_two: "已完成项目",
    },
  },

  about: {
    ar: {},
    en: {},
    zh: {},
  },

  industrial: {
    ar: {},
    en: {},
    zh: {},
  },

  businessShowcase: {
    ar: { ...emptyBusinessShowcase },
    en: { ...emptyBusinessShowcase },
    zh: { ...emptyBusinessShowcase },
  },

  areas: {
    ar: {},
    en: {},
    zh: {},
  },

  stories: {
    ar: {},
    en: {},
    zh: {},
  },

  storySection: {
    ar: { ...emptySimpleSection },
    en: { ...emptySimpleSection },
    zh: { ...emptySimpleSection },
  },

  articles: {
    ar: { ...emptySimpleSection },
    en: { ...emptySimpleSection },
    zh: { ...emptySimpleSection },
  },

  newsEventsMeetings: {
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
  },

  experience: {
    ar: {},
    en: {},
    zh: {},
  },

  gallery: {
    ar: {},
    en: {},
    zh: {},
  },

  contact: {
    ar: {},
    en: {},
    zh: {},
  },

  faq: {
    ar: { ...emptyFaq },
    en: { ...emptyFaq },
    zh: { ...emptyFaq },
  },
};

const docsToFetch = [
  { key: "header", collection: "siteContent", docId: "header" },
  { key: "footer", collection: "siteContent", docId: "footer" },
  { key: "hero", collection: "siteContent", docId: "home" },
  { key: "about", collection: "siteContent", docId: "About" },
  { key: "industrial", collection: "siteContent", docId: "Industrial" },
  { key: "businessShowcase", collection: "siteContent", docId: "Al-Nassaj" },
  { key: "areas", collection: "siteContent", docId: "expertise" },
  { key: "stories", collection: "siteContent", docId: "succes_stories" },
  { key: "storySection", collection: "siteContent", docId: "story_video" },
  { key: "articles", collection: "siteContent", docId: "Latest_writings" },
  {
    key: "newsEventsMeetings",
    collection: "siteContent",
    docId: "News_events_meetings",
  },
  {
    key: "experience",
    collection: "siteContent",
    docId: "0EwrKivcpkYHFidugM5j",
  },
  { key: "gallery", collection: "siteContent", docId: "Moments" },
  { key: "contact", collection: "siteContent", docId: "form" },
  { key: "faq", collection: "siteContent", docId: "questions" },
];

const defaultPostLanguageContent = {
  title: "",
  subtitle: "",
  excerpt: "",
  locationText: "",
  seoTitle: "",
  seoDescription: "",
  contentTopHtml: "",
  contentBottomHtml: "",
  middleImageCaption: "",
};

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function mergeDeep(fallback = {}, data = {}) {
  const output = { ...fallback };

  for (const key of Object.keys(data || {})) {
    if (isObject(data[key]) && isObject(output[key])) {
      output[key] = mergeDeep(output[key], data[key]);
    } else {
      output[key] = data[key];
    }
  }

  return output;
}

function normalizeLanguageObject(data = {}, fallback = {}) {
  const normalized = {};

  for (const lang of languages) {
    normalized[lang] = mergeDeep(fallback[lang] || {}, data[lang] || {});
  }

  return {
    ...fallback,
    ...data,
    ...normalized,
  };
}

function serializeSiteDoc(data, fallback = {}) {
  return normalizeLanguageObject(data, fallback);
}

function serializeTimestamp(value) {
  return value?.toDate ? value.toDate().toISOString() : null;
}

function serializePost(docItem) {
  const data = docItem.data();

  const post = {
    id: docItem.id,

    category: data.category || "article",
    slug: data.slug || "",
    status: data.status || "",

    tags: Array.isArray(data.tags) ? data.tags : [],
    readTime: Number(data.readTime || 0),

    featuredImageUrl: data.featuredImageUrl || "",
    featuredImagePublicId: data.featuredImagePublicId || "",

    middleImageUrl: data.middleImageUrl || "",
    middleImagePublicId: data.middleImagePublicId || "",

    gallery: Array.isArray(data.gallery) ? data.gallery : [],

    eventDate: serializeTimestamp(data.eventDate),
    eventEndDate: serializeTimestamp(data.eventEndDate),

    sourceName: data.sourceName || "",
    sourceUrl: data.sourceUrl || "",
    sourcePublishedAt: serializeTimestamp(data.sourcePublishedAt),

    videoUrl: data.videoUrl || "",
    videoPlatform: data.videoPlatform || "",
    videoChannel: data.videoChannel || "",
    videoPublishedAt: serializeTimestamp(data.videoPublishedAt),

    createdBy: data.createdBy || "",
    createdAt: serializeTimestamp(data.createdAt),
    updatedAt: serializeTimestamp(data.updatedAt),
    publishedAt: serializeTimestamp(data.publishedAt),
  };

  for (const lang of languages) {
    post[lang] = {
      ...defaultPostLanguageContent,
      ...(data[lang] || {}),
    };
  }

  return post;
}

async function syncSiteContent() {
  const siteContent = { ...defaultSiteContent };

  for (const item of docsToFetch) {
    try {
      const docRef = doc(db, item.collection, item.docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        siteContent[item.key] = serializeSiteDoc(
          docSnap.data(),
          defaultSiteContent[item.key]
        );

        console.log("[OK] Synced siteContent:", item.key);
      } else {
        console.log(
          "[WARN] Missing document:",
          `${item.collection}/${item.docId}`
        );
      }
    } catch (error) {
      console.error(
        "[ERROR] Failed syncing siteContent:",
        item.key,
        error.message
      );
    }
  }

  return siteContent;
}

async function syncPosts() {
  try {
    const postsRef = collection(db, "posts");
    const postsSnap = await getDocs(postsRef);

    const posts = postsSnap.docs.map(serializePost);

    console.log(`[OK] Synced posts: ${posts.length}`);
    return posts;
  } catch (error) {
    console.error("[ERROR] Failed syncing posts:", error.message);
    return [];
  }
}

async function syncAllContent() {
  try {
    const outputDir = path.join(__dirname, "../public/data");
    const siteContentFile = path.join(outputDir, "siteContent.json");
    const postsFile = path.join(outputDir, "posts.json");

    ensureDir(outputDir);

    const [siteContent, posts] = await Promise.all([
      syncSiteContent(),
      syncPosts(),
    ]);

    fs.writeFileSync(
      siteContentFile,
      JSON.stringify(siteContent, null, 2),
      "utf8"
    );

    fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), "utf8");

    console.log("[DONE] siteContent.json updated successfully.");
    console.log("[PATH]", siteContentFile);

    console.log("[DONE] posts.json updated successfully.");
    console.log("[PATH]", postsFile);
  } catch (error) {
    console.error("[FATAL] sync failed:", error);
    process.exit(1);
  }
}

syncAllContent();