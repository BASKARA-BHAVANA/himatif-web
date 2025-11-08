'use client';

import { createClient } from '@/lib/supabase/client';
import { Button, ButtonProps } from '../ui/button';
import { useRouter } from 'next/navigation';

const LogoutButton = ({ ...props }: Partial<ButtonProps>) => {
  const router = useRouter();
  const supabase = createClient();

  const _logout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Button
      variant={'ghost'}
      className="text-primary-foreground"
      onClick={_logout}
      {...props}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
