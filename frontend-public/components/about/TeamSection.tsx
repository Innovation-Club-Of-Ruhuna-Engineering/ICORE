import React from 'react';

const teamMembers = [
  { name: 'Alex Fernando', role: 'UI/UX Engineer', image: '/team/alex.jpg' },
  { name: 'Nadeesha Kavinda', role: 'Front-end Developer', image: '/team/nadeesha.jpg' },
  { name: 'Iresh Lahiru', role: 'Back-end Developer', image: '/team/iresha.jpg' },
  { name: 'Dasun Perera', role: 'Project Manager', image: '/team/dasun.jpg' },
];

const TeamSection = () => (
  <section className="py-16 px-6 max-w-6xl mx-auto">
    <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {teamMembers.map((member, idx) => (
        <div key={idx} className="bg-white shadow-md rounded-lg p-6">
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
          />
          <h4 className="text-lg font-bold">{member.name}</h4>
          <p className="text-sm text-gray-600">{member.role}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TeamSection;
