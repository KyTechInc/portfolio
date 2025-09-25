/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import type { Metadata } from "next";
import { AboutHero } from '@/components/about-hero'
import { generateMetadata, generateStructuredData, SITE_CONFIG } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: `About ${SITE_CONFIG.name} - Full Stack Developer`,
  description: `Learn more about ${SITE_CONFIG.name}, a passionate Full Stack Developer with expertise in React, Next.js, TypeScript, and modern web technologies. Discover my journey, skills, and experience in building scalable web applications.`,
  path: '/about',
  type: 'website',
  tags: [
    'About Me',
    'Full Stack Developer',
    'Software Engineer',
    'Web Developer',
    'Portfolio',
    'Experience',
    'Skills',
    'Background'
  ]
});

export default function AboutPage() {
  const structuredData = generateStructuredData('Person', {
    name: SITE_CONFIG.name,
    jobTitle: 'Full Stack Developer',
    description: SITE_CONFIG.description,
    url: `${SITE_CONFIG.url}/about`
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div>
        <AboutHero />
      </div>
    </>
  );
}
