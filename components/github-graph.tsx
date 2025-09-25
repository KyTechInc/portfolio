"use client";

import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
} from "@/components/ui/kibo-ui/contribution-graph";
import { cn } from "@/lib/utils";

interface ContributionData {
  date: string;
  count: number;
  level: number;
}

interface GithubGraphProps {
  data: ContributionData[];
}

const GithubGraph = ({ data }: GithubGraphProps) => {
  return (
    <ContributionGraph data={data}>
      <ContributionGraphCalendar>
        {({ activity, dayIndex, weekIndex }) => (
          <ContributionGraphBlock
            activity={activity}
            className={cn(
                'data-[level="0"]:fill-muted dark:data-[level="0"]:fill-card',
                'data-[level="1"]:fill-lime-200 dark:data-[level="1"]:fill-lime-950',
                'data-[level="2"]:fill-lime-400 dark:data-[level="2"]:fill-lime-800',
                'data-[level="3"]:fill-lime-500 dark:data-[level="3"]:fill-lime-600',
                'data-[level="4"]:fill-lime-600 dark:data-[level="4"]:fill-lime-400'
              )}
            dayIndex={dayIndex}
            weekIndex={weekIndex}
          />
        )}
      </ContributionGraphCalendar>
      <ContributionGraphFooter />
    </ContributionGraph>
  );
};

export default GithubGraph;
