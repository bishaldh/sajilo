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
      <button
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        onClick={handleBook}
      >
        Book Now
      </button>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Book this car</h2>
            <form onSubmit={handleBookingSubmit}>
              <label className="block mb-2">Start Date</label>
              <input type="date" required value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
              <label className="block mb-2">End Date</label>
              <input type="date" required value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded px-3 py-2 w-full mb-4" />
              {error && <div className="text-red-500 mb-2">{error}</div>}
              <div className="flex justify-end gap-2">
                <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={loading}>{loading ? "Booking..." : "Confirm Booking"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
            <h2 className="text-xl font-bold mb-2">Booking Successful!</h2>
            <p className="mb-4">Your booking has been created.</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => router.push('/dashboard')}>Go to My Rentals</button>
            <button className="px-4 py-2 bg-gray-300 rounded ml-2" onClick={() => setSuccess(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}