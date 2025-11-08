import { Database } from '@/lib/types/database.types';
import Image from 'next/image';
import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

interface DivisionCardProps {
  cabinetSlug?: Database['public']['Tables']['cabinets']['Row']['slug'];
  data: Database['public']['Tables']['divisions']['Row'];
}

const DivisionCard = ({ cabinetSlug, data }: DivisionCardProps) => {
  return (
    <div className="group flex select-none flex-col items-center gap-3 p-6 transition-all">
      {data.logo_url && (
        <Image
          src={data.logo_url}
          width={500}
          height={500}
          alt=""
          className="w-1/2 drop-shadow-lg transition-all group-hover:-rotate-6 group-hover:scale-110"
        />
      )}
      <div className="relative w-full text-center">
        <p className="typo-h3">{data.name}</p>
        <small className="typo-small text-muted-foreground">
          {data.tagline}
        </small>
        <div className="absolute left-1/2 top-0 -z-10 h-full -translate-x-1/2 rounded-md bg-card transition-all group-hover:w-2/3 group-hover:scale-y-150 group-hover:shadow-xl group-hover:shadow-primary"></div>
      </div>
      <Button
        variant={'outline'}
        className="transition-transform group-hover:translate-y-4"
        asChild
      >
        <Link href={`${cabinetSlug}/divisi/${data.slug}`}>
          Selengkapnya
          <ArrowRightIcon className="transition-all group-hover:-rotate-45" />
        </Link>
      </Button>
    </div>
  );
};

export { DivisionCard };
