"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavItems } from "@/components/admin/SidebarNavItems";


export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="d-none d-md-flex flex-column bg-light border-end shadow-sm position-sticky top-0 vh-100 p-0" style={{width: '260px'}}>
      {/* Profile Section */}
      <div className="card bg-white rounded-4 shadow mx-3 mt-4 mb-4 py-4 align-items-center border-0">
        <img
          src="/assets/imgs/template/logo-w.png"
          alt="Sajilo Logo"
          className="w-16 h-16 rounded-full mb-3 border-4 border-[#70f46d] bg-white"
        />
        <img
          src="/assets/imgs/template/subscriber.png"
          alt="Admin User"
          className="w-14 h-14 rounded-full mb-2 border-2 border-[#70f46d] object-cover"
        />
        <div className="font-bold text-neutral-900 text-lg">Admin User</div>
        <div className="text-neutral-500 text-xs mb-2">admin@sajilo.com</div>
        <button className="mt-2 px-4 py-1 rounded-full text-white font-semibold text-xs" style={{ background: '#70f46d' }}>
          Account
        </button>
      </div>
      {/* Navigation */}
      <nav className="nav flex-column px-3 gap-2">
        {SidebarNavItems.map((item: { label: string; href: string; icon: React.ReactNode }) => (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-3 fw-medium ${pathname === item.href ? 'active bg-success text-white' : 'text-dark'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

