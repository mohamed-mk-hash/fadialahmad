import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

import logo from "../../assets/logo.png";
import earth from "../../assets/earth.png";
import sun from "../../assets/sun.png";
import moon from "../../assets/moon.png";
import menu from "../../assets/menu.png";

const fallbackHeaderContent = {
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
    menu_ten: "",
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
    menu_ten: "",
  },
  zh: {
    language_button: "中文",
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
  },
};

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
  { code: "zh", label: "中文" },
];

const Header = ({
  lang = "en",
  theme = "light",
  onThemeToggle,
  onLightTheme,
  onDarkTheme,
  onLanguageToggle,
  onLanguageChange,
  content = fallbackHeaderContent,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const isLight = theme === "light";

  const currentContent =
    content?.[lang] || content?.en || fallbackHeaderContent.en;

  const closeMenu = () => setMenuOpen(false);

  const handleLanguageSelect = (newLang) => {
    setLanguageOpen(false);

    if (onLanguageChange) {
      onLanguageChange(newLang);
      return;
    }

    if (onLanguageToggle) {
      onLanguageToggle(newLang);
    }
  };

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    closeMenu();

    const isHomePage = location.pathname === "/";

    if (!isHomePage) {
      sessionStorage.setItem("scrollToSection", sectionId);
      navigate("/");
      return;
    }

    const section = document.getElementById(sectionId);
    const header = document.querySelector(".header");

    if (!section) return;

    const headerHeight = header ? header.offsetHeight : 0;
    const sectionTop =
      section.getBoundingClientRect().top + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });

    window.history.pushState(null, "", `#${sectionId}`);
  };

  const menuItems = [
    { label: currentContent.menu_one, id: "home" },
    { label: currentContent.menu_two, id: "biography" },
    { label: currentContent.menu_three, id: "areas" },
    { label: currentContent.menu_four, id: "story-section" },
    { label: currentContent.menu_five, id: "stories" },
    { label: currentContent.menu_six, id: "articles" },
    { label: currentContent.menu_seven, id: "gallery" },
    { label: currentContent.menu_ten, id: "news-events" },
    { label: currentContent.menu_nine, id: "faq" },
  ];

  const languageDropdown = (
    <div className="language-dropdown">
      <button
        type="button"
        className="language-box"
        onClick={() => setLanguageOpen((prev) => !prev)}
        aria-label={lang === "ar" ? "تغيير اللغة" : "Change language"}
      >
        <img src={earth} alt="Language" className="icon-img" />
        <span className="language-text">{currentContent.language_button}</span>
        <span className="language-arrow">▾</span>
      </button>

      {languageOpen && (
        <div className="language-menu">
          {languages.map((language) => (
            <button
              key={language.code}
              type="button"
              className={`language-option ${
                lang === language.code ? "active" : ""
              }`}
              onClick={() => handleLanguageSelect(language.code)}
            >
              {language.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="header" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="header__container">
        <button
          className="header__menu-btn"
          onClick={() => setMenuOpen(true)}
          aria-label={lang === "ar" ? "فتح القائمة" : "Open menu"}
        >
          <img src={menu} alt="Menu" className="header__menu-icon" />
        </button>

        <div className="header__left">
          <a href="/#home" onClick={(e) => scrollToSection(e, "home")}>
            <img src={logo} alt="Logo" className="header__logo" />
          </a>
        </div>

        <nav className="header__nav">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__right">
          <a
            href="/#contact"
            className="contact-btn"
            onClick={(e) => scrollToSection(e, "contact")}
          >
            {currentContent.menu_eight}
          </a>

          {languageDropdown}

          <div className="theme-box">
            <button
              type="button"
              className={`theme-btn ${isLight ? "active" : ""}`}
              aria-label="Light mode"
              onClick={onLightTheme}
            >
              <img src={sun} alt="Sun" className="icon-img" />
            </button>

            <button
              type="button"
              className={`theme-btn ${!isLight ? "active" : ""}`}
              aria-label="Dark mode"
              onClick={onDarkTheme}
            >
              <img src={moon} alt="Moon" className="icon-img" />
            </button>
          </div>
        </div>

        <div className="header__mobile-center">
          {languageDropdown}

          <div className="theme-box mobile-header-theme">
            <button
              type="button"
              className={`theme-btn ${isLight ? "active" : ""}`}
              aria-label="Light mode"
              onClick={onLightTheme}
            >
              <img src={sun} alt="Sun" className="icon-img" />
            </button>

            <button
              type="button"
              className={`theme-btn ${!isLight ? "active" : ""}`}
              aria-label="Dark mode"
              onClick={onDarkTheme}
            >
              <img src={moon} alt="Moon" className="icon-img" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`}
        onClick={closeMenu}
      />

      <aside className={`mobile-drawer ${menuOpen ? "active" : ""}`}>
        <div className="mobile-drawer__top">
          <button
            className="mobile-drawer__close"
            onClick={closeMenu}
            aria-label={lang === "ar" ? "إغلاق القائمة" : "Close menu"}
          >
            ×
          </button>
        </div>

        <nav className="mobile-drawer__nav">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="/#contact"
          className="contact-btn mobile-contact-btn"
          onClick={(e) => scrollToSection(e, "contact")}
        >
          {currentContent.menu_eight}
        </a>
      </aside>
    </header>
  );
};

export default Header;