import { Database } from '@/lib/types/database.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ListItem } from '../ui/list';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ComponentProps } from 'react';

const CourseCard = ({
  data,
  href,
}: {
  data: Pick<
    Database['public']['Tables']['courses']['Row'],
    'id' | 'title' | 'tags' | 'slug'
  > & {
    courses: Partial<
      Pick<Database['public']['Tables']['courses']['Row'], 'id' | 'title'>
    >[];
  };
  href?: string;
}) => {
  return (
    <Card className="flex aspect-square flex-col overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary">
      <CardHeader>
        <CardTitle>
          <Link
            href={href ?? `/belajar/${data.slug}`}
            className="hover:underline"
          >
            {data.title}
          </Link>
        </CardTitle>
        <CardDescription>{data.courses.length ?? 0} submateri</CardDescription>
      </CardHeader>
      <CardContent className="flex grow">
        <div className="mt-auto flex flex-wrap items-end gap-3">
          {data.tags
            ?.split(',')
            .filter(Boolean)
            .map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

const CourseListItem = ({
  data,
  slotRight,
  ...props
}: {
  data: Pick<
    Database['public']['Tables']['courses']['Row'],
    'id' | 'title' | 'tags' | 'slug'
  >;
} & Partial<ComponentProps<typeof ListItem>>) => {
  return (
    <ListItem
      title={data.title}
      subtitle={data.tags?.split(',').filter(Boolean).join(', ') ?? ''}
      slotRight={
        <>
          <Button variant={'outline'} size={'icon'}>
            <Link href={`/belajar/${data.slug}`}>
              <ArrowUpRightIcon />
            </Link>
          </Button>
          {slotRight}
        </>
      }
      {...props}
    />
  );
};

export { CourseCard, CourseListItem };
