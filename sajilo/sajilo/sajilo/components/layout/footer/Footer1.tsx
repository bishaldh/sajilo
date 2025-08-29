import Link from 'next/link'

export default function Footer1() {
	return (
		<>
			<footer className="footer">
				<div className="container">
					<div className="footer-top">
						<div className="row align-items-center">
							<div className="col-lg-5 col-md-6 text-center text-md-start">
								<h5 className="color-white wow fadeInDown">Connect with Us</h5>
							</div>
							<div className="col-lg-7 col-md-6 text-center text-md-end mt-md-0 mt-4">
								<div className="d-flex align-items-center justify-content-center justify-content-md-end">
									<form className="form-newsletter wow fadeInUp" action="#">
										<input className="form-control" type="text" placeholder="Enter your email" />
										<input className="btn btn-brand-2" type="submit" defaultValue="Subscribe" />
									</form>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-md-3 col-sm-12 footer-1">
							<div className="mt-20 mb-20">
								<Link className="d-flex" href="/">
									<img className="light-mode" alt="Sajilo" src="/assets/imgs/template/logo-w.png" />
									<img className="dark-mode" alt="Sajilo" src="/assets/imgs/template/logo-w.png" />
								</Link>
								<div className="box-info-contact mt-0">
									<p className="text-md neutral-400 icon-address">Near Nami College, New Baneshwor, Kathmandu, Nepal</p>
									<p className="text-md neutral-400 icon-worktime">Hours: 8:00 - 17:00, Sun - Fri</p>
									<p className="text-md neutral-400 icon-email">support@sajilo.com</p>
								</div>
								<div className="box-need-help">
									<p className="need-help text-md-medium mb-5">Need help? Call us</p>
									<br /><Link className="heading-6 phone-support" href="/tel:+977 9819729780">+977 9819729780</Link>
								</div>
							</div>
						</div>
						<div className="col-md-2 col-xs-6 footer-3">
							<h6 className="text-linear-3">Company</h6>
							<ul className="menu-footer">
								<li><Link href="#">About Us</Link></li>
								<li><Link href="#">Our Awards</Link></li>
								<li><Link href="#">Agencies</Link></li>
							
							</ul>
						</div>
						<div className="col-md-2 col-xs-6 footer-2">
							<h6 className="text-linear-3">Our Services</h6>
							<ul className="menu-footer">
								<li><Link href="#">Car Rental Services</Link></li>
								<li><Link href="#">Vehicle Leasing Options</Link></li>
								
							</ul>
						</div>
						<div className="col-md-2 col-xs-6 footer-4">
							<h6 className="text-linear-3">Our Partners</h6>
							<ul className="menu-footer">
								<li><Link href="#">Affiliates</Link></li>
								<li><Link href="#">Travel Agents</Link></li>
	
							</ul>
						</div>
						<div className="col-md-3 col-xs-6 footer-5">
							<h6 className="text-linear-3">Support</h6>
							<ul className="menu-footer">
								<li><Link href="#">Forum support</Link></li>
								<li><Link href="#">Help Center</Link></li>
							
							</ul>
						</div>
					</div>
					<div className="footer-bottom mt-50">
						<div className="row align-items-center justify-content-center">
							<div className="col-md-6 text-md-start text-center mb-20">
								<p className="text-sm color-white">© {new Date().getFullYear()} Sajilo. All rights reserved.</p>
							</div>
							<div className="col-md-6 text-md-end text-center mb-20">
								<div className="d-flex align-items-center justify-content-center justify-content-md-end">
									
									
								</div>
							</div>
						</div>
					</div>
				</div>
			</footer>

		</>
	)
}
