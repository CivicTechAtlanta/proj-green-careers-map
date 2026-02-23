import { useState } from "react";
import "./ExploreFields.css";
import {
  sectionTitle,
  sectionDescription,
  rolesLabel,
  fields,
} from "../../../content/explore-fields.js";

// Import all optimized field images (WebP + JPEG at multiple sizes)
const fieldImageModules = import.meta.glob(
  "../../assets/images-optimized-v2/fields/*.{webp,jpg}",
  { eager: true }
);

// Build image sources map: { fieldName: { webp: { 400: url, 800: url }, jpg: { 400: url, 800: url } } }
const buildFieldImages = () => {
  const images = {};
  Object.entries(fieldImageModules).forEach(([path, module]) => {
    const match = path.match(/\/([^/]+)-(\d+)w\.(webp|jpg)$/);
    if (match) {
      const [, name, width, format] = match;
      if (!images[name]) images[name] = { webp: {}, jpg: {} };
      images[name][format][width] = module.default;
    }
  });
  return images;
};

const fieldImages = buildFieldImages();

// Map field keys to image file names
const fieldImageKeys = {
  agriculture: "agriculture",
  building: "building",
  education: "education",
  energyEfficiency: "energy-efficiency",
  greenInfrastructure: "green-infrastructure",
  naturalResources: "natural-resources",
  remediation: "remediation",
  renewableEnergy: "renewable-energy",
  transportation: "transportation",
};

// Optimized image component with WebP, fallback, and lazy loading
const FieldImage = ({ fieldKey, alt }) => {
  const sources = fieldImages[fieldImageKeys[fieldKey]];
  if (!sources || !sources.webp['800']) return null;

  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`${sources.webp['400']} 400w, ${sources.webp['800']} 800w`}
        sizes="(max-width: 768px) 100vw, 720px"
      />
      <img
        src={sources.jpg['800']}
        srcSet={`${sources.jpg['400']} 400w, ${sources.jpg['800']} 800w`}
        sizes="(max-width: 768px) 100vw, 720px"
        alt={alt}
        className="explore-fields__image"
        loading="lazy"
      />
    </picture>
  );
};

function ExploreFields() {
  const [activeTab, setActiveTab] = useState("Agriculture");
  const [activeIndex, setActiveIndex] = useState(0);

  const activeField = fields.find(field => field.name === activeTab) || fields[0];

  // Navigation handlers for mobile carousel
  const goToPrevField = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : fields.length - 1;
    setActiveIndex(newIndex);
    setActiveTab(fields[newIndex].name);
  };

  const goToNextField = () => {
    const newIndex = activeIndex < fields.length - 1 ? activeIndex + 1 : 0;
    setActiveIndex(newIndex);
    setActiveTab(fields[newIndex].name);
  };

  const handleTabClick = (fieldName, index) => {
    setActiveTab(fieldName);
    setActiveIndex(index);
  };

  return (
    <section className="explore-fields">
      <div className="explore-fields__container">
        <h2 className="explore-fields__title">{sectionTitle}</h2>
        <p className="explore-fields__description">
          {sectionDescription}
        </p>

        {/* Tabs - Desktop */}
        <div className="explore-fields__tabs">
          {fields.map((field, index) => (
            <button
              key={field.name}
              className={`explore-fields__tab ${activeTab === field.name ? 'explore-fields__tab--active' : ''}`}
              onClick={() => handleTabClick(field.name, index)}
            >
              {field.name}
            </button>
          ))}
        </div>

        {/* Mobile Navigation Wrapper - arrows on sides of content */}
        <div className="explore-fields__mobile-wrapper">
          <button
            className="explore-fields__nav-btn explore-fields__nav-btn--left"
            onClick={goToPrevField}
            aria-label="Previous field"
          >
            ‹
          </button>

          <div className="explore-fields__content explore-fields__content--mobile">
            <div className={`explore-fields__image-container ${!fieldImages[fieldImageKeys[activeField.imageKey]] ? 'explore-fields__image-container--placeholder' : ''}`}>
              <FieldImage fieldKey={activeField.imageKey} alt={activeField.title} />
            </div>

            <div className="explore-fields__text-content">
              <h3 className="explore-fields__field-title">{activeField.title}</h3>
              <p className="explore-fields__field-description">{activeField.description}</p>

              <div className="explore-fields__roles">
                <p className="explore-fields__roles-label">{rolesLabel}</p>
                <ul className="explore-fields__roles-list">
                  {activeField.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <button
            className="explore-fields__nav-btn explore-fields__nav-btn--right"
            onClick={goToNextField}
            aria-label="Next field"
          >
            ›
          </button>
        </div>

        {/* Mobile Indicator */}
        <div className="explore-fields__mobile-indicator-wrapper">
          <span className="explore-fields__mobile-indicator">
            {activeIndex + 1} of {fields.length}
          </span>
        </div>

        {/* Desktop Content */}
        <div className="explore-fields__content explore-fields__content--desktop">
          <div className={`explore-fields__image-container ${!fieldImages[fieldImageKeys[activeField.imageKey]] ? 'explore-fields__image-container--placeholder' : ''}`}>
            <FieldImage fieldKey={activeField.imageKey} alt={activeField.title} />
          </div>

          <div className="explore-fields__text-content">
            <h3 className="explore-fields__field-title">{activeField.title}</h3>
            <p className="explore-fields__field-description">{activeField.description}</p>

            <div className="explore-fields__roles">
              <p className="explore-fields__roles-label">{rolesLabel}</p>
              <ul className="explore-fields__roles-list">
                {activeField.roles.map((role, index) => (
                  <li key={index}>{role}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExploreFields;
