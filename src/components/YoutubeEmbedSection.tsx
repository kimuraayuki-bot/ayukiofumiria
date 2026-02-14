import { DecoratedCard } from "@/components/DecoratedCard";
import type { YoutubeEmbed } from "@/types/portfolio";

type YoutubeEmbedSectionProps = {
  items: YoutubeEmbed[];
};

export function YoutubeEmbedSection({ items }: YoutubeEmbedSectionProps) {
  return (
    <section className="space-y-4" aria-label="YouTube music">
      {items.map((item) => (
        <DecoratedCard key={item.id} className="animate-fade-up">
          <h3 className="mb-3 text-sm font-semibold text-white md:text-base">{item.title}</h3>
          <div className="overflow-hidden rounded-lg border border-[var(--line-soft)]">
            <iframe
              title={item.title}
              src={`https://www.youtube.com/embed/${item.videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="aspect-video w-full"
            />
          </div>
        </DecoratedCard>
      ))}
    </section>
  );
}
