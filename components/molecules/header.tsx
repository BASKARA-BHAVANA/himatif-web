import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import BrandLogo from './brand-logo';
import Container from './container';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

const Navs = async () => {
  const supabase = await createClient();
  const roles = await supabase.from('user_roles').select();

  return (
    <>
      <Button variant={'ghost'} asChild>
        <Link href={'/artikel'}>Artikel</Link>
      </Button>
      <Button variant={'ghost'} asChild>
        <Link href={'/belajar'}>Belajar</Link>
      </Button>
      {roles.data?.some((d) => d.role == 'admin') && (
        <Button variant={'ghost'} asChild>
          <Link href={'/admin'}>Admin</Link>
        </Button>
      )}
    </>
  );
};

const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 flex w-full border-b bg-background">
      <Container className="flex items-center gap-4 py-4">
        <BrandLogo />

        <div className="grow"></div>

        <div className="hidden items-center gap-4 sm:flex">
          <Navs />
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="sm:hidden" variant={'outline'}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="items-start p-4">
            <div className="mb-8">
              <BrandLogo />
            </div>
            <div className="flex w-full flex-col gap-2 [&>*]:justify-start">
              <Navs />
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
};

export default Header;
