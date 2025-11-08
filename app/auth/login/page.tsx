'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';

export default function Page() {
  const _login = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle>Login ke Akun Kamu</CardTitle>
        <CardDescription>Login dengan akun google Kamu</CardDescription>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Button size={'lg'} className="w-full" onClick={_login}>
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
            width={20}
            height={20}
            alt=""
          />
          Lanjutkan dengan Google
        </Button>
      </CardFooter>
    </Card>
  );
}
