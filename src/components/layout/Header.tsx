"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { headerNavItems as navItems } from "@/data/navigation";
import BookaCallBtn from "@/components/ui/BookaCallBtn";
import MegaMenu, { CORE_SERVICES } from "./MegaMenu";

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

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isTransparentHero = isHomePage && !isScrolled && !isServicesOpen;

  const getNavLinkClass = (href?: string, hasDropdown?: boolean) => {
    const isActive = href
      ? href === "/"
        ? pathname === "/"
        : pathname.startsWith(href)
      : hasDropdown
        ? pathname.startsWith("/services")
        : false;

    if (isTransparentHero) {
      return `relative text-base xl:text-lg transition-opacity duration-200 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 after:ease-out hover:after:w-full font-medium ${
        isActive
          ? "text-white after:w-full font-semibold"
          : "text-white/90 hover:text-white after:w-0"
      }`;
    }

    return `relative text-base xl:text-lg transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-neutral-900 after:transition-all after:duration-300 after:ease-out hover:after:w-full font-medium ${
      isActive
        ? "text-black after:w-full font-semibold"
        : "text-neutral-800 hover:text-black after:w-0"
    }`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsServicesOpen(false);
      }
    };

    if (isServicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesOpen]);

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

  return (
    <>
      <header
        ref={headerRef}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full",
          isTransparentHero
            ? "bg-transparent text-white"
            : "bg-white/95 backdrop-blur-md border-b border-neutral-200/60 text-neutral-900 shadow-xs",
        ].join(" ")}
      >
        <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-2 md:py-0">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <div className="relative flex items-center">
              {/* Original Clean Logo */}
              <Link
                href="/"
                className="relative flex items-center h-10 w-44 md:h-11 md:w-48 group"
              >
                <Image
                  src="/image/logo.png"
                  alt="Sardar IT - Enterprise Software and Digital Solutions"
                  fill
                  quality={100}
                  className="object-contain object-left transition-transform duration-200 group-hover:scale-[1.01]"
                  priority
                />
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) =>
                item.hasDropdown ? (
                  <div
                    key={item.label}
                    className="relative group"
                    onMouseEnter={openServicesMenu}
                    onMouseLeave={scheduleCloseServicesMenu}
                  >
                    <button
                      type="button"
                      onClick={() => setIsServicesOpen((prev) => !prev)}
                      className={`inline-flex items-center gap-1.5 ${getNavLinkClass(undefined, true)} cursor-pointer bg-transparent border-0 p-0`}
                      aria-expanded={isServicesOpen}
                    >
                      {item.label}
                      <span
                        className={`flex items-center justify-center w-4 h-4 rounded-full border transition-colors ${isTransparentHero
                          ? "border-white/30 text-white/80 group-hover:border-white group-hover:text-white"
                          : "border-neutral-300 text-neutral-700 group-hover:border-neutral-900 group-hover:text-neutral-900"
                          }`}
                      >
                        <HiChevronDown
                          className={[
                            "w-2.5 h-2.5 transition-transform duration-200",
                            isServicesOpen
                              ? isTransparentHero
                                ? "rotate-180 text-white"
                                : "rotate-180 text-neutral-900"
                              : "",
                          ].join(" ")}
                        />
                      </span>
                    </button>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={getNavLinkClass(item.href)}
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
              className={`lg:hidden p-0! -mr-2 size-13! flex items-center justify-center transition-colors ${isTransparentHero ? "text-white" : "text-neutral-900"
                }`}
              aria-label="Open menu"
            >
              <HamburgerIcon isOpen={isMobileMenuOpen} />
            </button>
          </nav>
        </div>

        {/* 3-Column Structured Mega Menu */}
        <MegaMenu
          isOpen={isServicesOpen}
          onClose={() => setIsServicesOpen(false)}
          onMouseEnter={openServicesMenu}
          onMouseLeave={scheduleCloseServicesMenu}
        />
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-white text-neutral-900 lg:hidden"
          >
            <div className="flex flex-col h-full py-2 pb-20 pr-4 pl-6">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (pathname === "/") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="relative flex items-center h-8 w-32 md:h-9 md:w-36"
                >
                  <Image
                    src="/image/logo.png"
                    alt="Sardar IT - Enterprise Software and Digital Solutions"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="lg:hidden p-0! size-13! flex items-center justify-center rounded-full! text-neutral-900"
                >
                  <HamburgerIcon isOpen={true} />
                </button>
              </div>
              <nav className="flex flex-col gap-6 mt-12 overflow-y-auto max-h-[60vh] pr-2">
                {navItems.map((item, index) =>
                  item.hasDropdown ? (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                      className="flex flex-col gap-3"
                    >
                      <button
                        type="button"
                        onClick={() => setIsServicesOpen((prev) => !prev)}
                        className="flex items-center justify-between text-3xl font-semibold hover:text-neutral-600 transition-colors text-left w-full cursor-pointer bg-transparent border-0 p-0 text-neutral-900"
                      >
                        <span>{item.label}</span>
                        <HiChevronDown
                          className={`w-6 h-6 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-2 pl-4 border-l-2 border-neutral-200 mt-2 py-1"
                          >
                            {CORE_SERVICES.map((srv) => (
                              <Link
                                key={srv.id}
                                href={srv.href}
                                onClick={() => {
                                  setIsServicesOpen(false);
                                  setIsMobileMenuOpen(false);
                                }}
                                className={`text-base font-medium transition-colors py-2 flex items-center justify-between group ${
                                  pathname === srv.href
                                    ? "text-blue-600 font-semibold"
                                    : "text-neutral-700 hover:text-blue-600"
                                }`}
                              >
                                <span>{srv.title}</span>
                                <span className="text-xs text-neutral-400 group-hover:text-blue-600 transition-colors">→</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`text-3xl font-semibold transition-colors ${
                          pathname === item.href
                            ? "text-black font-bold"
                            : "text-neutral-900 hover:text-neutral-600"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ),
                )}
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
