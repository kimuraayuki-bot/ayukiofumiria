"use client";

import { FormEvent, useState } from "react";
import { DecoratedCard } from "@/components/DecoratedCard";

export function ContactPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [formStartedAt, setFormStartedAt] = useState(() => Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusText, setStatusText] = useState("");

  const getErrorMessage = (errorCode: string) => {
    if (errorCode === "mail_not_configured") {
      return "メール設定が未完了です。時間をおいて再度お試しください。";
    }
    if (errorCode === "invalid_request") {
      return "入力内容を確認してください。";
    }
    if (errorCode === "rate_limited") {
      return "送信回数が多すぎます。少し時間を空けてから再度お試しください。";
    }
    if (errorCode === "spam_detected" || errorCode === "invalid_origin") {
      return "送信を確認できませんでした。ページを再読み込みしてから再度お試しください。";
    }
    if (errorCode === "send_failed_auth") {
      return "メール認証に失敗しました。設定を確認してください。";
    }
    if (errorCode === "send_failed_connection") {
      return "メールサーバーへ接続できませんでした。時間をおいて再度お試しください。";
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
          website,
          startedAt: formStartedAt,
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

      setStatusText("送信しました。ありがとうございます。");
      setName("");
      setEmail("");
      setMessage("");
      setWebsite("");
      setFormStartedAt(Date.now());
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
          ご相談や制作のご依頼などがあれば、こちらのフォームからお送りください。
        </p>
        <form onSubmit={handleSubmit} className="relative mt-4 grid gap-3">
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
            />
          </div>
          <input
            type="text"
            name="name"
            required
            minLength={1}
            maxLength={120}
            autoComplete="name"
            placeholder="お名前"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          <input
            type="email"
            name="email"
            required
            maxLength={320}
            autoComplete="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] outline-none focus:border-[var(--accent)]"
          />
          <textarea
            name="message"
            required
            rows={5}
            minLength={5}
            maxLength={5000}
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
