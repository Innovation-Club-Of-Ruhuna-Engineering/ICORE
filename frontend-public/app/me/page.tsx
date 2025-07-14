"use client";

import Header from "@/components/shared/header";
import backdrop from "@/assets/me/backdrop-profile.png"
import profilePic from "@/assets/me/profile-pic.jpg"

import ProfileCard from "@/components/me/profile-card";
import Card from "@/components/me/card";
import ProjectCard from "@/components/project/ProjectCard";

import {
  GeneralInformation,
  ExperienceNSkills,
  Social,
  Biography,
} from "@/components/me/settings";

import useOption from "@/hooks/useOption";
import { useAuth } from "@/contexts/userAuthContext";

function SelfProfilePage() {
  const {
    active,
    select,
    factory,
    options: [general, skills, social, bio],
  } = useOption(4, 1);

  const {user} = useAuth();

  const changeTo = factory((i) => ({
    className: `p-2 flex rounded-xl px-3 max-md:items-center max-md:justify-center ${
      active == i ? "bg-gray-300/50" : "bg-transparent hover:bg-gray-300/20"
    }`,
    onClick: () => select(i),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-[#ECF0FF] flex-1">
        <div className="w-2/3 mx-auto my-12 flex flex-col gap-6">
          <ProfileCard
            backdrop={backdrop.src}
            profilepic={profilePic.src}
            name={`${user?.firstName || "First"} ${user?.lastName || "Last"}`}
            username={`@${user?.username || "username"}`}
            since="Joined Jun 2025"
            social={{
              github: "github",
              linkedin: "linkedin",
              website: "web",
              youtube: "youtube",
            }}
          />

          {/* Projects Section */}
          <div className="bg-white rounded-2xl shadow-[0_0_4px_rgba(0,0,0,0.25)] py-6 px-5">
            <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-4">
              <h2 className="text-2xl font-semibold">My Projects</h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                + New Project
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ProjectCard
                project={{
                  title: "Portfolio Website",
                  description: "A modern portfolio built using React and TailwindCSS.",
                  image: "https://source.unsplash.com/random/800x600?website",
                }}
              />
              <ProjectCard
                project={{
                  title: "Task Manager",
                  description: "A productivity app to manage daily tasks efficiently.",
                  image: "https://source.unsplash.com/random/800x600?productivity",
                }}
              />
              <ProjectCard
                project={{
                  title: "E-commerce Template",
                  description: "A responsive shopping UI built with Next.js.",
                  image: "https://source.unsplash.com/random/800x600?ecommerce",
                }}
              />
            </div>
          </div>

          <div className="flex max-md:flex-col gap-8">
            <Card className="md:hidden h-fit max-md:p-1">
              <div className="text-xl grid grid-cols-4 not-xs:grid-cols-2 gap-2 max-md:gap-1 md:my-3">
                <span {...changeTo(1)}>General</span>
                <span {...changeTo(2)}>Expertise</span>
                <span {...changeTo(3)}>Social</span>
                <span {...changeTo(4)}>Biography</span>
              </div>
            </Card>
            <Card className="max-md:hidden h-fit flex-[0.3] min-w-60">
              <Card.Header className="font-medium">Edit Profile</Card.Header>
              <div className="text-xl flex flex-col gap-2 my-3">
                <span {...changeTo(1)}>General</span>
                <span {...changeTo(2)}>Expertise</span>
                <span {...changeTo(3)}>Social</span>
                <span {...changeTo(4)}>Biography</span>
              </div>
            </Card>
            {general && <GeneralInformation />}
            {skills && <ExperienceNSkills />}
            {social && <Social />}
            {bio && <Biography />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelfProfilePage;
