"use client";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (status === "loading") {
    return (
      <DashboardLayout pageTitle="My Profile">
        <div className="text-center py-5">
          <div className="spinner-border text-success" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout pageTitle="My Profile">
        <div className="text-lg text-center text-gray py-5">You must be logged in to view your profile.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="My Profile">
      <div className="card p-4 mb-4 animate__animated animate__fadeInUp">
        <h4 className="mb-4"><i className="fa fa-user me-2"></i>My Profile</h4>
        <div className="row align-items-center">
          <div className="col-md-3 text-center">
            <img src={user.image || "/assets/imgs/template/icons/user.svg"} className="img-fluid rounded-circle shadow mb-3" alt="" style={{width: 120, height: 120, objectFit: 'cover', border: '3px solid #70f46d', background: '#fff'}} />
          </div>
          <div className="col-md-9">
            <div className="mb-2"><strong>Name:</strong> {user.name}</div>
            <div className="mb-2"><strong>Email:</strong> {user.email}</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
