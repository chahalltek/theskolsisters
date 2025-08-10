import episodes from "@/data/episodes.json";

function xmlEscape(s) {
  return s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
}

export async function GET() {
  const site = "https://theskolsisters.com";
  const now = new Date().toUTCString();
  const items = episodes.map(ep => {
    const link = `${site}/episodes/${ep.slug}`;
    const pubDate = new Date(ep.date || Date.now()).toUTCString();
    const enclosure = ep.audio ? `\n      <enclosure url=\"${xmlEscape(ep.audio)}\" type=\"audio/mpeg\"/>` : "";
    return `
    <item>
      <title>${xmlEscape(ep.title)}</title>
      <link>${link}</link>
      <guid isPermaLink=\"false\">${xmlEscape(ep.slug)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${xmlEscape(ep.teaser || ep.description || "")}</description>${enclosure}
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Skol Sisters</title>
    <link>${site}</link>
    <description>Smart, sisterly fantasy football advice—with Skol spirit.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
