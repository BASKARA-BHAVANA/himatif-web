import Container from '@/components/molecules/container';
import { EllipsisPagination } from '@/components/molecules/pagination';
import { ArticleCard } from '@/components/organisms/article';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/server';

const Page = async (props: {
  searchParams: Promise<{ search?: string; page?: number; limit?: number }>;
}) => {
  const { search = '', limit = 10, page = 1 } = await props.searchParams;

  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const articles = await supabase
    .from('articles')
    .select('*', { count: 'exact' })
    .or(`title.ilike.%${search}%,tags.ilike.%${search}%`)
    .limit(limit)
    .range(from, to);

  return (
    <>
      <Container className="max-w-3xl py-12">
        <div className="mb-12 flex flex-col items-center -space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-primary p-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Artikel
            </p>
          </div>
          <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3 text-center">
            Himatif: Apa yang Baru?
          </h1>
        </div>
        <form method="get">
          <Input
            autoFocus
            name="search"
            defaultValue={search}
            placeholder="Cari..."
          />
        </form>
      </Container>

      <Container className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {articles.data?.map((dat, i) => (
          <ArticleCard key={i} data={dat} />
        ))}
      </Container>

      <Container className="max-w-fit">
        <EllipsisPagination
          limit={limit}
          page={page}
          totalItems={articles.count ?? 0}
        />
      </Container>
    </>
  );
};

export default Page;
