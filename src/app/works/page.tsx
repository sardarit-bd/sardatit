import React from "react";
import Hero from "./components/hero";
import Projects from "../../components/Projects";
import Cta from "@/components/Cta";
export default function page() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Projects />
      <Cta />
    </div>
  );
}
