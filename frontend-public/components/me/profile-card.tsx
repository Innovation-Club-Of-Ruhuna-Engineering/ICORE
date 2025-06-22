import { Youtube, Linkedin, Github, Earth } from "lucide-react";

function ProfileCard({
  backdrop,
  profilepic,
  name,
  username,
  since,
  social,
}: {
  backdrop: string;
  profilepic: string;
  name: string;
  username: string;
  since: string;
  social?: {
    youtube?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}) {
  return (
    <div className="h-[480px] rounded-2xl overflow-hidden bg-white">
      <div
        className="h-1/2"
        style={{ backgroundImage: `url(${backdrop})` }}
      ></div>
      <div
        className="size-44 mx-auto relative -translate-y-1/2 rounded-full bg-contain"
        style={{ backgroundImage: `url(${profilepic})` }}
      ></div>
      <div className="mx-auto w-fit -mt-22 flex flex-col pt-2 gap-5 items-center">
        <span className="text-3xl font-medium">{name}</span>
        <span className="text-sm">
          {username} &bull; {since}
        </span>
        <span className="flex gap-4 items-center">
          <a href={social?.youtube || ""}>
            <Youtube />
          </a>
          <a href={social?.linkedin || ""}>
            <Linkedin />
          </a>
          <a href={social?.github || ""}>
            <Github />
          </a>
          <a href={social?.website || ""}>
            <Earth />
          </a>
        </span>
      </div>
    </div>
  );
}

export default ProfileCard;