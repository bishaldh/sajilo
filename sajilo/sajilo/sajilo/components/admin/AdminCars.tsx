"use client";
import React, { useState, useEffect } from "react";

export default function AdminCars() {
  const [cars, setCars] = useState<any[]>([]);
  const [newCar, setNewCar] = useState<{ make: string; model: string; pricePerDay: string; status: string }>({ make: "", model: "", pricePerDay: "", status: "Available" });
  const [editCar, setEditCar] = useState<any | null>(null);
  const [deleteCarId, setDeleteCarId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  // Fetch cars from backend
  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cars");
      if (!res.ok) throw new Error("Failed to fetch cars");
      const data = await res.json();
      // Map to ensure all cars have a display name
      setCars(data.map((car: any) => ({
        ...car,
        name: car.name || ((car.make && car.model) ? `${car.make} ${car.model}` : ''),
      })));
    } catch (err: any) {
      setError(err.message || "Error fetching cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCars(); }, []);

  // Add car to backend
  const handleAddCar = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setError("");
    try {
      const body = {
        make: newCar.make,
        model: newCar.model,
        pricePerDay: Number(newCar.pricePerDay),
        status: newCar.status,
        year: 2024,
        type: "Sedan",
        transmission: "Automatic",
        seats: 5,
        location: "Kathmandu",
        imageUrl: "/assets/imgs/cars-listing/cars-listing-6/car-1.png",
        features: [],
      };
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to add car");
      setNewCar({ make: "", model: "", pricePerDay: "", status: "Available" });
      (window as any).bootstrap?.Modal?.getOrCreateInstance(document.getElementById('addCarModal'))?.hide();
      await fetchCars();
    } catch (err: any) {
      setError(err.message || "Error adding car");
    } finally {
      setAdding(false);
    }
  };

  // Edit car handler
  const handleEditCar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editCar) return;
    setAdding(true);
    setError("");
    try {
      const body = {
        make: editCar.make,
        model: editCar.model,
        pricePerDay: Number(editCar.pricePerDay),
        status: editCar.status,
        year: editCar.year || 2024,
        type: editCar.type || "Sedan",
        transmission: editCar.transmission || "Automatic",
        seats: editCar.seats || 5,
        location: editCar.location || "Kathmandu",
        imageUrl: editCar.imageUrl || "/assets/imgs/cars-listing/cars-listing-6/car-1.png",
        features: editCar.features || [],
      };
      const res = await fetch(`/api/cars/${editCar.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed to update car");
      setEditCar(null);
      await fetchCars();
    } catch (err: any) {
      setError(err.message || "Error updating car");
    } finally {
      setAdding(false);
    }
  };

  // Delete car handler
  const handleDeleteCar = async (id: string) => {
    setError("");
    try {
      const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete car");
      await fetchCars();
    } catch (err: any) {
      setError(err.message || "Error deleting car");
    }
  };

  return (
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="fw-bold mb-0">Cars Management</h2>
          <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCarModal">Add Car</button>
        </div>
      </div>
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Price Per Day (रु)</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cars.map(car => (
                <tr key={car.id}>
                  <td>{car.name || ((car.make && car.model) ? `${car.make} ${car.model}` : "")}</td>
                  <td>रु {car.pricePerDay?.toLocaleString()}</td>
                  <td><span className={`badge bg-${car.status === "Available" ? "success" : car.status === "Rented" ? "primary" : "warning text-dark"}`}>{car.status}</span></td>
                  <td className="text-end">
                    <button className="btn btn-outline-primary btn-sm me-2" onClick={() => setEditCar(car)}>Edit</button>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => setDeleteCarId(car.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Car Modal */}
      {editCar && (
        <div className="modal fade show" tabIndex={-1} style={{display:'block', background:'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Car</h5>
                <button type="button" className="btn-close" onClick={() => setEditCar(null)} disabled={adding}></button>
              </div>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAdding(true);
                  setError("");
                  try {
                    const body = {
                      make: editCar.make,
                      model: editCar.model,
                      pricePerDay: Number(editCar.pricePerDay),
                      status: editCar.status,
                      year: editCar.year || 2024,
                      type: editCar.type || "Sedan",
                      transmission: editCar.transmission || "Automatic",
                      seats: editCar.seats || 5,
                      location: editCar.location || "Kathmandu",
                      imageUrl: editCar.imageUrl || "/assets/imgs/cars-listing/cars-listing-6/car-1.png",
                      features: editCar.features || [],
                    };
                    const res = await fetch(`/api/cars/${editCar.id}`, {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(body),
                    });
                    if (!res.ok) throw new Error("Failed to update car");
                    setEditCar(null);
                    await fetchCars();
                  } catch (err: any) {
                    setError(err.message || "Error updating car");
                  } finally {
                    setAdding(false);
                  }
                }}
              >
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Make</label>
                    <input type="text" className="form-control" value={editCar.make} onChange={e => setEditCar({ ...editCar, make: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Model</label>
                    <input type="text" className="form-control" value={editCar.model} onChange={e => setEditCar({ ...editCar, model: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price Per Day (रु)</label>
                    <input type="number" className="form-control" value={editCar.pricePerDay} onChange={e => setEditCar({ ...editCar, pricePerDay: e.target.value })} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select className="form-select" value={editCar.status} onChange={e => setEditCar({ ...editCar, status: e.target.value })}>
                      <option value="Available">Available</option>
                      <option value="Rented">Rented</option>
                      <option value="Booked">Booked</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input type="text" className="form-control" value={editCar.imageUrl || ''} onChange={e => setEditCar({ ...editCar, imageUrl: e.target.value })} />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setEditCar(null)} disabled={adding}>Cancel</button>
                  <button type="submit" className="btn btn-primary" disabled={adding}>{adding ? 'Updating...' : 'Update Car'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCarId && (
        <div className="modal fade show" tabIndex={-1} style={{display:'block', background:'rgba(0,0,0,0.3)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Car</h5>
                <button type="button" className="btn-close" onClick={() => setDeleteCarId(null)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this car?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setDeleteCarId(null)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={async () => { await handleDeleteCar(deleteCarId); setDeleteCarId(null); }}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Car Modal */}
      <div className="modal fade" id="addCarModal" tabIndex={-1} aria-labelledby="addCarModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCarModalLabel">Add New Car</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleAddCar}>
              <div className="modal-body">
                <div className="mb-3">
  <label className="form-label">Make</label>
  <input type="text" className="form-control" value={newCar.make} onChange={e => setNewCar({ ...newCar, make: e.target.value })} required />
</div>
<div className="mb-3">
  <label className="form-label">Model</label>
  <input type="text" className="form-control" value={newCar.model} onChange={e => setNewCar({ ...newCar, model: e.target.value })} required />
</div>
                <div className="mb-3">
  <label className="form-label">Price Per Day (रु)</label>
  <input type="number" className="form-control" value={newCar.pricePerDay} onChange={e => setNewCar({ ...newCar, pricePerDay: e.target.value })} required />
</div>
                <div className="mb-3">
                  <label className="form-label">Status</label>
                  <select className="form-select" value={newCar.status} onChange={e => setNewCar({ ...newCar, status: e.target.value })}>
                    <option value="Available">Available</option>
                    <option value="Rented">Rented</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" className="btn btn-success">Add Car</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
