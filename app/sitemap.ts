import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { INITIAL_SERVICES, INITIAL_INDUSTRIES, INITIAL_CASE_STUDIES, INITIAL_BLOG_POSTS } from "@/lib/mock-store";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/industries",
    "/case-studies",
    "/blog",
    "/contact",
    "/book-a-call",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const serviceRoutes = INITIAL_SERVICES.map((serv) => ({
    url: `${SITE_URL}/services/${serv.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const industryRoutes = INITIAL_INDUSTRIES.map((ind) => ({
    url: `${SITE_URL}/industries/${ind.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const caseStudyRoutes = INITIAL_CASE_STUDIES.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogRoutes = INITIAL_BLOG_POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.published_at || new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...industryRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
  ];
}
