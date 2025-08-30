"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DashboardLayout from "@/components/layout/DashboardLayout";

function OrdersPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!session || !session.user?.id) return;
    async function fetchBookings() {
      setLoading(true);
      setError("");
      try {
        if (!session || !session.user?.id) return;
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
    fetchBookings();
  }, [session]);

  if (status === "loading") {
    return <div className="container py-12 text-center">Loading...</div>;
  }
  if (!session || !session.user?.id) {
    return <div className="container py-12 text-center">You must be logged in to view your orders.</div>;
  }

  // Use current local time for filtering
  const now = new Date("2025-08-30T13:53:55+05:45");
  const filtered = bookings.filter(
    (booking) => new Date(booking.endDate).setHours(0,0,0,0) >= now.setHours(0,0,0,0)
  );

  return (
    <DashboardLayout pageTitle="My Orders">
      <div className="card p-4 mb-4">
        <h4 className="mb-4">My Orders</h4>
        {loading && <div>Loading...</div>}
        {error && <div className="text-danger mb-4">{error}</div>}
        {filtered.length === 0 ? (
          <div className="text-lg">No orders found.</div>
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

export default OrdersPage;

