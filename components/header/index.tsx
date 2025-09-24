import { Button } from '@/components/ui/base-button';
import { navigation } from '@/lib/navigation';
import { HeaderProvider } from '@/providers/header';
import Image from 'next/image';
import Link from 'next/link';
import { ViewAnimation } from '../../providers/view-animation';
import { ActiveLink } from '../active-link';
import { MobileMenu } from './mobile-menu';
import { ThemeSwitcher } from '../theme-switcher';

export const Header = () => (
  <HeaderProvider className="container fixed top-0 right-0 left-0 z-50 mx-auto flex items-center justify-between border bg-backdrop/90 px-4 py-2 backdrop-blur-md transition-all sm:py-4">
    <div className="w-32">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
      >
        <Link href="/" aria-label="Hayden Bleasel">
          <Image
            src="/headshot.webp"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 overflow-hidden rounded-full object-cover"
            priority
          />
        </Link>
      </ViewAnimation>
    </div>
    <nav className="hidden gap-6 md:flex">
      {navigation.map((link, index) => (
        <ViewAnimation
          key={link.href}
          initial={{ opacity: 0, translateY: -8 }}
          whileInView={{ opacity: 1, translateY: 0 }}
          delay={0.4 + index * 0.1}
        >
          <ActiveLink href={link.href}>{link.label}</ActiveLink>
        </ViewAnimation>
      ))}
    </nav>
    <div className="hidden w-32 justify-end md:flex">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.8}
        className="flex items-center gap-2"
      >
        <ThemeSwitcher />
        <Button variant="outline" size="sm" asChild>
          <Link href="/contact">Get in touch</Link>
        </Button>
      </ViewAnimation>
    </div>
    <div className="flex w-32 justify-end md:hidden">
      <ViewAnimation
        initial={{ opacity: 0, translateY: -8 }}
        whileInView={{ opacity: 1, translateY: 0 }}
        delay={0.8}
      >
        <MobileMenu />
      </ViewAnimation>
    </div>
  </HeaderProvider>
);
