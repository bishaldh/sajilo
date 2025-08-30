"use client";

import React from "react";
import { HiOutlineChartPie, HiOutlineViewGrid, HiOutlineUserGroup, HiOutlineCurrencyDollar, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineDotsVertical } from "react-icons/hi";
import Modal from './Modal';

import { useEffect, useState } from "react";

// --- Remove mock data. We'll fetch real data below. ---


// --- Reusable Components ---
const statusBadgeClass = {
  Completed: "badge bg-success",
  Pending: "badge bg-warning text-dark",
  Cancelled: "badge bg-danger",
  Available: "badge bg-success",
  Rented: "badge bg-primary",
  Booked: "badge bg-warning text-dark",
};

const StatusBadge: React.FC<{ status: keyof typeof statusBadgeClass }> = ({ status }) => (
  <span className={statusBadgeClass[status]}>{status}</span>
);

export default function AdminDashboardOverview() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (e: any) {
        setError(e.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Calculate car stats from bookings
  const carStats: Record<string, { count: number; model: string; make: string; price: number; image: string }> = {};
  bookings.forEach(b => {
    const key = b.car.make + ' ' + b.car.model;
    if (!carStats[key]) {
      carStats[key] = {
        count: 1,
        model: b.car.model,
        make: b.car.make,
        price: b.car.price,
        image: b.car.image
      };
    } else {
      carStats[key].count++;
    }
  });

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <div>
            <h2 className="fw-bold mb-1">Dashboard</h2>
            <small className="text-muted">Welcome back, Admin! Here's your business snapshot.</small>
          </div>
          <button
            className="btn btn-success d-flex align-items-center"
            onClick={() => setModalOpen(true)}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Add New Car
          </button>
        </div>
      </div>
      {/* Stat Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-graph-up fs-2 text-primary me-3"></i>
                <span className="fw-semibold">Total Bookings</span>
              </div>
              <h5 className="fw-bold mb-0">{bookings.length}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-cash-coin fs-2 text-warning me-3"></i>
                <span className="fw-semibold">Unique Cars</span>
              </div>
              <h5 className="fw-bold mb-0">{Object.keys(carStats).length}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-bar-chart-line fs-2 text-info me-3"></i>
                <span className="fw-semibold">Most Booked Car</span>
              </div>
              <h5 className="fw-bold mb-0">{Object.entries(carStats).sort((a,b)=>b[1].count-a[1].count)[0]?.[0] || '-'}</h5>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-currency-exchange fs-2 text-danger me-3"></i>
                <span className="fw-semibold">Total Users</span>
              </div>
              <h5 className="fw-bold mb-0">{[...new Set(bookings.map(b=>b.user?.id))].length}</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white border-0 fw-bold">Recent Bookings</div>
        <div className="card-body">
          {loading ? (
            <div>Loading bookings...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Car</th>
                  <th>User</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{booking.car.make} {booking.car.model}</td>
                    <td>{booking.user?.name || '-'}</td>
                    <td>{new Date(booking.startDate).toLocaleDateString()}</td>
                    <td>{new Date(booking.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Cars Status */}
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 fw-bold">Cars Status</div>
            <div className="card-body">
              {Object.entries(carStats).map(([key, c]) => (
                <div key={key} className="d-flex align-items-center justify-content-between p-3 mb-2 bg-light rounded">
                  <div>
                    <div className="fw-semibold">{c.make} {c.model}</div>
                    <div className="small text-muted">NPR {c.price.toLocaleString()} / day</div>
                  </div>
                  <span className="badge bg-info">{c.count} bookings</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

