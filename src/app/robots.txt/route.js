export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const robotsTxt = `
User-agent: *
Disallow:

Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
