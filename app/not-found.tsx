'use client'

import { Section } from '@/components/Section'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/ui/terminal'
import { ViewAnimation } from '@/providers/view-animation'
import { usePathname } from 'next/navigation'

export default function notFound() {
  const pathname = usePathname()
  return (
    <Section>
        <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        delay={0}
        className="relative"
      >
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl">
            <h1 className="text-6xl md:text-8xl font-mono font-semibold leading-tight text-foreground text-center pb-8">
                {"<404/>"}
            </h1>
        </div>
      <div className="w-full max-w-2xl">
        <Terminal className="text-foreground text-xl font-mono bg-card border-border mx-auto h-auto" sequence={true} startOnView={true}>
          <div className="mb-4">
            <TypingAnimation delay={400} duration={35} className="text-lime-400 dark:text-lime-300">
              $ next start
            </TypingAnimation>
          </div>

          <div className="mb-2">
            <TypingAnimation delay={800} duration={22} className="">
              {"\ninfo  - Loaded env from .env.local"}
            </TypingAnimation>
          </div>

          <div className="mb-2">
            <TypingAnimation delay={1100} duration={22} className="">
              {"info  - Using App Router • React Server Components"}
            </TypingAnimation>
          </div>

          <div className="mb-4">
            <TypingAnimation delay={1400} duration={22} className="">
              {"ready - started server on http://localhost:3000"}
            </TypingAnimation>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={1800}>
              <TypingAnimation delay={0} duration={24} className="">
                {`GET  ${pathname}  →  Route (app)`}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={2100}>
              <TypingAnimation delay={0} duration={24} className="text-rose-500 dark:text-rose-400">
                {"404  Not Found"}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={2400}>
              <TypingAnimation delay={0} duration={22} className="">
                {"match: file-system routes  ✗  (miss)"}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={2700}>
              <TypingAnimation delay={0} duration={22} className="">
                {"match: dynamic segments     ✗  (miss)"}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={3000}>
              <TypingAnimation delay={0} duration={22} className="">
                {"match: rewrites / middleware ✗  (miss)"}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-4">
            <AnimatedSpan delay={3300}>
              <TypingAnimation delay={0} duration={22} className="">
                {"result: render /not-found (classic 404)"}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={3600}>
              <TypingAnimation delay={0} duration={26} className="text-amber-400 dark:text-amber-300">
                {`hint: the route "${pathname}" hasn't been generated (yet)`}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={3950}>
              <TypingAnimation delay={0} duration={22} className="text-lime-400 dark:text-lime-300">
                {"tip: cd / && try / (aka home)"}
              </TypingAnimation>
            </AnimatedSpan>
          </div>

          <div className="mb-2">
            <AnimatedSpan delay={4250}>
              <TypingAnimation delay={0} duration={24} className="">
                {"\n$ "}
              </TypingAnimation>
            </AnimatedSpan>
          </div>
        </Terminal>
      </div>
    </div>
    </ViewAnimation>
    </Section>
  )
}