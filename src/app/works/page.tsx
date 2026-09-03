import Cta from "@/components/Cta";
import Projects from "../../components/sections/projects";
export default function page() {
  return (
    <div className="w-full bg-white text-neutral-900 overflow-x-clip pt-16 md:pt-20">
      {/* <Hero /> */}
      <Projects />
      <Cta />
    </div>
  );
}
