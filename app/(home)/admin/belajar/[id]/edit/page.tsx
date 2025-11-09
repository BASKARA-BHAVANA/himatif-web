import { createClient } from '@/lib/supabase/server';
import ExceptionOverlay from '@/components/molecules/exception';
import Form from '../form';

const Page = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;

  const supabase = await createClient();
  const course = await supabase
    .from('courses')
    .select('*, parent:course_id(id, title)')
    .eq('id', +id)
    .maybeSingle();
  if (!course.data) return <ExceptionOverlay title="Materi tidak ditemukan" />;
  return (
    <Form data={course.data} parentData={course.data.parent ?? undefined} />
  );
};

export default Page;
