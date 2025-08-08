import { useRef, useState } from "react";
import Card from "./card";
import { InputWithLabal } from "./input";
import { SelectWithLabel } from "./select";
import { Badge } from "@/components/ui/badge";
import { CirclePlus } from "lucide-react";
import { User } from "@/types/auth/userAuthTypes";

type UserProps = { user?: User | null };

function GeneralInformation({ user }: UserProps) {
  console.log(user?.regNumber);
  return (
    <Card className="flex flex-1">
      <Card.Header>General Information</Card.Header>
      <div className="grid grid-cols-2 not-md:grid-cols-1 not-lg:grid-cols-1 gap-x-12 gap-y-6">
        <InputWithLabal label="First Name" id="firstName" defaultValue={user?.firstName || ""} />
        <InputWithLabal label="Last Name" id="lastName" defaultValue={user?.lastName || ""} />
        <InputWithLabal label="Nick Name" id="nickName" defaultValue={user?.username || ""} />
        <InputWithLabal
          label="Registration Number"
          id="registrationNumber"
          placeholder="EG/20XX/XXXX"
          defaultValue={user?.regNumber || ""}
        />
        
        <InputWithLabal
          label="Phone Number"
          id="phoneNumber"
          placeholder="+947XXXXXXXX"
          defaultValue={user?.contactNumber || ""}
        />
        <SelectWithLabel
          id="gender"
          label="Gender"
          placeholder="Gender"
          items={[
            ["male", "Male"],
            ["female", "Female"],
          ]}
          defaultValue={user?.gender || ""}
        />
        <SelectWithLabel
          id="department"
          label="Department"
          placeholder="Department"
          items={[
            ["elec", "Elec"],
            ["com", "COM"],
            ["civil", "Civil"],
          ]}
          defaultValue={user?.department || ""}
        />
        <SelectWithLabel
          id="batch"
          label="Batch"
          placeholder="Batch"
          items={[
            ["22", "22 Batch"],
            ["23", "23 Batch"],
          ]}
          defaultValue={user?.batch || ""}
        />
      </div>
    </Card>
  );
}

function ExperienceBox({
  content,
  setContent,
}: {
  content: string;
  setContent: (contnet: string) => void;
}) {
  const textRef = useRef(null);
  const minHeight = 88
  const [height, setHeight] = useState(minHeight)


  return (
    <div className="flex flex-col relative">
      <textarea
        required
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
            const node = (textRef.current as HTMLTextAreaElement | null)
            const realHeight = node?.getBoundingClientRect().height ?? 0;
            setHeight(Math.max(realHeight+16, minHeight))
        }}
        className="peer resize-none w-full outline outline-black/20 p-2 hover:outline-sky-300 focus:outline-sky-400 focus:outline-2 rounded-md placeholder-gray-500/90" style={{height: `${height}px`}}
      />
      <div className="peer-focus:invisible peer-valid:invisible bg-gray-200 text-3xl text-gray-500 absolute w-full flex justify-center items-center pointer-events-none rounded-md`}" style={{height: `${height}px`}}>
        <CirclePlus />
        <span className="ml-3">Add Item</span>
      </div>
      <div className="peer-focus:invisible peer-valid:visible peer-invalid:invisible bg-sky-200 absolute w-full flex pointer-events-none rounded-md p-2 flex-col overflow-visible" style={{height: `${height}px`}}>
        <div ref={textRef} className="overflow-visible">
          {content
            .split("\n")
            .filter((line) => line.trim() != "")
            .map((line, index) => {
              if (line.startsWith("# ")) {
                return (
                  <div key={index} className="text-3xl">
                    {line.slice(1).trim()}
                  </div>
                );
              } else if (line.startsWith("- ")) {
                return (
                  <div key={index} className="text-xl">
                    {line.slice(1).trim()}
                  </div>
                );
              } else {
                return <div key={index}>{line.trim()}</div>;
              }
            })}
        </div>
      </div>
      <div className="invisible peer-focus:peer-invalid:visible absolute w-full  flex pointer-events-none rounded-md p-2 text-gray-500 box-content" style={{height: `${height}px`}}>
        # Title
        <br />
        - subtitle
        <br />
        details
        <br />
      </div>
    </div>
  );
}

