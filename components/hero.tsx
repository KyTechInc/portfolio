import { Button } from "@/components/ui/base-button";
import Image from "next/image";
import { Section } from "@/components/Section";
import { tech } from "@/data/tech";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";

export function Hero() {
  return (
    <Section className="w-full grid grid-cols-1 xl:grid-cols-2 items-center gap-8 lg:gap-12 bg-background border border-border/50 rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-col flex-1 px-6 py-10 md:px-10 md:py-16 gap-6 md:gap-8 prose-ui max-w-2xl mx-auto xl:mx-0">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1">
            Kyle McCracken
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-mono font-semibold leading-tight text-foreground">
          Full Stack Developer
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-xl">
          A full stack developer with a passion for building scalable and
          efficient web applications.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-start sm:items-center">
          <Button>
            Lets Chat
          </Button>
          <Button variant="outline">
            <Link className="flex items-center gap-1" href="/blog">Latest Blog Post <ArrowUpRightIcon size={16} /></Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          {tech.stack
            .filter((app) => app.category === "Development")
            .map((app) => (
              <Button
                key={app.title}
                className=""
                variant="outline"
              >
                <Image
                  src={`https://img.logo.dev/${app.imageUrl}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=36&format=png&retina=true`}
                  alt={app.title}
                  width={24}
                  height={24}
                  className="hover:rotate-6 rounded-md bg-background mr-2"
                />
                <span className="text-xs text-muted-foreground font-medium font-mono flex items-center gap-1">
                  {app.title}
                </span>
              </Button>
            ))}
        </div>
      </div>
      <div className="order-2 xl:order-none w-full flex justify-center items-center px-4 pb-8 md:pb-12 xl:pb-0">
      <Terminal className="w-full max-w-[520px] sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] xl:max-w-[720px] h-[340px] sm:h-[400px] md:h-[460px] lg:h-[520px] xl:h-[560px] font-mono text-[12px] sm:text-[13px] md:text-[14px]">
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
