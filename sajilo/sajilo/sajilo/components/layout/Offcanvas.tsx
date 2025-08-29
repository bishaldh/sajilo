'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type BookedCar = {
  id: string;
  car: {
    name: string;
    price: number;
    image: string;
  };
  startDate: string;
  endDate: string;
};

export default function Offcanvas({ isOffcanvas, handleOffcanvas }: any) {
  const { data: session } = useSession();
  const [bookedCars, setBookedCars] = useState<BookedCar[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/bookings?userId=${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          setBookedCars(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Error fetching bookings:', err);
          setLoading(false);
        });
    }
  }, [session?.user?.id]);

  return (
    <>
      <div className={`sidebar-canvas-wrapper perfect-scrollbar button-bg-2 ${isOffcanvas ? "sidebar-canvas-visible" : ""}`}>
        <div className="sidebar-canvas-container">
          <div className="sidebar-canvas-head">
            <div className="sidebar-canvas-logo">
              <Link className="d-flex" href="/">
                <img className="light-mode" alt="Sajilo" src="/assets/imgs/template/logo-b.png" />
                <img className="dark-mode" alt="Sajilo" src="/assets/imgs/template/logo-w.png" />
              </Link>
            </div>
            <div className="sidebar-canvas-lang">
              <div className="d-inline-block box-dropdown-cart align-middle mr-15">
                <span className="text-14-medium icon-list icon-account icon-lang">
                  <span className="text-14-medium arrow-down text-dark">EN</span>
                </span>
                <div className="dropdown-account">
                  <ul>
                    <li><Link className="text-sm-medium" href="#">English</Link></li>
                    <li><Link className="text-sm-medium" href="#">French</Link></li>
                    <li><Link className="text-sm-medium" href="#">Chinese</Link></li>
                  </ul>
                </div>
              </div>
              <div className="d-inline-block box-dropdown-cart align-middle mr-15">
                <span className="text-14-medium icon-list icon-cart">
                  <span className="text-14-medium arrow-down text-dark">NPR</span>
                </span>
                <div className="dropdown-cart">
                  <ul>
                    <li><Link className="text-sm-medium" href="#">NPR</Link></li>
                    <li><Link className="text-sm-medium" href="#">USD</Link></li>
                    <li><Link className="text-sm-medium" href="#">EUR</Link></li>
                  </ul>
                </div>
              </div>
              <a className="close-canvas" onClick={handleOffcanvas}>
                <img alt="Sajilo" src="/assets/imgs/template/icons/close.png" />
              </a>
            </div>
          </div>
          
          {session?.user && (
            <div className="sidebar-canvas-content">
              <div className="box-author-profile">
                <div className="card-author">
                  <div className="card-image">
                    {session.user.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || 'User'} 
                        className="rounded-full w-16 h-16 object-cover"
                      />
                    ) : (
                      <img 
                        src="/assets/imgs/page/homepage1/author2.png" 
                        alt="Default profile"
                        className="rounded-full w-16 h-16 object-cover"
                      />
                    )}
                  </div>
                  <div className="card-info">
                    <p className="text-md-bold neutral-1000">Howdy, {session.user.name || 'User'}</p>
                    <p className="text-xs neutral-1000">
                      {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button className="btn btn-black" onClick={() => signOut()}>
                  Logout
                </button>
              </div>
              
              <div className="sidebar-banner">
                <div className="position-relative">
                  <p className="text-xl-bold neutral-1000 mb-4">Your Booked Cars</p>
                  {loading ? (
                    <p className="text-md-medium">Loading...</p>
                  ) : bookedCars.length > 0 ? (
                    bookedCars.map((booking) => (
                      <div key={booking.id} className="d-flex align-items-center mb-3">
                        <div className="me-3 border rounded-3 overflow-hidden mw-65">
                          <img src={booking.car.image} alt={booking.car.name} />
                        </div>
                        <div className="position-relative">
                          <p className="text-md-bold neutral-1000">{booking.car.name}</p>
                          <p className="text-md-bold text-success">Rs. {booking.car.price.toLocaleString()}/day</p>
                          <p className="text-sm neutral-500">
                            {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-md-medium">No cars booked yet</p>
                  )}
                </div>
              </div>
              
              <div className="box-contactus">
                <h6 className="title-contactus neutral-1000">Contact Us</h6>
                <div className="contact-info">
                  <p className="address-2 text-md-medium neutral-1000">
                    Kathmandu, Nepal
                  </p>
                  <p className="hour-work-2 text-md-medium neutral-1000">
                    Hours: 9:00 - 18:00, Sun - Sat
                  </p>
                  <p className="email-2 text-md-medium neutral-1000">
                    info@sajilo.com
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isOffcanvas && (
        <div className="body-overlay-1" onClick={handleOffcanvas} />
      )}
    </>
  );
}
