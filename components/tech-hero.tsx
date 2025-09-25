
import { Children, type ReactNode } from 'react';
import { Section } from './Section';
import AirpodsLG from './airpods';
import { DockDemo } from '@/app/tech/components/software-dock';
import Image from 'next/image';
import mbp from '@/images/mbp-2.webp';

type HeroProps = {
  image?: ReactNode;
  caption?: string | null;
  title: string;
  children?: ReactNode;
};

export const TechHero = () => (
  <Section className="p-2 sm:p-4">
    <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 lg:gap-8 rounded-lg border bg-background px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 shadow-xs">
        <div className="relative aspect-16/10 w-full max-w-4xl">
          <div className="absolute top-[70%] sm:top-[75%] left-0 z-10 hidden sm:block">
            <AirpodsLG  />
          </div>
          <Image
            src={mbp}
            alt="MacBook Pro"
            width={800}
            height={800}
            className="object-contain w-full h-auto"
            priority
          />
          {/* Position the dock to align with the screen */}
          <div className="absolute top-[70%] sm:top-[75%] left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-sm md:max-w-md">
            <DockDemo />
          </div>
        </div>
      </div>
  </Section>
);
