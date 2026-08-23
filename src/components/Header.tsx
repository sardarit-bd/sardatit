"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { HiChevronDown } from "react-icons/hi";
import { Button } from "../utils/Button";
import BookaCallBtn from "./ui/BookaCallBtn";
const navLinkClass =
  "relative text:md xl:text-lg text-text hover:text-text/80 transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-out hover:after:w-full";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/services", label: "Services", hasDropdown: true },
  { href: "/testimonials", label: "Testimonials" },
];

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <span className="relative block w-6 h-5" aria-hidden="true">
      <span
        className={[
          "absolute left-0 top-0 h-[3px] bg-current rounded-full",
          "transition-all duration-300 ease-in-out",
          isOpen ? "w-6 translate-y-1.75 rotate-45" : "w-5",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 top-1/2 -translate-y-1/2 h-[3px] w-7 bg-current rounded-full",
          "transition-opacity duration-200 ease-in-out",
          isOpen ? "opacity-0" : "opacity-100",
        ].join(" ")}
      />
      <span
        className={[
          "absolute left-0 bottom-0 h-[3px] bg-current rounded-full",
          "transition-all duration-300 ease-in-out",
          isOpen ? "w-6 -translate-y-1.75 -rotate-45" : "w-5",
        ].join(" ")}
      />
    </span>
  );
}

const servicesMenu = [
  {
    step: "01",
    title: "Plan",
    items: [
      { label: "Technical Consulting", href: "/services" },
      { label: "Product Strategy", href: "/services" },
      { label: "MVP Planning", href: "/services" },
    ],
  },
  {
    step: "02",
    title: "Design",
    items: [
      { label: "UI/UX Design", href: "/services" },
      { label: "Brand Identity", href: "/services" },
      { label: "Design Systems", href: "/services" },
    ],
  },
  {
    step: "03",
    title: "Build",
    items: [
      { label: "Web App Development", href: "/services" },
      { label: "Mobile App Development", href: "/services" },
      { label: "API Development", href: "/services" },
      { label: "E-commerce Development", href: "/services" },
    ],
  },
  {
    step: "04",
    title: "Scale",
    items: [
      { label: "DevOps & Deployment", href: "/services" },
      { label: "Maintenance & Support", href: "/services" },
      { label: "Performance Optimization", href: "/services" },
    ],
  },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const openServicesMenu = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsServicesOpen(true);
  };

  const scheduleCloseServicesMenu = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsServicesOpen(false);
    }, 150);
  };

  // const handleNavClick = (
  //   e: React.MouseEvent<HTMLAnchorElement>,
  //   href: string,
  // ) => {
  //   e.preventDefault();
  //   const element = document.querySelector(href);
  //   if (element) {
  //     const headerOffset = 80;
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition =
  //       elementPosition + window.pageYOffset - headerOffset;

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: "smooth",
  //     });
  //   }
  //   setIsMobileMenuOpen(false);
  //   setIsServicesOpen(false);
  // };

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          isScrolled
            ? "bg-background/80 shadow-sm backdrop-blur-md"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container py-2 md:py-0 overflow-hidden">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link
              href="/"
              className="relative flex items-center h-14 w-42 md:h-10 md:w-48"
            >
              <Image
                src="/image/logo.png"
                alt="Sardar IT"
                fill
                className="object-contain object-left"
                priority
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8 ">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.href}
                    className="relative"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={scheduleCloseServicesMenu}
                  >
                    <Link
                      href={item.href}
                      // onClick={(e) => handleNavClick(e, item.href)}
                      className={`inline-flex items-center gap-1.5 ${navLinkClass}`}
                      aria-expanded={isServicesOpen}
                    >
                      {item.label}
                      <span className="flex items-center justify-center w-4 h-4 rounded-full border border-border/70">
                        <HiChevronDown
                          className={[
                            "w-2.5 h-2.5 transition-transform duration-200",
                            isServicesOpen ? "rotate-180" : "",
                          ].join(" ")}
                        />
                      </span>
                    </Link>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    // onClick={(e) => handleNavClick(e, item.href)}
                    className={navLinkClass}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </div>

            <div className="hidden lg:block">
              <BookaCallBtn isheader={true} />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-0! -mr-2 size-13! flex items-center justify-center"
              aria-label="Open menu"
            >
              <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
          </nav>
        </div>

        <AnimatePresence>
          {isServicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={openServicesMenu}
              onMouseLeave={scheduleCloseServicesMenu}
              className="hidden lg:block absolute top-full inset-x-0 bg-background border-t border-b border-border/50 shadow-lg"
            >
              <div className="container mx-auto px-6 md:px-12 py-10">
                <div className="grid grid-cols-4 gap-8">
                  {servicesMenu.map((column) => (
                    <div key={column.title}>
                      <p className="text-xs tracking-widest text-text/50 mb-4">
                        {column.step}&nbsp;&nbsp;{column.title.toUpperCase()}
                      </p>
                      <ul className="space-y-8">
                        {column.items.map((service) => (
                          <li key={service.label}>
                            <Link
                              href={service.href}
                              // onClick={(e) => handleNavClick(e, service.href)}
                              className="group flex items-center justify-between w-full text-text hover:text-primary transition-colors"
                            >
                              <span>{service.label}</span>
                              <FiArrowRight className="w-4 h-4  group-hover:translate-x-0 transition-all" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t border-border/50 mt-8 pt-6">
                  <p className="text-xs tracking-widest text-text/50">
                    STILL DECIDING?{" "}
                    <span className="text-text/80">
                      EVERY GREAT PRODUCT STARTS WITH A 30-MINUTE CALL.
                    </span>
                  </p>
                  <Button
                    href="#contact"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <span className="relative z-10">Book a call</span>
                    <FiArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0  z-50 bg-background lg:hidden"
          >
            <div className="flex flex-col h-full py-2 pb-20 pr-4 pl-6 ">
              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="relative flex items-center h-8 w-32 md:h-9 md:w-36"
                >
                  <Image
                    src="/image/logo.png"
                    alt="Sardar IT"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="lg:hidden p-0!  size-13! flex items-center justify-center rounded-full!"
                >
                  <HamburgerIcon isOpen={true} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 mt-12">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      // onClick={(e) => handleNavClick(e, item.href)}
                      className="text-3xl font-semibold hover:text-text/80 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <BookaCallBtn isheader={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
