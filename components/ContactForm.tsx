"use client";

import { useState } from "react";
import { createWhatsAppChatUrl, openWhatsApp } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please add your name and a short message.");
      return;
    }
    setError("");
    const text =
      `Hello Mobiz Car Rental,\n\n` +
      `My name is ${name}.\n` +
      (phone.trim() ? `My number: ${phone}.\n` : "") +
      `\n${message}\n\nThank you.`;
    openWhatsApp(createWhatsAppChatUrl(text));
    setSent(true);
  }

  const field =
    "w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm focus:border-gold-deep focus:outline-none";
  const label = "mb-1.5 block text-sm font-medium text-ink";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {sent && (
        <div className="rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm text-success">
          Opening WhatsApp with your message. We will reply as soon as we can.
        </div>
      )}
      {error && (
        <div className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>
            Name
          </label>
          <input id="cf-name" className={field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>
            Phone / WhatsApp <span className="text-ink/40">(optional)</span>
          </label>
          <input id="cf-phone" type="tel" className={field} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className={label}>
          Message
        </label>
        <textarea id="cf-message" rows={4} className={`${field} resize-y`} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Which car and dates are you interested in?" />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1da851] sm:w-auto"
      >
        <WhatsAppIcon />
        Send via WhatsApp
      </button>
    </form>
  );
}
