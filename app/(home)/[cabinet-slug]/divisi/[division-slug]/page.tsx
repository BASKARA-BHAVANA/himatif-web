import Container from '@/components/molecules/container';
import { DivisionMemberCard } from '@/components/organisms/division-member';
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from '@/components/ui/scroll-based-velocity';
import { createClient } from '@/lib/supabase/server';
import Image from 'next/image';

const Page = async (props: {
  params: Promise<{ 'cabinet-slug': string; 'division-slug': string }>;
}) => {
  const params = await props.params;
  const supabase = await createClient();
  const division = await supabase
    .from('divisions')
    .select('*, cabinets(name), division_members(*)')
    .eq('slug', params['division-slug'])
    .eq('cabinets.slug', params['cabinet-slug'])
    .maybeSingle();

  if (!division.data) return <></>;

  return (
    <>
      <Container className="flex flex-col gap-4 pb-24 lg:flex-row lg:items-center lg:justify-center">
        <div className="aspect-square max-w-60 grow lg:max-w-sm">
          <Image
            src={division.data.logo_url ?? ''}
            className="size-full object-contain drop-shadow-md"
            width={1080}
            height={1080}
            alt={''}
          />
        </div>
        <div className="max-w-2xl grow">
          <div className="flex w-fit translate-y-3 items-center gap-2 rounded-lg rounded-bl-none bg-primary p-3 px-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              {division.data.cabinets.name}
            </p>
            <p className="typo-large">Divisi</p>
          </div>
          <div className="mb-4 flex w-fit items-center gap-2 rounded-lg rounded-tl-none bg-primary p-3">
            <h1 className="typo-h1">{division.data.name}</h1>
          </div>
          <p className="typo-p px-3">{division.data.description}</p>
        </div>
      </Container>

      <Container>
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-1/3 bg-gradient-to-r from-background to-transparent"></div>
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-1/3 bg-gradient-to-l from-background to-transparent"></div>

        <ScrollVelocityContainer className="typo-h1 uppercase text-muted-foreground">
          <ScrollVelocityRow baseVelocity={20} className="mb-3" direction={1}>
            {division.data.tagline}
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={20} direction={-1}>
            {division.data.tagline}
          </ScrollVelocityRow>
        </ScrollVelocityContainer>
      </Container>

      <Container className="py-24">
        <div className="mb-12 flex flex-col items-center">
          <div className="rounded-t-lg bg-primary px-3 pt-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Anggota Divisi
            </p>
          </div>
          <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3">
            Mereka yang Berperan
          </h1>
        </div>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {division.data.division_members.map((dat, i) => (
            <DivisionMemberCard key={i} data={dat} />
          ))}
        </div>
      </Container>
    </>
  );
};

export default Page;
