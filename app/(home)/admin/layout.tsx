import Container from '@/components/molecules/container';
import { NavigationList } from '@/components/molecules/navigation';
import { LayoutIcon, LibraryBigIcon, NewspaperIcon } from 'lucide-react';
import React from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Container>
        <NavigationList
          navs={[
            {
              label: 'Dasbor',
              href: '/admin',
              icon: <LayoutIcon />,
            },
            {
              label: 'Artikel',
              href: '/admin/artikel',
              icon: <NewspaperIcon />,
            },
            {
              label: 'Materi belajar',
              href: '/admin/belajar/0',
              icon: <LibraryBigIcon />,
            },
          ]}
        />
      </Container>
      {children}
    </>
  );
}
