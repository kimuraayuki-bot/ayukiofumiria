import { DecoratedCard } from "@/components/DecoratedCard";
import type { ContactMethod } from "@/types/portfolio";

type ContactPanelProps = {
  contacts: ContactMethod[];
};

export function ContactPanel({ contacts }: ContactPanelProps) {
  return (
    <DecoratedCard className="animate-fade-up">
      <section id="contact">
        <p className="text-[11px] tracking-[0.22em] text-[var(--accent)]">CHANNEL</p>
        <h2 className="mt-2 text-xl font-semibold text-white">Contact</h2>
        <p className="mt-2 text-sm leading-7 text-[var(--text)]">
          お問い合わせは以下のチャネルからご連絡ください。Please reach out via one of the channels below.
        </p>
        <ul className="mt-4 grid gap-2">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                target={contact.type === "email" ? undefined : "_blank"}
                rel={contact.type === "email" ? undefined : "noopener noreferrer"}
                className="flex items-center justify-between rounded-lg border border-[var(--line-soft)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                <span>{contact.label}</span>
                <span className="text-xs text-[var(--muted)]">{contact.type}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </DecoratedCard>
  );
}
