'use client'
import MyDatePicker from '@/components/elements/MyDatePicker'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect } from "react"
import Marquee from 'react-fast-marquee'
import ModalVideo from 'react-modal-video'
import Slider from "react-slick"

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-prev slick-arrow" +
      (currentSlide === 0 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  </button>
)

const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <button
    {...props}
    className={
      "slick-next slick-arrow" +
      (currentSlide === slideCount - 1 ? " slick-disabled" : "")
    }
    type="button"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="" strokeLinecap="round" strokeLinejoin="round"> </path></svg>
  </button>
)

export default function CarDetailsView({ car }: { car: any }) {
  const [isOpen, setOpen] = useState(false)
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [slider1, setSlider1] = useState(null)
  const [slider2, setSlider2] = useState(null)
  const [isAccordion, setIsAccordion] = useState(null)

  useEffect(() => {
    setNav1(slider1)
    setNav2(slider2)
  }, [slider2, slider1])

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
  }

  const settingsThumbs = {
    slidesToShow: 6,
    slidesToScroll: 1,
    asNavFor: nav1,
    dots: false,
    focusOnSelect: true,
    vertical: false,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 700, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  }

  const handleAccordion = (key: any) => {
    setIsAccordion(prevState => prevState === key ? null : key)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Layout footerStyle={1}>
      <div>
        <section className="box-section box-breadcrumb background-body">
          <div className="container">
            <ul className="breadcrumbs">
              <li>
                <Link href="/">Home</Link>
                <span className="arrow-right">
                  <svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </li>
              <li>
                <Link href="/cars-list">Cars Rental</Link>
                <span className="arrow-right">
                  <svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </li>
              <li><span className="text-breadcrumb">{car.make} {car.model} {car.year}</span></li>
            </ul>
          </div>
        </section>

        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img 
                src={car.imageUrl} 
                alt={`${car.make} ${car.model}`}
                className="w-full rounded-lg"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{car.make} {car.model}</h1>
              <div className="mt-4 space-y-2">
                <p><span className="font-semibold">Year:</span> {car.year}</p>
                <p><span className="font-semibold">Type:</span> {car.type}</p>
                <p><span className="font-semibold">Transmission:</span> {car.transmission}</p>
                <p><span className="font-semibold">Seats:</span> {car.seats}</p>
                <p><span className="font-semibold">Location:</span> {car.location}</p>
                <p><span className="font-semibold">Price per day:</span> NPR {car.pricePerDay.toLocaleString()}</p>
              </div>
              <BookNowButton car={car} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

function BookNowButton({ car }: { car: any }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleBook = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    if (!session) {
      router.push("/login");
      return;
    }
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          carId: car.id,
          userId: session && session.user ? session.user.id : "",
          startDate,
          endDate,
          totalPrice: car.pricePerDay * (Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000*60*60*24)) || 1)
        })
      });
      if (!res.ok) throw new Error("Booking failed");
      setSuccess(true);
      setShowModal(false);
    } catch (err: any) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* Enhanced Book Now Button */}
      <button
        className="mt-8 px-8 py-3 bg-gradient-to-r from-[#3CB371] to-[#1E90FF] text-white font-bold rounded-xl shadow-lg hover:from-[#2E8B57] hover:to-[#187bcd] focus:ring-4 focus:ring-blue-200 transition-all duration-200 text-lg tracking-wide"
        onClick={handleBook}
      >
        <svg className="inline mr-2 align-middle" width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2a7 7 0 0 1 7 7v2a7 7 0 0 1-14 0V9a7 7 0 0 1 7-7Zm0 2a5 5 0 0 0-5 5v2a5 5 0 0 0 10 0V9a5 5 0 0 0-5-5Zm-1 11.93V18h2v-4.07a7.001 7.001 0 0 1-2 0Z" fill="currentColor"/></svg>
        Book Now
      </button>
      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fadeIn">
            {/* Close Icon */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 focus:outline-none"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <h2 className="text-2xl font-extrabold mb-5 text-[#1E90FF]">Book this car</h2>
            <form onSubmit={handleBookingSubmit}>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Start Date</label>
              <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition" />
              <label className="block mb-2 text-sm font-semibold text-gray-700">End Date</label>
              <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="border border-gray-300 rounded-lg px-3 py-2 w-full mb-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition" />
              {error && <div className="text-red-500 mb-3 text-sm font-medium">{error}</div>}
              <div className="flex justify-end gap-3 mt-6">
                <button type="button" className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold border border-gray-300 shadow-sm transition" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className={`px-6 py-2 rounded-lg font-bold shadow bg-gradient-to-r from-[#3CB371] to-[#1E90FF] text-white hover:from-[#2E8B57] hover:to-[#187bcd] focus:ring-2 focus:ring-blue-200 transition-all duration-150 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Booking Success Modal */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center animate-fadeIn">
            <svg className="mx-auto mb-3" width="48" height="48" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#3CB371"/><path d="M8 12.5l2.5 2.5 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <h2 className="text-2xl font-extrabold mb-2 text-[#3CB371]">Booking Successful!</h2>
            <p className="mb-5 text-gray-700">Your booking has been created.</p>
            <button className="px-6 py-2 bg-gradient-to-r from-[#3CB371] to-[#1E90FF] text-white rounded-lg font-bold shadow hover:from-[#2E8B57] hover:to-[#187bcd] focus:ring-2 focus:ring-blue-200 transition-all duration-150" onClick={() => router.push('/dashboard')}>Go to My Rentals</button>
            <button className="px-5 py-2 bg-gray-100 rounded-lg font-semibold text-gray-700 border border-gray-300 shadow-sm ml-3 hover:bg-gray-200 transition" onClick={() => setSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}