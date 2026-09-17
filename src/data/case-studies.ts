import { CaseStudy } from "@/types/project";

// Case Studies Data Dictionary
export const CASE_STUDIES: Record<string, CaseStudy> = {
  "recharge-iv": {
    slug: "recharge-iv",
    title: "Recharge IV",
    company: "Recharge IV",
    category: "Web Design",
    timelines: "3 Months",
    liveUrl: null,
    services: ["User Research", "UI Design", "Development"],
    heroImage:
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b4_Frame%201984077426%20(3).avif",
    about: [
      "Recharge IV provides convenient door-to-door drip therapy services, offering wellness treatments in the comfort of clients' homes.",
      "We designed the entire website for Recharge IV, incorporating engaging 3D elements and micro-interactions to enhance the user experience.",
      "This thoughtful design not only streamlines the booking process but also reflects the ease and comfort of the services.",
    ],
    coverImage:
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b5_Cover%20(11).avif",
    objectives:
      "The client wanted a website for Recharge IV that makes booking door-to-door drip therapies effortless. They emphasized the importance of keeping the design consistent even when adding new drip and wellness products.",
    requirements:
      "The drip booking should be straightforward and swift, avoiding unnecessary steps for users. Additionally, they want the ability to update the site with new content easily, minimizing the need for frequent designer involvement.",
    solutions:
      "We designed a modern website for Recharge IV, featuring engaging 3D product images and smooth micro-interactions to create a swift and intuitive booking experience for users.",
    macbookView:
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497343_Recharge-IV-macbook-view.avif",
    mobileGrid: [
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497342_Recharge-IV-mobile-version.avif",
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497344_Recharge-IV-mobile-view.avif",
    ],
    styleGuideText:
      "The style guide for Recharge IV features a bold color palette. This combination was chosen to convey an energetic and vibrant vibe, reflecting the dynamic nature of the drip therapy services.",
    styleGuideGrid: [
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497345_Recharge-IV-typography.avif",
      "https://cdn.prod.website-files.com/697722e913f661fc1b497346_Recharge-IV-color.avif",
    ],
    styleBanner:
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b497347_Recharge-IV-style-image.avif",
    footerShowcase:
      "https://cdn.prod.website-files.com/697722e913f661fc1b49692f/697722e913f661fc1b4975b9_fff.avif",
  },
  "casa-viva": {
    slug: "casa-viva",
    title: "CASA VIVA",
    company: "Casa Viva Properties",
    category: "Real Estate Website",
    timelines: "4 Months",
    liveUrl: "https://casa-viva-frontend.vercel.app/",
    services: ["Brand Identity", "UI/UX Design", "Web Development", "Search & Maps Integration"],
    heroImage: "/images/projects/casa-viva.webp",
    about: [
      "CASA VIVA is a high-converting luxury real estate platform built to showcase luxury property listings, capture qualified leads, and simplify the property discovery experience for buyers and investors.",
      "Our solution includes advanced property listings, smart search filters, interactive map exploration, and seamless inquiry management for buyers and agents.",
    ],
    coverImage: "/image/project/casa-viva/properties-page.png",
    objectives:
      "To establish a premier real estate portal with advanced search, virtual showcases, and direct agent inquiry routing.",
    requirements:
      "Multi-criteria filtering by price, location, and property type, responsive layout on all screen sizes, and broker management tools.",
    solutions:
      "Delivered a blazing fast Next.js platform featuring interactive spatial views, instant inquiries, and an admin dashboard.",
    macbookView: "/image/project/casa-viva/casa-viva.png",
    mobileGrid: [],
    responsivenessText:
      "Fully responsive and optimized across all mobile devices, tablets, and desktops for real estate buyers and investors on the move.",
  },
  medease: {
    slug: "medease",
    title: "MedEase",
    company: "MedEase Healthcare",
    category: "Hospital Management System",
    timelines: "3 Months",
    liveUrl: "https://med-ease-frontend.vercel.app/",
    services: ["UX Research", "UI Design", "AI Automation", "Full Stack Development"],
    heroImage: "/images/projects/medease.webp",
    about: [
      "MedEase is a secure hospital management platform designed to streamline clinical operations, patient engagement, and medical workflows.",
      "We created intuitive doctor-patient dashboards, automated scheduling, and centralized electronic health records (EHR).",
    ],
    coverImage: "/image/project/medease/Philosophy.png",
    objectives:
      "Streamline patient intake, appointment scheduling, and electronic health record management for multi-specialty clinics.",
    requirements:
      "HIPAA compliance, role-based access for nurses and doctors, and real-time bed and clinic resource allocation.",
    solutions:
      "An intuitive dashboard interface that reduces administrative workload by 70% and enhances patient care experience.",
    macbookView: "/image/project/medease/patitent-dashboard.png",
    mobileGrid: [],
    responsivenessText:
      "Accessible securely anywhere for clinicians, patients, and administrators on hospital tablets and smartphones.",
  },
  "white-cross-clinic": {
    slug: "white-cross-clinic",
    title: "White Cross Clinic",
    company: "White Cross Medical Center",
    category: "Medical Website",
    timelines: "2.5 Months",
    liveUrl: "https://white-cross-clinic-frontend.vercel.app/",
    services: ["UI/UX Design", "Patient Portal", "Web Development"],
    heroImage: "/images/projects/white-cross-clinic.webp",
    about: [
      "White Cross Clinic is a modern healthcare website for a multi-disciplinary medical clinic with a patient-centered design focused on accessibility and trust.",
      "Features automated doctor dispatch, instant consultation booking, and health tips repository.",
    ],
    coverImage: "/image/project/white-cross/dashboard.png",
    objectives:
      "Modernize the clinic's digital presence and allow patients to easily book appointments and view clinical specialties.",
    requirements:
      "Fast load times, WCAG accessibility compliance, and integration with existing patient registry systems.",
    solutions:
      "Engineered a high-performance Next.js clinic portal with streamlined booking and direct doctor communications.",
    macbookView: "/image/project/white-cross/image.png",
    mobileGrid: [],
    responsivenessText:
      "Ensured rapid access from mobile devices so patients can schedule appointments or view clinic hours anytime.",
  },
  "gulf-county": {
    slug: "gulf-county",
    title: "Gulf County",
    company: "Gulf County Media",
    category: "Music Application",
    timelines: "4 Months",
    liveUrl: "https://gulfcoastmusic.live/",
    services: ["Mobile App Development", "Audio Streaming UI", "API Architecture"],
    heroImage: "/images/projects/gulf-county.webp",
    about: [
      "Gulf County is an engaging audio and cultural streaming application designed to showcase regional heritage, stories, and music.",
      "Built with cross-platform technology offering crisp audio streaming, offline playback, and customized user playlists.",
    ],
    coverImage: "/image/project/gulf-coast/calendar.png",
    objectives:
      "Deliver an immersive music and cultural streaming experience with rich community sharing features.",
    requirements:
      "Low-latency streaming, offline downloads, seamless media player controls, and curated audio stories.",
    solutions:
      "Developed an intuitive React Native app with local cache management and interactive audio visualization.",
    macbookView: "/image/project/gulf-coast/marketplace.png",
    mobileGrid: [],
    responsivenessText:
      "Crafted specifically for seamless listening on iOS and Android devices on the go.",
  },
  "home-service-provider": {
    slug: "home-service-provider",
    title: "Home Service Provider",
    company: "Home Service Pro Network",
    category: "Home Services Platform",
    timelines: "3.5 Months",
    liveUrl: "https://home-service-project-livid.vercel.app/",
    services: ["Product Architecture", "UI/UX Design", "Full Stack Development"],
    heroImage: "/images/projects/home-service-provider.webp",
    about: [
      "A comprehensive service marketplace platform connecting homeowners with certified maintenance specialists for plumbing, electrical, and HVAC repairs.",
      "Features automated technician matching, transparent pricing estimates, and real-time appointment tracking.",
    ],
    coverImage: "/image/project/home-service/service.png",
    objectives:
      "Create a friction-free booking platform that converts homeowners looking for trusted on-demand home repair services.",
    requirements:
      "Instant booking engine, service catalog management, customer review verification, and mobile worker portal.",
    solutions:
      "Delivered an end-to-end web application driving 3.5x higher quote request conversion and automated technician dispatch.",
    macbookView: "/image/project/home-service/top-provider.png",
    mobileGrid: [],
    responsivenessText:
      "Seamless experience for homeowners making urgent repair requests from their mobile phones.",
  },
  "asia-lms": {
    slug: "asia-lms",
    title: "Asia LMS",
    company: "Asia Learning Systems",
    category: "Learning Management System",
    timelines: "3 Months",
    liveUrl: "https://high-end-multipurpose-lms.vercel.app/",
    services: ["LMS Architecture", "UI/UX Design", "Video Platform Integration"],
    heroImage: "/image/project/asia-lms-cover.png",
    about: [
      "An intuitive LMS platform that simplifies online education through structured video courses, progress tracking, and interactive quizzes across all devices.",
      "Built for high concurrency, accessibility, and role-based student and instructor management.",
    ],
    coverImage: "/images/projects/asia-lms.webp",
    objectives:
      "Provide educational institutions and training academies with an end-to-end digital learning environment.",
    requirements:
      "Structured video courses, quiz engines, certificate generation, and student engagement analytics.",
    solutions:
      "Developed an enterprise-grade web application supporting 10k+ learners with real-time course progress tracking.",
    macbookView: "/image/project/asia-lms-courses.png",
    mobileGrid: [],
    responsivenessText:
      "Optimized for students learning on tablets, laptops, and mobile devices with adaptive video streaming.",
  },
};

export const OTHER_PROJECTS = [
  { name: "CASA VIVA", slug: "casa-viva", category: "Real Estate Website" },
  { name: "MedEase", slug: "medease", category: "Hospital Management" },
  { name: "White Cross Clinic", slug: "white-cross-clinic", category: "Medical Website" },
  { name: "Gulf County", slug: "gulf-county", category: "Music Application" },
  { name: "Home Service Provider", slug: "home-service-provider", category: "Home Services" },
  { name: "Asia LMS", slug: "asia-lms", category: "LMS Platform" },
  { name: "Recharge IV", slug: "recharge-iv", category: "Web Design" },
];
