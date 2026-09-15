"use client";

import { TeamMemberCard } from "@/components/ui/TeamMemberCard";
import { LEADERS_DATA } from "@/data/leaders";

export function TeamMembers() {
  const operationsMembers = LEADERS_DATA.filter((m) => m.groupId === "operations");
  const salesMembers = LEADERS_DATA.filter((m) => m.groupId === "sales");

  return (
    <section className="container">
      {/* Operations & Strategy Leadership */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">
          Operations & Strategy Leadership
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {operationsMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Sales & Client Relationship Management */}
      <div className="mt-16">
        <h2 className="text-xl font-semibold">
          Sales & Client Relationship Management
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
        {salesMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </section>
  );
}

export default TeamMembers;
