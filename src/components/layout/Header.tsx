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

    // Dynamic scroll-aware liquid glass state on homepage hero
    const isHeroGlass = isHomePage && !isScrolled && !isServicesOpen;

    const getNavLinkClass = (href?: string, hasDropdown?: boolean) => {
        const isActive = href
            ? href === "/"
                ? pathname === "/"
                : pathname.startsWith(href)
            : hasDropdown
                ? pathname.startsWith("/services")
                : false;

        if (isHeroGlass) {
            return `relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive
                ? "bg-white/15 text-white"
                : "text-white/90 hover:text-white hover:bg-white/[0.08]"
                }`;
        }

        return `relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${isActive
            ? "text-neutral-950 font-semibold bg-neutral-100"
            : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-50"
            }`;
    };

    const isScrolledRef = useRef(false);
    const lastScrollYRef = useRef(0);
    const accumulatedDeltaRef = useRef(0);
    const isHiddenRef = useRef(false);
    const isHoveredRef = useRef(false);
    const isServicesOpenRef = useRef(false);
    const isMobileMenuOpenRef = useRef(false);

    // Synchronize state with refs for fast access in scroll callbacks without stale closures
    useEffect(() => {
        isServicesOpenRef.current = isServicesOpen;
    }, [isServicesOpen]);

    useEffect(() => {
        isMobileMenuOpenRef.current = isMobileMenuOpen;
    }, [isMobileMenuOpen]);

    // Imperative show/hide update: exactly 0 React re-renders during scroll
    const setHeaderHidden = (hidden: boolean) => {
        if (isHiddenRef.current === hidden) return;
        isHiddenRef.current = hidden;
        const el = headerRef.current;
        if (el) {
            el.dataset.hidden = hidden ? "true" : "false";
            el.style.transform = hidden ? "translateY(-100%)" : "translateY(0)";
            el.style.pointerEvents = hidden ? "none" : "auto";
        }
    };

    const processScroll = (rawY: number) => {
        const currentY = Math.max(0, rawY);

        // 1. Unified isScrolled check (only calls setIsScrolled when boolean actually changes)
        const scrolled = currentY > 20;
        if (scrolled !== isScrolledRef.current) {
            isScrolledRef.current = scrolled;
            setIsScrolled(scrolled);
        }

        // 2. Always show at the top of the page (scrollY <= 20px)
        if (currentY <= 20) {
            accumulatedDeltaRef.current = 0;
            lastScrollYRef.current = currentY;
            setHeaderHidden(false);
            return;
        }

        // 3. Ignore bottom overscroll bounce
        if (typeof document !== "undefined") {
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            if (docHeight > 0 && winHeight > 0 && currentY >= docHeight - winHeight - 10) {
                lastScrollYRef.current = currentY;
                return;
            }
        }

        const delta = currentY - lastScrollYRef.current;
        lastScrollYRef.current = currentY;

        // Ignore negligible fractional delta
        if (Math.abs(delta) < 0.2) return;

        // Respect prefers-reduced-motion: keep header always visible and stationary
        if (
            typeof window !== "undefined" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            setHeaderHidden(false);
            return;
        }

        if (delta > 0) {
            // Scrolling DOWN
            if (accumulatedDeltaRef.current < 0) {
                accumulatedDeltaRef.current = delta; // Direction reversed from up to down
            } else {
                accumulatedDeltaRef.current += delta;
            }

            if (accumulatedDeltaRef.current >= 10) {
                // States that keep header visible
                if (isMobileMenuOpenRef.current || isHoveredRef.current) {
                    return;
                }

                // If services mega menu is open and user scrolls down, close it and hide header
                if (isServicesOpenRef.current) {
                    setIsServicesOpen(false);
                }

                setHeaderHidden(true);
            }
        } else {
            // Scrolling UP
            if (accumulatedDeltaRef.current > 0) {
                accumulatedDeltaRef.current = delta; // Direction reversed from down to up
            } else {
                accumulatedDeltaRef.current += delta;
            }

            if (Math.abs(accumulatedDeltaRef.current) >= 10) {
                setHeaderHidden(false);
            }
        }
    };

    // Unified scroll listener: attaches to Lenis if present, falls back to passive window scroll
    useEffect(() => {
        let unsubscribeLenis: (() => void) | null = null;
        let isListeningToWindow = false;

        const onWindowScroll = () => {
            const lenis = (
                window as unknown as {
                    __lenis?: {
                        on: (
                            event: string,
                            cb: (e: { scroll: number; direction: number }) => void,
                        ) => () => void;
                    };
                }
            ).__lenis;

            if (lenis && !unsubscribeLenis) {
                window.removeEventListener("scroll", onWindowScroll);
                isListeningToWindow = false;
                setupLenis(lenis);
                return;
            }
            processScroll(window.scrollY || 0);
        };

        const setupLenis = (lenisInstance: {
            on: (
                event: string,
                cb: (e: { scroll: number; direction: number }) => void,
            ) => () => void;
        }) => {
            if (unsubscribeLenis) {
                unsubscribeLenis();
                unsubscribeLenis = null;
            }
            unsubscribeLenis = lenisInstance.on("scroll", ({ scroll }) => {
                processScroll(scroll);
            });
        };

        // Check if Lenis is already available
        const initialLenis = (
            window as unknown as {
                __lenis?: {
                    on: (
                        event: string,
                        cb: (e: { scroll: number; direction: number }) => void,
                    ) => () => void;
                };
            }
        ).__lenis;

        if (initialLenis) {
            setupLenis(initialLenis);
        } else {
            window.addEventListener("scroll", onWindowScroll, { passive: true });
            isListeningToWindow = true;
        }

        // Safety timeout to catch Lenis creation if LenisProvider initializes right after mount
        const checkTimer = setTimeout(() => {
            const l = (
                window as unknown as {
                    __lenis?: {
                        on: (
                            event: string,
                            cb: (e: { scroll: number; direction: number }) => void,
                        ) => () => void;
                    };
                }
            ).__lenis;
            if (l && !unsubscribeLenis) {
                if (isListeningToWindow) {
                    window.removeEventListener("scroll", onWindowScroll);
                    isListeningToWindow = false;
                }
                setupLenis(l);
            }
        }, 100);

        // Initial check on mount
        processScroll(typeof window !== "undefined" ? window.scrollY : 0);

        const headerEl = headerRef.current;
        const handleMouseEnter = () => {
            isHoveredRef.current = true;
        };
        const handleMouseLeave = () => {
            isHoveredRef.current = false;
        };
        const handleFocusIn = () => {
            setHeaderHidden(false);
            accumulatedDeltaRef.current = 0;
        };

        if (headerEl) {
            headerEl.addEventListener("mouseenter", handleMouseEnter);
            headerEl.addEventListener("mouseleave", handleMouseLeave);
            headerEl.addEventListener("focusin", handleFocusIn);
        }

        return () => {
            clearTimeout(checkTimer);
            if (unsubscribeLenis) {
                unsubscribeLenis();
            }
            if (isListeningToWindow) {
                window.removeEventListener("scroll", onWindowScroll);
            }
            if (headerEl) {
                headerEl.removeEventListener("mouseenter", handleMouseEnter);
                headerEl.removeEventListener("mouseleave", handleMouseLeave);
                headerEl.removeEventListener("focusin", handleFocusIn);
            }
        };
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsServicesOpen(false);
        setHeaderHidden(false);
        accumulatedDeltaRef.current = 0;
        lastScrollYRef.current = typeof window !== "undefined" ? window.scrollY : 0;
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        const lenis = (
            window as unknown as {
                __lenis?: { stop: () => void; start: () => void };
            }
        ).__lenis;

        if (isMobileMenuOpen) {
            lenis?.stop();
        } else {
            lenis?.start();
        }

        return () => {
            document.body.style.overflow = "";
            lenis?.start();
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
                data-header-nav
                data-hidden="false"
                onMouseEnter={() => {
                    isHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                    isHoveredRef.current = false;
                }}
                onFocusCapture={() => {
                    setHeaderHidden(false);
                    accumulatedDeltaRef.current = 0;
                }}
                style={{
                    transition:
                        "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease-in-out, border-color 300ms ease-in-out, color 300ms ease-in-out, box-shadow 300ms ease-in-out, backdrop-filter 300ms ease-in-out",
                    willChange: "transform",
                }}
                className={`fixed top-0 left-0 right-0 z-50 w-full ${isHeroGlass
                    ? "bg-transparent hover:bg-white/[0.03] backdrop-blur-[6px] border-b border-white/[0.08] text-white"
                    : "bg-white/90 backdrop-blur-md border-b border-neutral-200/60 text-neutral-900 shadow-sm"
                    }`}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-300 ease-in-out">
                    <nav className="flex items-center justify-between h-16 md:h-20 transition-all duration-300 ease-in-out">
                        <div className="relative flex items-center">
                            {/* Dynamic Logo: Pure White on Liquid Glass Hero, Brand-Blue on Scrolled/Light */}
                            <Link
                                href="/"
                                className="relative flex items-center h-10 w-44 md:h-11 md:w-48 group cursor-pointer"
                            >
                                {/* Crisp pure white logo for Top Hero state */}
                                <Image
                                    src="/images/brand/logo-white.png"
                                    alt="Sardar IT - Enterprise Software and Digital Solutions"
                                    fill
                                    quality={100}
                                    className={`object-contain object-left transition-all duration-300 ease-in-out group-hover:scale-[1.01] ${isHeroGlass
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 pointer-events-none"
                                        }`}
                                    priority
                                />

                                {/* Original brand-blue logo for Scrolled state & Inner pages */}
                                <Image
                                    src="/images/brand/logo.png"
                                    alt="Sardar IT - Enterprise Software and Digital Solutions"
                                    fill
                                    quality={100}
                                    className={`object-contain object-left transition-all duration-300 ease-in-out group-hover:scale-[1.01] ${!isHeroGlass
                                        ? "opacity-100 scale-100"
                                        : "opacity-0 scale-95 pointer-events-none"
                                        }`}
                                    priority
                                />
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center gap-6">
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
                                            className={`inline-flex items-center gap-1.5 ${getNavLinkClass(undefined, true)} cursor-pointer bg-transparent border-0`}
                                            aria-expanded={isServicesOpen}
                                        >
                                            <span>{item.label}</span>
                                            <span
                                                className={`flex items-center justify-center w-4 h-4 rounded-full border transition-all duration-300 ease-in-out ${isHeroGlass
                                                    ? "border-white/30 text-white/90 group-hover:border-white group-hover:text-white"
                                                    : "border-neutral-300 text-neutral-700 group-hover:border-neutral-900 group-hover:text-neutral-900"
                                                    }`}
                                            >
                                                <HiChevronDown
                                                    className={`w-2.5 h-2.5 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""
                                                        }`}
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
                            <BookaCallBtn variant={isHeroGlass ? "hero" : "scrolled"} />
                        </div>

                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className={`lg:hidden p-0! -mr-2 size-12 flex items-center justify-center transition-colors duration-300 cursor-pointer ${isHeroGlass ? "text-white" : "text-neutral-900"
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
                                        src="/images/brand/logo.png"
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
                            <nav
                                data-lenis-prevent
                                className="flex flex-col gap-6 mt-12 overflow-y-auto max-h-[60vh] pr-2"
                            >
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
                                                                className={`text-base font-medium transition-colors py-2 flex items-center justify-between group ${pathname === srv.href
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
                                                className={`text-3xl font-semibold transition-colors ${pathname === item.href
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
                                <BookaCallBtn />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
