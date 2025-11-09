import { createClient } from '@/lib/supabase/server';
import View from './view';
import ExceptionOverlay from '@/components/molecules/exception';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  if (id != 'tambah') {
    const supabase = await createClient();
    const article = await supabase
      .from('articles')
      .select('*')
      .eq('id', +id)
      .maybeSingle();
    if (!article.data)
      return <ExceptionOverlay title="Artikel tidak ditemukan" />;
    return <View data={article.data} />;
  }

  return <View />;
};

export default Page;
