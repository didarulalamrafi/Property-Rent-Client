// src/components/dashboard/DashboardSidebar.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, Chip } from "@heroui/react";
import {
  TbHome,
  TbBuildingSkyscraper,
  TbCalendarEvent,
  TbHeart,
  TbUser,
  TbPlus,
  TbList,
  TbClipboardList,
  TbUsers,
  TbReceipt,
  TbLogout,
  TbChevronLeft,
  TbChevronRight,
  TbLayoutDashboard,
} from "react-icons/tb";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

const sidebarConfig = {
  tenant: {
    label: "Tenant",
    color: "primary",
    links: [
      { label: "My Bookings", href: "/tenant/bookings", icon: TbCalendarEvent },
      { label: "Favorites", href: "/tenant/favorites", icon: TbHeart },
      { label: "Profile", href: "/tenant/profile", icon: TbUser },
    ],
  },
  owner: {
    label: "Owner",
    color: "warning",
    links: [
      { label: "Dashboard", href: "/owner", icon: TbLayoutDashboard },
      { label: "Add Property", href: "/owner/add-property", icon: TbPlus },
      { label: "My Properties", href: "/owner/my-properties", icon: TbList },
      {
        label: "Booking Requests",
        href: "/owner/booking-requests",
        icon: TbClipboardList,
      },
      { label: "Profile", href: "/owner/profile", icon: TbUser },
    ],
  },
  admin: {
    label: "Admin",
    color: "danger",
    links: [
      { label: "All Users", href: "/admin/users", icon: TbUsers },
      {
        label: "All Properties",
        href: "/admin/properties",
        icon: TbBuildingSkyscraper,
      },
      {
        label: "All Bookings",
        href: "/admin/bookings",
        icon: TbCalendarEvent,
      },
      { label: "Transactions", href: "/admin/transactions", icon: TbReceipt },
      { label: "Profile", href: "/admin/profile", icon: TbUser },
    ],
  },
};

// Accent colors per role — light-theme variants
const accentMap = {
  primary: {
    text: "text-blue-600",
    bg: "bg-blue-50",
    bar: "bg-blue-500",
    chip: "primary",
  },
  warning: {
    text: "text-amber-600",
    bg: "bg-amber-50",
    bar: "bg-amber-500",
    chip: "warning",
  },
  danger: {
    text: "text-red-600",
    bg: "bg-red-50",
    bar: "bg-red-500",
    chip: "danger",
  },
};

export default function DashboardSidebar({ role }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const config = sidebarConfig[role] || sidebarConfig.tenant;
  const accent = accentMap[config.color] || accentMap.primary;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16 bg-white border-r border-gray-200 rounded-xl transition-all duration-300 relative shadow-sm",
        collapsed ? "w-20" : "w-64",
      )}
    >
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors z-10"
      >
        {collapsed ? (
          <TbChevronRight className="w-3.5 h-3.5 text-gray-500" />
        ) : (
          <TbChevronLeft className="w-3.5 h-3.5 text-gray-500" />
        )}
      </button>

      <div className="flex flex-col h-full p-4 overflow-y-auto">
        {/* User profile summary */}
        <div
          className={cn(
            "flex items-center gap-3 p-3 mb-6 rounded-2xl bg-gray-50 border border-gray-100",
            collapsed && "justify-center p-2.5",
          )}
        >
          <Avatar
            src={user?.photo}
            name={user?.name}
            size="sm"
            isBordered
            color={config.color}
            className="flex-shrink-0"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate leading-tight">
                {user?.name}
              </p>
              <Chip
                size="sm"
                variant="flat"
                color={config.color}
                className="h-4 text-[10px] capitalize mt-1"
              >
                {config.label}
              </Chip>
            </div>
          )}
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {!collapsed && (
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Navigation
            </p>
          )}
          {config.links.map((link) => {
            const isActive =
              link.href === `/${role}`
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                title={collapsed ? link.label : undefined}
                className={cn(
                  "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150",
                  isActive
                    ? cn(accent.bg, accent.text)
                    : "text-gray-500 hover:text-gray-800 hover:bg-gray-100",
                  collapsed && "justify-center px-2",
                )}
              >
                {isActive && (
                  <span
                    className={cn(
                      "absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-full",
                      accent.bar,
                    )}
                  />
                )}
                <link.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="truncate">{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="flex-1" />

        {/* Bottom actions */}
        <div className="border-t border-gray-100 pt-3 space-y-1">
          <Link
            href="/"
            title={collapsed ? "Home" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors duration-150",
              collapsed && "justify-center px-2",
            )}
          >
            <TbHome className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Back to Home</span>}
          </Link>
          <button
            onClick={handleLogout}
            title={collapsed ? "Logout" : undefined}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors duration-150 w-full",
              collapsed && "justify-center px-2",
            )}
          >
            <TbLogout className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
