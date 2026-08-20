"use client";
import Image from "next/image";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
interface SocialLinks {
  facebook?: string;
  github?: string;
  linkedin?: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  socials: SocialLinks;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Md. Parvej Ahammed",
    role: "General Manager",
    avatarUrl: "/image/leaders/Md.-Parvej-Ahammed.webp",
    socials: { facebook: "#", github: "#", linkedin: "#" },
  },
  {
    id: "2",
    name: "Hossain Mahmud",
    role: "Project Manager",
    avatarUrl: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    socials: { facebook: "#", github: "#", linkedin: "#" },
  },
  {
    id: "3",
    name: "Md Sagor Ali",
    role: "Project Manager",
    avatarUrl: "/image/leaders/sagor.webp",
    socials: { facebook: "#", github: "#", linkedin: "#" },
  },
  {
    id: "4",
    name: "Md. Ekramul Hasan",
    role: "Sales Manager",
    avatarUrl: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    socials: { facebook: "#", github: "#", linkedin: "#" },
  },
  {
    id: "5",
    name: "Md Mehedi Hasan",
    role: " Business Development Manager",
    avatarUrl: "/image/leaders/Medhi.webp",
    socials: { facebook: "#", github: "#", linkedin: "#" },
  },
  {
    id: "6",
    name: "Mst Amena Akter",
    role: "Team Lead",
    avatarUrl: "/image/leaders/amena.webp",
    socials: { facebook: "#", github: "#", linkedin: "#" },
  },
];

function SocialLinksRow({ socials }: { socials: SocialLinks }) {
  return (
    <div className="flex items-center justify-center gap-4">
      {socials.facebook && (
        <a
          href={socials.facebook}
          aria-label="Facebook"
          className="text-gray-400 hover:text-gray-950 transition-colors"
        >
          <FaFacebook className="w-4 h-4" />
        </a>
      )}
      {/* {socials.github && (
        <a
          href={socials.github}
          aria-label="GitHub"
          className="text-gray-400 hover:text-gray-950 transition-colors"
        >
          <Github className="w-4 h-4" />
        </a>
      )} */}
      {socials.linkedin && (
        <a
          href={socials.linkedin}
          aria-label="LinkedIn"
          className="text-gray-400 hover:text-gray-950 transition-colors"
        >
          <FaLinkedin className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="w-full sm:w-56 flex flex-col items-center gap-4">
      <div className="size-80 rounded-full relative  overflow-hidden shrink-0">
        <Image
          src={member.avatarUrl}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-center text-gray-950 text-lg font-bold leading-7">
            {member.name}
          </div>
          <div className="text-center text-gray-500 font-bold text-sm uppercase leading-6">
            {member.role}
          </div>
        </div>
        {/* <SocialLinksRow socials={member.socials} /> */}
      </div>
    </div>
  );
}

export function TeamMembers() {
  return (
    <section className="w-full px-6 sm:px-10 pt-20 flex flex-col items-start gap-12 lg:gap-10 overflow-hidden">
      <div className="mx-auto max-w-7xl text-center ">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="justify-center text-3xl md:text-7xl"
        >
          Meet the Team Behind Your Growth
        </motion.h1>

        <motion.p
          className="pt-4 text-sm md:text-base text-muted "
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-semibold text-text">Since 2014</span>, Nucleo
          has been meticulously crafted by a dedicated duo of developers in
          Italy. With years of experience in creating icons and consistently
          delivering app updates, we are deeply committed to the future of
          Nucleo. After all, Nucleo isn&apos;t just our product — it&apos;s our
          livelihood.
        </motion.p>
      </div>

      {/* Right: team grid */}
      <div className="w-full mx-auto max-w-7xl  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 ">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

export default TeamMembers;
