import React, { useState } from "react";
import Slider from "react-slick";
import { FaFacebook, FaInstagram, FaTiktok, FaSun, FaMoon } from "react-icons/fa";
import "./LandingPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const sliderImages = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/image5.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768, // Tablet screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`landing-page ${darkMode ? "dark" : "light"}`}>
      <header>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? <FaMoon /> : <FaSun />}
        </button>
      </header>
      {/* Slider */}
      <div className="slider">
        <Slider {...sliderSettings}>
          {sliderImages.map((image, index) => (
            <img key={index} src={image} alt={`Slide ${index + 1}`} className="slide" />
          ))}
        </Slider>
      </div>

      {/* Logo */}
      <div className="logo">
        <img src="/images/logo.png" alt="Company Logo" />
      </div>

      {/* Description */}
      <div className="description">
        <h1>™ Noon Brand - نون براند</h1>
        <p>
          تطبيق نون براند يوفر لك افضل المنتجات بأجود الاسعار من الماركات العالمية و بتشكيلة
          متميزة تناسب جميع احتياجاتك
        </p>
        <p>
          Noon brand app provides you the best products at the finest
          prices from international brands and with a distinct assortment
          that suits all your needs
        </p>
      </div>

      {/* Download Buttons */}
      <div className="download-buttons">
        <a href="https://play.google.com/store/apps/details?id=com.dijlahstore.app" target="_blank" rel="noopener noreferrer">
          <img src="/images/google-play-badge.png" alt="Get it on Google Play" className="store-badge" />
        </a>
        <a href="https://apps.apple.com/us/app/%D9%86%D9%88%D9%86-%D8%A8%D8%B1%D8%A7%D9%86%D8%AF/id1580474195" target="_blank" rel="noopener noreferrer">
          <img src="/images/app-store-badge.png" alt="Download on the App Store" className="store-badge" />
        </a>
        <a href="/files/noonbrand.apk" target="_blank" rel="noopener noreferrer">
          <img src="/images/huawei-badge.png" alt="Download from Us" className="store-badge" />
        </a>
      </div>

      {/* WhatsApp Customer Support */}
      <a href="https://wa.me/9647873000184" className="whatsapp-button" target="_blank" rel="noopener noreferrer">
        تواصل مع خدمة العملاء
      </a>

      {/* Social Media Buttons */}
      <div className="social-media">
        <a href="https://www.facebook.com/profile.php?id=61564289878012" target="_blank" rel="noopener noreferrer" className="social facebook">
          <FaFacebook />
        </a>
        <a href="https://www.instagram.com/noonbrands.iq" target="_blank" rel="noopener noreferrer" className="social instagram">
          <FaInstagram />
        </a>
        <a href="https://www.tiktok.com/@noonbrand.iq" target="_blank" rel="noopener noreferrer" className="social tiktok">
          <FaTiktok />
        </a>
      </div>

      <footer className="footer">
        <div className="footer-banner">
          <p>©جميع الحقوق محفوظة لشركة البيت التقني</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
