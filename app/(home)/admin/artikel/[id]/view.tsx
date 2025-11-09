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
import Image from 'next/image';
import * as y from 'yup';
import { createArticle, updateArticle } from '../actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const schema: y.ObjectSchema<
  Database['public']['Tables']['articles']['Insert']
> = y.object({
  id: y.number().optional(),
  created_at: y.string().optional(),
  author: y.string().optional(),
  content: y.string().required('Wajib diisi'),
  picture_url: y.string().optional(),
  slug: y.string().required('Wajib diisi'),
  tags: y.string().optional(),
  title: y.string().required('Wajib diisi'),
});

const View = ({
  data,
}: {
  data?: Database['public']['Tables']['articles']['Row'];
}) => {
  const nav = useRouter();

  const form = useFormik<Database['public']['Tables']['articles']['Insert']>({
    initialValues: {
      title: data?.title ?? '',
      slug: data?.slug ?? '',
      content: data?.content ?? '',
      picture_url: data?.picture_url ?? '',
      tags: data?.tags ?? '',
      author: data?.author ?? '',
    },
    validationSchema: schema,
    onSubmit: async (val) => {
      const res = await (data?.id
        ? updateArticle({ id: data.id, data: val })
        : createArticle({ data: val }));

      const msg = data?.id ? 'mengedit artikel' : 'menambahkan artikel';
      if (res.success) {
        toast.success('Berhasil ' + msg);
        nav.replace('/admin/artikel');
      } else toast.error(res.message ?? 'Gagal ' + msg);
    },
  });

  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>{data?.id ? 'Edit' : 'Tambah'} Artikel</CardTitle>
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

            {form.values.picture_url && isURL(form.values.picture_url) && (
              <div className="max-w-60 overflow-hidden rounded-xl bg-secondary">
                <Image
                  src={form.values.picture_url}
                  alt=""
                  width={1920}
                  height={1080}
                />
              </div>
            )}

            <InputWrap
              label="URL gambar"
              error={form.errors.picture_url}
              required
            >
              <Input
                id="picture_url"
                name="picture_url"
                value={form.values.picture_url ?? ''}
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

            <InputWrap label="Editor" error={form.errors.author} required>
              <Input
                id="author"
                name="author"
                value={form.values.author ?? ''}
                onChange={form.handleChange}
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

export default View;
