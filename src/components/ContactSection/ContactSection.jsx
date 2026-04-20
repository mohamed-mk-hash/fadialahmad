import React from "react";
import "./ContactSection.css";

import contactImage from "../../assets/contact_image.jpg";

import emailIcon from "../../assets/email_Icon.png";
import socialMediaIcon from "../../assets/social-media_Icon.png";
import locationIcon from "../../assets/locaion_icon.png";
import phoneIcon from "../../assets/phone_Icon.png";

import twitterIcon from "../../assets/twitter.png";
import linkedinIcon from "../../assets/linkedin.png";
import facebookIcon from "../../assets/facebook.png";
import youtubeIcon from "../../assets/YOUTUBE.png";

const fallbackContactContent = {
  ar: {
    title: "",
    description: "",
    first_name_input: "",
    last_name_input: "",
    Email_input: "",
    Email_placeholder: "",
    number_input: "",
    message_input: "",
    "message-placeholder": "",
    checkbox_text: "",
    button_text: "",
    email_title: "",
    email_description: "",
    social_media_title: "",
    social_media_description: "",
    office_title: "",
    office_description: "",
    office: "",
    phone_title: "",
    "phone-description": "",
  },
  en: {
    title: "",
    description: "",
    first_name_input: "",
    last_name_input: "",
    Email_input: "",
    Email_placeholder: "",
    number_input: "",
    message_input: "",
    "message-placeholder": "",
    checkbox_text: "",
    button_text: "",
    email_title: "",
    email_description: "",
    social_media_title: "",
    social_media_description: "",
    office_title: "",
    office_description: "",
    office: "",
    phone_title: "",
    "phone-description": "",
  },
};

const ContactSection = ({ lang = "en", content = fallbackContactContent }) => {
  const currentContent = content?.[lang] || content?.en || fallbackContactContent.en;

  return (
    <section className="contact-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="contact-container">
        <div className="contact-left">
          <h2 className="contact-title">{currentContent.title}</h2>

          <p className="contact-subtitle">{currentContent.description}</p>

          <form className="contact-form">
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="firstName">{currentContent.first_name_input}</label>
                <input
                  type="text"
                  id="firstName"
                  placeholder={currentContent.first_name_input}
                />
              </div>

              <div className="contact-field">
                <label htmlFor="lastName">{currentContent.last_name_input}</label>
                <input
                  type="text"
                  id="lastName"
                  placeholder={currentContent.last_name_input}
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="email">{currentContent.Email_input}</label>
              <input
                type="email"
                id="email"
                placeholder={currentContent.Email_placeholder}
              />
            </div>

            <div className="contact-field">
              <label htmlFor="phone">{currentContent.phone_title}</label>
              <div className="contact-phone-input">
                <span className="contact-country-code">US ▾</span>
                <input
                  type="text"
                  id="phone"
                  placeholder={currentContent.number_input}
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="message">{currentContent.message_input}</label>
              <textarea
                id="message"
                rows="6"
                placeholder={currentContent["message-placeholder"]}
              ></textarea>
            </div>

            <label className="contact-checkbox">
              <input type="checkbox" />
              <span>{currentContent.checkbox_text}</span>
            </label>

            <button type="submit" className="contact-submit-btn">
              {currentContent.button_text}
            </button>
          </form>
        </div>

        <div className="contact-right">
          <div className="contact-info-grid">
            <div className="contact-info-card">
              <img
                src={emailIcon}
                alt="Email icon"
                className="contact-info-icon"
              />
              <h3>{currentContent.email_title}</h3>
              <p>{currentContent.email_description}</p>
              <a href="mailto:fadialahmad@gmail.com">fadialahmad@gmail.com</a>
            </div>

            <div className="contact-info-card">
              <img
                src={socialMediaIcon}
                alt="Social media icon"
                className="contact-info-icon"
              />
              <h3>{currentContent.social_media_title}</h3>
              <p>{currentContent.social_media_description}</p>

              <div className="contact-social-links">
                <a href="/" aria-label="Twitter">
                  <img src={twitterIcon} alt="Twitter" />
                </a>
                <a href="/" aria-label="LinkedIn">
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
                <a href="/" aria-label="Facebook">
                  <img src={facebookIcon} alt="Facebook" />
                </a>
                <a href="/" aria-label="YouTube">
                  <img src={youtubeIcon} alt="YouTube" />
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <img
                src={locationIcon}
                alt="Location icon"
                className="contact-info-icon"
              />
              <h3>{currentContent.office_title}</h3>
              <p>{currentContent.office_description}</p>
              <a href="/">{currentContent.office}</a>
            </div>

            <div className="contact-info-card">
              <img
                src={phoneIcon}
                alt="Phone icon"
                className="contact-info-icon"
              />
              <h3>{currentContent.phone_title}</h3>
              <p>{currentContent["phone-description"]}</p>
              <a href="tel:+15550000000">{currentContent.number_input}</a>
            </div>
          </div>

          <div className="contact-image-box">
            <img src={contactImage} alt="Contact" className="contact-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;