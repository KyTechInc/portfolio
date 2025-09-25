import { Suspense } from 'react'
import { Section } from './Section'
import GithubGraph from './github-graph'
import { unstable_cache } from "next/cache";
import { Container } from './container';
import { ViewAnimation } from '@/providers/view-animation';

interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubContributionsResponse {
  total: Record<number, number>;
  contributions: GitHubContribution[];
}

const username = 'KyTechInc';

const getCachedContributions = unstable_cache(
  async () => {
    const url = new URL(`/v4/${username}`, 'https://github-contributions-api.jogruber.de');
    const response = await fetch(url);
    const data = (await response.json()) as GitHubContributionsResponse;
    const total = data.total[new Date().getFullYear()];

    return { contributions: data.contributions, total };
  },
  ['github-contributions'],
  { revalidate: 60 * 60 * 24 },
);

export default async function GithubActivity() {
  const { contributions } = await getCachedContributions();

  // Transform API data to match component expectations
  const data = contributions.map((contribution: GitHubContribution) => ({
    date: contribution.date,
    count: contribution.count,
    level: Math.min(4, Math.floor((contribution.count / 10) * 4)), // Scale level based on count
  }));

  return (
    <Section className="col-span-full h-[14rem]">
      <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        delay={0.4}
        className="relative pt-8 px-8"
      >
        <div className="w-full overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
        <GithubGraph data={data} />
        </Suspense>
        </div>
        </ViewAnimation>
    </Section>
  )
}
