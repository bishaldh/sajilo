import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import React from "react";
import Link from "next/link";

async function getBookings(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/bookings?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return <div className="container py-12 text-center">You must be logged in to view your rentals.</div>;
  }

  let bookings: any[] = [];
  let error = "";
  try {
    bookings = await getBookings(session.user.id);
  } catch (e: any) {
    error = e.message || "Failed to load bookings.";
  }

  return (
    <div className="dashboard-layout min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="sidebar w-64 bg-white border-r p-6 hidden md:block">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-8">
            <img src={session.user.image || '/assets/imgs/template/icons/user.svg'} alt="User Avatar" className="w-14 h-14 rounded-full border object-cover" />
            <div>
              <div className="font-bold text-lg">{session.user.name || session.user.email}</div>
              <div className="text-sm text-gray-500">{session.user.email}</div>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <Link href="/dashboard" className="py-2 px-3 rounded hover:bg-gray-100 font-medium text-gray-900">My Rentals</Link>
            <Link href="/profile" className="py-2 px-3 rounded hover:bg-gray-100 font-medium text-gray-900">Profile</Link>
          </nav>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">My Rentals</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {bookings.length === 0 ? (
          <div className="text-lg">No bookings found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4 shadow bg-white">
                <img src={booking.car.image} alt={booking.car.model} className="w-full h-40 object-cover rounded mb-2" />
                <h2 className="font-semibold text-lg mb-1">{booking.car.make} {booking.car.model}</h2>
                <div className="mb-1">From: {new Date(booking.startDate).toLocaleDateString()}</div>
                <div className="mb-1">To: {new Date(booking.endDate).toLocaleDateString()}</div>
                <div className="mb-1">Price: NPR {booking.car.price.toLocaleString()}</div>
                <div className="mb-1">Status: {booking.status || 'CONFIRMED'}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
