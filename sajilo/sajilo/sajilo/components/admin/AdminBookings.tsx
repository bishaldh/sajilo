"use client";
import React from "react";

export default function AdminBookings() {
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Bookings Management</h2>
          <button className="btn btn-success">Add Booking</button>
        </div>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Car</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example bookings, replace with real data */}
              <tr>
                <td>Toyota Corolla</td>
                <td>Ram Bahadur</td>
                <td>2025-08-27</td>
                <td><span className="badge bg-success">Completed</span></td>
                <td className="text-end">
                  <button className="btn btn-outline-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-outline-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Honda Civic</td>
                <td>Sita Rai</td>
                <td>2025-08-26</td>
                <td><span className="badge bg-warning text-dark">Pending</span></td>
                <td className="text-end">
                  <button className="btn btn-outline-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-outline-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
