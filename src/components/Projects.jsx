"use client";
import ProjectCardVartical from "./ui/ProjectCardVertical";
import SectionHeader from "./ui/SectionHeader";
export default function Projects() {
  return (
    <section className="py-16 md:py-20 flex flex-col gap-10 bg-gray-200">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8">

        <SectionHeader tag={"Selected work"} title1="Products we've" pre="" title2="designed,built, and shipped." isBgWhite={true} link={'/'} btn={'See all case studies'} />
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
            imageSrc="https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970fb_Rivertel-UI-UX-Design-for-Telecom-Solutions.webp"
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
            imageSrc="https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp"
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
            imageSrc="https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp"
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
            imageSrc="https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp"
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
            imageSrc="https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp"
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
            imageSrc="https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4970b7_Abyan-Capital-Trading-Mobile-App.webp"
            imageAlt="Upcoming Project"
          />
        </div>
      </div>
    </section>
  );
}
