import React, { useState } from "react";
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
};

const Header = ({
  lang = "en",
  onLanguageToggle,
  content = fallbackHeaderContent,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLight, setIsLight] = useState(true);
  const [animateLang, setAnimateLang] = useState(false);

  const currentContent =
    content?.[lang] || content?.en || fallbackHeaderContent.en;

  const closeMenu = () => setMenuOpen(false);

  const handleLanguageClick = () => {
    setAnimateLang(true);

    setTimeout(() => {
      if (onLanguageToggle) onLanguageToggle();
    }, 160);

    setTimeout(() => {
      setAnimateLang(false);
    }, 500);
  };

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
          <a href="/#home">
            <img src={logo} alt="Logo" className="header__logo" />
          </a>
        </div>

        <nav className="header__nav">
          <a href="/#home">{currentContent.menu_one}</a>
          <a href="/#biography">{currentContent.menu_two}</a>
          <a href="/#areas">{currentContent.menu_three}</a>
          <a href="/#story-section">{currentContent.menu_four}</a>
          <a href="/#stories">{currentContent.menu_five}</a>
          <a href="/#articles">{currentContent.menu_six}</a>
          <a href="/#gallery">{currentContent.menu_seven}</a>
          <a href="/#faq">{currentContent.menu_nine}</a>
        </nav>

        <div className="header__right">
          <a href="/#contact" className="contact-btn">
            {currentContent.menu_eight}
          </a>

          <button
            type="button"
            className={`language-box ${animateLang ? "switching" : ""}`}
            onClick={handleLanguageClick}
            aria-label={lang === "ar" ? "تغيير اللغة" : "Change language"}
          >
            <img src={earth} alt="Language" className="icon-img" />
            <span className="language-text">
              {currentContent.language_button}
            </span>
          </button>

          <div className="theme-box">
            <button
              className={`theme-btn ${isLight ? "active" : ""}`}
              aria-label="Light mode"
              onClick={() => setIsLight(true)}
            >
              <img src={sun} alt="Sun" className="icon-img" />
            </button>

            <button
              className={`theme-btn ${!isLight ? "active" : ""}`}
              aria-label="Dark mode"
              onClick={() => setIsLight(false)}
            >
              <img src={moon} alt="Moon" className="icon-img" />
            </button>
          </div>
        </div>

        <div className="header__mobile-center">
          <button
            type="button"
            className={`language-box mobile-header-language ${animateLang ? "switching" : ""}`}
            onClick={handleLanguageClick}
            aria-label={lang === "ar" ? "تغيير اللغة" : "Change language"}
          >
            <img src={earth} alt="Language" className="icon-img" />
            <span className="language-text">
              {currentContent.language_button}
            </span>
          </button>

          <div className="theme-box mobile-header-theme">
            <button
              className={`theme-btn ${isLight ? "active" : ""}`}
              aria-label="Light mode"
              onClick={() => setIsLight(true)}
            >
              <img src={sun} alt="Sun" className="icon-img" />
            </button>

            <button
              className={`theme-btn ${!isLight ? "active" : ""}`}
              aria-label="Dark mode"
              onClick={() => setIsLight(false)}
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
          <a href="/#home" onClick={closeMenu}>
            {currentContent.menu_one}
          </a>
          <a href="/#biography" onClick={closeMenu}>
            {currentContent.menu_two}
          </a>
          <a href="/#areas" onClick={closeMenu}>
            {currentContent.menu_three}
          </a>
          <a href="/#investment" onClick={closeMenu}>
            {currentContent.menu_four}
          </a>
          <a href="/#stories" onClick={closeMenu}>
            {currentContent.menu_five}
          </a>
          <a href="/#articles" onClick={closeMenu}>
            {currentContent.menu_six}
          </a>
          <a href="/#gallery" onClick={closeMenu}>
            {currentContent.menu_seven}
          </a>
          <a href="/#faq" onClick={closeMenu}>
            {currentContent.menu_nine}
          </a>
        </nav>

        <a
          href="/#contact"
          className="contact-btn mobile-contact-btn"
          onClick={closeMenu}
        >
          {currentContent.menu_eight}
        </a>
      </aside>
    </header>
  );
};

export default Header;