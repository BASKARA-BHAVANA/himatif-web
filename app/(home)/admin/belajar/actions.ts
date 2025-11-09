'use server';

import { redirect, RedirectType } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Database } from '@/lib/types/database.types';
import { flashSet } from '@/lib/flash';
import { ActionResult } from '@/lib/types/global.types';

type CourseRow = Database['public']['Tables']['courses']['Row'];
type CourseInsert = Database['public']['Tables']['courses']['Insert'];
type CourseUpdate = Database['public']['Tables']['courses']['Update'];

export async function createCourse({
  data,
}: {
  data: CourseInsert;
}): Promise<ActionResult<CourseRow>> {
  const supabase = await createClient();
  try {
    const { error, data: result } = await supabase
      .from('courses')
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

export async function updateCourse({
  id,
  data,
}: {
  id: number;
  data: CourseUpdate;
}): Promise<ActionResult<CourseRow>> {
  const supabase = await createClient();
  try {
    const { error, data: result } = await supabase
      .from('courses')
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

export async function deleteCourse(
  id: number,
  redirectTo: string = '/admin/belajar/0',
  xtra?: string
) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error)
      await flashSet({
        success: false,
        message: error.message,
      } as ActionResult);
    else
      await flashSet({
        success: true,
        message: `Berhasil menghapus materi belajar "${xtra}"`,
      } as ActionResult);
  } catch (err: any) {
    await flashSet({ success: false, message: err.message } as ActionResult);
  }
  redirect(redirectTo, RedirectType.replace);
}
