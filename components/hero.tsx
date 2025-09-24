import { Button } from "@/components/ui/base-button";
import Image from "next/image";
import { Section } from "@/components/Section";
import { tech } from "@/data/tech";
import { PixelatedCanvas } from "./ui/pixelated-canvas";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Code } from "./animate-ui/components/animate/code";
import { HeroCode } from "./hero-code";

export function Hero() {
  return (
    <Section className="w-full flex flex-col md:flex-row items-stretch justify-between bg-background border border-border overflow-hidden shadow-lg">
      <div className="flex flex-col flex-1 px-6 py-8 md:px-10 md:py-16 gap-6 md:gap-8 prose-ui">
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
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
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
      <div className="p-4 m-4">
      <HeroCode duration={10000} delay={500} writing={true} cursor={true} />
      </div>
    </Section>
  );
}
