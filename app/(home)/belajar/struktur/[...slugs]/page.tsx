import Container from '@/components/molecules/container';
import { CourseCard } from '@/components/organisms/course';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { ArrowUpRightIcon, HomeIcon } from 'lucide-react';
import Link from 'next/link';
import { Fragment } from 'react/jsx-runtime';

const Page = async (props: { params: Promise<{ slugs: string[] }> }) => {
  const { slugs } = await props.params;

  const fixSlugs = slugs.slice(1);
  const headSlug = fixSlugs.at(-1);

  const supabase = await createClient();

  const query = supabase
    .from('courses')
    .select('id, title, slug, tags, courses(id)');

  if (headSlug) {
    query.eq('courses.slug', headSlug).not('course_id', 'is', null);
  } else query.is('course_id', null);

  const courses = await query;
  const parentCourses = headSlug
    ? await supabase
        .from('courses')
        .select('id, title, slug, tags')
        .in('slug', fixSlugs)
    : undefined;

  const fixParentCourses = fixSlugs
    .map((s) => parentCourses?.data?.find((item) => item.slug === s))
    .filter(Boolean);

  return (
    <>
      <Container className="max-w-3xl py-12">
        <div className="flex flex-col items-center -space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-primary p-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Bridging Informatics
            </p>
          </div>
          <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3 text-center">
            Eksplorasi Dunia Informatika
          </h1>
        </div>
      </Container>

      <Container>
        {fixParentCourses.length > 0 && (
          <>
            <Breadcrumb className="mb-3">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/belajar/struktur/0">
                    <HomeIcon size={16} />
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {fixParentCourses.map((dat, i) => (
                  <Fragment key={i}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">{dat?.title}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="mb-6 flex items-center gap-3">
              <h4 className="typo-h4">{fixParentCourses.at(-1)?.title}</h4>
              <Button asChild>
                <Link href={`/belajar/${fixParentCourses.at(-1)?.slug}`}>
                  Buka <ArrowUpRightIcon />
                </Link>
              </Button>
            </div>
          </>
        )}

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {courses.data?.map((dat, i) => (
            <CourseCard
              key={i}
              data={dat}
              href={
                dat.courses.length > 0
                  ? `/belajar/struktur/0/${fixSlugs.join('/')}/${dat.slug}`
                  : undefined
              }
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Page;
