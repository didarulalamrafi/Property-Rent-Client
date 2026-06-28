// src/app/(protected)/admin/transactions/page.jsx
import AdminTransactionsClient from "@/components/dashboard/admin/AdminTransactionsClient";

export const metadata = { title: "Transactions — Thikana Admin" };

export default function AdminTransactionsPage() {
  return <AdminTransactionsClient />;
}