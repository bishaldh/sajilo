import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import React from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";

async function getBookings(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/bookings?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return <div className="container py-12 text-center">You must be logged in to view your orders.</div>;
  }

  let bookings: any[] = [];
  let error = "";
  try {
    bookings = await getBookings(session.user.id);
  } catch (e: any) {
    error = e.message || "Failed to load bookings.";
  }

  // Use server's local date for filtering
  const now = new Date('2025-08-29T17:23:53+05:45');
  const filtered = bookings.filter(
    (booking) => new Date(booking.endDate).setHours(0,0,0,0) >= now.setHours(0,0,0,0)
  );

  return (
    <DashboardLayout pageTitle="My Orders">
      <div className="card p-4 mb-4">
        <h4 className="mb-4">My Orders</h4>
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
