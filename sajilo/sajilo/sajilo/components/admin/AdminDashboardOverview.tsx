"use client";

import React from "react";
import { HiOutlineChartPie, HiOutlineViewGrid, HiOutlineUserGroup, HiOutlineCurrencyDollar, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash, HiOutlineDotsVertical } from "react-icons/hi";
import Modal from './Modal';

// --- Mock Data (as before) ---
const mockStats = {
  totalCars: 120,
  bookedCars: 45,
  rentedCars: 30,
  availableCars: 45,
  totalIncome: 2500000,
  totalUsers: 340,
};

const mockBookings: Array<{ id: number; car: string; user: string; date: string; status: keyof typeof statusBadgeClass; amount: number }> = [
  { id: 1, car: "Toyota Corolla", user: "John Doe", date: "2025-08-27", status: "Completed", amount: 5000 },
  { id: 2, car: "Honda Civic", user: "Jane Smith", date: "2025-08-26", status: "Pending", amount: 3500 },
  { id: 3, car: "Hyundai i20", user: "Ram Bahadur", date: "2025-08-25", status: "Completed", amount: 4000 },
  { id: 4, car: "Suzuki Swift", user: "Sita Rai", date: "2025-08-24", status: "Cancelled", amount: 0 },
];

const mockCars: Array<{ id: number; name: string; status: keyof typeof statusBadgeClass; price: number }> = [
  { id: 1, name: "Toyota Corolla", status: "Available", price: 5000 },
  { id: 2, name: "Honda Civic", status: "Rented", price: 3500 },
  { id: 3, name: "Hyundai i20", status: "Booked", price: 4000 },
  { id: 4, name: "Suzuki Swift", status: "Available", price: 3000 },
];

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
  const [isModalOpen, setModalOpen] = React.useState(false);

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
                <span className="fw-semibold">Active Deals</span>
              </div>
              <h5 className="fw-bold mb-0">Rs200,658 USD</h5>
              <small className="text-success">+23.85%</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-cash-coin fs-2 text-warning me-3"></i>
                <span className="fw-semibold">Revenue Deals</span>
              </div>
              <h5 className="fw-bold mb-0">Rs76,852 </h5>
              <small className="text-muted">vs last month: $85,748 USD</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-bar-chart-line fs-2 text-info me-3"></i>
                <span className="fw-semibold">Deals Created</span>
              </div>
              <h5 className="fw-bold mb-0">Rs200,354 </h5>
              <small className="text-success">+30.47%</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <i className="bi bi-currency-exchange fs-2 text-danger me-3"></i>
                <span className="fw-semibold">Deals Closing</span>
              </div>
              <h5 className="fw-bold mb-0">Rs 40,847</h5>
              <small className="text-danger">-08.55%</small>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Pipeline & Revenue Forecast */}
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 fw-bold">Sales Pipeline</div>
            <div className="card-body">
              {/* Placeholder for chart/graph, replace with real chart in production */}
              <img src="/assets/imgs/template/chart-pipeline.png" alt="Sales Pipeline Chart" className="img-fluid" />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 fw-bold">Revenue Forecast</div>
            <div className="card-body text-center">
              {/* Placeholder for circular progress, replace with real chart in production */}
              <div className="mb-3">
                <svg width="120" height="120">
                  <circle cx="60" cy="60" r="54" stroke="#e9ecef" strokeWidth="12" fill="none" />
                  <circle cx="60" cy="60" r="54" stroke="#0d6efd" strokeWidth="12" fill="none" strokeDasharray="339.292" strokeDashoffset="125" />
                  <text x="50%" y="54%" textAnchor="middle" dy=".3em" fontSize="2em" fill="#0d6efd">63%</text>
                </svg>
              </div>
              <div className="row g-2">
                <div className="col-6">
                  <div className="small">Marketing Goal</div>
                  <div className="fw-bold">$5,000/$7,500 USD</div>
                </div>
                <div className="col-6">
                  <div className="small">Teams Goal</div>
                  <div className="fw-bold">$8,000/$12,500 USD</div>
                </div>
                <div className="col-6">
                  <div className="small">Teams Goal</div>
                  <div className="fw-bold">$8,000/$12,500 USD</div>
                </div>
                <div className="col-6">
                  <div className="small">Revenue Goal</div>
                  <div className="fw-bold">$12,000/$25,000 USD</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 fw-bold">Cars Status</div>
            <div className="card-body">
              {mockCars.map((c) => (
                <div key={c.id} className="d-flex align-items-center justify-content-between p-3 mb-2 bg-light rounded">
                  <div>
                    <div className="fw-semibold">{c.name}</div>
                    <div className="small text-muted">NPR {c.price.toLocaleString()} / day</div>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
