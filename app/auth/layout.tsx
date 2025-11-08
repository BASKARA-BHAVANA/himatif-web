import BrandLogo from '@/components/molecules/brand-logo';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex h-screen w-screen overflow-hidden p-8">
      {/* container  */}
      <div className="relative z-10 m-auto">{children}</div>

      {/* brand  */}
      <div className="absolute right-4 top-4">
        <BrandLogo />
      </div>

      {/* insets  */}
      <div className="absolute -left-3/4 -top-1/2 h-screen w-screen rotate-45 border-[64px] border-primary-foreground bg-primary"></div>
      <div className="absolute left-3/4 top-1/2 h-screen w-screen rotate-45 border-[64px] border-primary-foreground bg-primary"></div>
    </div>
  );
}
