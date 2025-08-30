"use client";
import React, { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [form, setForm] = useState({ carId: "", userId: "", startDate: "", endDate: "", status: "Pending" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const [bRes, cRes, uRes] = await Promise.all([
        fetch("/api/bookings"),
        fetch("/api/cars"),
        fetch("/api/users")
      ]);
      if (!bRes.ok || !cRes.ok || !uRes.ok) throw new Error("Failed to fetch data");
      const [bData, cData, uData] = await Promise.all([bRes.json(), cRes.json(), uRes.json()]);
      setBookings(bData);
      setCars(cData);
      setUsers(uData);
    } catch (err: any) {
      setError(err.message || "Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const openAddModal = () => {
    setForm({ carId: cars[0]?.id || "", userId: users[0]?.id || "", startDate: "", endDate: "", status: "Pending" });
    setIsEdit(false);
    setShowModal(true);
    setSelectedBooking(null);
  };
  const openEditModal = (booking: any) => {
    setForm({
      carId: booking.carId,
      userId: booking.userId,
      startDate: booking.startDate?.slice(0, 10) || "",
      endDate: booking.endDate?.slice(0, 10) || "",
      status: booking.status || "Pending"
    });
    setIsEdit(true);
    setShowModal(true);
    setSelectedBooking(booking);
  };
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      let res;
      if (isEdit && selectedBooking) {
        res = await fetch(`/api/bookings/${selectedBooking.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      if (!res.ok) throw new Error("Failed to save booking");
      setShowModal(false);
      setForm({ carId: cars[0]?.id || "", userId: users[0]?.id || "", startDate: "", endDate: "", status: "Pending" });
      await fetchAll();
    } catch (err: any) {
      setError(err.message || "Error saving booking");
    } finally {
      setSaving(false);
    }
  };
  const handleDelete = async (id: string) => {
    setError("");
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete booking");
      await fetchAll();
    } catch (err: any) {
      setError(err.message || "Error deleting booking");
    }
  };

  const getCarName = (id: string) => cars.find((c) => c.id === id)?.name || id;
  const getUserName = (id: string) => users.find((u) => u.id === id)?.name || id;

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Bookings Management</h2>
          <button className="btn btn-success" onClick={openAddModal}>Add Booking</button>
        </div>
      </div>
      <div className="card shadow-sm border-0">
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
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id}>
                    <td>{getCarName(booking.carId)}</td>
                    <td>{getUserName(booking.userId)}</td>
                    <td>{booking.startDate?.slice(0, 10)}</td>
                    <td>{booking.endDate?.slice(0, 10)}</td>
                    <td><span className={`badge bg-${booking.status === "Completed" ? "success" : booking.status === "Pending" ? "warning text-dark" : "secondary"}`}>{booking.status}</span></td>
                    <td className="text-end">
                      <button className="btn btn-outline-primary btn-sm me-2" onClick={() => openEditModal(booking)}>Edit</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => setDeleteId(booking.id)}>Delete</button>
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
                <h5 className="modal-title">{isEdit ? "Edit Booking" : "Add Booking"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} disabled={saving}></button>
              </div>
              <form onSubmit={handleSave}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Car</label>
                    <select className="form-select" value={form.carId} onChange={e => setForm({ ...form, carId: e.target.value })} required>
                      {cars.map(car => <option key={car.id} value={car.id}>{car.name}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">User</label>
                    <select className="form-select" value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} required>
                      {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={saving}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? (isEdit ? "Updating..." : "Adding...") : (isEdit ? "Update Booking" : "Add Booking")}</button>
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
                <h5 className="modal-title">Delete Booking</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteId(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this booking?</p>
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

