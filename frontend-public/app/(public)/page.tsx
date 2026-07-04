import { Footer } from "@/components/shared/footer";
import Hero from "@/components/home/hero";
import Logo from "@/components/home/logo";
import AI from "@/components/home/ai";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Logo />
      {/* Pull AI up to overlap with Logo's bottom — Logo fades out, AI is already there */}
      {/* <div style={{ marginTop: "-100vh" }}>
        <AI />
      </div> */}
      <Footer />
    </main>
  );
}