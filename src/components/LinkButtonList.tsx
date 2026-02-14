"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import type { ExternalLink } from "@/types/portfolio";
import { DecoratedCard } from "@/components/DecoratedCard";

type LinkButtonListProps = {
  socialLinks: ExternalLink[];
  mediaLinks: ExternalLink[];
};

export function LinkButtonList({ socialLinks, mediaLinks }: LinkButtonListProps) {
  const mediaScrollerRef = useRef<HTMLDivElement | null>(null);
  const pauseUntilRef = useRef(0);

  const sortedMediaLinks = useMemo(
    () => mediaLinks.slice().sort((a, b) => a.priority - b.priority),
    [mediaLinks],
  );
  const loopedMediaLinks = useMemo(
    () => [...sortedMediaLinks, ...sortedMediaLinks],
    [sortedMediaLinks],
  );

  useEffect(() => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;

    let animationId = 0;
    const autoSpeed = 0.4;

    const tick = () => {
      if (Date.now() >= pauseUntilRef.current) {
        const half = scroller.scrollWidth / 2;
        scroller.scrollLeft += autoSpeed;
        if (scroller.scrollLeft >= half) {
          scroller.scrollLeft -= half;
        }
      }
      animationId = window.requestAnimationFrame(tick);
    };

    const onTouchStart = () => {
      pauseUntilRef.current = Date.now() + 2400;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      pauseUntilRef.current = Date.now() + 2400;
      scroller.scrollLeft += event.deltaY + event.deltaX;
    };

    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });

    animationId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(animationId);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("wheel", onWheel);
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
            className="no-scrollbar flex gap-3 overflow-x-auto pb-1 touch-pan-y"
          >
            {loopedMediaLinks.map((link, index) => (
              <a
                key={`${link.label}-${index}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[240px] rounded-lg border border-[var(--line-soft)] bg-[var(--card)] p-2 text-sm text-[var(--text)] transition hover:border-[var(--accent)] hover:text-white"
              >
                <div className="flex items-center gap-3">
                  {link.previewImage ? (
                    <Image
                      src={link.previewImage}
                      alt={`${link.label} preview`}
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-md object-cover"
                    />
                  ) : (
                    <div className="h-11 w-11 rounded-md bg-[var(--surface)]" />
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
