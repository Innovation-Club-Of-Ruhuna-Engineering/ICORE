 
 import React from 'react';

const ContactSection = () => (
 
 
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Message Us</h2>
        <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
          If you have any questions or suggestions, we’d love to hear from you. Fill out the form below and our team will get back to you as soon as possible.
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input type="text" placeholder="Name" className="p-3 rounded-lg border border-gray-300 w-full" />
            <input type="email" placeholder="Email" className="p-3 rounded-lg border border-gray-300 w-full" />
          </div>
          <input type="text" placeholder="Subject" className="p-3 rounded-lg border border-gray-300 w-full" />
          <textarea placeholder="Comments" rows={5} className="p-3 rounded-lg border border-gray-300 w-full"></textarea>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition">
              Submit
            </button>
          </div>
        </form>
      </section>

    );

export default ContactSection;