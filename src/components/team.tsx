"use client";
import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
interface SocialLinks {
  facebook?: string;
  github?: string;
  linkedin?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Md. Parvej Ahammed",
    role: "General Manager",
    imageSrc: "/image/leaders/Md.-Parvej-Ahammed.webp",
  },
  {
    id: "2",
    name: "Hossain Mahmud",
    role: "Project Manager",
    imageSrc: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
  },
  {
    id: "3",
    name: "Md Sagor Ali",
    role: "Project Manager",
    imageSrc: "/image/leaders/sagor.webp",
  },
  {
    id: "4",
    name: "Md Mehedi Hasan",
    role: " Business Development Manager",
    imageSrc: "/image/leaders/Medhi.webp",
  },
  {
    id: "5",
    name: "Mst Amena Akter",
    role: "Team Lead",
    imageSrc: "/image/leaders/amena.webp",
  },
];



const salesteamMembers: TeamMember[] = [

  {
    id: "1",
    name: "Md. Ekramul Hasan",
    role: "Sales Manager",
    imageSrc: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
  },
  {
    id: "2",
    name: "Showrav",
    role: " Sr. Sales Executive",
    imageSrc: "/image/leaders/sales.webp",
  },
  {
    id: "3",
    name: "Shahidul",
    role: "Sr. Sales Executive",
    imageSrc: "/image/leaders/sales2.webp",
  },
  {
    id: "4",
    name: "Jubayer",
    role: "Sales Executive",
    imageSrc: "/image/leaders/sales3.webp",
  },
];


export function TeamMembers() {
  return (
    <section className="container">


      <div className="mt-16">
        <h2 className="text-xl font-semibold">
          Operations & Strategy Leadership
        </h2>
      </div>

      {/* Right: team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>


      <div className="mt-16">
        <h2 className="text-xl font-semibold">
          Sales & Client Relationship Management
        </h2>
      </div>

      {/* Right: team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {salesteamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>


    </section>
  );
}

export default TeamMembers;
