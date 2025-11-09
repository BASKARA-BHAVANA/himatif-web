'use server';

import { flashGet } from '@/lib/flash';
import { ActionResult } from '@/lib/types/global.types';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

const FlashActionResult = async () => {
  const flash = await flashGet<ActionResult>();
  if (!flash) return;

  return (
    <Alert className="mb-6" variant={flash.success ? 'success' : 'destructive'}>
      <AlertTitle>{flash.success ? 'Berhasil' : 'Gagal'}</AlertTitle>
      <AlertDescription>{flash.message}</AlertDescription>
    </Alert>
  );
};

export { FlashActionResult };
