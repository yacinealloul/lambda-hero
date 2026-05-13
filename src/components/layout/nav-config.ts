export type MenuLink = { label: string; href: string };

export type MenuColumn = {
  heading: string;
  items: MenuLink[];
  /** Items rendered after a dotted divider inside the same column */
  extra?: MenuLink[];
};

export type NavItem = {
  key: string;
  label: string;
  href: string;
  menu?: MenuColumn[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    key: "ai-factories",
    label: "AI Factories",
    href: "/ai-factories",
    menu: [
      {
        heading: "//Build",
        items: [
          { label: "Lambda Stack", href: "/lambda-stack" },
          { label: "Orchestration", href: "/orchestration" },
        ],
      },
      {
        heading: "//Deploy",
        items: [
          { label: "Reference Architectures", href: "/ref-arch" },
          { label: "Trust and Security", href: "/trust" },
        ],
      },
    ],
  },
  {
    key: "products",
    label: "Products",
    href: "/products",
    menu: [
      {
        heading: "//Supercomputers",
        items: [
          { label: "Superclusters", href: "/superclusters" },
          { label: "1-Click Clusters™", href: "/clusters" },
          { label: "Instances", href: "/instances" },
        ],
        extra: [{ label: "Compare", href: "/compare" }],
      },
      {
        heading: "//For every mission",
        items: [
          { label: "Superintelligence", href: "/superintelligence" },
          { label: "Enterprise", href: "/enterprise" },
          { label: "Government", href: "/government" },
          { label: "Startups and Researchers", href: "/startups" },
        ],
      },
      {
        heading: "//Foundations",
        items: [
          { label: "AI Factories", href: "/ai-factories" },
          { label: "Orchestration", href: "/orchestration" },
          { label: "Lambda Stack", href: "/lambda-stack" },
          { label: "Trust and Security", href: "/trust" },
        ],
      },
      {
        heading: "//Docs",
        items: [
          { label: "Customer Stories", href: "/stories" },
          { label: "Documentation", href: "/docs" },
          { label: "Blog", href: "/blog" },
          { label: "Research", href: "/research" },
        ],
      },
    ],
  },
  {
    key: "pricing",
    label: "Pricing",
    href: "/pricing",
  },
  {
    key: "company",
    label: "Company",
    href: "/company",
    menu: [
      {
        heading: "//About",
        items: [
          { label: "About Lambda", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Press", href: "/press" },
        ],
      },
      {
        heading: "//Connect",
        items: [
          { label: "Contact", href: "/contact" },
          { label: "Partners", href: "/partners" },
        ],
      },
    ],
  },
];

export const GET_STARTED_MENU: MenuColumn = {
  heading: "//Get started",
  items: [{ label: "Create account", href: "/sign-up" }],
  extra: [{ label: "Talk to our team", href: "/contact" }],
};
