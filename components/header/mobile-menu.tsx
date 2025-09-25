'use client';

import { navigation } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/base-button';
import { ThemeSwitcher } from '@/components/theme-switcher';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
        <MenuIcon size={16} className="text-muted-foreground" />
      </Button>
      <div
        className={cn(
          'fixed top-[53px] right-0 left-0 flex h-[20rem] border-b border-border/50 rounded-b-xl w-full flex-col gap-4 bg-background/95 backdrop-blur-sm p-4 md:p-8',
          'sm:top-[69px] sm:h-[calc(100vh-69px)]',
          isOpen ? 'flex' : 'hidden'
        )}
      >
        {navigation.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="sm:text-lg"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <div className="flex flex-col items-center gap-4">
          <ThemeSwitcher />
          <Button className="w-full" variant="primary" asChild onClick={() => setIsOpen(false)}>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </>
  );
};
