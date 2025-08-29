"use client";
import React from "react";

export default function AdminAnalytics() {
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Analytics</h2>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="fw-bold">Total Bookings</h5>
              <div className="display-4 text-success">1,200</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="fw-bold">Total Revenue</h5>
              <div className="display-4 text-primary">रु 12,50,000</div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body text-center">
              <h5 className="fw-bold">Active Users</h5>
              <div className="display-4 text-info">340</div>
            </div>
          </div>
        </div>
      </div>
      {/* Add more analytics widgets/charts here */}
    </div>
  );
}
