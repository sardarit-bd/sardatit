export interface LeaderChapterItem {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  groupId: "founders" | "operations" | "sales";
  groupName: string;
}

export const LEADERS_DATA: LeaderChapterItem[] = [
  // 1. Founders & Executive Leadership (2 people)
  {
    id: "founder-1",
    name: "Md. Mamunur Roshid",
    role: "Founder & Chief Executive Officer (CEO)",
    imageSrc: "/image/founders/Mamun.webp",
    groupId: "founders",
    groupName: "Founders & Executive Leadership",
  },
  {
    id: "founder-2",
    name: "Mst. Arju Akhter",
    role: "Chairman",
    imageSrc: "/image/founders/Arju.webp",
    groupId: "founders",
    groupName: "Founders & Executive Leadership",
  },

  // 2. Operations & Strategy Leadership (5 people)
  {
    id: "ops-1",
    name: "Md. Parvej Ahammed",
    role: "General Manager",
    imageSrc: "/image/leaders/Md.-Parvej-Ahammed.webp",
    groupId: "operations",
    groupName: "Operations & Strategy Leadership",
  },
  {
    id: "ops-2",
    name: "Hossain Mahmud",
    role: "Project Manager",
    imageSrc: "/image/leaders/Hossain-Mahmud-Project-Manager.webp",
    groupId: "operations",
    groupName: "Operations & Strategy Leadership",
  },
  {
    id: "ops-3",
    name: "Md Sagor Ali",
    role: "Project Manager",
    imageSrc: "/image/leaders/sagor.webp",
    groupId: "operations",
    groupName: "Operations & Strategy Leadership",
  },
  {
    id: "ops-4",
    name: "Md Mehedi Hasan",
    role: "Business Development Manager",
    imageSrc: "/image/leaders/Medhi.webp",
    groupId: "operations",
    groupName: "Operations & Strategy Leadership",
  },
  {
    id: "ops-5",
    name: "Mst Amena Akter",
    role: "Team Lead",
    imageSrc: "/image/leaders/amena.webp",
    groupId: "operations",
    groupName: "Operations & Strategy Leadership",
  },

  // 3. Sales & Client Relationship Management (4 people)
  {
    id: "sales-1",
    name: "Md. Ekramul Hasan",
    role: "Sales Manager",
    imageSrc: "/image/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    groupId: "sales",
    groupName: "Sales & Client Relationship Management",
  },
  {
    id: "sales-2",
    name: "Showrav",
    role: "Sr. Sales Executive",
    imageSrc: "/image/leaders/sales.webp",
    groupId: "sales",
    groupName: "Sales & Client Relationship Management",
  },
  {
    id: "sales-3",
    name: "Shahidul",
    role: "Sr. Sales Executive",
    imageSrc: "/image/leaders/sales2.webp",
    groupId: "sales",
    groupName: "Sales & Client Relationship Management",
  },
  {
    id: "sales-4",
    name: "Jubayer",
    role: "Sales Executive",
    imageSrc: "/image/leaders/sales3.webp",
    groupId: "sales",
    groupName: "Sales & Client Relationship Management",
  },
];
