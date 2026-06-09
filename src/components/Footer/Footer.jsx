import React, { useEffect, useState } from "react";
import "./Footer.css";

import footerLogo from "../../assets/footer_logo.png";

import twitterIcon from "../../assets/twitter.png";
import linkedinIcon from "../../assets/linkedin.png";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

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
  },
};

const fallbackFormContent = {
  ar: {
    Email_placeholder: "",
    email_description: "",
    number_input: "",
  },
  en: {
    Email_placeholder: "",
    email_description: "",
    number_input: "",
  },
};

const Footer = ({ lang = "en", content = fallbackFooterContent }) => {
  const [formContent, setFormContent] = useState(fallbackFormContent);

  const currentContent =
    content?.[lang] || content?.en || fallbackFooterContent.en;

  const currentFormContent =
    formContent?.[lang] || formContent?.en || fallbackFormContent.en;

  const email =
    currentFormContent.Email_placeholder ||
    currentFormContent.email_description ||
    "";

  const phone = currentFormContent.number_input || "";

  const cleanPhone = phone.replace(/\s/g, "");

  useEffect(() => {
    const fetchFormContent = async () => {
      try {
        const formRef = doc(db, "siteContent", "form");
        const formSnap = await getDoc(formRef);

        if (formSnap.exists()) {
          setFormContent(formSnap.data());
        }
      } catch (error) {
        console.error("Error fetching footer form content:", error);
      }
    };

    fetchFormContent();
  }, []);

  return (
    <footer className="footer-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <img
              src={footerLogo}
              alt="Fadi Alahmad logo"
              className="footer-logo"
            />
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">
              {lang === "ar" ? "روابط مهمة" : "Useful links"}
            </h3>

            <nav className="footer-nav">
              <a href="#home">{currentContent.menu_one}</a>
              <a href="#biography">{currentContent.menu_two}</a>
              <a href="#areas-of-experts">{currentContent.menu_three}</a>
              <a href="#investment">{currentContent.menu_four}</a>
              <a href="#success-stories">{currentContent.menu_five}</a>
              <a href="#articles">{currentContent.menu_six}</a>
              <a href="#gallery">{currentContent.menu_seven}</a>
            </nav>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">
              {lang === "ar" ? "تواصل معنا" : "Contact Us"}
            </h3>

            <div className="footer-contact">

              {email && (
                <div className="footer-contact-item">
                  <span className="footer-contact-label">
                    {lang === "ar" ? "البريد الإلكتروني" : "Email"}
                  </span>

                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              )}
            </div>
          </div>

          <div className="footer-column">
            <h3 className="footer-column-title">
              {lang === "ar" ? "تابعنا" : "Social"}
            </h3>

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
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copy">{currentContent.menu_description}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;