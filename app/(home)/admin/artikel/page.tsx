import Container from '@/components/molecules/container';
import { FlashActionResult } from '@/components/molecules/flash';
import { EllipsisPagination } from '@/components/molecules/pagination';
import { ArticleListItem } from '@/components/organisms/article';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { List } from '@/components/ui/list';
import { createClient } from '@/lib/supabase/server';
import { Edit2Icon, PlusIcon, Trash2Icon } from 'lucide-react';
import Link from 'next/link';
import { deleteArticle } from './actions';

const Page = async (props: {
  searchParams: Promise<{ search?: string; page?: number; limit?: number }>;
}) => {
  const { search = '', limit = 20, page = 1 } = await props.searchParams;

  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const courses = await supabase
    .from('articles')
    .select('id, title, slug, tags, picture_url', { count: 'exact' })
    .or(`title.ilike.%${search}%,tags.ilike.%${search}%`)
    .order('created_at', { ascending: false })
    .limit(limit)
    .range(from, to);

  return (
    <>
      <Container>
        <FlashActionResult />
        <Card>
          <CardHeader>
            <CardTitle>Daftar Artikel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-3 flex items-center gap-3">
              <form method="get" className="grow">
                <Input
                  autoFocus
                  name="search"
                  defaultValue={search}
                  placeholder="Cari..."
                />
              </form>
              <Button asChild>
                <Link href={'/admin/artikel/tambah'}>
                  <PlusIcon /> Tambah
                </Link>
              </Button>
            </div>
            <List>
              {courses.data?.map((dat, i) => (
                <ArticleListItem
                  key={i}
                  data={dat}
                  slotRight={
                    <>
                      <Button variant={'outline'} size={'icon'}>
                        <Link href={`/admin/artikel/${dat.id}`}>
                          <Edit2Icon />
                        </Link>
                      </Button>
                      <form
                        action={async () => {
                          'use server';
                          await deleteArticle(dat.id, '/admin/artikel');
                        }}
                      >
                        <Button variant="destructive" size="icon">
                          <Trash2Icon />
                        </Button>
                      </form>
                    </>
                  }
                />
              ))}
            </List>
          </CardContent>
        </Card>
      </Container>

      <Container className="max-w-fit">
        <EllipsisPagination
          limit={limit}
          page={page}
          totalItems={courses.count ?? 0}
        />
      </Container>
    </>
  );
};

export default Page;
