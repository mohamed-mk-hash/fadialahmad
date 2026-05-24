import React, { useState } from "react";
import "./ContactSection.css";

import contactImage from "../../assets/contact_image.jpg";

import emailIcon from "../../assets/email_Icon.png";
import socialMediaIcon from "../../assets/social-media_Icon.png";
import locationIcon from "../../assets/locaion_icon.png";
import phoneIcon from "../../assets/phone_Icon.png";

import twitterIcon from "../../assets/twitter.png";
import linkedinIcon from "../../assets/linkedin.png";
import facebookIcon from "../../assets/facebook.png";
import youtubeIcon from "../../assets/instagram.png";

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
  const currentContent =
    content?.[lang] || content?.en || fallbackContactContent.en;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    accepted: false,
  });

  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatusMessage("");

    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus("error");
      setStatusMessage(
        lang === "ar"
          ? "يرجى ملء الاسم، البريد الإلكتروني والرسالة."
          : "Please fill first name, email, and message."
      );
      return;
    }

    if (!formData.accepted) {
      setStatus("error");
      setStatusMessage(
        lang === "ar"
          ? "يرجى الموافقة قبل الإرسال."
          : "Please accept before sending."
      );
      return;
    }

    try {
      setStatus("sending");

      const response = await fetch("https://fadialahmad.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      setStatus("success");
      setStatusMessage(
        lang === "ar"
          ? "تم إرسال رسالتك بنجاح ✅"
          : "Your message has been sent successfully ✅"
      );

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        accepted: false,
      });
    } catch (error) {
      console.error("Contact form error:", error);

      setStatus("error");
      setStatusMessage(
        lang === "ar"
          ? "حدث خطأ أثناء إرسال الرسالة. حاول مرة أخرى."
          : "Something went wrong while sending your message."
      );
    }
  };

  return (
    <section className="contact-section" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="contact-container">
        <div className="contact-left">
          <h2 className="contact-title">{currentContent.title}</h2>

          <p className="contact-subtitle">{currentContent.description}</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <div className="contact-field">
                <label htmlFor="firstName">
                  {currentContent.first_name_input}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder={currentContent.first_name_input}
                  required
                />
              </div>

              <div className="contact-field">
                <label htmlFor="lastName">
                  {currentContent.last_name_input}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder={currentContent.last_name_input}
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="email">{currentContent.Email_input}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={currentContent.Email_placeholder}
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="phone">{currentContent.phone_title}</label>
              <div className="contact-phone-input">
                <span className="contact-country-code">DZ ▾</span>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={currentContent.number_input}
                />
              </div>
            </div>

            <div className="contact-field">
              <label htmlFor="message">{currentContent.message_input}</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder={currentContent["message-placeholder"]}
                required
              ></textarea>
            </div>

            <label className="contact-checkbox">
              <input
                type="checkbox"
                name="accepted"
                checked={formData.accepted}
                onChange={handleChange}
                required
              />
              <span>{currentContent.checkbox_text}</span>
            </label>

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? lang === "ar"
                  ? "جارٍ الإرسال..."
                  : "Sending..."
                : currentContent.button_text}
            </button>

            {statusMessage && (
              <p
                className={
                  status === "success"
                    ? "contact-status success"
                    : "contact-status error"
                }
              >
                {statusMessage}
              </p>
            )}
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
  <a
    href="https://x.com/fadi_alahmad5"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Twitter"
  >
    <img src={twitterIcon} alt="Twitter" />
  </a>

  <a
    href="https://www.linkedin.com/in/fadialahmad"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <img src={linkedinIcon} alt="LinkedIn" />
  </a>

  <a
    href="https://www.facebook.com/fadialahmd/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <img src={facebookIcon} alt="Facebook" />
  </a>

  <a
    href="https://www.instagram.com/fadialahmad5"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <img src={youtubeIcon} alt="Instagram" />
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