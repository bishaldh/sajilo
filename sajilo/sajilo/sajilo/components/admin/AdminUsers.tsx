"use client";
import React, { useEffect, useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [form, setForm] = useState({ name: "", email: "", role: "USER", status: "Active" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const openAddModal = () => {
    setForm({ name: "", email: "", role: "USER", status: "Active" });
    setIsEdit(false);
    setShowModal(true);
    setSelectedUser(null);
  };
  const openEditModal = (user: any) => {
    setForm({ name: user.name || "", email: user.email || "", role: user.role || "USER", status: user.status || "Active" });
    setIsEdit(true);
    setShowModal(true);
    setSelectedUser(user);
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let res;
      if (isEdit && selectedUser) {
        res = await fetch(`/api/users/${selectedUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      if (!res.ok) throw new Error("Failed to save user");
      setShowModal(false);
      setForm({ name: "", email: "", role: "USER", status: "Active" });
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || "Error saving user");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: string) => {
    setError("");
    try {
      const res = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete user");
      await fetchUsers();
    } catch (err: any) {
      setError(err.message || "Error deleting user");
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">User Management</h2>
          <button className="btn btn-success" onClick={openAddModal}>Add User</button>
        </div>
      </div>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          {loading ? (
            <div>Loading users...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
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
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td><span className={`badge bg-${user.status === "Active" ? "success" : "secondary"}`}>{user.status}</span></td>
                    <td className="text-end">
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => openEditModal(user)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => setDeleteId(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal fade show" tabIndex={-1} style={{display:'block', background:'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEdit ? "Edit User" : "Add User"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} disabled={saving}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select className="form-select" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
                      <option value="ADMIN">Admin</option>
                      <option value="USER">User</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={saving}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update User" : "Add User")}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="modal fade show" tabIndex={-1} style={{display:'block', background:'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={async () => { await handleDelete(deleteId); setDeleteId(null); }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

