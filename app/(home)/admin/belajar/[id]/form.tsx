'use client';

import Container from '@/components/molecules/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import InputWrap from '@/components/ui/input-wrap';
import RichTextInput from '@/components/ui/richtext-input';
import { Database } from '@/lib/types/database.types';
import { isURL, toSlug } from '@/lib/utils';
import { useFormik } from 'formik';
import * as y from 'yup';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { createCourse, updateCourse } from '../actions';
import { CornerLeftDownIcon } from 'lucide-react';
import Link from 'next/link';

const schema: y.ObjectSchema<
  Database['public']['Tables']['courses']['Insert']
> = y.object({
  id: y.number().optional(),
  course_id: y.number().optional(),
  created_at: y.string().optional(),
  content: y.string().required('Wajib diisi'),
  file_url: y.string().required('Wajib diisi'),
  slug: y.string().required('Wajib diisi'),
  tags: y.string().optional(),
  title: y.string().required('Wajib diisi'),
});

const Form = ({
  data,
  parentData,
}: {
  data?: Database['public']['Tables']['courses']['Row'];
  parentData?: Pick<
    Database['public']['Tables']['courses']['Row'],
    'id' | 'title'
  >;
}) => {
  const nav = useRouter();

  const form = useFormik<Database['public']['Tables']['courses']['Insert']>({
    initialValues: {
      content: data?.content ?? '',
      file_url: data?.file_url ?? '',
      slug: data?.slug ?? '',
      tags: data?.tags ?? '',
      title: data?.title ?? '',
    },
    validationSchema: schema,
    onSubmit: async (val) => {
      const res = await (data?.id
        ? updateCourse({ id: data.id, data: val })
        : createCourse({
            data: { ...val, course_id: parentData?.id },
          }));

      const msg = data?.id ? 'mengedit materi' : 'menambahkan materi';
      if (res.success) {
        toast.success('Berhasil ' + msg);
        nav.replace('/admin/belajar/' + (res.data?.course_id ?? '0'));
      } else toast.error(res.message ?? 'Gagal ' + msg);
    },
  });

  return (
    <Container>
      {parentData && (
        <div className="mb-3 flex items-center gap-2">
          <CornerLeftDownIcon
            size={14}
            className="relative top-1 text-muted-foreground"
          />
          <small className="typo-small text-muted-foreground">
            Submateri dari
          </small>
          <Link href={`/admin/belajar/${parentData.id}`}>
            <h4 className="typo-h4">{parentData.title}</h4>
          </Link>
        </div>
      )}
      <Card>
        <CardHeader>
          <CardTitle>{data?.id ? 'Edit' : 'Tambah'} Materi</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit} className="flex flex-col gap-6">
            <InputWrap label="Judul" error={form.errors.title} required>
              <Input
                id="title"
                name="title"
                value={form.values.title}
                onChange={(e) => {
                  form.handleChange(e);
                  form.setFieldValue('slug', toSlug(e.target.value));
                }}
              />
            </InputWrap>

            <InputWrap label="Slug" error={form.errors.slug} required>
              <Input
                id="slug"
                name="slug"
                value={form.values.slug}
                onChange={form.handleChange}
              />
            </InputWrap>

            {form.values.file_url && isURL(form.values.file_url) && (
              <div className="aspect-video max-w-md overflow-hidden rounded-xl bg-secondary">
                <iframe src={form.values.file_url} className="size-full" />
              </div>
            )}

            <InputWrap
              label="URL drive"
              error={form.errors.file_url}
              hint="Salin tautan /preview fail dari Google Drive. Pastikan fail memiliki akses publik"
              required
            >
              <Input
                id="file_url"
                name="file_url"
                value={form.values.file_url ?? ''}
                onChange={form.handleChange}
              />
            </InputWrap>

            <InputWrap label="Konten" error={form.errors.content} required>
              <RichTextInput
                value={form.values.content ?? ''}
                error={form.errors.content}
                onChange={(v) => form.setFieldValue('content', v)}
              />
            </InputWrap>

            <InputWrap
              label="Tags"
              error={form.errors.tags}
              hint="Pisahkan dengan koma ',' tanpa spasi"
              required
            >
              <Input
                id="tags"
                name="tags"
                value={form.values.tags ?? ''}
                onChange={form.handleChange}
              />
            </InputWrap>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={form.isSubmitting}>
                {form.isSubmitting ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Form;
