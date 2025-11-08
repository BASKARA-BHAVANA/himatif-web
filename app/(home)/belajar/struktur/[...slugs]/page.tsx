import Container from '@/components/molecules/container';
import { EllipsisPagination } from '@/components/molecules/pagination';
import { CourseListItem } from '@/components/organisms/course';
import { List } from '@/components/ui/list';
import { createClient } from '@/lib/supabase/server';

const Page = async (props: {
  params: Promise<{ slugs: string[] }>;
  searchParams: Promise<{ limit?: number; page?: number }>;
}) => {
  const {} = await props.params;
  const { limit = 20, page = 1 } = await props.searchParams;

  //   const fixSlugs = slugs.slice(1);
  //   const headSlug = fixSlugs.at(-1);

  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;
  const courses = await supabase
    .from('courses')
    .select('id, title, slug, tags', { count: 'exact' })
    .limit(limit)
    .range(from, to);

  return (
    <>
      <Container className="max-w-3xl py-12">
        <div className="mb-12 flex flex-col items-center -space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-primary p-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Materi Belajar
            </p>
          </div>
          <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3 text-center">
            Eksplorasi Dunia Informatika
          </h1>
        </div>
      </Container>

      <Container>
        <List>
          {courses.data?.map((dat, i) => (
            <CourseListItem key={i} data={dat} />
          ))}
        </List>
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
