"use client";

import NavbarDemo from "@/components/shared/navbar";

import backdrop from "@/assets/me/backdrop-profile.png"
import profilePic from "@/assets/me/profile-pic.jpg"

import ProfileCard from "@/components/me/profile-card";
import Card from "@/components/me/card";


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
      <NavbarDemo />
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
