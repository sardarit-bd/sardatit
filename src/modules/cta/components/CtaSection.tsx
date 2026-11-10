"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiArrowUpRight,
  FiCheck,
  FiLoader,
  FiMail,
  FiPlus,
} from "react-icons/fi";
import { SERVICES_OPTIONS, BUDGET_OPTIONS } from "@/data/cta";
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

const AVATARS = [
  {
    src: "/images/team/leaders/Md.-Parvej-Ahammed.webp",
    alt: "Md. Parvej Ahammed",
  },
  { src: "/images/team/leaders/amena.webp", alt: "Amena" },
  {
    src: "/images/team/leaders/Md-Ekramul-Hasan-Sales-Manager.webp",
    alt: "Md Ekramul Hasan",
  },
];

const BULLETS = [
  "We'll get back to you within 12 business hours.",
  "We'll prepare a clear project brief and roadmap.",
  "NDA can be signed upon request.",
];
const labelClass =
  "mb-4 text-base font-medium leading-[1.3] text-white sm:mb-6 sm:text-xl";
const inputClass =
  "block w-full border-0 border-b border-white bg-transparent p-0 pb-3 text-base leading-[1.3] text-white placeholder:text-[#B1B1B1] focus:outline-none sm:text-lg";

export default function CtaSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    serviceRequired: "",
    projectBudget: "",
    projectDetails: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCookies, setShowCookies] = useState(true);
  const detailsRef = useRef<HTMLTextAreaElement>(null);
  const DETAILS_MAX_HEIGHT = 240;

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;
    el.style.height = "auto";
    const border = el.offsetHeight - el.clientHeight;
    const next = el.scrollHeight + border;
    el.style.height = `${Math.min(next, DETAILS_MAX_HEIGHT)}px`;
    el.style.overflowY = next > DETAILS_MAX_HEIGHT ? "auto" : "hidden";
  }, [formData.projectDetails]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.serviceRequired || !formData.projectBudget) {
      setErrorMsg("Please select a required service and your project budget.");
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: formData.fullName,
      company_name: formData.companyName.trim() || "N/A",
      reply_to: formData.email,
      service_required: formData.serviceRequired,
      project_budget: formData.projectBudget,
      project_details: formData.projectDetails,
      to_name: "Parvej Ahammed",
      user_email: formData.email,
      message: formData.projectDetails,
    };

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setErrorMsg(
        "Email service is not configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment.",
      );
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );

      setSubmitted(true);
      setErrorMsg("");
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        serviceRequired: "",
        projectBudget: "",
        projectDetails: "",
      });
    } catch (error: any) {
      console.error("EmailJS Submission Error:", error);
      setErrorMsg(
        error?.text ||
          error?.message ||
          "Failed to send inquiry. Please try again or reach out directly at info@sardarit.com.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative w-full bg-[#F5F8FF] py-10 sm:py-14 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 rounded-3xl bg-black p-6 text-white sm:p-8 lg:grid-cols-[532fr_660fr] lg:gap-12 lg:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-10 lg:justify-between lg:gap-15"
          >
            <div className="flex flex-col gap-8 lg:gap-12">
              <div>
                <div className="mb-2 flex items-center gap-2 py-2 text-sm font-medium uppercase leading-[1.4] text-[#285CFF] sm:text-base">
                  <span className="flex size-2 shrink-0 items-center justify-center rounded-full border-[0.5px] border-[#285CFF]">
                    <span className="size-1.5 rounded-full bg-[#285CFF]" />
                  </span>
                  <span>Let&apos;s Build Together</span>
                </div>

                <h2 className="text-[clamp(2.25rem,5vw,4.25rem)] font-semibold leading-[1.2] text-white">
                  Have an Idea?
                  <br />
                  Talk Directly with
                  <br />
                  Our Experts
                </h2>
              </div>
              <div className="flex items-center">
                {AVATARS.map((a) => (
                  <span
                    key={a.src}
                    className="relative -mx-2.5 size-12 shrink-0 overflow-hidden rounded-full border-2 border-[#C9D6FF] bg-neutral-200 sm:-mx-3.5 sm:size-16"
                  >
                    <Image
                      src={a.src}
                      alt={a.alt}
                      fill
                      sizes="64px"
                      className="object-cover object-top"
                    />
                  </span>
                ))}
                <span className="relative ml-1 flex size-12 shrink-0 items-center justify-center rounded-full bg-[#1747E0] text-white sm:ml-0 sm:size-16">
                  <FiPlus className="text-2xl sm:text-3xl" />
                </span>
              </div>

              <ul className="m-0 w-full list-none space-y-0 p-0 text-left text-base leading-[1.6] tracking-[-0.02em] text-white sm:text-xl">
                {BULLETS.map((b) => (
                  <li
                    key={b}
                    className="flex w-full items-start justify-start! gap-3 text-left "
                  >
                    <span className="mt-[0.8em] size-1.5 shrink-0 rounded-full bg-white" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 sm:gap-6">
              <p className="text-base font-medium leading-[1.6] tracking-[-0.02em] text-white sm:text-xl">
                Or directly connected with us
              </p>
              <div className="flex flex-col gap-4 text-base text-white sm:text-xl">
                <a
                  href="tel:+8801335111700"
                  className="flex items-center gap-3 transition-colors hover:text-[#6C8DFF]"
                >
                  <FaWhatsapp className="size-6 shrink-0 text-[#1747E0]" />
                  <span>+88 01335-111700</span>
                </a>
                <a
                  href="mailto:info@sardaritbd.com"
                  className="flex items-center gap-3 transition-colors hover:text-[#6C8DFF]"
                >
                  <FiMail className="size-6 shrink-0 text-[#1747E0]" />
                  <span>info@sardaritbd.com</span>
                </a>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8 lg:justify-between lg:px-10"
          >
            <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2.5 rounded border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-medium text-emerald-300 sm:text-sm"
                >
                  <FiCheck className="shrink-0 text-base text-emerald-400" />
                  <span>
                    Thank you! Your inquiry has been sent successfully. Our team
                    will review your project requirements and reach out shortly.
                  </span>
                </motion.div>
              )}

              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-medium text-red-300 sm:text-sm"
                >
                  {errorMsg}
                </motion.div>
              )}
              <div className="flex flex-col">
                <label htmlFor="fullName" className={labelClass}>
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jone Cooper"
                  className={inputClass}
                  required
                />
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-6">
                <div className="flex flex-col">
                  <label htmlFor="companyName" className={labelClass}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Ex. Tesla Inc"
                    className={inputClass}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className={labelClass}>
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@exampl.com"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:gap-6 [&_label]:mb-4 [&_label]:text-base [&_label]:font-medium [&_label]:leading-[1.3] [&_label]:text-white sm:[&_label]:mb-6 sm:[&_label]:text-xl">
                <CustomSelect
                  variant="dark"
                  id="serviceRequired"
                  name="serviceRequired"
                  label="Service Required*"
                  value={formData.serviceRequired}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, serviceRequired: val }))
                  }
                  options={SERVICES_OPTIONS}
                  placeholder="Select your service"
                  required
                />

                <CustomSelect
                  variant="dark"
                  id="projectBudget"
                  name="projectBudget"
                  label="Project Budget*"
                  value={formData.projectBudget}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, projectBudget: val }))
                  }
                  options={BUDGET_OPTIONS}
                  placeholder="Select your range"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="projectDetails" className={labelClass}>
                  Project Details*
                </label>
                <textarea
                  ref={detailsRef}
                  id="projectDetails"
                  name="projectDetails"
                  rows={1}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell us more about your idea"
                  className={`${inputClass} resize-none overflow-hidden`}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group inline-flex cursor-pointer items-center gap-2 rounded-full bg-white py-3 pl-5 pr-3 text-base font-medium leading-5 text-[#1E1E1E] transition-all duration-200 hover:bg-neutral-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <span>Sending...</span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#1747E0] text-white">
                      <FiLoader className="size-5 animate-spin" />
                    </span>
                  </>
                ) : (
                  <>
                    <span>Send inquiry</span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-[#1747E0] text-white">
                      <FiArrowUpRight className="size-5 transition-transform duration-300 group-hover:rotate-45" />
                    </span>
                  </>
                )}
              </button>
            </form>
            <div className="text-center text-sm font-normal leading-[1.3] text-white sm:text-base">
              Not Interested to submit the form?{" "}
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#285CFF] underline underline-offset-2 transition-colors hover:text-[#6C8DFF]"
              >
                Book A Call Directly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl border border-neutral-200  items-center gap-3 text-xs sm:text-sm font-medium text-neutral-800 hidden"
          >
            <span>
              This website uses <strong className="font-bold">Cookies.</strong>
            </span>
            <button
              onClick={() => setShowCookies(false)}
              className="bg-[#133BD4] hover:bg-[#0f2eb0] text-white rounded-full px-5 py-1.5 text-xs font-semibold transition-colors cursor-pointer"
            >
              Accept
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
