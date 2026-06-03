"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ExternalLink } from "@/types/portfolio";
import { DecoratedCard } from "@/components/DecoratedCard";

type LinkButtonListProps = {
  socialLinks: ExternalLink[];
  mediaLinks: ExternalLink[];
};

export function LinkButtonList({ socialLinks, mediaLinks }: LinkButtonListProps) {
  const mediaViewportRef = useRef<HTMLDivElement | null>(null);
  const mediaTrackRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef(0);
  const pauseUntilRef = useRef(0);
  const lastFrameRef = useRef(0);

  const sortedSocialLinks = useMemo(
    () => socialLinks.slice().sort((a, b) => a.priority - b.priority),
    [socialLinks],
  );
  const sortedMediaLinks = useMemo(
    () => mediaLinks.slice().sort((a, b) => a.priority - b.priority),
    [mediaLinks],
  );
  const [mediaQueue, setMediaQueue] = useState(sortedMediaLinks);

  useEffect(() => {
    const viewport = mediaViewportRef.current;
    const track = mediaTrackRef.current;
    if (!viewport || !track || mediaQueue.length === 0) return;

    let animationId = 0;
    const autoSpeed = 0.045;

    const rotateFirstItemIfNeeded = () => {
      const firstItem = track.firstElementChild;
      if (!(firstItem instanceof HTMLElement)) return;

      const styles = window.getComputedStyle(track);
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
      const distance = firstItem.offsetWidth + (Number.isFinite(gap) ? gap : 0);

      if (distance > 0 && offsetRef.current >= distance) {
        offsetRef.current -= distance;
        setMediaQueue((current) => {
          if (current.length <= 1) return current;
          const [first, ...rest] = current;
          return [...rest, first];
        });
      }
    };

    const tick = (time: number) => {
      if (lastFrameRef.current === 0) {
        lastFrameRef.current = time;
      }

      const delta = time - lastFrameRef.current;
      lastFrameRef.current = time;

      if (Date.now() >= pauseUntilRef.current) {
        offsetRef.current += delta * autoSpeed;
        rotateFirstItemIfNeeded();
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      animationId = window.requestAnimationFrame(tick);
    };

    const pause = () => {
      pauseUntilRef.current = Date.now() + 2400;
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      pause();
      offsetRef.current = Math.max(0, offsetRef.current + event.deltaY + event.deltaX);
      rotateFirstItemIfNeeded();
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    };

    viewport.addEventListener("pointerdown", pause);
    viewport.addEventListener("touchstart", pause, { passive: true });
    viewport.addEventListener("wheel", onWheel, { passive: false });

    animationId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(animationId);
      viewport.removeEventListener("pointerdown", pause);
      viewport.removeEventListener("touchstart", pause);
      viewport.removeEventListener("wheel", onWheel);
      lastFrameRef.current = 0;
    };
  }, [mediaQueue.length]);

  return (
    <div className="sticky top-3 z-20 animate-fade-up">
      <div className="rounded-2xl border border-[var(--line-soft)] bg-[var(--surface)]/80 p-2 backdrop-blur">
        <ul className="grid gap-3">
          {sortedSocialLinks.map((link) => (
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

        {mediaQueue.length > 0 ? (
          <div className="mt-4 border-t border-[var(--line-soft)] pt-3">
            <p className="mb-2 text-[11px] tracking-[0.18em] text-[var(--muted)]">NEWS / MEDIA</p>
            <div ref={mediaViewportRef} className="no-scrollbar overflow-hidden">
              <div ref={mediaTrackRef} className="flex w-max gap-3 will-change-transform">
                {mediaQueue.map((link) => (
                  <a
                    key={link.label}
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
        ) : null}
      </div>
    </div>
  );
}
