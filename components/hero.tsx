import { Button } from "@/components/ui/base-button";
import Image from "next/image";
import { Section } from "@/components/Section";
import { tech } from "@/data/tech";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";

export function Hero() {
  return (
    <Section className="w-full grid grid-cols-1 xl:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12 bg-background border border-border/50 rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col flex-1 px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-16 gap-4 sm:gap-6 lg:gap-8 prose-ui max-w-2xl mx-auto xl:mx-0">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            Kyle McCracken
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-mono font-semibold leading-tight text-foreground">
          Full Stack Developer
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-xl">
          A full stack developer with a passion for building scalable and
          efficient web applications.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 lg:gap-4 items-start sm:items-center">
          <Button>
            Lets Chat
          </Button>
          <Button variant="outline">
            <Link className="flex items-center gap-1" href="/blog">Latest Blog Post <ArrowUpRightIcon size={16} /></Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 pt-2 sm:pt-4">
          {tech.stack
            .filter((app) => app.category === "Development")
            .slice(0, 6) // Show up to 6 items
            .map((app) => (
              <Button
                key={app.title}
                className="h-8 sm:h-9 lg:h-10"
                variant="outline"
                size="sm"
              >
                <Image
                  src={`https://img.logo.dev/${app.imageUrl}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=36&format=png&retina=true`}
                  alt={app.title}
                  width={20}
                  height={20}
                  className="hover:rotate-6 rounded-md bg-background mr-1.5 sm:mr-2"
                />
                <span className="text-xs text-muted-foreground font-medium font-mono flex items-center gap-1">
                  {app.title}
                </span>
              </Button>
            ))}
        </div>
      </div>
      <div className="order-2 xl:order-none w-full flex justify-center items-center px-2 sm:px-4 pb-6 sm:pb-8 lg:pb-12 xl:pb-0">
      <Terminal className="w-full max-w-[480px] sm:max-w-[520px] md:max-w-[560px] lg:max-w-[620px] xl:max-w-[680px] h-[280px] xs:h-[320px] sm:h-[380px] md:h-[440px] lg:h-[500px] xl:h-[540px] font-mono text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] lg:text-[14px]">
      <TypingAnimation delay={0}>$ docker compose up</TypingAnimation>
      <AnimatedSpan delay={800} className="text-blue-500 dark:text-blue-600">
        [+] Running 2/2
      </AnimatedSpan>
      <AnimatedSpan delay={1200} className="dark:text-lime-500 text-lime-600">
        ⠿ Container nextjs-app  Started
      </AnimatedSpan>
      <AnimatedSpan delay={1600} className="dark:text-lime-500 text-lime-600">
        ⠿ Container postgres-db  Started
      </AnimatedSpan>
      <AnimatedSpan delay={2000} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | $ bun install
      </AnimatedSpan>
      <AnimatedSpan delay={2400} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | bun install v1.2.22
      </AnimatedSpan>
      <AnimatedSpan delay={2800} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | + next@15.5.5
      </AnimatedSpan>
      <AnimatedSpan delay={3200} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | + react@19.1.0
      </AnimatedSpan>
      <AnimatedSpan delay={3600} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | + typescript@5.7.3
      </AnimatedSpan>
      <AnimatedSpan delay={4000} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | 5 packages installed
      </AnimatedSpan>
      <AnimatedSpan delay={4400} className="dark:text-cyan-400 text-cyan-600">
        nextjs-app  | $ bun run dev
      </AnimatedSpan>
      <AnimatedSpan delay={4800} className="dark:text-lime-500 text-lime-600">
        nextjs-app  | ▲ Next.js 15.5.5
      </AnimatedSpan>
      <AnimatedSpan delay={5200} className="dark:text-lime-500 text-lime-600">
        nextjs-app  | - Local:        http://localhost:3000
      </AnimatedSpan>
      <AnimatedSpan delay={5600} className="dark:text-lime-500 text-lime-600">
        nextjs-app  | - Environments: .env.local
      </AnimatedSpan>
      <AnimatedSpan delay={6000} className="dark:text-lime-500 text-lime-600">
        nextjs-app  | ✓ Ready in 700ms
      </AnimatedSpan>
    </Terminal>
      </div>
    </Section>
  );
}
