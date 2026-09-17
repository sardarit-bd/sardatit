import { Project } from "@/types/project";
import { projects } from "@/data/projects";

export type { Project };
export { projects };

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug || p.id === slug);
}
