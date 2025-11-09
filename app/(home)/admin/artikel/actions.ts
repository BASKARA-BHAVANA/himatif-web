'use server';

import { redirect, RedirectType } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/types/database.types';
import { flashSet } from '@/lib/flash';
import { ActionResult } from '@/lib/types/global.types';

type ArticleRow = Database['public']['Tables']['articles']['Row'];
type ArticleInsert = Database['public']['Tables']['articles']['Insert'];
type ArticleUpdate = Database['public']['Tables']['articles']['Update'];

export async function createArticle({
  data,
}: {
  data: ArticleInsert;
}): Promise<ActionResult<ArticleRow>> {
  const supabase = await createClient();
  try {
    const { error, data: result } = await supabase
      .from('articles')
      .insert(data)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Terjadi masalah yang tidak diketahui',
    };
  }
}

export async function updateArticle({
  id,
  data,
}: {
  id: number;
  data: ArticleUpdate;
}): Promise<ActionResult<ArticleRow>> {
  const supabase = await createClient();
  try {
    const { error, data: result } = await supabase
      .from('articles')
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || 'Terjadi masalah yang tidak diketahui',
    };
  }
}

export async function deleteArticle(
  id: number,
  redirectTo: string = '/admin/artikel'
) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error)
      await flashSet({
        success: false,
        message: error.message,
      } as ActionResult);
  } catch (err: any) {
    await flashSet({ success: false, message: err.message } as ActionResult);
  }
  redirect(redirectTo, RedirectType.replace);
}
