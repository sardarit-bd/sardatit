export interface NavItem {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  name: "facebook" | "instagram" | "linkedin" | "twitter";
  href: string;
}

export interface FooterData {
  brand: {
    name: string;
    description: string;
  };
  cta: {
    label: string;
    href: string;
  };
  socialLinks: SocialLink[];
  navColumns: FooterColumn[];
  secondaryColumns: FooterColumn[];
  contact: {
    emailLabel: string;
    email: string;
    supportEmail: string;
    phoneLabel: string;
    phone: string;
    phoneHref: string;
    addressLabel: string;
    address: string;
  };
  copyright: string;
}
