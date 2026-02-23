import { useState } from "react";
import "./Hero.css";
import prcLogo from "../../assets/images-optimized-v2/logo/prclogo.svg";
import {
  navCareersMap,
  navContactUs,
  logoAlt,
  orgName,
  orgNameShort,
  heroImageAlt,
  heroTitle,
  heroDescription,
  sectionTitle,
  sectionDescription,
} from "../../../content/hero.js";

// Import optimized hero images (WebP + JPEG fallback at multiple sizes)
const heroImageModules = import.meta.glob(
  "../../assets/images-optimized-v2/hero/hero-main-*.{webp,jpg}",
  { eager: true }
);

// Build hero image sources for picture element
const getHeroSources = () => {
  const sources = { webp: {}, jpg: {} };
  Object.entries(heroImageModules).forEach(([path, module]) => {
    const match = path.match(/hero-main-(\d+)w\.(webp|jpg)$/);
    if (match) {
      const [, width, format] = match;
      sources[format][width] = module.default;
    }
  });
  return sources;
};

const heroSources = getHeroSources();
const hasHeroImage = Object.keys(heroSources.webp).length > 0;

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToCareersMap = () => {
    setMenuOpen(false);
    const mapElement = document.querySelector('.map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
    setMenuOpen(false);
    const footerElement = document.querySelector('.footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="hero">
      <div className="hero__container">
        {/* Header Navigation */}
        <div className="hero__nav">
          <div className="hero__logo">
            <img src={prcLogo} alt={logoAlt} className="hero__logo-img" />
            <span className="hero__org-name hero__org-name--full">{orgName}</span>
            <span className="hero__org-name hero__org-name--short">{orgNameShort}</span>
          </div>

          <button
            className={`hero__hamburger ${menuOpen ? 'hero__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hero__hamburger-line" />
            <span className="hero__hamburger-line" />
            <span className="hero__hamburger-line" />
          </button>

          <nav className={`hero__nav-buttons ${menuOpen ? 'hero__nav-buttons--open' : ''}`}>
            <button className="hero__nav-btn hero__nav-btn--active" onClick={scrollToCareersMap}>
              {navCareersMap}
            </button>
            <button className="hero__nav-btn hero__nav-btn--outline" onClick={scrollToContact}>
              {navContactUs}
            </button>
          </nav>
        </div>

        {/* Hero Content */}
        <div className="hero__content">
          <div className={`hero__image-container ${!hasHeroImage ? 'hero__image-container--placeholder' : ''}`}>
            {hasHeroImage && (
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${heroSources.webp['768']} 768w, ${heroSources.webp['1440']} 1440w`}
                  sizes="(max-width: 768px) 100vw, 1440px"
                />
                <img
                  src={heroSources.jpg['1440']}
                  srcSet={`${heroSources.jpg['768']} 768w, ${heroSources.jpg['1440']} 1440w`}
                  sizes="(max-width: 768px) 100vw, 1440px"
                  alt={heroImageAlt}
                  className="hero__image"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            )}
            <div className="hero__image-overlay">
              <div className="hero__text-box">
                <h1 className="hero__title">{heroTitle}</h1>
                <p className="hero__description">
                  {heroDescription}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="hero__bottom-section">
          <h2 className="hero__section-title">{sectionTitle}</h2>
          <p className="hero__section-description">
            {sectionDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
