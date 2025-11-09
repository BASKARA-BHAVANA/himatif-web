import { createClient } from '@/lib/supabase/server';
import Form from '../form';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const supabase = await createClient();
  const parentData =
    id != '0'
      ? await supabase.from('courses').select('*').eq('id', +id).maybeSingle()
      : undefined;

  return <Form parentData={parentData?.data ?? undefined} />;
};

export default Page;