function ExperienceStack() {
  const [experience, setExperience] = useState([{ content: "" }]);

  const updateContent = (index: number, content: string) => {
    let data = [...experience];
    data[index].content = content;
    data = [...data.filter((d) => d.content != ""), { content: "" }];
    setExperience(data);
  };
  return (
    <div className="mt-4 w-full flex flex-col gap-2 outline outline-black/20 rounded-md  h-fit p-2">
      {experience.map((exp, index) => (
        <ExperienceBox
          content={exp.content}
          setContent={(content) => {
            updateContent(index, content);
          }}
          key={index}
        />
      ))}
      {/* <ExperienceBox />
      <ExperienceBox /> */}
    </div>
  );
}

function ExperienceNSkills({ user }: UserProps) {
  // You can use user data to prefill skills/experience if you store them in user
  const [skillsStr, setSkillsStr] = useState("");

  const skills = skillsStr
    .split("/")
    .map((s) => s.trim())
    .filter((s) => s != "");

  return (
    <Card className="flex flex-1 gap-y-6">
      <Card.Header>Experience & Skills</Card.Header>
      <div>
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col justify-between">
            <label className="text-xl">Skills</label>
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 bg-gray-200/80 rounded-lg mt-4 p-2 px-3">
                {skills.map((skill, i) => (
                  <Badge
                    key={i}
                    className="bg-blue-500 text-white text-md px-2"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
            <textarea
              placeholder={'"/" Seperated Skills'}
              value={
                skills.join(" / ") +
                (skillsStr.at(-1) == "/" ? " / " : "") +
                (skillsStr.at(-1) == " " ? " " : "")
              }
              onChange={(e) => {
                setSkillsStr((prv) => {
                  const newStr = e.target.value;
                  if (newStr.at(-1) == "/" && prv.at(-2) == " ") {
                    return prv.slice(0, prv.length - 2);
                  }
                  return newStr;
                });
              }}
              className="resize-none mt-4 w-full outline outline-black/20 hover:outline-sky-300 focus:outline-sky-400 focus:outline-2 rounded-md p-2 placeholder-gray-500/90"
            />
          </div>
          <div className="flex flex-col justify-between">
            <label className="text-xl">Experiences</label>
            <ExperienceStack />
          </div>
        </div>
      </div>
    </Card>
  );
}

function Social({ user }: UserProps) {
  return (
    <Card className="flex flex-1">
      <Card.Header>Social</Card.Header>
      <div className="grid not-sm:grid-cols-1 grid-cols-2 gap-x-12 gap-y-6">
        <InputWithLabal
          label="Website Link"
          id="website"
          placeholder="https://example.com"
          //defaultValue={user?.websiteURL || ""}
        />
        <InputWithLabal
          label="YouTube Link"
          id="youtube"
          placeholder="youtube"
          //defaultValue={user?.youtubeURL || ""}
        />
        <InputWithLabal
          label="Linkedin Link"
          id="linkedin"
          placeholder="in/profile"
          //defaultValue={user?.linkedinURL || ""}
        />
        <InputWithLabal
          label="GitHub Link"
          id="github"
          placeholder="https://github.com/profile"
          //defaultValue={user?.githubURL || ""}
        />
      </div>
    </Card>
  );
}

function Biography({ user }: UserProps) {
  return (
    <Card className="flex flex-1">
      <Card.Header>Biography</Card.Header>
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        {/* Add biography fields here, e.g. */}
        {/* <InputWithLabal label="Bio" id="bio" defaultValue={user?.bio || ""} /> */}
      </div>
    </Card>
  );
}

export { GeneralInformation, ExperienceNSkills, Social, Biography };
