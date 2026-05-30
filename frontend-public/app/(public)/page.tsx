import { Footer } from "@/components/shared/footer";
import Hero from "@/components/home/hero";
import Logo from "@/components/home/logo";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Logo />
      <Footer/>
    </main>
  );
}