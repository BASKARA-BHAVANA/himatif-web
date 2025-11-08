import Container from '@/components/molecules/container';
import ZoomInImage from '@/components/molecules/zoomin-image';
import { CabinetContactCard } from '@/components/organisms/cabinet-contact';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { createClient } from '@/lib/supabase/server';
import { ArrowUpRightIcon, ClipboardListIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import { DivisionCard } from '@/components/organisms/division';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArticleCard } from '@/components/organisms/article';

export default async function Home() {
  const supabase = await createClient();
  const cabinet = await supabase
    .from('cabinets')
    .select(
      `
      *,
      cabinet_contacts (*),
      divisions (*, division_members(count))
    `
    )
    .eq('is_active', true)
    .maybeSingle();

  const articles = await supabase
    .from('articles')
    .select('title, slug, tags')
    .limit(5);

  return (
    <>
      <Container className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="aspect-square max-w-80 grow lg:max-w-xl">
          <Image
            src={cabinet.data?.logo_url ?? ''}
            className="size-full object-contain drop-shadow-lg"
            width={1080}
            height={1080}
            alt={''}
          />
        </div>
        <div className="max-w-2xl grow">
          <div className="flex w-fit items-center gap-2 rounded-t-lg bg-primary px-3 pt-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Himatif
            </p>
            <p className="typo-large">Kabinet</p>
          </div>
          <div className="mb-4 flex w-fit items-center gap-2 rounded-lg rounded-tl-none bg-primary p-3">
            <h1 className="typo-h1">{cabinet.data?.name}</h1>
          </div>
          <p className="typo-p mb-4 px-3">{cabinet.data?.description}</p>
          <p className="px-3 text-muted-foreground">
            Periode {cabinet.data?.start_year}/{cabinet.data?.end_year}
          </p>
        </div>
      </Container>

      <Container className="py-24">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col items-start">
            <div className="rounded-t-lg bg-primary px-3 pt-3">
              <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
                Artikel
              </p>
            </div>
            <h1 className="typo-h1 w-fit rounded-lg rounded-tl-none bg-primary p-3">
              Kabar Terkini Himatif
            </h1>
          </div>

          <Button variant={'ghost'} asChild>
            <Link href={`/artikel`}>
              Lainnya <ArrowUpRightIcon />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.data?.map((dat, i) => (
            <ArticleCard key={i} data={dat} />
          ))}
        </div>
      </Container>

      {/* PRIMARY IMAGE  */}
      {cabinet.data?.primary_image_url && (
        <ZoomInImage src={cabinet.data?.primary_image_url} />
      )}

      {/* DIVISIONS  */}
      <Container className="py-24">
        <div className="mb-12 flex flex-col items-center">
          <div className="rounded-t-lg bg-primary px-3 pt-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Divisi Kami
            </p>
          </div>

          <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3">
            Bersama Mewujudkan Tujuan
          </h1>
        </div>
        <Carousel>
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-24 bg-gradient-to-r from-background via-background/50 to-transparent lg:w-40"></div>
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-24 bg-gradient-to-l from-background via-background/50 to-transparent lg:w-40"></div>
          <CarouselContent>
            {cabinet.data?.divisions.map((dat, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                <DivisionCard
                  cabinetSlug={cabinet.data?.slug}
                  data={dat}
                />{' '}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext />
          <CarouselPrevious />
        </Carousel>
        <div className="my-24" />
        <div className="flex flex-wrap items-center justify-evenly gap-12">
          <div className="relative flex items-end gap-3">
            <UsersIcon
              size={120}
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-primary opacity-50"
            />
            <h1 className="typo-h1 !text-8xl">
              {cabinet.data?.divisions.reduce(
                (a, c) => (a += c.division_members.at(0)?.count ?? 0),
                0
              )}
            </h1>
            <p className="typo-lead pb-3 text-muted-foreground">
              Anggota aktif
            </p>
          </div>
          <div className="relative flex items-end gap-3">
            <ClipboardListIcon
              size={120}
              className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-primary opacity-50"
            />
            <h1 className="typo-h1 !text-8xl">{0}</h1>
            <p className="typo-lead pb-3 text-muted-foreground">
              Program kerja
            </p>
          </div>
        </div>
      </Container>

      {/* VISION / MISSION  */}
      <Container className="py-24">
        <div className="mb-12 max-w-3xl">
          <div className="ms-3 flex w-fit items-center gap-3 rounded-t-lg bg-primary p-3">
            <div className="rounded-md bg-primary-foreground px-3 text-primary">
              <h3 className="typo-h3">Visi</h3>
            </div>
            <h3 className="typo-h3">Langkah Menuju Harapan</h3>
          </div>
          <Card>
            <CardContent className="pt-6">
              <h4 className="typo-p text-muted-foreground">
                {cabinet.data?.vision}
              </h4>
            </CardContent>
          </Card>
        </div>

        <div className="relative ms-auto max-w-3xl">
          <div className="me-3 ms-auto flex w-fit items-center gap-3 rounded-t-lg bg-primary p-3">
            <div className="rounded-md bg-primary-foreground px-3 text-primary">
              <h3 className="typo-h3">Misi</h3>
            </div>
            <h3 className="typo-h3">Upaya Mewujudkan Visi</h3>
          </div>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-end gap-3">
                {cabinet.data?.mission.split('\n').map((dat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-6 border-b pb-3"
                  >
                    <p className="typo-p text-end text-muted-foreground">
                      {dat}
                    </p>
                    <h1 className="typo-h1 w-6 text-primary opacity-50">
                      {i + 1}
                    </h1>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* SECONDARY IMAGE  */}
      {cabinet.data?.secondary_image_url && (
        <ZoomInImage src={cabinet.data?.secondary_image_url} />
      )}

      {/* CONTACT  */}
      <Container className="py-24">
        <div className="mb-12 flex flex-col items-center">
          <div className="rounded-t-lg bg-primary px-3 pt-3">
            <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
              Kontak Kami
            </p>
          </div>
          <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3">
            Jangkau Kami Sekarang
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {cabinet.data?.cabinet_contacts.map((dat, i) => (
            <CabinetContactCard key={i} contact={dat} />
          ))}
        </div>
      </Container>
    </>
  );
}
