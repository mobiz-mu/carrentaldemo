import type { Metadata } from "next";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Mobiz Car Rental admin dashboard — manage the fleet and review booking requests.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <div className="bg-sand/30">
      <AdminDashboard />
    </div>
  );
}
