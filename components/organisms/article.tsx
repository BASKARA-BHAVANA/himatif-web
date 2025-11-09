import { Database } from '@/lib/types/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
import { ComponentProps } from 'react';
import { ListItem } from '../ui/list';
import { Button } from '../ui/button';
import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';
import { PlaceholderImage } from '@/assets/images';

interface ArticleCardProps {
  data: Partial<Database['public']['Tables']['articles']['Row']>;
}

const ArticleCard = ({ data }: ArticleCardProps) => {
  return (
    <Card className="transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary">
      <CardHeader>
        <Image
          src={data.picture_url ? data.picture_url : PlaceholderImage}
          alt=""
          width={500}
          height={500}
          className="mb-3 aspect-video overflow-hidden rounded-md bg-secondary"
        />
        <CardTitle>
          <Link href={`/artikel/${data.slug}`} className="hover:underline">
            {data.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3">
        {data.tags
          ?.split(',')
          .filter(Boolean)
          .map((tag, i) => (
            <Badge key={i}>{tag}</Badge>
          ))}
      </CardContent>
    </Card>
  );
};

const ArticleListItem = ({
  data,
  slotRight,
  ...props
}: {
  data: Pick<
    Database['public']['Tables']['articles']['Row'],
    'id' | 'title' | 'tags' | 'slug' | 'picture_url'
  >;
} & Partial<ComponentProps<typeof ListItem>>) => {
  return (
    <ListItem
      title={data.title}
      subtitle={data.tags?.split(',').join(', ') ?? ''}
      slotLeft={
        <Image
          src={data.picture_url ? data.picture_url : PlaceholderImage}
          alt=""
          width={500}
          height={500}
          className="aspect-video max-w-24 overflow-hidden rounded-md bg-secondary"
        />
      }
      slotRight={
        <>
          <Button variant={'outline'} size={'icon'}>
            <Link href={`/artikel/${data.slug}`}>
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

export { ArticleCard, ArticleListItem };
