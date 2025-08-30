'use client'
import CarCard1 from '@/components/elements/carcard/CarCard1'
import HeroSearch from '@/components/elements/HeroSearch'
import SortCarsFilter from '@/components/elements/SortCarsFilter'
import ByFuel from '@/components/Filter/ByFuel'
import ByLocation from '@/components/Filter/ByLocation'
import ByPagination from '@/components/Filter/ByPagination'
import ByPrice from '@/components/Filter/ByPrice'
import Layout from "@/components/layout/Layout"
import useCarFilter from '@/util/useCarFilter'
import Link from "next/link"
import Marquee from 'react-fast-marquee'
import { useState, useEffect } from "react";

export default function CarsList() {
	const [carsData, setCarsData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCars = async () => {
			try {
				setLoading(true);
				setError(null);
				
				const res = await fetch("/api/cars");
				if (!res.ok) {
					throw new Error(`Failed to fetch cars: ${res.status} ${res.statusText}`);
				}
				
				const data = await res.json();
				if (!Array.isArray(data)) {
					throw new Error("Invalid data format received from server");
				}
				
				setCarsData(data);
			} catch (err: any) {
				console.error("Error fetching cars:", err);
				setError(err.message || "An error occurred while fetching cars. Please try again later.");
			} finally {
				setLoading(false);
			}
		};
		
		fetchCars();
	}, []);

	const {
		filter,
		setFilter,
		sortCriteria,
		setSortCriteria,
		itemsPerPage,
		setItemsPerPage,
		currentPage,
		setCurrentPage,
		uniqueNames,
		uniqueFuelTypes,
		uniqueAmenities,
		uniqueLocations,
		uniqueRatings,
		uniqueCarTypes,
		filteredCars,
		sortedCars,
		totalPages,
		startIndex,
		endIndex,
		paginatedCars,
		handleCheckboxChange,
		handleSortChange,
		handlePriceRangeChange,
		handleItemsPerPageChange,
		handlePageChange,
		handlePreviousPage,
		handleNextPage,
		handleClearFilters,
		startItemIndex,
		endItemIndex,
	} = useCarFilter(carsData);

	if (loading) {
		return (
			<div className="container py-12 text-center">
				<div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
					<span className="visually-hidden">Loading cars...</span>
				</div>
				<p className="mt-3">Loading available cars...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="container py-12 text-center">
				<div className="alert alert-danger" role="alert">
					<strong>Error loading cars:</strong> {error}
				</div>
				<button 
					onClick={() => window.location.reload()} 
					className="btn btn-primary mt-3"
				>
					Try Again
				</button>
			</div>
		);
	}


	return (
		<Layout footerStyle={1}>
			<div>
				<div className="page-header-2 pt-30 background-body">
					<div className="custom-container position-relative mx-auto">
						<div className="bg-overlay rounded-12 overflow-hidden">
							<img className="w-100 h-100 img-fluid img-banner" src="/assets/imgs/page-header/banner6.png" alt="Carento" />
							</div>
							<div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
								<span className="text-sm-bold bg-2 px-4 py-3 rounded-12">Find cars for sale and for rent near you</span>
								<h2 className="text-white mt-4">Find Your Perfect Car</h2>
								<span className="text-white text-lg-medium">Search and find your best car rental with easy way</span>
							</div>
							<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 d-none d-none d-md-flex">
								<Link href="/" className="neutral-700 text-md-medium">Home</Link>
								<span className="@@ds-prev-page">
									<img src="/assets/imgs/template/icons/arrow-right.svg" alt="Sajilo" />
								</span>
								<Link href="#" className="neutral-1000 text-md-bold">@@prev-page</Link>
								<span>
									<img src="/assets/imgs/template/icons/arrow-right.svg" alt="Sajilo" />
								</span>
								<Link href="#" className="neutral-1000 text-md-bold text-nowrap">@@current-page</Link>
							</div>
						</div>
					</div>
					{/* search 1 */}
					<section className="box-section box-search-advance-home10 background-body">
						<div className="container">
							<div className="box-search-advance background-card wow fadeIn">
								<div className="box-top-search">
									<div className="left-top-search">
										<Link className="category-link text-sm-bold btn-click active" href="#">All cars</Link>
										<Link className="category-link text-sm-bold btn-click" href="#">New cars</Link>
										<Link className="category-link text-sm-bold btn-click" href="#">Used cars</Link>
									</div>
									<div className="right-top-search d-none d-md-flex">
										<Link className="text-sm-medium need-some-help" href="/contact">Need help?</Link>
									</div>
								</div>
								<HeroSearch />
							</div>
						</div>
					</section>
					{/* cars-listing-1 */}
					<section className="section-box pt-50 background-body">
						<div className="container">
							<div className="row align-items-end">
								<div className="col-md-9 mb-30 wow fadeInUp">
									<h4 className="title-svg neutral-1000 mb-15">Our Vehicle Fleet</h4>
									<p className="text-lg-medium text-bold neutral-500">Turning dreams into reality with versatile vehicles.</p>
								</div>
							</div>
						</div>
					</section>
					<section className="box-section block-content-tourlist background-body">
						<div className="container">
							<div className="box-content-main pt-20">
								<div className="content-right">
									<div className="box-filters mb-25 pb-5 border-bottom border-1">
										<SortCarsFilter
											sortCriteria={sortCriteria}
											handleSortChange={handleSortChange}
											itemsPerPage={itemsPerPage}
											handleItemsPerPageChange={handleItemsPerPageChange}
											handleClearFilters={handleClearFilters}
											startItemIndex={startItemIndex}
											endItemIndex={endItemIndex}
											sortedCars={sortedCars}
										/>
									</div>
									<div className="box-grid-tours wow fadeIn">
										<div className="row">
											{paginatedCars.map((car) => (
												<div className="col-lg-4 col-md-6 wow fadeInUp" key={car.id}>
													<CarCard1 car={{
  ...car,
  name: car.name || ((car.make && car.model) ? `${car.make} ${car.model}` : ''),
  price: car.price ?? car.pricePerDay
}} />
												</div>
											))}
										</div>
									</div>
									<ByPagination
										handlePreviousPage={handlePreviousPage}
										totalPages={totalPages}
										currentPage={currentPage}
										handleNextPage={handleNextPage}
										handlePageChange={handlePageChange}
									/>

								</div>
								<div className="content-left order-lg-first">
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Show on map</h6>
												<div className="box-collapse scrollFilter mb-15">
													<div className="pt-0">
														<div className="box-map-small">
														<iframe className="h-520 rounded-3" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d948.0!2d85.3364808!3d27.6900928!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19cc4a60df7d%3A0xa3d62c8a38b7e837!2sNAMI%20COLLEGE%20bachelors%20block!5e0!3m2!1sen!2s!4v1698224301123!5m2!1sen!2s" width="100%" height={500} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Filter Price </h6>
												<ByPrice filter={filter} handlePriceRangeChange={handlePriceRangeChange} />
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Fuel Type</h6>
												<ByFuel
													uniqueFuelTypes={uniqueFuelTypes}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
									<div className="sidebar-left border-1 background-body">
										<div className="box-filters-sidebar">
											<div className="block-filter border-1">
												<h6 className="text-lg-bold item-collapse neutral-1000">Booking Location</h6>
												<ByLocation
													uniqueLocations={uniqueLocations}
													filter={filter}
													handleCheckboxChange={handleCheckboxChange}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className="box-section background-body">
						<div className="container">
							<div className="box-content-main pt-20">
								<Marquee speed={60} gradientWidth={0}>
									<ul className="carouselTicker__list">
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/honda.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/honda-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/chevrolet.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/chevrolet-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/acura.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/acura-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/bmw.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/bmw-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/toyota.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/toyota-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/lexus.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/lexus-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/mer.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/mer-w.png" alt="Carento" />
											</div>
										</li>
										<li className="carouselTicker__item">
											<div className="item-brand">
												<img className="light-mode" src="/assets/imgs/page/homepage2/bugatti.png" alt="Carento" />
												<img className="dark-mode" src="/assets/imgs/page/homepage2/bugatti-w.png" alt="Carento" />
											</div>
										</li>
									</ul>
								</Marquee>
							</div>
						</div>
					</section>
				</div>
			</Layout>
	);
}