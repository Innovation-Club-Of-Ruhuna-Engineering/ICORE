import ContactSection from '@/components/about/ContactSection';
import Footer from '@/components/shared/footer';
import Header from '@/components/shared/header';
import React from 'react';

const ContactUsPage: React.FC = () => {
  return (
    <div >
      <Header />
      <div className="bg-white text-gray-800">
      {/* GET IN TOUCH SECTION */}
      <section className="bg-blue-800 text-white py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">GET IN TOUCH</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center">
          <div>
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">ADDRESS</h3>
            <p>iCore Software Solutions<br />University of Ruhuna<br />Matara, Sri Lanka</p>
          </div>
          <div>
            <div className="text-3xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">PHONE</h3>
            <p>+94 71 234 5678<br />Mon - Fri: 9AM - 6PM</p>
          </div>
          <div>
            <div className="text-3xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">EMAIL</h3>
            <p>info@icore.lk<br />support@icore.lk</p>
          </div>
        </div>
      </section>

      {/* MESSAGE US FORM */}
      <ContactSection />
    

      {/* FOOTER */}
      <Footer />
    </div>
    </div>
  );
};

export default ContactUsPage;
