import { Navigation } from "@/components/shared/navigation";
import committees from "@/constants/committee";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen">

      <section className="bg-gradient-to-b from-blue-50 to-white pt-28">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-balance mb-6">About Us</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Who We Are
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="space-y-6 text-lg">
            <p>
              ICORE <b>(Innovation Club Of Ruhuna Engineering)</b> is a community of aspiring Engineering students bridging the gap between academia and industry. We provide a collaborative space where researchers, students, and professionals can connect, share knowledge, and work together on innovative projects.
            </p>
            <p>
              Through our platform, we aim to:
            </p>
            <ol className="list-disc pl-6 space-y-2">
              <li>Encourage students to be involved in innovations and inventions, by identifying potential research gaps, and guide students to publish research papers in peer-reviewed journals or conferences.</li>
              <li>Facilitate students to generate innovative business ideas, develop prototypes and business models, and pursue commercialization through patent acquisition.</li>
              <li>Encourage collaborations among students, staff, other faculties, and industry professionals.</li>
              <li>Formulate and coordinate interdisciplinary teams and promote iterative development of engineering projects.</li>
              <li>Maintain a centralized repository of all projects and research done by students.</li>
            </ol>
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Our Vision</h2>
              <p>
                We envision a future where access to research opportunities and educational resources is equitable and inclusive. ICORE strives to be the catalyst for meaningful connections and collaborations that drive innovation and advancement in both academia and industry.
              </p>
            </div>
          </div>
      </section>

      <section className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="space-y-16">
          {Object.values(committees).map((committee) => (
            <div key={committee.title}>
              <h3 className="text-2xl font-semibold text-primary mb-6">{committee.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {committee.committee.map((member) => (
                  <div key={member.name} className="flex flex-col items-center">
                    <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <h4 className="font-semibold text-lg">{member.name}</h4>
                    <p className="text-muted-foreground">{member.title}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}