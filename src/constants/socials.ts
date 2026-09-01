import {
  FaInstagram,
  FaLinkedinIn,
  FaThreads,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

export interface SocialLink {
  label: string;
  href: string;
  Icon: IconType;
}

/** Social profiles — shared by the Hero and the footer. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/njoh_simplice",
    Icon: FaInstagram,
  },
  {
    label: "X (Twitter)",
    href: "https://x.com/njoh_simplice",
    Icon: FaXTwitter,
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@njoh_simplice",
    Icon: FaThreads,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@njoh_simplice",
    Icon: FaTiktok,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/njoh-simplice-junior",
    Icon: FaLinkedinIn,
  },
];
