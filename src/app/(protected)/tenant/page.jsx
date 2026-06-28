// src/app/(protected)/tenant/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Avatar, Button } from "@heroui/react";
import {
  TbCalendarEvent,
  TbHeart,
  TbUser,
  TbArrowRight,
  TbHome,
  TbClock,
  TbCheck,
  TbBuildingSkyscraper,
  TbSparkles,
} from "react-icons/tb";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axios";
import { formatCurrency, formatDate, getStatusBadgeClass } from "@/lib/utils";
import { StatsCardSkeleton } from "@/components/ui/SkeletonCard";

export default function TenantHomePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookingsRes, favoritesRes] = await Promise.all([
          axiosInstance.get("/bookings/tenant?page=1&limit=3"),
          axiosInstance.get("/favorites?page=1&limit=1"),
        ]);
        const bookings = bookingsRes.data.data.bookings || [];
        const favTotal = favoritesRes.data.data.pagination?.total || 0;
        setRecentBookings(bookings);
        setStats({
          totalBookings: bookingsRes.data.data.pagination?.total || 0,
          totalFavorites: favTotal,
          pendingBookings: bookings.filter((b) => b.status === "pending")
            .length,
          approvedBookings: bookings.filter((b) => b.status === "approved")
            .length,
        });
      } catch {
        setStats({
          totalBookings: 0,
          totalFavorites: 0,
          pendingBookings: 0,
          approvedBookings: 0,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    {
      label: "Total bookings",
      value: stats?.totalBookings ?? 0,
      icon: TbCalendarEvent,
      color: "text-blue-600",
      bg: "bg-blue-50",
      href: "/tenant/bookings",
    },
    {
      label: "Saved properties",
      value: stats?.totalFavorites ?? 0,
      icon: TbHeart,
      color: "text-rose-500",
      bg: "bg-rose-50",
      href: "/tenant/favorites",
    },
    {
      label: "Pending",
      value: stats?.pendingBookings ?? 0,
      icon: TbClock,
      color: "text-amber-600",
      bg: "bg-amber-50",
      href: "/tenant/bookings",
    },
    {
      label: "Approved",
      value: stats?.approvedBookings ?? 0,
      icon: TbCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      href: "/tenant/bookings",
    },
  ];

  const quickLinks = [
    {
      href: "/properties",
      icon: TbBuildingSkyscraper,
      title: "Browse properties",
      description: "Find your next home",
      gradient: "from-blue-600 to-blue-500",
    },
    {
      href: "/tenant/favorites",
      icon: TbHeart,
      title: "My favorites",
      description: "View saved properties",
      gradient: "from-rose-500 to-pink-500",
    },
    {
      href: "/tenant/profile",
      icon: TbUser,
      title: "My profile",
      description: "Manage your account",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6">
      {/* ── Welcome Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative overflow-hidden rounded-2xl bg-blue-600 p-5 mb-6"
      >
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute bottom-0 right-20 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />
        <div className="relative flex items-center gap-4">
          <Avatar
            src={user?.photo}
            name={user?.name}
            size="lg"
            isBordered
            classNames={{ base: "border-white/40 ring-2 ring-white/20" }}
          />
          <div>
            <p className="text-blue-100 text-xs font-medium mb-1 flex items-center gap-1">
              <TbSparkles className="w-3 h-3" /> Tenant Dashboard
            </p>
            <h1 className="text-white text-xl font-bold font-heading leading-tight">
              Welcome back, {user?.name?.split(" ")[0]}! 👋
            </h1>
            <p className="text-blue-100 text-xs mt-0.5">
              Here's a summary of your activity on Thikana.
            </p>
          </div>
        </div>
      </motion.div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatsCardSkeleton key={i} />
            ))
          : statCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={card.href} className="block group h-full">
                  <div className="h-full bg-white border border-gray-100 rounded-2xl p-4 hover:border-blue-100 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-xl ${card.bg}`}>
                        <card.icon className={`w-4 h-4 ${card.color}`} />
                      </div>
                      <TbArrowRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 font-heading leading-none mb-1">
                      {card.value}
                    </p>
                    <p className="text-xs text-gray-400 font-medium">
                      {card.label}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
      </div>

      {/* ── Recent Bookings ── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="bg-white border border-gray-100 rounded-2xl p-5 mb-5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 font-heading">
              Recent bookings
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Your 3 most recent property bookings
            </p>
          </div>
          <Button
            as={Link}
            href="/tenant/bookings"
            variant="flat"
            size="sm"
            endContent={<TbArrowRight className="w-3.5 h-3.5" />}
            className="text-blue-600 bg-blue-50 font-medium text-xs h-8 px-3"
          >
            View all
          </Button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 items-center animate-pulse">
                <div className="w-[50px] h-10 bg-gray-100 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-3/4 bg-gray-100 rounded" />
                  <div className="h-2.5 w-1/3 bg-gray-100 rounded" />
                </div>
                <div className="h-5 w-14 bg-gray-100 rounded-full" />
              </div>
            ))}
          </div>
        ) : recentBookings.length === 0 ? (
          <div className="text-center py-10">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <TbCalendarEvent className="w-6 h-6 text-blue-400" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              No bookings yet
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Browse available properties and make your first booking.
            </p>
            <Button
              as={Link}
              href="/properties"
              size="sm"
              className="btn-gradient text-white font-semibold"
            >
              Browse properties
            </Button>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentBookings.map((booking, i) => (
              <motion.div
                key={booking._id}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.38 + i * 0.06 }}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0 -mx-2 px-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                {booking.propertySnapshot?.image ? (
                  <img
                    src={booking.propertySnapshot.image}
                    alt={booking.propertySnapshot.title}
                    className="w-[50px] h-10 object-cover rounded-xl flex-shrink-0"
                  />
                ) : (
                  <div className="w-[50px] h-10 bg-gray-100 rounded-xl flex-shrink-0 flex items-center justify-center">
                    <TbHome className="w-4 h-4 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate leading-tight">
                    {booking.propertySnapshot?.title ||
                      booking.propertyId?.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Move-in: {formatDate(booking.moveInDate)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className={getStatusBadgeClass(booking.status)}>
                    {booking.status}
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    {formatCurrency(booking.amount)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* ── Quick Links ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {quickLinks.map((item, i) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 + i * 0.07 }}
          >
            <Link
              href={item.href}
              className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center gap-3 hover:border-blue-100 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 group block"
            >
              <div
                className={`p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} flex-shrink-0`}
              >
                <item.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.title}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {item.description}
                </p>
              </div>
              <TbArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
