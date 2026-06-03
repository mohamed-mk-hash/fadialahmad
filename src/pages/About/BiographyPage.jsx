import React, { useEffect, useMemo } from "react";
import "./BiographyPage.css";

import siteContent from "../../../public/data/siteContent.json";

import aboutImageOne from "../../assets/about_me_1.jpg";
import aboutImageTwo from "../../assets/about_me_2.jpg";
import aboutImageThree from "../../assets/about_me_3.jpg";
import aboutImageFour from "../../assets/about_me_4.jpg";
import aboutImageFive from "../../assets/about_me_5.jpg";

const fallbackBiographyContent = {
  ar: {
    biography_main_title: "فادي الأحمد المحيميد",

    biography_intro_title: "أولاً: التعريف المهني",
    biography_intro_paragraph_one: "",
    biography_intro_paragraph_two: "",
    biography_intro_paragraph_three: "",

    biography_positions_title: "ثانيًا: المناصب والعضويات",
    biography_executive_positions_title: "المناصب التنفيذية",
    biography_executive_positions: "",
    biography_memberships_title: "العضويات القيادية",
    biography_memberships: "",

    biography_experience_title: "ثالثًا: الخبرة المهنية",
    biography_experience_intro: "",
    biography_experience_list_title: "تشمل خبراته",
    biography_experience_list: "",
    biography_experience_outro: "",

    biography_achievements_title: "رابعًا: أبرز الإنجازات",
    biography_achievements: "",

    biography_skills_title: "خامسًا: المهارات المهنية",
    biography_leadership_title: "القيادة والاستراتيجية",
    biography_leadership_skills: "",
    biography_investment_title: "الاستثمار والتطوير الاقتصادي",
    biography_investment_skills: "",
    biography_industry_title: "الصناعة والتصنيع",
    biography_industry_skills: "",
    biography_markets_title: "الأسواق الدولية",
    biography_markets_skills: "",
    biography_entrepreneurship_title: "ريادة الأعمال وبناء المنصات",
    biography_entrepreneurship_skills: "",
  },
  en: {
    biography_main_title: "Fadi Alahmad Al-Muhaimid",

    biography_intro_title: "First: Professional Introduction",
    biography_intro_paragraph_one: "",
    biography_intro_paragraph_two: "",
    biography_intro_paragraph_three: "",

    biography_positions_title: "Second: Positions and Memberships",
    biography_executive_positions_title: "Executive Positions",
    biography_executive_positions: "",
    biography_memberships_title: "Leadership Memberships",
    biography_memberships: "",

    biography_experience_title: "Third: Professional Experience",
    biography_experience_intro: "",
    biography_experience_list_title: "His experience includes",
    biography_experience_list: "",
    biography_experience_outro: "",

    biography_achievements_title: "Fourth: Key Achievements",
    biography_achievements: "",

    biography_skills_title: "Fifth: Professional Skills",
    biography_leadership_title: "Leadership and Strategy",
    biography_leadership_skills: "",
    biography_investment_title: "Investment and Economic Development",
    biography_investment_skills: "",
    biography_industry_title: "Industry and Manufacturing",
    biography_industry_skills: "",
    biography_markets_title: "International Markets",
    biography_markets_skills: "",
    biography_entrepreneurship_title: "Entrepreneurship and Platform Building",
    biography_entrepreneurship_skills: "",
  },
  zh: {
    biography_main_title: "法迪·艾哈迈德·穆海米德",

    biography_intro_title: "第一：职业简介",
    biography_intro_paragraph_one: "",
    biography_intro_paragraph_two: "",
    biography_intro_paragraph_three: "",

    biography_positions_title: "第二：职位与成员身份",
    biography_executive_positions_title: "执行职位",
    biography_executive_positions: "",
    biography_memberships_title: "领导性成员身份",
    biography_memberships: "",

    biography_experience_title: "第三：职业经验",
    biography_experience_intro: "",
    biography_experience_list_title: "他的经验包括",
    biography_experience_list: "",
    biography_experience_outro: "",

    biography_achievements_title: "第四：主要成就",
    biography_achievements: "",

    biography_skills_title: "第五：专业技能",
    biography_leadership_title: "领导力与战略",
    biography_leadership_skills: "",
    biography_investment_title: "投资与经济发展",
    biography_investment_skills: "",
    biography_industry_title: "工业与制造",
    biography_industry_skills: "",
    biography_markets_title: "国际市场",
    biography_markets_skills: "",
    biography_entrepreneurship_title: "创业与平台建设",
    biography_entrepreneurship_skills: "",
  },
};

const splitLines = (value) => {
  if (!value) return [];

  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
};

