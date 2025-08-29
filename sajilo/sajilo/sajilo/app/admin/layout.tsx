import React, { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";
import ThemeSwitch from "@/components/elements/ThemeSwitch";
import "@/public/assets/css/plugins/swiper-bundle.min.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    redirect("/login");
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <AdminHeader />
      <div className="d-flex flex-grow-1">
        <AdminSidebar />
        <main className="flex-grow-1 p-4 p-md-5">
          {children}
        </main>
      </div>
      <AdminFooter />
      <ThemeSwitch />
    </div>
  );
}
