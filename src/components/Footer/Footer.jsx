import React from "react";
import "./Footer.css";

import footerLogo from "../../assets/footer_logo.png";

import twitterIcon from "../../assets/twitter.png";
import linkedinIcon from "../../assets/linkedin.png";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";

const fallbackFooterContent = {
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
};

const Footer = ({ lang = "en", content = fallbackFooterContent }) => {
  const currentContent =
    content?.[lang] || content?.en || fallbackFooterContent.en;

  return (
    <footer
      className="footer-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="footer-container">
        <div className="footer-logo-wrapper">
          <img
            src={footerLogo}
            alt="Fadi Alahmad logo"
            className="footer-logo"
          />
        </div>

        <nav className="footer-nav">
          <a href="#home">{currentContent.menu_one}</a>
          <a href="#biography">{currentContent.menu_two}</a>
          <a href="#areas-of-experts">{currentContent.menu_three}</a>
          <a href="#investment">{currentContent.menu_four}</a>
          <a href="#success-stories">{currentContent.menu_five}</a>
          <a href="#articles">{currentContent.menu_six}</a>
          <a href="#gallery">{currentContent.menu_seven}</a>
        </nav>

        <div className="footer-social-links">
  <a
    href="https://x.com/fadi_alahmad5"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
    className="footer-social-link"
  >
    <img src={twitterIcon} alt="Twitter" />
  </a>

  <a
    href="https://www.linkedin.com/in/fadialahmad"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="footer-social-link"
  >
    <img src={linkedinIcon} alt="LinkedIn" />
  </a>

  <a
    href="https://www.facebook.com/fadialahmd/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
    className="footer-social-link"
  >
    <img src={facebookIcon} alt="Facebook" />
  </a>

  <a
    href="https://www.instagram.com/fadialahmad5"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="footer-social-link footer-social-link-instagram"
  >
    <img src={instagramIcon} alt="Instagram" />
  </a>
</div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copy">{currentContent.menu_description}</p>

          <div className="footer-links">
            <a href="#terms">{currentContent.menu_bottom_one}</a>
            <a href="#privacy">{currentContent.menu_bottom_two}</a>
            <a href="#cookies">{currentContent.menu_bottom_three}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;