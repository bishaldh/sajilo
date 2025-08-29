import React from "react";
import ThemeSwitch from "@/components/elements/ThemeSwitch";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <header className="w-full bg-background-card px-6 py-4 flex items-center justify-between border-b border-neutral-100 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <Image src="/assets/imgs/template/logo-b.png" alt="Sajilo Logo" width={40} height={40} />
        <span className="heading-6 font-bold tracking-tight text-neutral-1000">Sajilo Admin</span>
      </div>
      <div className="flex items-center gap-6">
        <ThemeSwitch />
        {/* Admin user menu placeholder */}
        <div className="rounded-full bg-background-brand-2 w-10 h-10 flex items-center justify-center text-color-white font-bold">A</div>
      </div>
    </header>
  );
}
