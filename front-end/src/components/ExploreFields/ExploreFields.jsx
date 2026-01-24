import { useState } from "react";
import "./ExploreFields.css";

// Import all field images that exist (Vite resolves this at build time)
const fieldImageModules = import.meta.glob("../../assets/images/fields/*.{jpg,jpeg,png,webp}", { eager: true });

// Create a mapping from field name to image
const getFieldImage = (fieldKey) => {
  const matchingPath = Object.keys(fieldImageModules).find(path =>
    path.toLowerCase().includes(fieldKey.toLowerCase())
  );
  return matchingPath ? fieldImageModules[matchingPath].default : null;
};

const fieldImages = {
  agriculture: getFieldImage("agriculture"),
  building: getFieldImage("building"),
  education: getFieldImage("education"),
  energyEfficiency: getFieldImage("energy-efficiency"),
  greenInfrastructure: getFieldImage("green-infrastructure"),
  remediation: getFieldImage("remediation"),
  renewableEnergy: getFieldImage("renewable-energy"),
  transportation: getFieldImage("transportation"),
};

function ExploreFields() {
  const [activeTab, setActiveTab] = useState("Agriculture");

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
      image: fieldImages.agriculture
    },
    {
      name: "Building",
      title: "Building Careers",
      description: "Building professionals construct and maintain the physical spaces where we live, work, and gather. They combine craftsmanship with innovation to create safe, efficient, and sustainable structures that serve our communities for generations.",
      roles: [
        "Construction Worker",
        "Electrician Apprentice",
        "HVAC Technician"
      ],
      image: fieldImages.building
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
      image: fieldImages.education
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
      image: fieldImages.energyEfficiency
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
      image: fieldImages.greenInfrastructure
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
      image: fieldImages.remediation
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
      image: fieldImages.renewableEnergy
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
      image: fieldImages.transportation
    }
  ];

  const activeField = fields.find(field => field.name === activeTab) || fields[0];

  return (
    <section className="explore-fields">
      <div className="explore-fields__container">
        <h2 className="explore-fields__title">Explore Fields That Give Back</h2>
        <p className="explore-fields__description">
          Learn more about careers in fields that give back to your community! Select the titles below to learn more about each field.
        </p>

        {/* Tabs */}
        <div className="explore-fields__tabs">
          {fields.map(field => (
            <button
              key={field.name}
              className={`explore-fields__tab ${activeTab === field.name ? 'explore-fields__tab--active' : ''}`}
              onClick={() => setActiveTab(field.name)}
            >
              {field.name}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="explore-fields__content">
          <div className={`explore-fields__image-container ${!activeField.image ? 'explore-fields__image-container--placeholder' : ''}`}>
            {activeField.image && (
              <img
                src={activeField.image}
                alt={activeField.title}
                className="explore-fields__image"
              />
            )}
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
