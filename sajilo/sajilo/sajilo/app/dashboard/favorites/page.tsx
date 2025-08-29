import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function FavoritesPage() {
  return (
    <DashboardLayout pageTitle="My Favorite Cars">
      <div className="card p-4 mb-4 animate__animated animate__fadeInUp">
        <h4 className="mb-4"><i className="fa fa-car me-2"></i>My Favorite Cars</h4>
        <div className="text-lg text-center text-gray py-5">
          <i className="fa fa-heart-o fa-2x mb-3 text-danger" />
          <div>No favorite cars yet.</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
