import type { Metadata } from 'next';
import { Apps } from './components/apps';
import { Attribution } from './components/attribution';
import { Hero } from './components/hero';
import { generateMetadata as generateMeta, generateStructuredData, SITE_CONFIG } from '@/lib/metadata';

export const metadata: Metadata = generateMeta({
  title: `${SITE_CONFIG.name} - Technology Stack & Tools`,
  description: `Explore the modern web technologies and tools ${SITE_CONFIG.name} uses to build exceptional web applications. From React and Next.js to Supabase and Tailwind CSS - discover the tech stack behind the projects.`,
  path: '/tech',
  type: 'website',
  tags: [
    'Technology Stack',
    'Web Development Tools',
    'React',
    'Next.js',
    'TypeScript',
    'Supabase',
    'Tailwind CSS',
    'Development Tools',
    'Software Stack',
    'Tech Stack',
    'Modern Web Technologies'
  ]
});

const Stack = async () => {
  const structuredData = generateStructuredData('WebSite', {
    name: 'Technology Stack',
    description: 'Comprehensive overview of the modern web technologies and development tools used.',
    url: `${SITE_CONFIG.url}/tech`
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
      <Apps />
      <Attribution />
    </>
  );
};

export default Stack;
