export type ExternalLinkType = "social" | "article" | "portfolio" | "contact";

export type Profile = {
  name: string;
  handle: string;
  roleJa: string;
  roleEn: string;
  missionJa: string;
  missionEn: string;
  avatarSrc: string;
};

export type ExternalLink = {
  label: string;
  url: string;
  type: ExternalLinkType;
  priority: number;
};

export type Section = {
  id: string;
  accent: string;
  titleJa: string;
  titleEn: string;
  summaryJa: string;
  summaryEn: string;
  bodyJa: string[];
  bodyEn: string[];
  tags: string[];
  initiallyCollapsed?: boolean;
};

export type GalleryItem = {
  imageSrc: string;
  title: string;
  caption: string;
};

export type ContactMethod = {
  type: "email" | "x" | "youtube" | "facebook";
  label: string;
  href: string;
};

export type PortfolioData = {
  profile: Profile;
  quickLinks: ExternalLink[];
  sections: Section[];
  gallery: GalleryItem[];
  contacts: ContactMethod[];
  updatedAt: string;
};
