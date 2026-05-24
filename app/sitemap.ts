import type { MetadataRoute } from "next";
import { getPublicListings } from "@/lib/listing-repository";
import { getPublicProfiles } from "@/lib/profile-repository";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nhaphosg.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [listings, profiles] = await Promise.all([
    getPublicListings(),
    getPublicProfiles(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/feed`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/nha-ban`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${siteUrl}/kien-thuc`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/gui-nhu-cau`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/gui-nha-ban`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const listingRoutes: MetadataRoute.Sitemap = listings.map((item) => ({
    url: `${siteUrl}/nha-ban/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const profileRoutes: MetadataRoute.Sitemap = profiles.map((item) => ({
    url: `${siteUrl}/doi-ngu/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...listingRoutes, ...profileRoutes];
}
