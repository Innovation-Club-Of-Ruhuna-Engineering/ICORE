import BackgroundBoxesDemo from "@/components/home/hero";
import RecentProjectSection from "@/components/home/recentproject";
import Footer from "@/components/shared/footer";
import NavbarDemo from "@/components/shared/navbar";
import { Navbar } from "@/components/ui/resizable-navbar";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Image from "next/image";

export default function Home() {
  return (
    <div >
        <NavbarDemo />
        <BackgroundBoxesDemo />   
        <RecentProjectSection/>
        <Footer />
    </div>
  );
}