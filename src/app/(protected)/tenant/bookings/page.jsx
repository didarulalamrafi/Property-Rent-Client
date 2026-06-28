// src/app/(protected)/tenant/bookings/page.jsx
import TenantBookingsClient from "@/components/dashboard/tenant/TenantBookingsClient";

export const metadata = { title: "My Bookings — Thikana" };

export default function TenantBookingsPage() {
  return <TenantBookingsClient />;
}