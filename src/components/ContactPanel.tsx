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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState("");

  const getErrorMessage = (errorCode: string) => {
    if (errorCode === "mail_not_configured") {
      return "送信設定が未完了です。管理者にご連絡ください。";
    }
    if (errorCode === "invalid_request") {
      return "入力内容を確認してください。";
    }
    return "送信に失敗しました。時間をおいて再度お試しください。";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatusText("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          to: contactEmail,
        }),
      });

      if (!response.ok) {
        let errorCode = "send_failed";
        try {
          const payload = (await response.json()) as { error?: string };
          errorCode = payload.error ?? errorCode;
        } catch {
          // Ignore parse errors and use the fallback message.
        }
        throw new Error(errorCode);
      }

      setStatusText("送信しました。ご連絡ありがとうございます。");
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      const errorCode = error instanceof Error ? error.message : "send_failed";
      setStatusText(getErrorMessage(errorCode));
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            className="rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
          {statusText ? <p className="text-xs text-[var(--muted)]">{statusText}</p> : null}
        </form>
      </section>
    </DecoratedCard>
  );
}
