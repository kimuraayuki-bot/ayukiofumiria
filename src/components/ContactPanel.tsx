"use client";

import { FormEvent, useState } from "react";
import { DecoratedCard } from "@/components/DecoratedCard";

type ContactPanelProps = {
  contactEmail: string;
};

export function ContactPanel({ contactEmail }: ContactPanelProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Contact] ${name || "No Name"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <DecoratedCard className="animate-fade-up">
      <section id="contact">
        <p className="text-[11px] tracking-[0.22em] text-[var(--accent)]">CHANNEL</p>
        <h2 className="mt-2 text-xl font-semibold text-white">Contact Form</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--text)]">
          実現したいアイデアがある方、共に面白いことをやってみたい方、その他のご相談も歓迎です。
        </p>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <input
            type="text"
            required
            placeholder="お名前"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          <input
            type="email"
            required
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          <textarea
            required
            rows={5}
            placeholder="お問い合わせ内容"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          <button
            type="submit"
            className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white"
          >
            メールを作成する
          </button>
        </form>
      </section>
    </DecoratedCard>
  );
}
