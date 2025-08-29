'use client'
import Link from 'next/link'
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState(0)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<PerfectScrollbar className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="d-flex" href="/"><img className="light-mode" alt="Sajilo" src="/assets/imgs/template/logo-d.png" /><img className="dark-mode" alt="Carento" src="/assets/imgs/template/logo-w.png" /></Link>
						<div className="burger-icon burger-icon-white" onClick={handleMobileMenu} />
					</div>
					<div className="mobile-header-content-area">
						<div className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading">
										<li className={`${isAccordion === 1 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(1)}>
												
											</span>
											<Link href="/index-2">Home</Link>
										</li>
										<li className={` ${isAccordion === 2 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(2)}>
												
											</span>
											<Link href="/about-us">About Us</Link>
										</li>
										<li className={`${isAccordion === 3 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(3)}>
											
											</span>
											<Link href="/vehicles">Vehicles</Link>
										</li>
										<li className={`${isAccordion === 4 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(4)}>
												
											</span>
											<Link href="/dealers">Dealers</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 4 ? "block" : "none"}` }}>
											</ul>
										</li>
										<li className={`${isAccordion === 5 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(5)}>
												
											</span>
											<Link href="/services">Services</Link>
										</li>
										<li className={`${isAccordion === 6 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(6)}>
												
											</span>
											<Link href="/contact">Contact</Link>
										</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</PerfectScrollbar>
			</div>
			{isMobileMenu && <div className="body-overlay-1" onClick={handleMobileMenu} />			}
		</>
	)
}
