import { ReactNode } from "react";
import { HiOutlineViewGrid, HiOutlineViewBoards, HiOutlineUser, HiOutlineClipboard, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineCog } from "react-icons/hi";

export const SidebarNavItems: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Dashboard", href: "/admin", icon: <HiOutlineViewGrid /> },
  { label: "Cars", href: "/admin/cars", icon: <HiOutlineViewBoards /> },
  { label: "Users", href: "/admin/users", icon: <HiOutlineUser /> },
  { label: "Bookings", href: "/admin/bookings", icon: <HiOutlineClipboard /> },
  { label: "Content", href: "/admin/content", icon: <HiOutlineDocumentText /> },
  { label: "Analytics", href: "/admin/analytics", icon: <HiOutlineChartBar /> },
  { label: "Settings", href: "/admin/settings", icon: <HiOutlineCog /> },
];
