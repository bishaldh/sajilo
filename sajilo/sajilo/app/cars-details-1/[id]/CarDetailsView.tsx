'use client'
import MyDatePicker from '@/components/elements/MyDatePicker'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useEffect, useState } from "react"
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
                <Link href="/cars-listing-1">Cars Rental</Link>
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
              <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
