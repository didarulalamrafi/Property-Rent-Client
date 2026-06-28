// src/app/(protected)/tenant/layout.jsx
"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileDashboardMenu from "@/components/ui/MobileDashboardMenu";
import Navbar from "@/components/ui/Navbar";

export default function TenantLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={["tenant"]}>
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="flex pt-16">
          <DashboardSidebar role="tenant" />
          <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 pb-24 md:pb-8 bg-white dark:bg-gray-950">
            {children}
          </main>
        </div>
        <MobileDashboardMenu />
      </div>
    </ProtectedRoute>
  );
}
