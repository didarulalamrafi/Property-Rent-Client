// src/app/(protected)/admin/users/page.jsx
import AdminUsersClient from "@/components/dashboard/admin/AdminUsersClient";

export const metadata = { title: "All Users — Thikana Admin" };

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}