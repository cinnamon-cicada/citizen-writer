import { getAllEssays } from "@/lib/essays";

export const dynamic = "force-static";

const siteUrl = "https://citizenwriter.firebaseapp.com";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const essays = await getAllEssays();

  const items = essays
    .map((essay) => {
      const url = `${siteUrl}/essays/${essay.slug}`;
      return `
    <item>
      <title>${escapeXml(essay.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(essay.date).toUTCString()}</pubDate>
      <description>${escapeXml(essay.summary)}</description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Citizen Writer</title>
    <link>${siteUrl}</link>
    <description>Reflective personal essays on emotions, place, and everyday life</description>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}