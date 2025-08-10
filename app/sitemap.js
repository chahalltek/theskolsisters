import episodes from "@/data/episodes.json";
export default function sitemap() {
  const base = "https://theskolsisters.com";
  const staticRoutes = ["", "/episodes", "/start-sit", "/blog", "/about", "/subscribe", "/contact", "/sponsorships"]
    .map((p) => ({ url: base + p, lastModified: new Date() }));
  const epRoutes = episodes.map((ep) => ({ url: base + "/episodes/" + ep.slug, lastModified: ep.date || new Date() }));
  return [...staticRoutes, ...epRoutes];
}
