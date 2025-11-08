import Container from '@/components/molecules/container';
import ExceptionOverlay from '@/components/molecules/exception';
import { CourseListItem } from '@/components/organisms/course';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List } from '@/components/ui/list';
import { createClient } from '@/lib/supabase/server';
import { CornerLeftDownIcon } from 'lucide-react';
import Link from 'next/link';

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const supabase = await createClient();
  const course = await supabase
    .from('courses')
    .select(
      '*, parent:course_id(slug, title), courses(id, title, slug, tags, course_id)'
    )
    .eq('slug', slug)
    .limit(10, { foreignTable: 'courses' })
    .maybeSingle();

  if (!course.data)
    return (
      <ExceptionOverlay title="Materi tidak ditemukan">
        <Button asChild>
          <Link replace href={'/belajar/cari'}>
            Pencarian
          </Link>
        </Button>
      </ExceptionOverlay>
    );

  return (
    <>
      <Container>
        {course.data.parent && (
          <div className="mb-1 flex items-center gap-2">
            <CornerLeftDownIcon
              size={14}
              className="relative top-1 text-muted-foreground"
            />
            <small className="typo-small text-muted-foreground">
              Turunan dari materi
            </small>
            <Link href={`/belajar/${course.data.parent.slug}`}>
              <Badge variant={'secondary'} className="cursor-pointer">
                {course.data.parent.title}
              </Badge>
            </Link>
          </div>
        )}

        <h1 className="typo-h1">{course.data.title}</h1>
        {course.data.tags && (
          <div className="mt-3 flex flex-wrap gap-3">
            {course.data.tags.split(',').map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </div>
        )}
      </Container>

      <Container className="flex flex-col gap-12 lg:flex-row">
        <div className="lg:w-2/3">
          <div className="mb-12 aspect-video overflow-hidden rounded-lg">
            <iframe src={course.data.file_url} className="size-full" />
          </div>

          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: course.data.content ?? '' }}
          ></div>
        </div>
        <div className="lg:w-1/3">
          <Card className="mb-3">
            <CardHeader>
              <CardTitle>Materi terkait</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <List>
                {course.data.courses.length ? (
                  course.data.courses.map((data, i) => (
                    <CourseListItem key={i} data={data} />
                  ))
                ) : (
                  <ExceptionOverlay title="Tidak ada materi lainnya" />
                )}
              </List>
            </CardContent>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Page;
