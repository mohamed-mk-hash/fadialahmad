import React from "react";
import "./IndustrialBrands.css";

import logo1 from "../../assets/swiper_logo_1.png";
import logo2 from "../../assets/swiper_logo_2.png";
import logo3 from "../../assets/swiper_logo_3.png";
import logo4 from "../../assets/swiper_logo_4.png";
import logo5 from "../../assets/swiper_logo_5.png";
import logo6 from "../../assets/swiper_logo_6.png";
import logo7 from "../../assets/swiper_logo_7.png";

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

const IndustrialBrands = () => {
  return (
    <section className="industrial-brands">
      <div className="industrial-brands__container">

        <div className="industrial-brands__slider">
          <div className="industrial-brands__track">
            {[...logos, ...logos].map((logo, index) => (
              <div className="industrial-brands__item" key={index}>
                <img
                  src={logo}
                  alt={`Brand Logo ${index + 1}`}
                  className="industrial-brands__logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustrialBrands;