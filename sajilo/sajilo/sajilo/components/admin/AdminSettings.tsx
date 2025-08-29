"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function AdminSettings() {
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Settings</h2>
          <button className="btn btn-outline-danger" onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
        </div>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Account Settings</h5>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value="admin@sajilo.com" readOnly />
          </div>
          {/* Add more settings fields here */}
        </div>
      </div>
    </div>
  );
}
