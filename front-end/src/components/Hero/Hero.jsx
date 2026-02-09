import { useState } from "react";
import "./Hero.css";
import prcLogo from "../../assets/images-optimized/logo/prclogo.svg";

// Import optimized hero images (WebP + JPEG fallback at multiple sizes)
const heroImageModules = import.meta.glob(
  "../../assets/images-optimized/hero/hero-main-*.{webp,jpg}",
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
            <img src={prcLogo} alt="Peoplestown Revitalization Corporation" className="hero__logo-img" />
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
              Careers Map
            </button>
            <button className="hero__nav-btn hero__nav-btn--outline" onClick={scrollToContact}>
              Contact Us
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
                  alt="Green careers workers"
                  className="hero__image"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
            )}
            <div className="hero__image-overlay">
              <div className="hero__text-box">
                <h1 className="hero__title">Future-Proof Careers</h1>
                <p className="hero__description">
                  Make an impact. Build your future. Explore careers that help people, make communities
                  more resilient to the effects of climate change, and open doors to fast-growing jobs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="hero__bottom-section">
          <h2 className="hero__section-title">Careers You Can Grow With—Right Here at Home</h2>
          <p className="hero__section-description">
            Peoplestown Revitalization Corporation connects Atlanta residents to entry-level career paths that strengthen our community
            and create lasting opportunity. This page highlights jobs that build healthier neighborhoods, support essential services, and
            offer skills you can grow with—so you can find work that gives back today and sets you up for a more resilient future tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
