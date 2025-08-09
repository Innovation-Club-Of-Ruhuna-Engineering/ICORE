
import Hero from "@/components/home/hero";
import { Footer } from "@/components/shared/footer";
import { AboutSection } from "@/components/home/about-section";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HowToJoin } from "@/components/home/how-to-join";
import { TechStack } from "@/components/home/tech-stack";
import { Testimonials } from "@/components/home/testimonials";
import { NewsletterCTA } from "@/components/home/newsletter-cts";

export default function Home() {
  return (
    <div >
       
        <Hero />   
        <AboutSection />
        <FeaturedProjects />
        <HowToJoin />
        <TechStack />
        <Testimonials />
        <NewsletterCTA />
        <Footer />
    </div>
  );
}