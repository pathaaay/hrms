import {
  BriefcaseBusinessIcon,
  DicesIcon,
  LayoutDashboardIcon,
  WalletIcon,
} from "lucide-react";
import { ROLES } from "../types/user";

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
        label: "Manage",
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
        url: "/review-referrals",
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
