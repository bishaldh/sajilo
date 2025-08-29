"use client";
import React from "react";

export default function AdminContent() {
  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Content Management</h2>
          <button className="btn btn-success">Add Content</button>
        </div>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Example content, replace with real data */}
              <tr>
                <td>Welcome Banner</td>
                <td>Banner</td>
                <td><span className="badge bg-success">Published</span></td>
                <td className="text-end">
                  <button className="btn btn-outline-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-outline-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Promo Offer</td>
                <td>Popup</td>
                <td><span className="badge bg-secondary">Draft</span></td>
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
