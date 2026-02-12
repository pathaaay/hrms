import {
  BriefcaseBusinessIcon,
  DicesIcon,
  LayoutDashboardIcon,
  WalletIcon,
} from "lucide-react";

export const navLinks = [
  {
    url: "/",
    label: "Dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    url: "/travel",
    label: "Travel",
    icon: WalletIcon,
  },
  {
    url: "/games",
    label: "Games",
    icon: DicesIcon,
  },
  {
    url: "",
    label: "Jobs",
    icon: BriefcaseBusinessIcon,
    items: [
      {
        url: "/jobs",
        label: "All",
      },
      {
        url: "/jobs/referrals",
        label: "Referrals",
      },
      {
        url: "/jobs/review-referrals",
        label: "Review Details",
      },
    ],
  },
];

export const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
