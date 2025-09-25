import { Button } from "@/components/ui/base-button";
import { Section } from "@/components/Section";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { PixelatedCanvas } from "./ui/pixelated-canvas";

export function AboutHero() {
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
      </div>
      <div className="mx-auto mt-6 sm:mt-8 px-4 sm:px-6 lg:px-8">
      <PixelatedCanvas
        src="/kyle-no_bg.webp"
        width={400}
        height={500}
        cellSize={3}
        dotScale={0.9}
        shape="square"
        backgroundColor="#000000"
        dropoutStrength={0.4}
        interactive
        distortionStrength={3}
        distortionRadius={80}
        distortionMode="swirl"
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={4}
        sampleAverage
        tintColor="#FFFFFF"
        tintStrength={0.2}
        className="rounded-xl shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg"
      />
      </div>
    </Section>
  );
}
