"use client";

import Image from "next/image";
import { MouseEvent as ReactMouseEvent, useEffect, useMemo, useRef } from "react";
import type { ExternalLink } from "@/types/portfolio";
import { DecoratedCard } from "@/components/DecoratedCard";

type LinkButtonListProps = {
  socialLinks: ExternalLink[];
  mediaLinks: ExternalLink[];
};

export function LinkButtonList({ socialLinks, mediaLinks }: LinkButtonListProps) {
  const mediaScrollerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const movedRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollRef = useRef(0);
  const pauseUntilRef = useRef(0);

  const loopedMediaLinks = useMemo(() => [...mediaLinks, ...mediaLinks], [mediaLinks]);

  useEffect(() => {
    const scroller = mediaScrollerRef.current;
    if (!scroller) return;

    let animationId = 0;
    const autoSpeed = 0.4;

    const tick = () => {
      const now = Date.now();
      if (now >= pauseUntilRef.current && !isDraggingRef.current) {
        const half = scroller.scrollWidth / 2;
        scroller.scrollLeft += autoSpeed;
        if (scroller.scrollLeft >= half) {
          scroller.scrollLeft -= half;
        }
      }
      animationId = window.requestAnimationFrame(tick);
    };

    const onMouseMove = (event: globalThis.MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = event.clientX - startXRef.current;
      movedRef.current = movedRef.current || Math.abs(dx) > 4;
      scroller.scrollLeft = startScrollRef.current - dx;
    };

    const stopDrag = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      pauseUntilRef.current = Date.now() + 2400;
      scroller.style.cursor = "grab";
      scroller.style.userSelect = "";
    };

    const onMouseDown = (event: globalThis.MouseEvent) => {
      if (event.button !== 0) return;
      isDraggingRef.current = true;
      movedRef.current = false;
      startXRef.current = event.clientX;
      startScrollRef.current = scroller.scrollLeft;
      pauseUntilRef.current = Date.now() + 2400;
      scroller.style.cursor = "grabbing";
      scroller.style.userSelect = "none";
    };

    const onTouchStart = () => {
      pauseUntilRef.current = Date.now() + 2400;
    };

    const onWheel = () => {
      pauseUntilRef.current = Date.now() + 2400;
    };

    scroller.addEventListener("mousedown", onMouseDown);
    scroller.addEventListener("touchstart", onTouchStart, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    scroller.style.cursor = "grab";

    animationId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(animationId);
      scroller.removeEventListener("mousedown", onMouseDown);
      scroller.removeEventListener("touchstart", onTouchStart);
      scroller.removeEventListener("wheel", onWheel);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      scroller.style.cursor = "";
      scroller.style.userSelect = "";
    };
  }, []);

  const handleCardClickCapture = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (movedRef.current) {
      event.preventDefault();
      event.stopPropagation();
      movedRef.current = false;
    }
  };

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
            {loopedMediaLinks
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((link, index) => (
                <a
                  key={`${link.label}-${index}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClickCapture={handleCardClickCapture}
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
