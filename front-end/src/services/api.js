// Safe env access (works in Vite; CRA fallback won’t trigger ESLint no-undef)
const ENV_VITE = (typeof import.meta !== "undefined" && import.meta.env) || {};
const ENV_CRA =
  (typeof globalThis !== "undefined" &&
    globalThis.process &&
    globalThis.process.env) ||
  {};

// Base URL and endpoints (override in .env.local)
const BASE_URL = (
  ENV_VITE.VITE_API_BASE_URL ||
  ENV_CRA.REACT_APP_API_BASE_URL ||
  ""
).trim();

const PATHS = {
  ROWS:
    ENV_VITE.VITE_ROWS_ENDPOINT ||
    ENV_CRA.REACT_APP_ROWS_ENDPOINT ||
    "/items/rows",
  CATEGORIES:
    ENV_VITE.VITE_CATEGORIES_ENDPOINT ||
    ENV_CRA.REACT_APP_CATEGORIES_ENDPOINT ||
    "/items/categories",
  JOBS:
    ENV_VITE.VITE_JOBS_ENDPOINT ||
    ENV_CRA.REACT_APP_JOBS_ENDPOINT ||
    "/items/categories",
};

// Optional: warn if BASE_URL is empty (useful during setup)
if (!BASE_URL) {
  // eslint-disable-next-line no-console
  console.warn(
    "[api] BASE_URL is empty. Set VITE_API_BASE_URL (Vite) or REACT_APP_API_BASE_URL (CRA)."
  );
}

// Join BASE_URL + path safely (no double slashes)
function joinUrl(base, path) {
  const b = (base || "").replace(/\/+$/, "");
  const p = (path || "").startsWith("/") ? path : `/${path || ""}`;
  return `${b}${p}`;
}

async function apiGet(path, { signal } = {}) {
  const res = await fetch(joinUrl(BASE_URL, path), { signal });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `GET ${path} failed: ${res.status} ${res.statusText} ${text}`
    );
  }
  const json = await res.json().catch(() => ({}));
  // Support raw arrays or Directus-style { data: [...] }
  return json?.data ?? json;
}

export function getRows(opts) {
  return apiGet(PATHS.ROWS, opts);
}
export function getCategories(opts) {
  return apiGet(PATHS.CATEGORIES, opts);
}
export function getJobs(opts) {
  return apiGet(PATHS.JOBS, opts);
}
