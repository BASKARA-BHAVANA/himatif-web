'use client';

import { usePathname } from 'next/navigation';
import { ComponentProps, ReactNode } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NavigationList = ({
  navs,
  className,
  ...props
}: {
  navs: { href: string; label: string; icon?: ReactNode }[];
} & ComponentProps<'div'>) => {
  const pathname = usePathname();

  return (
    <div
      className={cn('flex flex-wrap items-center gap-3', className)}
      {...props}
    >
      {navs.map((nav, i) => (
        <Button
          key={i}
          variant={pathname == nav.href ? 'secondary' : 'ghost'}
          asChild
        >
          <Link href={nav.href}>
            {nav.icon} {nav.label}
          </Link>
        </Button>
      ))}
    </div>
  );
};

export { NavigationList };
