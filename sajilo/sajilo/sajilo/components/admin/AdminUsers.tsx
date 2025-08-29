"use client";
import React from "react";

export default function AdminUsers() {
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">User Management</h2>
          <button className="btn btn-success">Add User</button>
        </div>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example users, replace with real data */}
              <tr>
                <td>Ram Bahadur</td>
                <td>ram@example.com</td>
                <td>Admin</td>
                <td><span className="badge bg-success">Active</span></td>
                <td className="text-end">
                  <button className="btn btn-outline-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-outline-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Sita Rai</td>
                <td>sita@example.com</td>
                <td>User</td>
                <td><span className="badge bg-secondary">Inactive</span></td>
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
