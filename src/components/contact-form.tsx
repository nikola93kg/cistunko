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
      className="space-y-5 rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-black">
          Ime
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-black/10 px-4 py-3 text-base text-black outline-none transition focus:border-black/30"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium text-black">
          Telefon
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full rounded-2xl border border-black/10 px-4 py-3 text-base text-black outline-none transition focus:border-black/30"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-black">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-2xl border border-black/10 px-4 py-3 text-base text-black outline-none transition focus:border-black/30"
        />
      </div>

      <a
        href={mailtoHref}
        className="inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
      >
        Pošalji email upit
      </a>
    </form>
  );
}
