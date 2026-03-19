export type Feature = string;

export type HeroData = {
  title: string;
  subtitle: string;
  features: Feature[];
};

export type AdvantagesData = {
  title: string;
};

export type FooterLink = {
  id: number;
  text: string;
  href: string;
};

export type FooterData = {
  text: string;
  links: FooterLink[];
};

export type MainProps = {};