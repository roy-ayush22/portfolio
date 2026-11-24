export const siteConfig = {
  name: "Ayush Roy",
  title: "Ayush Roy",
  description: "Self-taught developer building AI and backend systems",
  // Set NEXT_PUBLIC_SITE_URL to the deployed canonical URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const siteUrl = new URL(siteConfig.url);
