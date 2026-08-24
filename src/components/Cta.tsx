"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { FiArrowUpRight, FiCheck, FiChevronDown } from "react-icons/fi";

export default function Cta() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    serviceRequired: "",
    projectBudget: "",
    projectDetails: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [showCookies, setShowCookies] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        serviceRequired: "",
        projectBudget: "",
        projectDetails: "",
      });
    }, 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative w-full bg-[#DCE4EC] py-16 sm:py-20 lg:py-28transition-colors">
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
            <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-neutral-900 tracking-tight leading-[1.12] mb-6">
              Have an Idea? Let’s<br />Make it Real.
            </h2>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-lg mb-12 sm:mb-16">
              Tell us what you're building, improving, or trying to solve. We'll
              discuss your goals, recommend the right approach, and define the
              next steps together.
            </p>
          </div>

          {/* Leader Profile Card */}
          <div className="flex flex-col items-start pt-2 sm:pt-6">
            <div className="relative w-32 h-32 sm:w-40 sm:h-44 overflow-hidden mb-4 group">
              <Image
                src="/image/leaders/Md.-Parvej-Ahammed.webp"
                alt="Rasel Ahmed"
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
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mb-4">
                  <FiCheck />
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-neutral-600 max-w-md">
                  Your inquiry has been received. Our team will review your project requirements and reach out within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Full Name */}
                <div className="flex flex-col">
                  <label htmlFor="fullName" className="text-sm font-semibold text-neutral-900 mb-1">
                    Full Name
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

                {/* Service required & Project budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  <div className="flex flex-col relative">
                    <label htmlFor="serviceRequired" className="text-sm font-semibold text-neutral-900 mb-1">
                      Service required*
                    </label>
                    <div className="relative">
                      <select
                        id="serviceRequired"
                        name="serviceRequired"
                        value={formData.serviceRequired}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-neutral-900/80 py-2 pr-8 text-neutral-900 focus:outline-none focus:border-black transition-colors text-base appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select Your Service
                        </option>
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Digital Marketing">Digital Marketing</option>
                        <option value="Custom Software">Custom Software</option>
                      </select>
                      <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none text-lg" />
                    </div>
                  </div>

                  <div className="flex flex-col relative">
                    <label htmlFor="projectBudget" className="text-sm font-semibold text-neutral-900 mb-1">
                      Project budget*
                    </label>
                    <div className="relative">
                      <select
                        id="projectBudget"
                        name="projectBudget"
                        value={formData.projectBudget}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-neutral-900/80 py-2 pr-8 text-neutral-900 focus:outline-none focus:border-black transition-colors text-base appearance-none cursor-pointer"
                        required
                      >
                        <option value="" disabled className="text-neutral-400">
                          Select Your Range
                        </option>
                        <option value="$1k - $5k">$1,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k - $25k">$10,000 - $25,000</option>
                        <option value="$25k+">$25,000+</option>
                      </select>
                      <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none text-lg" />
                    </div>
                  </div>
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
                  className="group w-full bg-neutral-950 hover:bg-black text-white font-medium py-4 px-6 text-base sm:text-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] mt-2 cursor-pointer flex items-center justify-center gap-3"
                >
                  Send inquiry
                  <span className="flex items-center justify-center size-7 rounded-full bg-white/20 text-white group-hover:bg-white group-hover:text-[#133bd4] transition-colors">
                    <FiArrowUpRight className="text-base transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </button>
              </form>
            )}
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
            className="fixed bottom-6 right-6  z-50 bg-white/95 backdrop-blur-md px-5 py-2.5 shadow-xl border border-neutral-200 flex items-center gap-3 text-xs sm:text-sm font-medium text-neutral-800 hidden"
          >
            <span>
              This website uses <strong className="font-bold">Cookies.</strong>
            </span>
            <button
              onClick={() => setShowCookies(false)}
              className="bg-black hover:bg-neutral-800 text-white px-4 py-1 text-xs font-semibold transition-colors cursor-pointer"
            >
              Accept
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

