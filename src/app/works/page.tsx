import Cta from "@/components/modules/cta/CtaSection";
import Projects from "@/components/modules/projects/ProjectsSection";
export default function page() {
  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">
      {/* <Hero /> */}
      <Projects />
      <Cta />
    </div>
  );
}
