// src/app/(protected)/tenant/profile/page.jsx
import TenantProfileClient from "@/components/dashboard/tenant/TenantProfileClient";

export const metadata = { title: "My Profile — Thikana" };

export default function TenantProfilePage() {
  return <TenantProfileClient />;
}