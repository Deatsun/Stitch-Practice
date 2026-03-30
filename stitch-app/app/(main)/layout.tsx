import { Footer } from "@/app/components/ui/footer";
import { MobileBottomNav } from "@/app/components/ui/mobile-bottom-nav";
import { Navbar } from "@/app/components/ui/navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
      <MobileBottomNav />
    </>
  );
}