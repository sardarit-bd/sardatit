"use client";

import { useState } from "react";
import { Button } from "@/utils/Button";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      // TODO: replace with your real endpoint
      // const res = await fetch("/api/contact", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!res.ok) throw new Error("Failed to send");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className="relative mx-auto flex w-full container flex-col items-center px-4 py-24">
      <div className="w-full max-w-xl">
        <h2 className="text-center text-4xl font-semibold text-[#1B2023]">
          Get in touch
        </h2>
        <p className="mt-3 text-center text-[#5B5F63]">
          Send us a message and we&apos;ll get back to you shortly.
        </p>

        <div className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[#1B2023]"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#203eec]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#1B2023]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#203eec]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[#1B2023]"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              className="resize-none rounded-lg border border-black/10 px-4 py-3 text-sm outline-none focus:border-[#203eec]"
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-600">
              Please fill in all fields and try again.
            </p>
          )}
          {status === "success" && (
            <p className="text-sm text-green-600">
              Message sent — we&apos;ll be in touch soon.
            </p>
          )}

          <Button onClick={handleSubmit} className="mt-2 w-full justify-center">
            {status === "submitting" ? "Sending..." : "Send message"}
          </Button>
        </div>
      </div>
    </section>
  );
}
