import React, { useState } from "react";
import "./FaqSection.css";

import faqLogo from "../../assets/questions_logo.png";

const fallbackFaqContent = {
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
};

const FaqSection = ({ lang = "en", content = fallbackFaqContent }) => {
  const [openId, setOpenId] = useState(2);

  const currentContent = content?.[lang] || content?.en || fallbackFaqContent.en;

  const faqData = [
    {
      id: 1,
      question: currentContent.question_one,
      answer: currentContent.answer_one,
    },
    {
      id: 2,
      question: currentContent.question_two,
      answer: currentContent.answer_two,
    },
    {
      id: 3,
      question: currentContent.question_three,
      answer: currentContent.answer_three,
    },
    {
      id: 4,
      question: currentContent.question_four,
      answer: currentContent.answer_four,
    },
    {
      id: 5,
      question: currentContent.question_five,
      answer: currentContent.answer_five,
    },
  ];

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      className="faq-section"
      dir={lang === "ar" ? "rtl" : "ltr"}
    >
      <div className="faq-container">
        <div className="faq-left">
          <h2 className="faq-title">{currentContent.title}</h2>

          <p className="faq-description">{currentContent.description}</p>

          <button className="faq-button" type="button">
            {currentContent.button_text} <span>→</span>
          </button>
        </div>

        <div className="faq-right">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`faq-item ${isOpen ? "active" : ""}`}
              >
                <button
                  className="faq-question"
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <span className="faq-icon">{isOpen ? "×" : "+"}</span>
                </button>

                <div className={`faq-answer-wrapper ${isOpen ? "open" : ""}`}>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;