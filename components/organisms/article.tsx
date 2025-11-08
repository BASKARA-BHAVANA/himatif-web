import { Database } from '@/lib/types/database.types';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';

interface ArticleCardProps {
  data: Partial<Database['public']['Tables']['articles']['Row']>;
}

const ArticleCard = ({ data }: ArticleCardProps) => {
  return (
    <Card className="transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary">
      <CardHeader>
        <CardTitle>
          <Link href={`/artikel/${data.slug}`} className="hover:underline">
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

export { ArticleCard };
