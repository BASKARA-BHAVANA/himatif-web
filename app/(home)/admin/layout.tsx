import Container from '@/components/molecules/container';
import { NavigationList } from '@/components/molecules/navigation';
import { createClient } from '@/lib/supabase/server';
import { LayoutIcon, LibraryBigIcon, NewspaperIcon } from 'lucide-react';
import { redirect, RedirectType } from 'next/navigation';
import React from 'react';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const roles = await supabase.from('user_roles').select();

  console.log(roles);

  if (!roles.data?.some((d) => d.role == 'admin'))
    redirect('/', RedirectType.replace);

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
