"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ExternalLink } from "@/types/portfolio";
import { DecoratedCard } from "@/components/DecoratedCard";

type LinkButtonListProps = {
  socialLinks: ExternalLink[];
  mediaLinks: ExternalLink[];
};

export function LinkButtonList({ socialLinks, mediaLinks }: LinkButtonListProps) {
  const mediaScrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;

    let animationId = 0;
    let pauseUntil = 0;
    const autoSpeed = 0.35;

    const tick = () => {
      const now = Date.now();
      if (now >= pauseUntil) {
        const maxScroll = scroller.scrollWidth - scroller.clientWidth;
        if (maxScroll > 0) {
          scroller.scrollLeft += autoSpeed;
          if (scroller.scrollLeft >= maxScroll - 1) {
            scroller.scrollLeft = 0;
          }
        }
      }
      animationId = window.requestAnimationFrame(tick);
    };

    const pauseAutoScroll = () => {
      pauseUntil = Date.now() + 2500;
    };

    scroller.addEventListener("pointerdown", pauseAutoScroll);
    scroller.addEventListener("touchstart", pauseAutoScroll, { passive: true });
    scroller.addEventListener("wheel", pauseAutoScroll, { passive: true });

    animationId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(animationId);
      scroller.removeEventListener("pointerdown", pauseAutoScroll);
      scroller.removeEventListener("touchstart", pauseAutoScroll);
      scroller.removeEventListener("wheel", pauseAutoScroll);
    };
  }, []);

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
          <div
            ref={mediaScrollerRef}
            className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:thin]"
          >
            {mediaLinks
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[230px] rounded-lg border border-[var(--line-soft)] bg-[var(--card)] p-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white"
                >
                  <div className="flex items-center gap-3">
                    {link.previewImage ? (
                      <Image
                        src={link.previewImage}
                        alt={`${link.label} preview`}
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-[var(--surface)]" />
                    )}
                    <span>{link.label}</span>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
