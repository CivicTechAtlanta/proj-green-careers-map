import "./Hero.css";

// Import hero image if it exists (Vite resolves this at build time)
const heroImages = import.meta.glob("../../assets/images/hero/hero-main.{jpg,jpeg,png,webp}", { eager: true });
const heroImage = Object.values(heroImages)[0]?.default || null;

function Hero() {
  const scrollToCareersMap = () => {
    const mapElement = document.querySelector('.map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToContact = () => {
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
            <div className="hero__logo-image">
              {/* Placeholder for skyline logo */}
              <svg className="hero__logo-placeholder" viewBox="0 0 400 100" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="40" width="30" height="60" fill="#008080"/>
                <rect x="60" y="25" width="35" height="75" fill="#008080"/>
                <rect x="105" y="35" width="30" height="65" fill="#008080"/>
                <circle cx="170" cy="50" r="30" fill="#008080"/>
                <rect x="155" y="50" width="30" height="50" fill="#008080"/>
                <rect x="210" y="30" width="40" height="70" fill="#008080"/>
                <rect x="260" y="45" width="35" height="55" fill="#008080"/>
                <rect x="305" y="20" width="30" height="80" fill="#008080"/>
                <rect x="345" y="40" width="35" height="60" fill="#008080"/>
              </svg>
            </div>
            <div className="hero__logo-text">
              <span className="hero__org-name">Peoplestown Revitalization Corporation</span>
            </div>
          </div>

          <nav className="hero__nav-buttons">
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
          <div className={`hero__image-container ${!heroImage ? 'hero__image-container--placeholder' : ''}`}>
            {heroImage && (
              <img
                src={heroImage}
                alt="Green careers workers"
                className="hero__image"
              />
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
