import { ContactPanel } from "@/components/ContactPanel";
import { GalleryCard } from "@/components/GalleryCard";
import { LatestPostsSection } from "@/components/LatestPostsSection";
import { LinkButtonList } from "@/components/LinkButtonList";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SectionCard } from "@/components/SectionCard";
import { YoutubeEmbedSection } from "@/components/YoutubeEmbedSection";
import { portfolioData } from "@/data/portfolio";
import { getLatestPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const siteUrl = `${siteConfig.url}/`;
  const latestPosts = await getLatestPosts(2);
  const footerConcept = portfolioData.sections.find((section) => section.id === "umiria");
  const pillarIds = ["engineering", "education", "music"];
  const corePillars = pillarIds
    .map((id) => portfolioData.sections.find((section) => section.id === id))
    .filter((section) => section !== undefined);
  const visibleSections = portfolioData.sections.filter(
    (section) => section.id !== "umiria" && !pillarIds.includes(section.id),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Ayuki of Umiria",
        url: siteUrl,
        inLanguage: "ja",
      },
      {
        "@type": "Person",
        name: portfolioData.profile.name,
        alternateName: portfolioData.profile.handle,
        description: portfolioData.profile.missionJa,
        url: siteUrl,
        sameAs: [...portfolioData.socialLinks, ...portfolioData.mediaLinks].map((link) => link.url),
        knowsAbout: ["Robotics", "Web Development", "Education", "Music", "Physics"],
      },
    ],
  };

  return (
    <main className="relative min-h-screen overflow-x-clip pb-16">
      <div className="starfield pointer-events-none absolute inset-0" />
      <div className="mx-auto w-full max-w-3xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <ProfileHeader profile={portfolioData.profile} />

        <section aria-label="Social links" className="mt-8">
          <LinkButtonList socialLinks={portfolioData.socialLinks} mediaLinks={portfolioData.mediaLinks} />
        </section>

        <section aria-label="Latest blog posts" className="mt-8">
          <LatestPostsSection posts={latestPosts} />
        </section>

        {corePillars.length > 0 ? (
          <section aria-label="Core pillars" className="mt-8 animate-fade-up">
            <div className="rounded-xl border border-[var(--line-soft)] bg-[rgba(10,16,36,0.32)] p-4 md:p-5">
              <div className="border-b border-[var(--line-soft)] pb-4">
                <p className="text-[11px] tracking-[0.22em] text-[var(--accent)]">CORE PILLARS</p>
                <h2 className="mt-2 text-xl font-semibold text-white">Engineering / Education / Music</h2>
              </div>

              <div className="mt-5 space-y-4">
                {corePillars.map((section, index) => (
                  <SectionCard
                    key={section.id}
                    section={section}
                    serialLabel={`${String(index + 1).padStart(2, "0")}`}
                  />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section aria-label="Core sections" className="mt-8 space-y-4">
          {visibleSections.map((section) => (
            <SectionCard key={section.id} section={section} />
          ))}
        </section>

        <section id="works-gallery" className="mt-8 space-y-4" aria-label="Visual works and videos">
          {portfolioData.gallery.map((item) => (
            <GalleryCard key={item.title} item={item} />
          ))}
          <YoutubeEmbedSection items={portfolioData.youtubeEmbeds} />
        </section>

        <section className="mt-8" aria-label="Contact form">
          <ContactPanel />
        </section>

        <footer className="mt-10 border-t border-[var(--line-soft)] pt-6 text-xs text-[var(--muted)]">
          {footerConcept ? (
            <div className="mb-4 max-w-2xl">
              <p className="tracking-[0.18em] text-[var(--accent)]">{footerConcept.accent}</p>
              <p className="mt-1 text-sm text-white">{footerConcept.titleJa}</p>
              <div className="mt-2 space-y-3 text-sm leading-6 text-[var(--muted)]">
                {footerConcept.bodyJa.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ) : null}
          <p>© {new Date().getFullYear()} Ayuki of Umiria</p>
          <p className="mt-1">最終更新: {portfolioData.updatedAt}</p>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
