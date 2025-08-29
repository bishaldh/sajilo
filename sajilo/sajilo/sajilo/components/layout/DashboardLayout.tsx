"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Header2 from "@/components/layout/header/Header";
import Footer1 from "@/components/layout/footer/Footer1";

export default function DashboardLayout({ children, pageTitle }: { children: React.ReactNode; pageTitle: string }) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div id="wrapper">
      {/* Main Site Header */}
      <Header2 />
      {/* Dashboard Banner */}
      <section className="dashboard-banner mb-4">
        <img className="banner-bg" src="/assets/imgs/template/dashboard-banner.jpg" alt="Banner Background" />
        <div className="banner-content">
          <h1>{pageTitle}</h1>
        </div>
      </section>
      <div className="container dashboard-container">
        <div className="row justify-content-center">
          {/* Sidebar */}
          <div className="col-lg-4 col-xl-3 mb-4 mb-lg-0">
            <aside className="dashboard-sidebar animate__animated animate__fadeInLeft">
              <div className="d-flex flex-column align-items-center">
                <img src={user?.image || "/assets/imgs/template/icons/user.svg"} className="profile-img mb-3" alt="User Avatar" />
                <div className="user-name">{user?.name || user?.email}</div>
                <div className="user-email">{user?.email}</div>
              </div>
              <ul className="sidebar-nav mt-4">
                <li><Link href="/dashboard" className="nav-link-dashboard"><i className="fa fa-home"></i>Dashboard</Link></li>
                <li><Link href="/profile" className="nav-link-dashboard"><i className="fa fa-user"></i>My Profile</Link></li>
                <li><Link href="/dashboard/orders" className="nav-link-dashboard"><i className="fa fa-calendar"></i>My Orders</Link></li>
                <li><Link href="/dashboard/favorites" className="nav-link-dashboard"><i className="fa fa-car"></i>My Favorite Cars</Link></li>
                <li><a href="#" onClick={() => signOut()} className="nav-link-dashboard text-danger"><i className="fa fa-sign-out"></i>Sign Out</a></li>
              </ul>
            </aside>
          </div>
          {/* Main Content */}
          <div className="col-lg-9">
            {children}
          </div>
        </div>
      </div>
      {/* Main Site Footer */}
      <Footer1 />
    </div>
  );
}
