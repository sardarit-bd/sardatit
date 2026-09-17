export interface LeaderChapterItem {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  groupId: "founders" | "operations" | "sales";
  groupName: string;
}
