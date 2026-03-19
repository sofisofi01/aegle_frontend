export type MenuItem = {
  id: number;
  text: string;
  href: string;
};

export type HeaderProps = {
  menu: MenuItem[];
};