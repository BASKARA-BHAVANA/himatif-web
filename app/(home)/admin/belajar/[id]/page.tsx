import Container from '@/components/molecules/container';
import ExceptionOverlay from '@/components/molecules/exception';
import { CourseCard } from '@/components/organisms/course';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import {
  ArrowUpRightIcon,
  Edit2Icon,
  PlusIcon,
  Trash2Icon,
} from 'lucide-react';
import Link from 'next/link';
import { deleteCourse } from '../actions';
import { FlashActionResult } from '@/components/molecules/flash';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const supabase = await createClient();

  const query = supabase
    .from('courses')
    .select('id, title, slug, tags, courses(id)');

  if (id != '0') {
    query.eq('course_id', +id).not('course_id', 'is', null);
  } else query.is('course_id', null);

  const courses = await query;
  const parentCourse =
    id != '0'
      ? await supabase
          .from('courses')
          .select('id, title, slug, tags, course_id')
          .eq('id', +id)
          .maybeSingle()
      : undefined;

  return (
    <>
      <Container>
        <FlashActionResult />

        {parentCourse?.data && (
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <>
              <h3 className="typo-h3 grow">{parentCourse.data.title}</h3>
              <Button variant={'secondary'} size={'icon'} asChild>
                <Link href={`/admin/belajar/${parentCourse.data.id}/edit`}>
                  <Edit2Icon />
                </Link>
              </Button>
              <Button variant={'secondary'} size={'icon'} asChild>
                <Link href={`/belajar/${parentCourse.data.slug}`}>
                  <ArrowUpRightIcon />
                </Link>
              </Button>
              <form
                action={async () => {
                  'use server';
                  if (parentCourse.data)
                    await deleteCourse(
                      parentCourse.data.id,
                      '/admin/belajar/' + (parentCourse.data.course_id ?? '0'),
                      parentCourse.data.title
                    );
                }}
              >
                <Button variant="destructive" size="icon">
                  <Trash2Icon />
                </Button>
              </form>
            </>
          </div>
        )}
        <Button className="mb-6" asChild>
          <Link href={`/admin/belajar/${id}/tambah`}>
            <PlusIcon /> Tambah disini
          </Link>
        </Button>

        {courses.data?.length ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {courses.data.map((dat, i) => (
              <CourseCard
                key={i}
                data={dat}
                href={`/admin/belajar/${dat.id}`}
              />
            ))}
          </div>
        ) : (
          <ExceptionOverlay title="Tidak ada submateri" />
        )}
      </Container>
    </>
  );
};

export default Page;
