import ContactSection from '@/components/about/ContactSection';
import TeamSection from '@/components/about/TeamSection';
import {Footer} from '@/components/shared/footer';
import {Navigation} from '@/components/shared/header';
import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div>
      <Navigation />
      <div className="bg-white text-gray-800">

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-indigo-100 to-blue-200 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg">
          To empower individuals and communities through accessible, secure, and innovative digital solutions that improve everyday life.
        </p>
      </section>

      {/* Our Services */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            { title: 'Secure App Development', desc: 'Build robust applications with top-notch security.' },
            { title: 'Cybersecurity Awareness', desc: 'Educational resources to protect your digital footprint.' },
            { title: 'Consulting Services', desc: 'Expert guidance on tech and system improvements.' },
            { title: 'UI/UX Design', desc: 'User-friendly designs for all devices.' },
            { title: 'Project Management', desc: 'Organizing ideas into structured, agile-based sprints.' },
            { title: 'Cloud Integration', desc: 'Deploy scalable and fast web/mobile solutions.' },
          ].map((service, idx) => (
            <div key={idx} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why We Do This */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-semibold mb-6">Why We Do This</h2>
        <p className="max-w-3xl mx-auto text-lg">
          At iCore, we believe in using technology to create real-world impact. Our platform is driven by a desire to help learners, innovators, and communities thrive through better digital experiences and problem-solving tools.
        </p>
      </section>

      {/* Developer Team */}
      <TeamSection />

      {/* Contact Form */}
       <ContactSection />
      {/* Footer */}
      <Footer/>
    </div>
   </div>
  );
};

export default AboutUsPage;
