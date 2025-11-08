import { Database } from '@/lib/types/database.types';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { InstagramIcon, LinkedinIcon, TwitterIcon } from 'lucide-react';
import { getInitials } from '@/lib/utils';

interface DivisionMemberCardProps {
  data: Database['public']['Tables']['division_members']['Row'];
}

const DivisionMemberCard = ({ data }: DivisionMemberCardProps) => {
  return (
    <div className="group flex select-none flex-col items-center gap-3 p-6 transition-all">
      <Avatar className="size-40 origin-bottom transition-all group-hover:scale-110">
        <AvatarImage src={data.picture_url ?? ''} />
        <AvatarFallback className="typo-h1">
          {getInitials(data.name)}
        </AvatarFallback>
      </Avatar>
      <div className="relative w-full text-center">
        <p className="typo-h3">{data.name}</p>
        <small className="typo-small text-muted-foreground">
          {data.position}
        </small>
        <div className="absolute left-1/2 top-0 -z-10 h-full -translate-x-1/2 rounded-md bg-card transition-all group-hover:w-2/3 group-hover:scale-y-150 group-hover:shadow-xl group-hover:shadow-primary"></div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={'outline'}
          className="transition-transform group-hover:translate-y-1 group-hover:-rotate-12 group-hover:scale-125"
          size={'icon'}
        >
          <InstagramIcon />
        </Button>
        <Button
          variant={'outline'}
          className="transition-transform group-hover:translate-y-3 group-hover:rotate-3 group-hover:scale-105"
          size={'icon'}
        >
          <TwitterIcon />
        </Button>
        <Button
          variant={'outline'}
          className="transition-transform group-hover:translate-y-2 group-hover:rotate-12 group-hover:scale-110"
          size={'icon'}
        >
          <LinkedinIcon />
        </Button>
      </div>
    </div>
  );
};

export { DivisionMemberCard };
