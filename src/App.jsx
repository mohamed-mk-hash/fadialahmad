import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import SinglePostPage from "./pages/SinglePostPage/SinglePostPage";
import StrategicMomentsSection from "./pages/StrategicMomentsSection/StrategicMomentsSection";

const fallbackSiteContent = {
  header: {},
  footer: {},
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
    zh: {
      badge: "",
      title: "",
      description: "",
      primaryButtonText: "",
      secondaryButtonText: "",
      primaryButtonLink: "",
      secondaryButtonLink: "",
      stat_one: "已完成项目",
      stat_two: "已完成项目",
    },
  },
  about: {},
  industrial: {},
  businessShowcase: {},
  areas: {},
  stories: {},
  storySection: {},
  articles: {},
  experience: {},
  gallery: {},
  contact: {},
  faq: {},
};

function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("siteLang") || "en";
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("siteTheme") || "light";
  });

  const [siteContent, setSiteContent] = useState(fallbackSiteContent);

  const changeLanguage = (newLang) => {
    setLang(newLang);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const setLightTheme = () => {
    setTheme("light");
  };

  const setDarkTheme = () => {
    setTheme("dark");
  };

  useEffect(() => {
    localStorage.setItem("siteLang", lang);

    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    if (lang === "ar") {
      document.body.classList.add("arabic-mode");
    } else {
      document.body.classList.remove("arabic-mode");
    }
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("siteTheme", theme);

    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  useEffect(() => {
    const loadSiteContent = async () => {
      try {
        const response = await fetch("/data/siteContent.json", {
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error("Failed to load siteContent.json");
        }

        const data = await response.json();
        setSiteContent({ ...fallbackSiteContent, ...data });
      } catch (error) {
        console.error("Error loading site content:", error);
      }
    };

    loadSiteContent();
  }, []);

  return (
    <BrowserRouter>
      <div
        className={`app ${lang === "ar" ? "rtl-mode" : "ltr-mode"} ${
          theme === "dark" ? "dark-mode" : "light-mode"
        }`}
      >
        <Header
          lang={lang}
          theme={theme}
          onThemeToggle={toggleTheme}
          onLightTheme={setLightTheme}
          onDarkTheme={setDarkTheme}
          onLanguageChange={changeLanguage}
          content={siteContent.header}
        />

        <Routes>
          <Route
            path="/"
            element={<HomePage lang={lang} siteContent={siteContent} />}
          />

          <Route
            path="/posts/:slug"
            element={<SinglePostPage lang={lang} />}
          />

          <Route
            path="/strategicmoments"
            element={
              <StrategicMomentsSection
                lang={lang}
                contactContent={siteContent.contact}
              />
            }
          />
        </Routes>

        <Footer lang={lang} content={siteContent.footer} />
      </div>
    </BrowserRouter>
  );
}

export default App;