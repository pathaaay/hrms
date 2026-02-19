import {
  BriefcaseBusinessIcon,
  DicesIcon,
  GitForkIcon,
  HashIcon,
  WalletIcon,
} from "lucide-react";
import { ROLES } from "../types/user";

export const navLinks = [
  {
    url: "/",
    label: "Organization Chart",
    icon: GitForkIcon,
    iconClass: "rotate-180",
  },
  {
    url: "/achievement-posts",
    label: "Achievement Posts",
    icon: HashIcon,
  },
  {
    url: "/travels",
    label: "Travels",
    icon: WalletIcon,
    items: [
      {
        url: "",
        label: "All",
      },
      {
        url: "/manage",
        label: "Manage Travels",
        requiredRoles: [ROLES.HR],
      },
      {
        url: "/manage/create",
        label: "Create Travel",
        requiredRoles: [ROLES.HR],
      },
    ],
  },
  {
    url: "/games",
    label: "Games",
    icon: DicesIcon,
    items: [
      {
        url: "",
        label: "All",
      },
      {
        url: "/bookings",
        label: "View Bookings",
      },
    ],
  },
  {
    url: "/jobs",
    label: "Jobs",
    icon: BriefcaseBusinessIcon,
    items: [
      {
        url: "/",
        label: "All",
      },
      {
        url: "/manage",
        label: "Manage jobs",
        requiredRoles: [ROLES.HR],
      },
      {
        url: "/manage/create",
        label: "Create Job",
        requiredRoles: [ROLES.HR],
      },
      {
        url: "/referrals",
        label: "Referrals",
      },
      {
        url: "/assigned-referrals",
        label: "Assinged Referrals",
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
