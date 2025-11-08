import BrandLogo from '@/components/molecules/brand-logo';
import Container from '@/components/molecules/container';
import Link from 'next/link';
import { Button } from '../ui/button';
import { createClient } from '@/lib/supabase/server';
import LogoutButton from './logout-button';

const Footer = async () => {
  const supabase = await createClient();
  const user = await supabase.auth.getSession();

  return (
    <div className="w-screen bg-primary p-4">
      <Container className="flex flex-col items-center">
        <div className="mb-2">
          <BrandLogo />
        </div>
        <p className="typo-p mb-8 mt-2 max-w-sm text-center text-primary-foreground">
          Himpunan Mahasiswa Teknik Informatika UIN Sunan Gunung Djati Bandung
        </p>
        <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
          <Button variant={'ghost'} className="text-primary-foreground" asChild>
            <Link href={'/kebijakan-privasi'}>Kebijakan privasi</Link>
          </Button>
          <Button variant={'ghost'} className="text-primary-foreground" asChild>
            <Link href={'/developer'}>Developer</Link>
          </Button>
          {user.data.session ? (
            <LogoutButton />
          ) : (
            <Button
              variant={'ghost'}
              className="text-primary-foreground"
              asChild
            >
              <Link href={'/auth/login'}>Login</Link>
            </Button>
          )}
        </div>
        <small className="typo-small text-primary-foreground">
          @ 2025 Nalar dan Intelektual | All Rights Reserved
        </small>
      </Container>
    </div>
  );
};

export default Footer;
