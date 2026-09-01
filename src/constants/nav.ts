export interface NavItem {
  to: string;
  label: string;
  /** react-router `NavLink` exact-match flag — only "/" needs it. */
  end: boolean;
}

/** Primary navigation — shared by the header and the footer. */
export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects", end: false },
  { to: "/blog", label: "Blog", end: false },
  { to: "/contact", label: "Contact", end: false },
];
