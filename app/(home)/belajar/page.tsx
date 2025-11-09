import Container from '@/components/molecules/container';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FolderTreeIcon, SearchIcon } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  return (
    <Container className="max-w-3xl py-12">
      <div className="mb-12 flex flex-col items-center -space-y-3">
        <div className="flex items-center gap-3 rounded-lg bg-primary p-3">
          <p className="typo-large rounded-sm bg-primary-foreground px-2 text-primary">
            Bridging Informatics
          </p>
        </div>
        <h1 className="typo-h1 w-fit rounded-lg bg-primary p-3 text-center">
          Eksplorasi Dunia Informatika
        </h1>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="group grow">
          <Link href={'/belajar/cari'}>
            <Card className="transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary">
              <CardHeader>
                <SearchIcon
                  size={60}
                  className="mb-12 text-muted-foreground group-hover:text-primary-foreground"
                />
                <CardTitle className="group-hover:text-primary-foreground">
                  Pencarian
                </CardTitle>
                <CardDescription className="group-hover:text-primary-foreground">
                  Temukan lebih cepat materi yang ingin kamu cari
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
        <div className="group grow">
          <Link href={'/belajar/struktur/0'}>
            <Card className="transition-all group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary">
              <CardHeader>
                <FolderTreeIcon
                  size={60}
                  className="mb-12 text-muted-foreground group-hover:text-primary-foreground"
                />
                <CardTitle className="group-hover:text-primary-foreground">
                  Struktur
                </CardTitle>
                <CardDescription className="group-hover:text-primary-foreground">
                  Jelajahi dan pelajari seluruh materi lebih terarah
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Page;
