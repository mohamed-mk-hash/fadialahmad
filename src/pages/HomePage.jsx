import React from "react";
import AboutMe from "../components/About_me/AboutMe";
import AreasOfExpertise from "../components/AreasOfExpertise/AreasOfExpertise";

import IndustrialBrands from "../components/Industrial/IndustrialBrands";
import LatestWritings from "../components/LatestWritings/LatestWritings";
import SuccessStories from "../components/SuccessStories/SuccessStories";
import FaqSection from "../components/FaqSection/FaqSection";
import ContactSection from "../components/ContactSection/ContactSection";
import MomentsMilestones from "../components/MomentsMilestones/MomentsMilestones";

import StorySection from "../components/StorySection/StorySection";
import HeroStorySection from "../components/HeroStorySection/HeroStorySection";
import BusinessShowcaseSection from "../components/BusinessShowcaseSection/BusinessShowcaseSection";
import ExperienceSection from "../components/ExperienceSection/ExperienceSection";

function HomePage({ lang = "en", siteContent = {} }) {
  return (
    <>
      <section id="home">
        <HeroStorySection
          lang={lang}
          heroContent={siteContent.hero}
        />
      </section>

      <section id="industrial">
        <IndustrialBrands
          lang={lang}
          content={siteContent.industrial}
        />
      </section>

      <BusinessShowcaseSection
        lang={lang}
        content={siteContent.businessShowcase}
      />

      <section id="biography">
        <AboutMe
          lang={lang}
          content={siteContent.about}
        />
      </section>

      <section id="areas">
        <AreasOfExpertise
          lang={lang}
          content={siteContent.areas}
        />
      </section>

      <section id="stories">
        <SuccessStories
          lang={lang}
          content={siteContent.stories}
        />
      </section>

      <section id="story-section">
        <StorySection
          lang={lang}
          content={siteContent.storySection}
        />
      </section>

      <section id="articles">
        <LatestWritings
          lang={lang}
          content={siteContent.articles}
        />
      </section>

      <ExperienceSection
        lang={lang}
        content={siteContent.experience}
      />

      <section id="gallery">
        <MomentsMilestones
          lang={lang}
          content={siteContent.gallery}
        />
      </section>

      <section id="contact">
        <ContactSection
          lang={lang}
          content={siteContent.contact}
        />
      </section>

      <section id="faq">
        <FaqSection
          lang={lang}
          content={siteContent.faq}
        />
      </section>
    </>
  );
}

export default HomePage;