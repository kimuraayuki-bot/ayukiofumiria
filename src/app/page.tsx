import { ContactPanel } from "@/components/ContactPanel";
import { GalleryCard } from "@/components/GalleryCard";
import { LinkButtonList } from "@/components/LinkButtonList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SectionCard } from "@/components/SectionCard";
import { YoutubeEmbedSection } from "@/components/YoutubeEmbedSection";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.profile.name,
    alternateName: portfolioData.profile.handle,
    description: portfolioData.profile.missionJa,
    url: "https://lit.link/AyukiofUmiria",
    sameAs: [...portfolioData.socialLinks, ...portfolioData.mediaLinks].map((link) => link.url),
    knowsAbout: ["Robotics", "Web Development", "Education", "Music", "Physics"],
  };

  return (
    <main className="relative min-h-screen overflow-x-clip pb-16">
      <div className="starfield pointer-events-none absolute inset-0" />
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <ProfileHeader profile={portfolioData.profile} />

        <div className="mt-8">
          <LinkButtonList
            socialLinks={portfolioData.socialLinks}
            mediaLinks={portfolioData.mediaLinks}
          />
        </div>

        <section className="mt-8 space-y-4">
          {portfolioData.sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </section>

        <section id="works-gallery" className="mt-8 space-y-4" aria-label="Visual works">
          {portfolioData.gallery.map((item) => (
            <GalleryCard key={item.title} item={item} />
          ))}
          <YoutubeEmbedSection items={portfolioData.youtubeEmbeds} />
        </section>

        <div className="mt-8">
          <ContactPanel contactEmail={portfolioData.contactEmail} />
        </div>

        <footer className="mt-10 border-t border-[var(--line-soft)] pt-6 text-xs text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Ayuki of Umiria</p>
          <p className="mt-1">最終更新: {portfolioData.updatedAt}</p>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
