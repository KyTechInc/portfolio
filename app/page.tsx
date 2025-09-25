/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import type { Metadata } from "next";
import { Banner } from "@/components/banner";
import BlogSection from "@/components/blog-section";
import { Currently } from "@/components/current";
import GithubActivity from "@/components/github-activity";
import { Hero } from "@/components/hero";
import { generateMetadata, generateStructuredData, SITE_CONFIG } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: `${SITE_CONFIG.name} - Full Stack Developer & Portfolio`,
  description: `${SITE_CONFIG.description} Explore my latest projects, blog posts, and get in touch for collaboration opportunities.`,
  path: '/',
  type: 'website',
  tags: [
    'Portfolio',
    'Full Stack Developer',
    'Web Development',
    'React Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'JavaScript Developer'
  ]
});

export default function Home() {
  const structuredData = generateStructuredData('WebSite', {
    description: 'Portfolio and blog of Kyle McCracken, a Full Stack Developer specializing in React, Next.js, and modern web technologies.',
    url: SITE_CONFIG.url
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <Hero />
      <Currently />
      <Banner />
      <BlogSection />
      <GithubActivity />
    </>
  );
}

