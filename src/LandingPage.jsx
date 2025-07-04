import React, { useState, useEffect, useRef, useCallback } from "react";
import Slider from "react-slick";
import { FaFacebook, FaInstagram, FaTiktok, FaSun, FaMoon, FaWhatsapp, FaDownload, FaStar } from "react-icons/fa";
import "./LandingPage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { usePerformance } from "./hooks/usePerformance";

// Debug: Check if icons are loaded
console.log('Icons loaded:', { FaFacebook, FaInstagram, FaTiktok });

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [imageLoadStatus, setImageLoadStatus] = useState({});
  
  const { trackEvent } = usePerformance();
  
  const heroRef = useRef(null);
  const sliderRef = useRef(null);
  const downloadRef = useRef(null);
  const contactRef = useRef(null);
  const socialRef = useRef(null);

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
    setIsLoaded(true);
  }, []);

  // Scroll handler for header effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set([...prev, entry.target.className]));
        }
      });
    }, observerOptions);

    const sections = [heroRef.current, sliderRef.current, downloadRef.current, contactRef.current, socialRef.current];
    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Make all sections visible by default for now
  useEffect(() => {
    setVisibleSections(new Set(['hero-section', 'slider-section', 'download-section', 'contact-section', 'social-section']));
  }, []);

  const toggleDarkMode = useCallback(() => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    trackEvent('dark_mode_toggle', { mode: newDarkMode ? 'dark' : 'light' });
  }, [darkMode, trackEvent]);

  const handleImageLoad = useCallback((imageIndex) => {
    setImageLoadStatus(prev => ({
      ...prev,
      [imageIndex]: true
    }));
  }, []);

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
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const scrollToSection = (sectionRef, sectionName) => {
    sectionRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    trackEvent('navigation_click', { section: sectionName });
  };

  const handleDownloadClick = (platform) => {
    trackEvent('download_click', { platform });
  };

  const handleContactClick = () => {
    trackEvent('contact_click', { method: 'whatsapp' });
  };

  const handleSocialClick = (platform) => {
    trackEvent('social_click', { platform });
  };

  return (
    <div className={`landing-page ${darkMode ? "dark" : "light"} ${isLoaded ? "loaded" : ""}`}>
      {/* Header with Dark Mode Toggle */}
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-container">
          <div className="logo-container">
            <img 
              src="/images/logo.png" 
              alt="Noon Brand Logo" 
              className="header-logo"
              loading="eager"
            />
          </div>
          <nav className="header-nav">
            <button 
              onClick={() => scrollToSection(heroRef, 'home')} 
              className="nav-link"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection(downloadRef, 'download')} 
              className="nav-link"
            >
              Download
            </button>
            <button 
              onClick={() => scrollToSection(contactRef, 'contact')} 
              className="nav-link"
            >
              Contact
            </button>
          </nav>
          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle" 
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className={`hero-section ${visibleSections.has('hero-section') ? 'visible' : ''}`}
      >
        <div className="hero-content">
          <div className="hero-badge">
            <FaStar className="star-icon" />
            <span>Premium Brand</span>
          </div>
          <h1 className="hero-title">
            <span className="brand-name">™ Noon Brand</span>
            <span className="brand-name-arabic">نون براند</span>
          </h1>
          
          <div className="hero-description">
            <p className="description-arabic">
              تطبيق نون براند يوفر لك افضل المنتجات بأجود الاسعار من الماركات العالمية و بتشكيلة
              متميزة تناسب جميع احتياجاتك
            </p>
            <p className="description-english">
              Noon brand app provides you the best products at the finest
              prices from international brands and with a distinct assortment
              that suits all your needs
            </p>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">10K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Products</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider */}
      <section 
        ref={sliderRef}
        className={`slider-section ${visibleSections.has('slider-section') ? 'visible' : ''}`}
      >
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {sliderImages.map((image, index) => (
              <div key={index} className="slide-wrapper">
                <img 
                  src={image} 
                  alt={`Noon Brand Product ${index + 1}`} 
                  className={`slide-image ${imageLoadStatus[index] ? 'loaded' : 'loading'}`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(index)}
                />
                {!imageLoadStatus[index] && (
                  <div className="image-skeleton">
                    <div className="skeleton-shimmer"></div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Download Section */}
      <section 
        ref={downloadRef}
        className={`download-section ${visibleSections.has('download-section') ? 'visible' : ''}`}
      >
        <div className="download-container">
          <div className="download-header">
            <FaDownload className="download-icon" />
            <h2 className="download-title">Download Our App</h2>
            <p className="download-subtitle">Get the best shopping experience on your device</p>
          </div>
          
          <div className="download-buttons">
            <a 
              href="https://play.google.com/store/apps/details?id=com.dijlahstore.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="store-link"
              aria-label="Download from Google Play Store"
              onClick={() => { handleDownloadClick('google_play'); }}
            >
              <img 
                src="/images/google-play-badge.png" 
                alt="Get it on Google Play" 
                className="store-badge"
                loading="lazy"
              />
            </a>
            <a 
              href="https://apps.apple.com/us/app/%D9%86%D9%88%D9%86-%D8%A8%D8%B1%D8%A7%D9%86%D8%AF/id1580474195" 
              target="_blank" 
              rel="noopener noreferrer"
              className="store-link"
              aria-label="Download from Apple App Store"
              onClick={() => { handleDownloadClick('app_store'); }}
            >
              <img 
                src="/images/app-store-badge.png" 
                alt="Download on the App Store" 
                className="store-badge"
                loading="lazy"
              />
            </a>
            <a 
              href="https://drive.google.com/uc?id=1xXO8gJ7nROZeDvDB94Lggsw25YwUb-Q_" 
              target="_blank" 
              rel="noopener noreferrer"
              className="store-link"
              aria-label="Download APK file"
              onClick={() => { handleDownloadClick('apk'); }}
            >
              <img 
                src="/images/huawei-badge.png" 
                alt="Download from Us" 
                className="store-badge"
                loading="lazy"
              />
            </a>
          </div>

          <div className="app-features">
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h3>Fast & Secure</h3>
              <p>Lightning-fast shopping with secure payments</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎯</div>
              <h3>Best Prices</h3>
              <p>Competitive prices on international brands</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Optimized</h3>
              <p>Perfect experience on all devices</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚚</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        ref={contactRef}
        className={`contact-section ${visibleSections.has('contact-section') ? 'visible' : ''}`}
      >
        <div className="contact-container">
          <div className="contact-content">
            <h2 className="contact-title">Need Help?</h2>
            <p className="contact-subtitle">Our customer support team is here to help you 24/7</p>
            <a 
              href="https://wa.me/9647873000184" 
              className="whatsapp-button" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Contact customer support on WhatsApp"
              onClick={() => { handleContactClick(); }}
            >
              <FaWhatsapp className="whatsapp-icon" />
              <span>تواصل مع خدمة العملاء</span>
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section 
        ref={socialRef}
        className={`social-section ${visibleSections.has('social-section') ? 'visible' : ''}`}
      >
        <div className="social-container">
          <h3 className="social-title">Follow Us</h3>
          <p className="social-subtitle">Stay updated with our latest products and offers</p>
          <div className="social-media">
            <a 
              href="https://www.facebook.com/profile.php?id=61564289878012" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link facebook"
              aria-label="Follow us on Facebook"
              onClick={() => { handleSocialClick('facebook'); }}
            >
              <FaFacebook />
              <span className="sr-only">Facebook</span>
            </a>
            <a 
              href="https://www.instagram.com/noonbrands.iq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link instagram"
              aria-label="Follow us on Instagram"
              onClick={() => { handleSocialClick('instagram'); }}
            >
              <FaInstagram />
              <span className="sr-only">Instagram</span>
            </a>
            <a 
              href="https://www.tiktok.com/@noonbrand.iq" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link tiktok"
              aria-label="Follow us on TikTok"
              onClick={() => { handleSocialClick('tiktok'); }}
            >
              <FaTiktok />
              <span className="sr-only">TikTok</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-info">
            <img src="/images/logo.png" alt="Noon Brand" className="footer-logo" />
            <p className="footer-text">©جميع الحقوق محفوظة لشركة البيت التقني</p>
          </div>
          <div className="footer-links">
            <a href="#privacy" className="footer-link">Privacy Policy</a>
            <a href="#terms" className="footer-link">Terms of Service</a>
            <a href="#support" className="footer-link">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
