import Image from "next/image";
import type { Profile } from "@/types/portfolio";

type ProfileHeaderProps = {
  profile: Profile;
};

export function ProfileHeader({ profile }: ProfileHeaderProps) {
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
      <p className="mt-1 text-xs text-[var(--muted)]">{profile.roleEn}</p>
      <p className="mt-4 text-sm leading-7 text-[var(--text)] md:text-base">{profile.missionJa}</p>
      <p className="mt-2 text-xs leading-6 text-[var(--muted)]">{profile.missionEn}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a className="pill-link" href="#contact">
          Contact
        </a>
        <a className="pill-link" href="#works">
          Works
        </a>
      </div>
    </header>
  );
}
