// src/components/contact-form.tsx
"use client";

import { useState } from "react";
import { buildMailtoHref } from "@/lib/contact";

type ContactFormProps = {
  email: string;
};

export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = buildMailtoHref({ name, phone, message, email });

  return (
    <form
      className="space-y-5 rounded-2xl border border-[#3cc0cc]/15 bg-white p-8 shadow-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-[#0f2a35]">
          Ime
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-[50px] border border-[#3cc0cc]/20 bg-[#f0fbfc] px-5 py-3 text-sm text-[#0f2a35] outline-none transition focus:border-[#3cc0cc] focus:ring-2 focus:ring-[#3cc0cc]/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-[#0f2a35]">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full rounded-[50px] border border-[#3cc0cc]/20 bg-[#f0fbfc] px-5 py-3 text-sm text-[#0f2a35] outline-none transition focus:border-[#3cc0cc] focus:ring-2 focus:ring-[#3cc0cc]/20"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-semibold text-[#0f2a35]">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-2xl border border-[#3cc0cc]/20 bg-[#f0fbfc] px-5 py-3 text-sm text-[#0f2a35] outline-none transition focus:border-[#3cc0cc] focus:ring-2 focus:ring-[#3cc0cc]/20"
        />
      </div>

      <a
        href={mailtoHref}
        className="inline-flex rounded-[50px] bg-gradient-to-br from-[#3cc0cc] to-[#189cb4] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
      >
        Pošalji email upit
      </a>
    </form>
  );
}
