import Container from '@/components/molecules/container';
import ExceptionOverlay from '@/components/molecules/exception';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { fromNow } from '@/lib/utils';
import { CalendarDaysIcon, UserPenIcon } from 'lucide-react';
import Link from 'next/link';

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const { slug } = await props.params;
  const supabase = await createClient();
  const article = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (!article.data)
    return (
      <ExceptionOverlay title="Artikel tidak ditemukan">
        <Button asChild>
          <Link replace href={'/artikel'}>
            Pencarian
          </Link>
        </Button>
      </ExceptionOverlay>
    );
  return (
    <>
      <Container>
        <h1 className="typo-h1">{article.data.title}</h1>
        {article.data.tags && (
          <div className="mt-3 flex flex-wrap gap-3">
            {article.data.tags.split(',').map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-3 text-muted-foreground">
          <UserPenIcon size={18} />
          <p className="typo-p pe-3">{article.data.author ?? '-'}</p>
          <CalendarDaysIcon size={18} />
          <p className="typo-p pe-3">{fromNow(article.data.created_at)}</p>
        </div>
      </Container>

      <Container className="flex flex-col gap-12 lg:flex-row">
        <div className="lg:w-2/3">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: article.data.content ?? '' }}
          ></div>
        </div>
        <div className="lg:w-1/3"></div>
      </Container>
    </>
  );
};

export default Page;
