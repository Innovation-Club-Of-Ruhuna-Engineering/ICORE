import { Navigation } from "@/components/shared/navigation";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { DisciplinesSection } from "@/components/home/deciplines-section";
import { StatsSection } from "@/components/home/stats-section";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection/>
      <StatsSection />
      <DisciplinesSection />
      <Footer/>
    </main>
  );
}