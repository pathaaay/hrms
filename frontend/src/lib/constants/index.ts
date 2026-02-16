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
