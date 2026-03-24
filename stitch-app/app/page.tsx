import { CharactersSection } from "@/app/componens/characters/character-section";
import { Footer } from "@/app/layout/footer";
import { MobileBottomNav } from "@/app/layout/mobile-bottom-nav";
import { Navbar } from "@/app/layout/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <CharactersSection />
      <Footer />
      <MobileBottomNav />
    </main>
  );
}