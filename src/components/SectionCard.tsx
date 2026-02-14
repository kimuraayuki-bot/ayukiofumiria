import { DecoratedCard } from "@/components/DecoratedCard";
import type { Section } from "@/types/portfolio";

type SectionCardProps = {
  section: Section;
};

export function SectionCard({ section }: SectionCardProps) {
  return (
    <DecoratedCard className="animate-fade-up">
      <section id={section.id}>
        <p className="text-[11px] tracking-[0.22em] text-[var(--accent)]">{section.accent}</p>
        <h2 className="mt-2 text-xl font-semibold text-white">{section.titleJa}</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">{section.titleEn}</p>

        <p className="mt-3 text-sm leading-7 text-[var(--text)]">{section.summaryJa}</p>
        <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{section.summaryEn}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {section.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--line-soft)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <details className="mt-4" open={!section.initiallyCollapsed}>
          <summary className="cursor-pointer text-sm font-medium text-[var(--accent)]">
            続きを読む / Read more
          </summary>
          <div className="mt-3 space-y-2">
            {section.bodyJa.map((line) => (
              <p key={line} className="text-sm leading-7 text-[var(--text)]">
                {line}
              </p>
            ))}
            {section.bodyEn.map((line) => (
              <p key={line} className="text-xs leading-6 text-[var(--muted)]">
                {line}
              </p>
            ))}
          </div>
        </details>
      </section>
    </DecoratedCard>
  );
}
