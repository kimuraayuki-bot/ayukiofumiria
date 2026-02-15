import Image from "next/image";
import { DecoratedCard } from "@/components/DecoratedCard";
import type { GalleryItem } from "@/types/portfolio";

type GalleryCardProps = {
  item: GalleryItem;
};

export function GalleryCard({ item }: GalleryCardProps) {
  const content = (
    <article className="overflow-hidden rounded-lg">
      <div className="relative aspect-[16/10]">
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 700px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white md:text-base">{item.title}</h3>
          <p className="mt-1 text-xs text-zinc-200">{item.caption}</p>
        </div>
      </div>
    </article>
  );

  return (
    <DecoratedCard className="animate-fade-up">
      {item.linkUrl ? (
        <a href={item.linkUrl} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
          {content}
        </a>
      ) : (
        content
      )}
    </DecoratedCard>
  );
}
