// scripts/generate-sitemaps.js
import fs from "fs";
import path from "path";

const subdomains = ["api", "api2", "api3", "vimal"];
const randomSubdomain =
  subdomains[Math.floor(Math.random() * subdomains.length)];
const apiUrl = `https://${randomSubdomain}.shoko.fun/api/az-list?page=`;
const baseUrl = "https://shoko.fun";

if (!baseUrl) {
  console.error("❌ ERROR: NEXT_PUBLIC_BASE_URL is not set in .env.local");
  process.exit(1);
}

const publicDir = path.join(process.cwd(), "public");

const retryFetch = async (url, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i < retries - 1) {
        await new Promise((r) => setTimeout(r, delay));
      } else {
        throw error;
      }
    }
  }
};

const getTotalPages = async () => {
  const data = await retryFetch(apiUrl + "1");
  return data.results.totalPages;
};

const fetchAllUrls = async () => {
  const allUrls = [];
  const totalPages = await getTotalPages();

  for (let page = 1; page <= totalPages; page++) {
    try {
      const data = await retryFetch(apiUrl + page);
      data.results.data.forEach((item) => {
        if (item?.id) {
          allUrls.push(`${baseUrl}/${item.id}`);
        } else {
          console.warn(`⚠️ Skipping invalid item on page ${page}`, item);
        }
      });
      console.log(`Fetched page ${page}/${totalPages}`);
    } catch (error) {
      console.error(`Error fetching page ${page}:`, error);
    }
  }

  return allUrls;
};

const escapeXml = (url) => {
  if (!url || typeof url !== "string") {
    console.warn("⚠️ Skipping invalid URL:", url);
    return "";
  }
  return url
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const generateSitemapXml = (urls) => {
  const lastModified = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .filter((url) => url && typeof url === "string")
  .map(
    (url) => `<url>
  <loc>${escapeXml(url)}</loc>
  <lastmod>${lastModified}</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>`
  )
  .join("\n")}
</urlset>`;
};

const generateIndexXml = (sitemapFiles) => {
  const lastModified = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapFiles
  .map(
    (file) => `<sitemap>
  <loc>${baseUrl}/${file}</loc>
  <lastmod>${lastModified}</lastmod>
</sitemap>`
  )
  .join("\n")}
</sitemapindex>`;
};

// Static genre/category URLs
const genreUrls = () => {
  const genres = [
    "Action",
    "Adventure",
    "Cars",
    "Comedy",
    "Dementia",
    "Demons",
    "Drama",
    "Ecchi",
    "Fantasy",
    "Game",
    "Harem",
    "Historical",
    "Horror",
    "Isekai",
    "Josei",
    "Kids",
    "Magic",
    "Martial Arts",
    "Mecha",
    "Military",
    "Music",
    "Mystery",
    "Parody",
    "Police",
    "Psychological",
    "Romance",
    "Samurai",
    "School",
    "Sci-Fi",
    "Seinen",
    "Shoujo",
    "Shoujo Ai",
    "Shounen",
    "Shounen Ai",
    "Slice of Life",
    "Space",
    "Sports",
    "Super Power",
    "Supernatural",
    "Thriller",
    "Vampire",
  ];
  return genres.map(
    (g) =>
      `${baseUrl}/genre?id=${encodeURIComponent(g)}&name=${encodeURIComponent(
        g
      )}`
  );
};

const categoryUrls = () => {
  const cats = [
    "most-favorite",
    "most-popular",
    "subbed-anime",
    "dubbed-anime",
    "recently-updated",
    "recently-added",
    "top-upcoming",
    "top-airing",
    "movie",
    "special",
    "ova",
    "ona",
    "tv",
    "completed",
  ];
  return cats.map((c) => {
    const heading = c
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
    return `${baseUrl}/grid?name=${encodeURIComponent(
      c
    )}&heading=${encodeURIComponent(heading)}`;
  });
};

(async () => {
  try {
    // Cleanup old sitemap files
    fs.readdirSync(publicDir)
      .filter((f) => f.startsWith("sitemap") && f.endsWith(".xml"))
      .forEach((f) => fs.unlinkSync(path.join(publicDir, f)));

    const urls = await fetchAllUrls();
    const staticUrls = [
      baseUrl,
      `${baseUrl}/home`,
      ...genreUrls(),
      ...categoryUrls(),
    ];

    const allUrls = [...staticUrls, ...urls];

    // Debug invalids
    const badUrls = allUrls.filter((u) => !u || typeof u !== "string");
    if (badUrls.length) {
      fs.writeFileSync(
        path.join(publicDir, "sitemap-errors.log"),
        badUrls.join("\n")
      );
      console.warn(
        `⚠️ Found ${badUrls.length} invalid URLs. Logged to sitemap-errors.log`
      );
    }

    const BATCH_SIZE = 500;
    const sitemapFiles = [];

    for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
      const batch = allUrls.slice(i, i + BATCH_SIZE);
      const sitemapXml = generateSitemapXml(batch);
      const filename = `sitemap-${i / BATCH_SIZE + 1}.xml`;
      fs.writeFileSync(path.join(publicDir, filename), sitemapXml);
      sitemapFiles.push(filename);
    }

    // Write sitemap index
    const indexXml = generateIndexXml(sitemapFiles);
    fs.writeFileSync(path.join(publicDir, "sitemap.xml"), indexXml);

    console.log(`✅ Generated ${sitemapFiles.length} sitemaps + index.`);
  } catch (error) {
    console.error("❌ Error generating sitemaps:", error);
  }
})();
