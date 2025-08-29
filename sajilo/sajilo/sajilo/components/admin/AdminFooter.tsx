import React from "react";

export default function AdminFooter() {
  return (
    <footer className="w-full bg-background-card border-t border-neutral-100 px-6 py-4 text-center text-neutral-500 text-xs-medium">
      © {new Date().getFullYear()} Sajilo Car Rental Platform. All rights reserved.
    </footer>
  );
}
