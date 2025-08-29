'use client'
import dynamic from 'next/dynamic'
const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
	ssr: false,
})
import Link from 'next/link'
import Dropdown from 'react-bootstrap/Dropdown'
import { useSession, signOut } from 'next-auth/react'

import { useState } from 'react';

export default function Header2({ scroll, isMobileMenu, handleMobileMenu, handleOffcanvas, isOffcanvas }: any) {
	const { data: session } = useSession()
	const [userDashboardOpen, setUserDashboardOpen] = useState(false);
	
	return (
		<>
			<header className={`header sticky-bar header-home-2 ${scroll ? 'stick' : ''}`}>

				<div className="container-fluid background-body">
					<div className="main-header">
						<div className="header-left">
							<div className="header-logo">
								<Link className="d-flex" href="/">
									<img className="light-mode" alt="Sajilo - Sajilo Car Rental Service" src="/assets/imgs/template/logo-d.png" />
									<img className="dark-mode" alt="Sajilo - Sajilo Car Rental Service" src="/assets/imgs/template/logo-w.png" />
								</Link>
							</div>
							<div className="header-nav">
								<nav className="nav-main-menu">
									<ul className="main-menu">
										<li>
											<Link href="/">Home</Link>
										</li>
										<li><Link href="/about-us">About Us</Link></li>
										<li>
											<Link href="/cars-list">Vehicles</Link>
										</li>
										<li>
											<Link href="/dealer-listing">Dealers</Link>
										</li>
										<li>
											<Link href="/services">Services</Link>	
										</li>
										<li><Link href="/contact">Contact</Link></li>
									</ul>
								</nav>
							</div>
							<div className="header-right">
								<div className="d-none d-xxl-inline-block align-middle mr-15">
									{!session?.user ? (
										<Link className="btn btn-signin neutral-1000" href="/login">
											<svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" fill="none">
												<path d="M1 12C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11C12 12 11 12 11 12H1ZM6 6C6.79565 6 7.55871 5.68393 8.12132 5.12132C8.68393 4.55871 9 3.79565 9 3C9 2.20435 8.68393 1.44129 8.12132 0.87868C7.55871 0.316071 6.79565 0 6 0C5.20435 0 4.44129 0.316071 3.87868 0.87868C3.31607 1.44129 3 2.20435 3 3C3 3.79565 3.31607 4.55871 3.87868 5.12132C4.44129 5.68393 5.20435 6 6 6Z" fill="#101010" />
											</svg>
											Sign in
										</Link>
									) : session.user.role === 'ADMIN' ? (
										<Dropdown className="d-inline-block">
											<Dropdown.Toggle variant="light" id="dropdown-basic" className="btn btn-signin neutral-1000">
												<svg className="mb-1" xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 12 12" fill="none">
													<path d="M1 12C1 12 0 12 0 11C0 10 1 7 6 7C11 7 12 10 12 11C12 12 11 12 11 12H1ZM6 6C6.79565 6 7.55871 5.68393 8.12132 5.12132C8.68393 4.55871 9 3.79565 9 3C9 2.20435 8.68393 1.44129 8.12132 0.87868C7.55871 0.316071 6.79565 0 6 0C5.20435 0 4.44129 0.316071 3.87868 0.87868C3.31607 1.44129 3 2.20435 3 3C3 3.79565 3.31607 4.55871 3.87868 5.12132C4.44129 5.68393 5.20435 6 6 6Z" fill="#101010" />
												</svg>
												{session.user.name || 'Account'}
											</Dropdown.Toggle>

											<Dropdown.Menu>
												<Dropdown.Item as={Link} href="/dashboard">Dashboard</Dropdown.Item>
												<Dropdown.Item as={Link} href="/profile">Profile</Dropdown.Item>
												<Dropdown.Divider />
												<Dropdown.Item onClick={() => signOut()} className="text-danger">
													Sign Out
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									) : (
										<Dropdown className="d-inline-block">
											<Dropdown.Toggle variant="light" id="dropdown-user" className="btn btn-signin neutral-1000" style={{padding: 0, border: 'none', background: 'none'}}>
												<img
													src={session.user.image || '/assets/imgs/template/icons/user.svg'}
													alt={session.user.name || session.user.email || 'User'}
													style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #eee' }}
												/>
											</Dropdown.Toggle>
											<Dropdown.Menu align="end">
												<Dropdown.Item as={Link} href="/dashboard">Dashboard</Dropdown.Item>
												<Dropdown.Item as={Link} href="/profile">Profile</Dropdown.Item>
												<Dropdown.Divider />
												<Dropdown.Item onClick={() => signOut()} className="text-danger">
													Sign Out
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									)}
								</div>
								{session?.user && session.user.role !== 'ADMIN' && (
									<div className="burger-icon burger-icon-white" onClick={handleOffcanvas} style={{cursor: 'pointer'}} title="Open Dashboard">
										<img src="/assets/imgs/template/icons/menu.svg" alt="Open Dashboard Sidebar" />
									</div>
								)}
								{!session?.user && (
									<div className="burger-icon burger-icon-white" onClick={handleMobileMenu}>
										<span className="burger-icon-top" />
										<span className="burger-icon-mid"> </span>
										<span className="burger-icon-bottom"> </span>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>

		</>
	)
}
