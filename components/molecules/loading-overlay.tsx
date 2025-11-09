import Image from 'next/image';
import { SpinningText } from '../ui/spinning-text';
import { LogoInformatics } from '@/assets/images';

const LoadingOverlay = () => {
  return (
    <div className="flex min-h-screen w-screen bg-background p-12 pb-48">
      <div className="relative m-auto size-56 rounded-full text-primary-foreground">
        <Image
          src={LogoInformatics}
          width={100}
          height={100}
          alt=""
          className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2"
        />
        <SpinningText className="relative top-28 text-2xl font-extrabold">
          INFORMATIKA • SAKTI •
        </SpinningText>
      </div>
    </div>
  );
};

export default LoadingOverlay;
