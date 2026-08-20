"use client";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import ProjectCardVartical from "./ui/ProjectCardVertical";
export default function Projects() {
  return (
    <section className="py-16 md:py-20 flex flex-col gap-10 bg-gray-200">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div className="flex flex-col gap-4 max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            / Selected work
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-wide">
            <span style={{ color: "var(--text)" }}>
              Products we&apos;ve designed,
              <br />
            </span>
            <span className="text-gray-500">built, and shipped.</span>
          </h2>
        </div>

        <div className="shrink-0 flex">
          <Link
            href="/contact"
            className={`group inline-flex items-center gap-3 px-4 py-2.5 bg-slate-950 text-white font-semibold text-sm md:text-base hover:bg-[#133bd4] transition-all duration-300 hover:scale-[1.02] shadow-xl shadow-slate-950/20`}
          >
            <span>See all case studies</span>
            <span className="flex items-center justify-center size-7 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-[#133bd4] transition-colors">
              <FiArrowUpRight className="text-base transition-transform group-hover:rotate-45" />
            </span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:items-end md:justify-between gap-8">
        {/* Featured Project */}
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <ProjectCardVartical
            eyebrow="Real Estate Website"
            title="CASA VIVA"
            description="A premium real estate platform built to showcase luxury property listings and simplify the property discovery experience for buyers and investors."
            statValue="4"
            statLabel="services delivered"
            ctaLabel="View Details"
            ctaHref="/projects/casa-viva"
            imageSrc="/image/project/CASA.webp"
            imageAlt="CASA VIVA Real Estate Website"
          />

          <ProjectCardVartical
            eyebrow="Hospital Management System"
            title="MedEase"
            description="A secure hospital management platform with an intuitive interface to improve healthcare operations, patient engagement, and medical workflows."
            statValue="3"
            statLabel="services delivered"
            ctaLabel="View Details"
            ctaHref="/projects/medease"
            imageSrc="/image/project/MedEase.webp"
            imageAlt="MedEase Hospital Management"
          />
        </div>

        {/* Two Projects */}
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <ProjectCardVartical
            eyebrow="Medical Website"
            title="White Cross Clinic"
            description="A modern healthcare website for a medical clinic with a professional design focused on patient engagement and accessibility."
            statValue="3"
            statLabel="services delivered"
            ctaLabel="View Details"
            ctaHref="/project/White_Cross_Clinic.webp"
            imageSrc="/image/project/White_Cross_Clinic.webp"
            imageAlt="White Cross Clinic Website"
          />

          <ProjectCardVartical
            eyebrow="Music Application"
            title="Gulf County"
            description="An engaging music and cultural application designed to showcase creativity, stories, and traditions through an immersive digital experience."
            statValue="3"
            statLabel="services delivered"
            ctaLabel="View Details"
            ctaHref="/projects/gulf-county"
            imageSrc="/image/project/gulf.webp"
            imageAlt="Gulf County Music Application"
          />
        </div>




        {/* Last Project */}
        <div className="w-full flex flex-col lg:flex-row gap-5">
          <ProjectCardVartical
            eyebrow="Home Services Website"
            title="Home Service Provider"
            description="A user-friendly service platform built to showcase home services, manage bookings, and generate customer inquiries efficiently."
            statValue="3"
            statLabel="services delivered"
            ctaLabel="View Details"
            ctaHref="/projects/home-service-provider"
            imageSrc="/image/project/HomeServiceProvider.webp"
            imageAlt="Home Service Provider Website"
          />

          {/* Optional placeholder for future project */}
          <ProjectCardVartical
            eyebrow="Coming Soon"
            title="Next Project"
            description="Another innovative digital product currently in development. Stay tuned for the complete case study."
            statValue="Soon"
            statLabel="launching"
            ctaLabel="Coming Soon"
            ctaHref="#"
            imageSrc="/image/project/MedEase.webp"
            imageAlt="Upcoming Project"
          />
        </div>
      </div>
    </section>
  );
}
