import { useState } from "react";
import "./ExploreFields.css";

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

  const fields = [
    {
      name: "Agriculture",
      title: "Agriculture Careers",
      description: "Agriculture professionals work to grow food sustainably, support local food systems, and build community connections through farming. They are the caretakers of our land, combining traditional knowledge with modern techniques to feed communities.",
      roles: [
        "Urban Farm Manager",
        "Community Garden Coordinator",
        "Agricultural Technician"
      ],
      imageKey: "agriculture"
    },
    {
      name: "Building Construct",
      title: "Building Careers",
      description: "Building professionals construct and maintain the physical spaces where we live, work, and gather. They combine craftsmanship with innovation to create safe, efficient, and sustainable structures that serve our communities for generations.",
      roles: [
        "Construction Worker",
        "Electrician Apprentice",
        "HVAC Technician"
      ],
      imageKey: "building"
    },
    {
      name: "Education & Outreach",
      title: "Education & Outreach Careers",
      description: "Education and outreach specialists share knowledge, build awareness, and empower community members to make informed decisions. They are the bridge builders who connect people with resources and opportunities for growth.",
      roles: [
        "Community Educator",
        "Outreach Coordinator",
        "Program Assistant"
      ],
      imageKey: "education"
    },
    {
      name: "Energy Efficiency",
      title: "Energy Efficiency Careers",
      description: "Energy efficiency workers help homes and buildings use less energy, reducing costs and environmental impact. They are the problem solvers who identify opportunities to make our communities more sustainable and affordable.",
      roles: [
        "Energy Auditor",
        "Weatherization Technician",
        "Building Performance Analyst"
      ],
      imageKey: "energyEfficiency"
    },
    {
      name: "Green Infrastructure",
      title: "Green Infrastructure Careers",
      description: "Green infrastructure professionals design and maintain natural systems that manage stormwater, reduce heat, and create healthier urban environments. They blend nature with infrastructure to build resilient communities.",
      roles: [
        "Stormwater Technician",
        "Landscape Maintenance Worker",
        "Green Infrastructure Inspector"
      ],
      imageKey: "greenInfrastructure"
    },
    {
      name: "Natural Resources Management",
      title: "Natural Resources Management Careers",
      description: "Natural resource specialists work directly with the conservation, management, restoration and treatment of water and other natural resources including wildlife.",
      roles: [
        "Conservation Technician",
        "Wildlife Technician",
        "Water Quality Technician"
      ],
      imageKey: "naturalResources"
    },
    {
      name: "Remediation",
      title: "Remediation Careers",
      description: "A remediation worker or technician helps clean up and rebuild areas affected by toxins, heavy metals, oil spills, construction waste, or illegal dumping. They are the \"ground healers\" — part scientist, part builder, part community caretaker.",
      roles: [
        "Environmental Technician",
        "Site Cleanup Crew Member",
        "Field Sampling Assistant"
      ],
      imageKey: "remediation"
    },
    {
      name: "Renewable Energy",
      title: "Renewable Energy Careers",
      description: "Renewable energy professionals install and maintain systems that generate clean power from the sun, wind, and other sustainable sources. They are building the energy infrastructure of tomorrow, creating local jobs while fighting climate change.",
      roles: [
        "Solar Panel Installer",
        "Wind Turbine Technician",
        "Renewable Energy Technician"
      ],
      imageKey: "renewableEnergy"
    },
    {
      name: "Transportation",
      title: "Transportation Careers",
      description: "Transportation workers keep people and goods moving efficiently through our communities. They maintain vehicles, manage logistics, and develop sustainable transit solutions that connect neighborhoods and reduce environmental impact.",
      roles: [
        "Transit Operator",
        "Fleet Maintenance Technician",
        "Logistics Coordinator"
      ],
      imageKey: "transportation"
    }
  ];

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
        <h2 className="explore-fields__title">Explore Fields That Give Back</h2>
        <p className="explore-fields__description">
          Learn more about careers in fields that give back to your community! Select the titles below to learn more about each field.
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
                <p className="explore-fields__roles-label">Entry-level roles might include:</p>
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
              <p className="explore-fields__roles-label">Entry-level roles might include:</p>
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
