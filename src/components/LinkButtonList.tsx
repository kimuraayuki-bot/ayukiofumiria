import type { ExternalLink } from "@/types/portfolio";
import { DecoratedCard } from "@/components/DecoratedCard";

type LinkButtonListProps = {
  socialLinks: ExternalLink[];
  mediaLinks: ExternalLink[];
};

export function LinkButtonList({ socialLinks, mediaLinks }: LinkButtonListProps) {
  return (
    <div className="sticky top-3 z-20 animate-fade-up">
      <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface)]/80 p-2 backdrop-blur">
        <ul className="grid gap-3">
          {socialLinks
            .slice()
            .sort((a, b) => a.priority - b.priority)
            .map((link) => (
              <li key={link.label}>
                <DecoratedCard>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-sm font-medium text-[var(--text)] transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </DecoratedCard>
              </li>
            ))}
        </ul>

        <div className="mt-4 border-t border-[var(--line-soft)] pt-3">
          <p className="mb-2 text-[11px] tracking-[0.18em] text-[var(--muted)]">NEWS / MEDIA</p>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {mediaLinks
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[210px] rounded-lg border border-[var(--line-soft)] bg-[var(--card)] px-3 py-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white"
                >
                  {link.label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
