import { Database } from '@/lib/types/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ListItem } from '../ui/list';
import { ArrowUpRightIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { ComponentProps } from 'react';

interface CourseCardProps {
  data: Pick<
    Database['public']['Tables']['courses']['Row'],
    'id' | 'title' | 'tags' | 'slug'
  >;
}

const CourseCard = ({ data }: CourseCardProps) => {
  return (
    <Card className="transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary">
      <CardHeader>
        <CardTitle>
          <Link href={`/belajar/${data.slug}`} className="hover:underline">
            {data.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {data.tags?.split(',').map((tag, i) => (
          <Badge key={i}>{tag}</Badge>
        ))}
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
      subtitle={data.tags?.split(',').join(', ') ?? ''}
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
