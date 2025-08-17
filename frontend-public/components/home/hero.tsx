import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import MouseMoveEffect from "@/components/mouse-move-effect";

export default function Hero() {
  return (
    <>
      <MouseMoveEffect />

      <center>
        <section className="container flex mt-75 mb-20 w-full flex-col items-center justify-center space-y-15 py-24 text-center md:py-32">
          <div className="space-y-10">
            <h1
              className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ color: "#2549d5" }}
            >
              Innovation Club of Ruhuna Engineering
            </h1>
            <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              The Innovation Club of Ruhuna Engineering empowers students to
              explore creativity, develop technologies, and build solutions that
              make an impact.
            </p>
          </div>
          <div className="flex gap-4">
            <Button size="lg">
              Explore Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg">
              Join ICORE
            </Button>
          </div>
        </section>
      </center>
    </>
  );
}
