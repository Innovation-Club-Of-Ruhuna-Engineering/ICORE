'use client';

import React, { useState } from 'react';

export default function UserProfile(){
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState<string>('');

  const addSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 text-sm md:text-base">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-xl font-bold">👤</div>
        <div>
          <h2 className="font-bold text-lg md:text-xl">John Doe</h2>
          <p className="text-gray-500">johndoe@example.com</p>
        </div>
        <div className="ml-auto">
          <button className="border border-gray-300 rounded px-4 py-1 hover:bg-gray-100">Save changes</button>
        </div>
      </div>

      <h3 className="text-gray-600 font-semibold mb-2">Personal Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input type="text" placeholder="First name" defaultValue="John" className="border p-2 rounded" />
        <input type="text" placeholder="Last name" defaultValue="Doe" className="border p-2 rounded" />
        <input type="email" placeholder="Student Mail" defaultValue="john@engug.ruh.ac.lk" className="border p-2 rounded" />
        <input type="email" placeholder="Email" defaultValue="johndoe@email.com" className="border p-2 rounded" />
        <input type="text" placeholder="Reg Number" defaultValue="EG/xxxx/xxxx" className="border p-2 rounded" />
        <input type="text" placeholder="LinkedIn Profile" className="border p-2 rounded" />
        <input type="tel" placeholder="Mobile Number" defaultValue="1234567890" className="border p-2 rounded" />
        <select className="border p-2 rounded">
          <option>Membership Category</option>
          <option>Member</option>
          <option>Associate</option>
        </select>
        <input type="date" placeholder="Joined Date" className="border p-2 rounded" />
        <select className="border p-2 rounded">
          <option>Department</option>
          <option>Computer</option>
          <option>Electrical</option>
        </select>
      </div>

      <textarea rows={4} placeholder="About" className="w-full border p-2 rounded mb-4"></textarea>

      <div className="mb-4">
        <label className="font-semibold">Skills</label>
        <div className="flex items-center gap-2 my-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="Add a skill"
            className="flex-grow border p-2 rounded"
          />
          <button type="button" onClick={addSkill} className="border rounded px-3 py-1">+</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span key={idx} className="bg-gray-200 px-2 py-1 rounded text-sm">{skill}</span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="font-semibold block mb-1">Add Your Resume</label>
        <input type="file" className="block" />
      </div>
    </div>
  );
}
