import type { Metadata } from 'next'
import { Section } from '@/components/Section'
import { Terminal, TypingAnimation, AnimatedSpan } from '@/components/ui/terminal'
import { ViewAnimation } from '@/providers/view-animation'
import { generateMetadata, generateStructuredData, SITE_CONFIG } from '@/lib/metadata'

export const metadata: Metadata = generateMetadata({
  title: `404 - Page Not Found | ${SITE_CONFIG.name}`,
  description: 'Oops! The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.',
  path: '/404',
  type: 'website',
  tags: [
    '404',
    'Page Not Found',
    'Error Page',
    'Not Found'
  ]
});

export default function NotFound() {
  const structuredData = generateStructuredData('WebSite', {
    name: '404 - Page Not Found',
    description: 'The requested page could not be found on this website.',
    url: `${SITE_CONFIG.url}/404`
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
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
                {"GET  /unknown-route  →  Route (app)"}
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
                {"hint: the route \"/unknown-route\" hasn't been generated (yet)"}
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
    </>
  )
}