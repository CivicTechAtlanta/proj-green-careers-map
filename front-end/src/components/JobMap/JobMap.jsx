import "./JobMap.css";

// Optional: HSL palette per category index to mimic your sample
const CAT_HSL = [
  { h: 198, s: "58%", l: "43%" }, // Utilities & Grid Modernization
  { h: 145, s: "63%", l: "42%" }, // Renewable Energy Systems
  { h: 37, s: "90%", l: "51%" }, // Residential & Commercial Construction
  { h: 283, s: "39%", l: "53%" }, // Building Operations Systems
  { h: 6, s: "78%", l: "57%" }, // HVAC/R & Product Distribution
];

const toSlug = (str = "") =>
  String(str)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const safeName = (x) => x?.name ?? x?.title ?? x?.label ?? "Untitled";

export default function JobMap({ categories = [], rows = [] }) {
  const cats = categories.length
    ? categories
    : [
        { name: "Utilities & Grid Modernization" },
        { name: "Renewable Energy Systems" },
        { name: "Residential & Commercial Construction" },
        { name: "Building Operations Systems" },
        { name: "HVAC/R & Product Distribution" },
      ];

  const gridStyle = {
    // left column for level/row names, then one column per category
    gridTemplateColumns: `220px repeat(${cats.length}, 1fr)`,
  };

  return (
    <div id="careerMap" className="map-container">
      <div className="map-grid" style={gridStyle}>
        {/* Top header row: categories */}
        <div className="categories">
          <div className="spacer" />
          {cats.map((cat, i) => {
            const { h, s, l } = CAT_HSL[i % CAT_HSL.length];
            return (
              <div
                key={cat.id ?? cat.slug ?? i}
                className={`category category-${toSlug(safeName(cat))}`}
                style={{ "--h": h, "--s": s, "--l": l }}
              >
                {safeName(cat)}
              </div>
            );
          })}
        </div>

        {/* One row per “row” item from the API (label on the left + jobs panels) */}
        {rows.map((r, rowIdx) => (
          <div
            className={`row row-${rowIdx + 1}`}
            key={r.id ?? r.slug ?? rowIdx}
          >
            <div className="level">
              <h2 className="level-name">
                <span>{safeName(r)}</span>
              </h2>
            </div>

            {cats.map((cat, i) => {
              const { h, s, l } = CAT_HSL[i % CAT_HSL.length];
              return (
                <div
                  key={`${rowIdx}-${i}`}
                  className="jobs"
                  style={{ "--h": h, "--s": s, "--l": l }}
                  aria-label={`${safeName(cat)} × ${safeName(r)} jobs`}
                >
                  {/* Placeholder: later we’ll render real job tiles here */}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
