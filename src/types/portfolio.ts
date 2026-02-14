export type ExternalLinkType = "social" | "article" | "portfolio" | "contact";

export type Profile = {
  name: string;
  handle: string;
  roleJa: string;
  missionJa: string;
  currentStatus?: string[];
  academyUrl?: string;
  avatarSrc: string;
};

export type ExternalLink = {
  label: string;
  url: string;
  type: ExternalLinkType;
  priority: number;
  previewImage?: string;
};

export type Section = {
  id: string;
  accent: string;
  titleJa: string;
  summaryJa: string;
  bodyJa: string[];
  tags: string[];
  initiallyCollapsed?: boolean;
};

export type GalleryItem = {
  imageSrc: string;
  title: string;
  caption: string;
};

export type YoutubeEmbed = {
  id: string;
  title: string;
  videoId: string;
};

export type PortfolioData = {
  profile: Profile;
  socialLinks: ExternalLink[];
  mediaLinks: ExternalLink[];
  sections: Section[];
  gallery: GalleryItem[];
  youtubeEmbeds: YoutubeEmbed[];
  contactEmail: string;
  updatedAt: string;
};
