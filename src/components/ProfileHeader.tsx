import Link from "next/link";
import Image from "next/image";
import type { Profile, Service } from "@/types/portfolio";

type ProfileHeaderProps = {
  profile: Profile;
  services: Service[];
};

export function ProfileHeader({ profile, services }: ProfileHeaderProps) {
  return (
    <header className="animate-fade-up">
      <div className="flex items-center gap-4">
        <Image
          src={profile.avatarSrc}
          alt={`${profile.name} icon`}
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-full border border-[var(--line)] object-cover"
          priority
        />
        <div>
          <p className="text-xs tracking-[0.18em] text-[var(--muted)]">AYUKI OF UMIRIA</p>
          <h1 className="text-2xl font-semibold tracking-wide text-white md:text-3xl">
            {profile.name}
          </h1>
          <p className="text-sm text-[var(--muted)]">{profile.handle}</p>
        </div>
      </div>
      <p className="mt-4 text-sm font-medium text-[var(--accent)]">{profile.roleJa}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--text)] md:text-base">{profile.missionJa}</p>
      {profile.currentStatus && profile.currentStatus.length > 0 ? (
        <ul className="mt-2 space-y-0">
          {profile.currentStatus.map((line) => (
            <li key={line} className="text-sm leading-7 text-[var(--text)] md:text-base">
              {line}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-7 border-y border-[var(--line-soft)]">
        <h2 className="pt-5 text-lg font-semibold text-white">Available Work</h2>
        <div className="mt-3 space-y-5">
          {services.map((service) => (
            <a
              key={service.title}
              href="#contact"
              className="block py-1 transition hover:text-white"
            >
              <span className="block text-base font-semibold text-white">{service.title}</span>
              <span className="mt-1 block text-sm leading-7 text-[var(--text)]">{service.description}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link className="pill-link" href="/blog">
          Blog
        </Link>
        <a className="pill-link" href="#works-gallery">
          Works
        </a>
        <a className="pill-link" href="#contact">
          Contact
        </a>
      </div>
    </header>
  );
}
