"use client";

import CustomSelect from "@/components/ui/CustomSelect";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { FiArrowUpRight, FiCheck, FiLoader } from "react-icons/fi";
import { SERVICES_OPTIONS, BUDGET_OPTIONS } from "@/data/cta";

// EmailJS Credentials read from environment variables
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

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
        "Email service is not configured. Please set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in your environment."
      );
      setLoading(false);
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
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
          "Failed to send inquiry. Please try again or reach out directly at info@sardarit.com."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative w-full bg-[#DCE4EC] py-16 sm:py-20 lg:py-28 transition-colors">
      <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Content & Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between h-full pt-2"
        >
          <div>
            {/* Section Tag */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-blue-600 font-semibold mb-4">
              <span className="size-2 rounded-full bg-blue-600 inline-block shrink-0" />
              <span>/ LET&apos;S BUILD TOGETHER</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-neutral-900 tracking-tight leading-[1.12] mb-6">
              Have an Idea? Let’s<br />Make it Real.
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-lg mb-12 sm:mb-16">
              From idea to launch — tell us what you&apos;re building, improving, or scaling. We&apos;ll architect the roadmap, assemble specialists, and engineer measurable results.
            </p>
          </div>

          {/* Leader Profile Card */}
          <div className="flex flex-col items-start pt-2 sm:pt-6">
            <div className="relative w-32 h-32 sm:w-40 sm:h-44 overflow-hidden mb-4 group">
              <Image
                src="/image/leaders/Md.-Parvej-Ahammed.webp"
                alt="Md. Parvej Ahammed - Managing Director at Sardar IT"
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Parvej Ahammed
            </h3>
            <p className="text-sm text-neutral-500 font-medium max-w-[220px] mt-0.5 leading-snug">
              General Manager
            </p>
          </div>
        </motion.div>

        {/* Right Column: Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col items-center"
        >
          <div className="w-full bg-white p-6 sm:p-10 shadow-lg border border-white/60">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Clean Inline Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded font-medium flex items-center gap-2.5"
                >
                  <FiCheck className="text-emerald-600 text-base shrink-0" />
                  <span>
                    Thank you! Your inquiry has been sent successfully. Our team will review your project requirements and reach out shortly.
                  </span>
                </motion.div>
              )}

              {/* Clean Inline Error Message */}
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded font-medium"
                >
                  {errorMsg}
                </motion.div>
              )}

              {/* Full Name */}
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-sm font-semibold text-neutral-900 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Cooper"
                  className="w-full bg-transparent border-b border-neutral-900/80 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors text-base"
                  required
                />
              </div>

              {/* Company Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <label htmlFor="companyName" className="text-sm font-semibold text-neutral-900 mb-1">
                    Company name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Ex. Tesla Inc"
                    className="w-full bg-transparent border-b border-neutral-900/80 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors text-base"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-sm font-semibold text-neutral-900 mb-1">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="You@Example.Com"
                    className="w-full bg-transparent border-b border-neutral-900/80 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors text-base"
                    required
                  />
                </div>
              </div>

              {/* Service required & Project budget (Custom Dropdown Menus) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <CustomSelect
                  id="serviceRequired"
                  name="serviceRequired"
                  label="Service required*"
                  value={formData.serviceRequired}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, serviceRequired: val }))
                  }
                  options={SERVICES_OPTIONS}
                  placeholder="Select Your Service"
                  required
                />

                <CustomSelect
                  id="projectBudget"
                  name="projectBudget"
                  label="Project budget*"
                  value={formData.projectBudget}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, projectBudget: val }))
                  }
                  options={BUDGET_OPTIONS}
                  placeholder="Select Your Range"
                  required
                />
              </div>

              {/* Project details */}
              <div className="flex flex-col">
                <label htmlFor="projectDetails" className="text-sm font-semibold text-neutral-900 mb-1">
                  Project details*
                </label>
                <textarea
                  id="projectDetails"
                  name="projectDetails"
                  rows={2}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder="Tell us more about your idea"
                  className="w-full bg-transparent border-b border-neutral-900/80 py-2 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors text-base resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-[#133BD4] hover:bg-[#0f2eb0] disabled:bg-neutral-700 text-white font-medium py-3.5 px-8 rounded-full text-base sm:text-lg transition-all duration-200 shadow-lg shadow-[#133BD4]/30 hover:shadow-xl active:scale-[0.99] mt-2 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin text-xl" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send inquiry</span>
                    <span className="flex items-center justify-center size-7 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-[#133BD4] transition-colors">
                      <FiArrowUpRight className="text-base transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Book A Call Link */}
          <div className="mt-8 text-center text-neutral-800 text-sm sm:text-base font-medium">
            Not Interested to submit the form?{" "}
            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#10b981] font-semibold underline underline-offset-4 hover:text-[#059669] transition-colors"
            >
              Book A Call Directly
            </a>
          </div>
        </motion.div>
      </div>

      {/* Cookie Consent Pill Banner */}
      <AnimatePresence>
        {showCookies && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 z-50 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full shadow-xl border border-neutral-200 flex items-center gap-3 text-xs sm:text-sm font-medium text-neutral-800 hidden"
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
