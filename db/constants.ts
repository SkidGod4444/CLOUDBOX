import {
  Compass,
  FileBox,
  FolderPlus,
  LucideIcon,
  Share2,
  UploadCloud,
} from "lucide-react";

type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  variant: "ghost" | "default";
};

type CardItemProps = {
  cid: string;
  title: string;
  description: string;
  link: string;
  img: string;
  isFolder: boolean;
  isFile: boolean;
  isNsfw: boolean;
};

export const NavBarItems: NavItem[] = [
  {
    title: "Upload",
    href: "/",
    icon: UploadCloud,
    variant: "ghost",
  },
  {
    title: "Browse",
    href: "/browse",
    icon: Compass,
    variant: "ghost",
  },
  {
    title: "Folders",
    href: "/folders",
    icon: FolderPlus,
    variant: "ghost",
  },
  {
    title: "All Files",
    href: "/uploads",
    icon: FileBox,
    variant: "ghost",
  },
  {
    title: "Shared",
    href: "/shares",
    icon: Share2,
    variant: "ghost",
  },
];

export const PublicNavBarItems: NavItem[] = [
  {
    title: "Upload",
    href: "/",
    icon: UploadCloud,
    variant: "ghost",
  },
  {
    title: "Browse",
    href: "/browse",
    icon: Compass,
    variant: "ghost",
  },
];

export const CardItems: CardItemProps[] = [
  {
    cid: "3993",
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
    img: "https://stripe.com",
    isFile: false,
    isFolder: true,
    isNsfw: false
  },
  {
    cid: "3994",
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
    link: "https://netflix.com",
    img: "https://stripe.com",
    isFile: false,
    isFolder: true,
    isNsfw: false
  },
  {
    cid: "3995",
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
    img: "https://stripe.com",
    isFile: false,
    isFolder: true,
    isNsfw: false
  },
  {
    cid: "3996",
    title: "Meta",
    description:
      "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
    link: "https://meta.com",
    img: "https://stripe.com",
    isFile: false,
    isFolder: true,
    isNsfw: false
  },
  {
    cid: "3997",
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    link: "https://amazon.com",
    img: "https://stripe.com",
    isFile: false,
    isFolder: true,
    isNsfw: true
  },
  {
    cid: "3998",
    title: "Microsoft",
    description:
      "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
    link: "https://microsoft.com",
    img: "https://stripe.com",
    isFile: false,
    isFolder: true,
    isNsfw: false
  },
];
