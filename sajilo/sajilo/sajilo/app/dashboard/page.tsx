"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function DashboardPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get user session from a cookie or global context (customize as needed)
    async function fetchSessionAndBookings() {
      setLoading(true);
      setError("");
      try {
        // You may want to use a custom endpoint or context for session
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json();
        if (!session || !session.user?.id) {
          setError("You must be logged in to view your rentals.");
          setBookings([]);
          setUserId(null);
          setLoading(false);
          return;
        }
        setUserId(session.user.id);
        const res = await fetch(`/api/bookings?userId=${session.user.id}`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        setBookings(await res.json());
      } catch (e: any) {
        setError(e.message || "Failed to load bookings.");
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchSessionAndBookings();
  }, []);

  const refreshBookings = async () => {
    if (!userId) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/bookings?userId=${userId}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      setBookings(await res.json());
    } catch (e: any) {
      setError(e.message || "Failed to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

 
  const now = new Date();
  const filtered = bookings.filter(
    (booking) => new Date(booking.endDate).setHours(0,0,0,0) >= now.setHours(0,0,0,0)
  );

  const totalBookings = filtered.length;
  const totalFavorites = 0; // Placeholder, update if you add favorites

  return (
    <DashboardLayout pageTitle="Dashboard">
      <div className="row mb-4">
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card text-center p-4 shadow-sm h-100">
            <div className="mb-2"><i className="fa fa-calendar fa-2x text-primary"></i></div>
            <h5 className="mb-1">My Bookings</h5>
            <div className="display-6 fw-bold">{totalBookings}</div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card text-center p-4 shadow-sm h-100">
            <div className="mb-2"><i className="fa fa-car fa-2x text-success"></i></div>
            <h5 className="mb-1">My Favorite Cars</h5>
            <div className="display-6 fw-bold">{totalFavorites}</div>
          </div>
        </div>
        <div className="col-md-12 col-lg-4 mb-4 d-flex align-items-center">
          <button className="btn btn-outline-primary ms-auto" onClick={refreshBookings} disabled={loading}>
            Refresh Bookings
          </button>
        </div>
      </div>
      <div className="card p-4 mb-4">
        <h4 className="mb-4">My Bookings</h4>
        {error && <div className="text-danger mb-4">{error}</div>}
        {loading ? (
          <div>Loading bookings...</div>
        ) : filtered.length === 0 ? (
          <div className="text-lg">No bookings found.</div>
        ) : (
          <div className="row g-4">
            {filtered.map((booking) => (
              <div key={booking.id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm">
                  <img src={booking.car.image} alt={booking.car.model} className="card-img-top rounded-top" style={{height: '180px', objectFit: 'cover'}} />
                  <div className="card-body">
                    <h5 className="card-title mb-1">{booking.car.make} {booking.car.model}</h5>
                    <div className="mb-1"><i className="fa fa-calendar me-2"></i>From: {new Date(booking.startDate).toLocaleDateString()}</div>
                    <div className="mb-1"><i className="fa fa-calendar me-2"></i>To: {new Date(booking.endDate).toLocaleDateString()}</div>
                    <div className="mb-1"><i className="fa fa-money me-2"></i>Price: NPR {booking.car.price?.toLocaleString?.() ?? booking.car.pricePerDay?.toLocaleString?.() ?? 'N/A'}</div>
                    <div className="mb-1"><i className="fa fa-check-circle me-2"></i>Status: {booking.status || 'CONFIRMED'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
