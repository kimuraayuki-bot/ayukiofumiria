import { ContactPanel } from "@/components/ContactPanel";
import { GalleryCard } from "@/components/GalleryCard";
import { LinkButtonList } from "@/components/LinkButtonList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SectionCard } from "@/components/SectionCard";
import { portfolioData } from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.profile.name,
    alternateName: portfolioData.profile.handle,
    description: portfolioData.profile.missionJa,
    url: "https://lit.link/AyukiofUmiria",
    sameAs: portfolioData.quickLinks.map((link) => link.url),
    knowsAbout: ["Robotics", "Web Development", "Education", "Music", "Physics"],
    hasCreativeWork: portfolioData.gallery.map((item) => ({
      "@type": "CreativeWork",
      name: item.title,
      description: item.caption,
      image: item.imageSrc,
    })),
  };

  return (
    <main className="relative min-h-screen overflow-x-clip pb-16">
      <div className="starfield pointer-events-none absolute inset-0" />
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <ProfileHeader profile={portfolioData.profile} />
        <div className="mt-8">
          <LinkButtonList links={portfolioData.quickLinks} />
        </div>

        <section id="works" className="mt-8 space-y-4">
          {portfolioData.sections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </section>

        <section className="mt-8 space-y-4" aria-label="Visual gallery">
          {portfolioData.gallery.map((item) => (
            <GalleryCard key={item.title} item={item} />
          ))}
        </section>

        <div className="mt-8">
          <ContactPanel contacts={portfolioData.contacts} />
        </div>

        <footer className="mt-10 border-t border-[var(--line-soft)] pt-6 text-xs text-[var(--muted)]">
          <p>© {new Date().getFullYear()} Ayuki of Umiria</p>
          <p className="mt-1">Last updated: {portfolioData.updatedAt}</p>
          <p className="mt-1">
            Source profile:{" "}
            <a
              href="https://lit.link/AyukiofUmiria"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              lit.link/AyukiofUmiria
            </a>
          </p>
        </footer>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
