import { Footer } from "@/components/shared/footer";
import Hero from "@/components/home/hero";
import Logo from "@/components/home/logo";
import AI from "@/components/home/ai";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Logo />
      <AI />
      <Footer/>
    </main>
  );
}