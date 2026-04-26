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

const defaultSiteContent = {
  header: {
    ar: {
      language_button: "العربية",
      menu_one: "",
      menu_two: "",
      menu_three: "",
      menu_four: "",
      menu_five: "",
      menu_six: "",
      menu_seven: "",
      menu_eight: "",
      menu_nine: "",
    },
    en: {
      language_button: "English",
      menu_one: "",
      menu_two: "",
      menu_three: "",
      menu_four: "",
      menu_five: "",
      menu_six: "",
      menu_seven: "",
      menu_eight: "",
      menu_nine: "",
    },
  },
  footer: {
    ar: {
      menu_one: "",
      menu_two: "",
      menu_three: "",
      menu_four: "",
      menu_five: "",
      menu_six: "",
      menu_seven: "",
      menu_description: "",
      menu_bottom_one: "",
      menu_bottom_two: "",
      menu_bottom_three: "",
    },
    en: {
      menu_one: "",
      menu_two: "",
      menu_three: "",
      menu_four: "",
      menu_five: "",
      menu_six: "",
      menu_seven: "",
      menu_description: "",
      menu_bottom_one: "",
      menu_bottom_two: "",
      menu_bottom_three: "",
    },
  },
  hero: {
    ar: {
      badge: "",
      title: "",
      description: "",
      primaryButtonText: "",
      secondaryButtonText: "",
      primaryButtonLink: "",
      secondaryButtonLink: "",
      stat_one: "مشروع مكتمل",
      stat_two: "مشروع مكتمل",
    },
    en: {
      badge: "",
      title: "",
      description: "",
      primaryButtonText: "",
      secondaryButtonText: "",
      primaryButtonLink: "",
      secondaryButtonLink: "",
      stat_one: "Projects completed",
      stat_two: "Projects completed",
    },
  },
  about: {
    ar: {},
    en: {},
  },
  industrial: {
    ar: {},
    en: {},
  },
  businessShowcase: {
    ar: {
      badge: "",
      title: "",
      description: "",
      button_text: "",
    },
    en: {
      badge: "",
      title: "",
      description: "",
      button_text: "",
    },
  },
  areas: {
    ar: {},
    en: {},
  },
  stories: {
    ar: {},
    en: {},
  },
  storySection: {
    ar: {
      title: "",
      description: "",
    },
    en: {
      title: "",
      description: "",
    },
  },
  articles: {
    ar: {
      title: "",
      description: "",
    },
    en: {
      title: "",
      description: "",
    },
  },
  experience: {
    ar: {},
    en: {},
  },
  gallery: {
    ar: {},
    en: {},
  },
  contact: {
    ar: {},
    en: {},
  },
  faq: {
    ar: {
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
    },
    en: {
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
    },
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
  { key: "experience", collection: "siteContent", docId: "0EwrKivcpkYHFidugM5j" },
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

function serializeSiteDoc(data, fallback = {}) {
  return {
    ...fallback,
    ...data,
  };
}

function serializeTimestamp(value) {
  return value?.toDate ? value.toDate().toISOString() : null;
}

function serializePost(docItem) {
  const data = docItem.data();

  return {
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

    ar: {
      ...defaultPostLanguageContent,
      ...(data.ar || {}),
    },

    en: {
      ...defaultPostLanguageContent,
      ...(data.en || {}),
    },
  };
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