import Header from "@/components/shared/header";
import Hero from "@/components/home/hero";
import RecentProjectSection from "@/components/home/recentproject";
import Footer from "@/components/shared/footer";

export default function Home() {
  return (
    <div >
        <Header />
        <Hero />   
        <RecentProjectSection/>
        <Footer />
    </div>
  );
}