const BiographyPage = ({ lang = "en", content }) => {
  useEffect(() => {
    const sectionId =
      sessionStorage.getItem("scrollToSection") ||
      window.location.hash.replace("#", "");

    if (!sectionId) return;

    const timer = setTimeout(() => {
      const section = document.getElementById(sectionId);
      const header = document.querySelector(".header");

      if (section) {
        const headerHeight = header ? header.offsetHeight : 0;
        const sectionTop =
          section.getBoundingClientRect().top +
          window.pageYOffset -
          headerHeight;

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        });
      }

      sessionStorage.removeItem("scrollToSection");
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const aboutContent = content || siteContent?.about || fallbackBiographyContent;

  const currentContent =
    {
      ...fallbackBiographyContent[lang],
      ...(aboutContent?.[lang] || aboutContent?.en || {}),
    } || fallbackBiographyContent.en;

  const pageDirection = lang === "ar" ? "rtl" : "ltr";

  const executivePositions = useMemo(
    () => splitLines(currentContent.biography_executive_positions),
    [currentContent.biography_executive_positions]
  );

  const memberships = useMemo(
    () => splitLines(currentContent.biography_memberships),
    [currentContent.biography_memberships]
  );

  const experienceList = useMemo(
    () => splitLines(currentContent.biography_experience_list),
    [currentContent.biography_experience_list]
  );

  const achievements = useMemo(
    () => splitLines(currentContent.biography_achievements),
    [currentContent.biography_achievements]
  );

  const skillGroups = [
    {
      title: currentContent.biography_leadership_title,
      items: splitLines(currentContent.biography_leadership_skills),
    },
    {
      title: currentContent.biography_investment_title,
      items: splitLines(currentContent.biography_investment_skills),
    },
    {
      title: currentContent.biography_industry_title,
      items: splitLines(currentContent.biography_industry_skills),
    },
    {
      title: currentContent.biography_markets_title,
      items: splitLines(currentContent.biography_markets_skills),
    },
    {
      title: currentContent.biography_entrepreneurship_title,
      items: splitLines(currentContent.biography_entrepreneurship_skills),
    },
  ].filter((group) => group.title || group.items.length > 0);

  return (
    <main
      className={`biography-page ${
        lang === "ar" ? "biography-page-ar" : ""
      } ${lang === "zh" ? "biography-page-zh" : ""}`}
      dir={pageDirection}
    >
      <section id="biography" className="biography-hero">
        <div className="biography-hero-container">
          <div className="biography-hero-content">
            <span className="biography-kicker">
              {lang === "ar"
                ? "السيرة الذاتية"
                : lang === "zh"
                ? "个人简介"
                : "Biography"}
            </span>

            <h1>{currentContent.biography_main_title}</h1>

            <p>
              {currentContent.biography_intro_paragraph_one ||
                (lang === "ar"
                  ? "مسيرة مهنية تجمع بين الصناعة والاستثمار الدولي وبناء الشراكات الاقتصادية."
                  : lang === "zh"
                  ? "融合工业、国际投资与经济合作建设的职业旅程。"
                  : "A professional journey shaped by industry, international investment, and economic partnerships.")}
            </p>
          </div>

          <div className="biography-hero-gallery">
            <img src={aboutImageFive} alt="Fadi Alahmad" />
            <img src={aboutImageFour} alt="Fadi Alahmad" />
            <img src={aboutImageTwo} alt="Fadi Alahmad" />
          </div>
        </div>
      </section>

      <section className="biography-section biography-intro-section">
        <div className="biography-container">
          <div className="biography-section-heading">
            <span>01</span>
            <h2>{currentContent.biography_intro_title}</h2>
          </div>

          <div className="biography-intro-grid">
            <div className="biography-intro-card">
              {currentContent.biography_intro_paragraph_one && (
                <p>{currentContent.biography_intro_paragraph_one}</p>
              )}

              {currentContent.biography_intro_paragraph_two && (
                <p>{currentContent.biography_intro_paragraph_two}</p>
              )}

              {currentContent.biography_intro_paragraph_three && (
                <p>{currentContent.biography_intro_paragraph_three}</p>
              )}
            </div>

            <div className="biography-image-card biography-image-card--focus-fadi">
              <img
                src={aboutImageOne}
                alt="Fadi Alahmad professional"
                className="biography-image-card__img biography-image-card__img--fadi-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="biography-section biography-positions-section">
        <div className="biography-container">
          <div className="biography-section-heading">
            <span>02</span>
            <h2>{currentContent.biography_positions_title}</h2>
          </div>

          <div className="biography-two-columns">
            <div className="biography-list-card">
              <h3>{currentContent.biography_executive_positions_title}</h3>

              <ul>
                {executivePositions.map((item, index) => (
                  <li key={`executive-${index}`}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="biography-list-card biography-list-card-accent">
              <h3>{currentContent.biography_memberships_title}</h3>

              <ul>
                {memberships.map((item, index) => (
                  <li key={`membership-${index}`}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="biography-section biography-experience-section">
        <div className="biography-container">
          <div className="biography-section-heading">
            <span>03</span>
            <h2>{currentContent.biography_experience_title}</h2>
          </div>

          <div className="biography-experience-layout">
            <div className="biography-experience-text">
              {currentContent.biography_experience_intro && (
                <p>{currentContent.biography_experience_intro}</p>
              )}

              {currentContent.biography_experience_list_title && (
                <h3>{currentContent.biography_experience_list_title}</h3>
              )}

              <ul>
                {experienceList.map((item, index) => (
                  <li key={`experience-${index}`}>{item}</li>
                ))}
              </ul>

              {currentContent.biography_experience_outro && (
                <p>{currentContent.biography_experience_outro}</p>
              )}
            </div>

            <div className="biography-stacked-images">
              <img src={aboutImageThree} alt="Fadi Alahmad meeting" />
              <img src={aboutImageTwo} alt="Fadi Alahmad speaking" />
            </div>
          </div>
        </div>
      </section>

      <section className="biography-section biography-achievements-section">
        <div className="biography-container">
          <div className="biography-section-heading">
            <span>04</span>
            <h2>{currentContent.biography_achievements_title}</h2>
          </div>

          <div className="biography-achievements-grid">
            {achievements.map((item, index) => (
              <div
                className="biography-achievement-card"
                key={`achievement-${index}`}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="biography-section biography-skills-section">
        <div className="biography-container">
          <div className="biography-section-heading">
            <span>05</span>
            <h2>{currentContent.biography_skills_title}</h2>
          </div>

          <div className="biography-skills-grid">
            {skillGroups.map((group, index) => (
              <div className="biography-skill-card" key={`skill-${index}`}>
                <h3>{group.title}</h3>

                <ul>
                  {group.items.map((item, itemIndex) => (
                    <li key={`skill-${index}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BiographyPage;