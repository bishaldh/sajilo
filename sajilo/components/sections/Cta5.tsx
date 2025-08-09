'use client'
import { ChangeEvent, useState } from 'react'
export default function Cta5() {
	const [price, setPrice] = useState(1000000);
	const [interest, setInterest] = useState(5);
	const [terms, setTerms] = useState(12);
	const [downPayment, setDownPayment] = useState(500000);

	const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.replace(/,/g, '');
		setPrice(parseFloat(val) || 0);
	};

	const handleInterestChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setInterest(parseFloat(val) || 0);
	};

	const handleTermsChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTerms(parseInt(val) || 0);
	};

	const handleDownPaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value.replace(/,/g, '');
		setDownPayment(parseFloat(val) || 0);
	};

	const loanAmount = Math.max(0, price - downPayment);
	const monthlyRate = interest / 100 / 12;
	const numPayments = terms;
	let monthlyPayment = 0;
	if (numPayments > 0 && loanAmount > 0) {
		if (monthlyRate > 0) {
			const power = Math.pow(1 + monthlyRate, numPayments);
			monthlyPayment = loanAmount * (monthlyRate * power) / (power - 1);
		} else {
			monthlyPayment = loanAmount / numPayments;
		}
	}

	return (
		<>

			<section className="box-cta-5 background-body">
				<div className="bg-shape" />
				<div className="container position-relative z-1 pt-100 pb-100">
					<div className="row ">
						<div className="col-lg-6 order-last order-lg-first">
							<div className="mb-30 background-card p-md-5 p-4 rounded-3 mt-lg-0 mt-30">
								<h5 className="neutral-1000 mb-2">Car Loan Calculator</h5>
								<p className="text-sm-medium neutral-500 mb-25">Estimate your monthly auto loan payments with this calculator.</p>
								<div className="form-contact">
									<div className="row">
										<div className="col-lg-6">
											<div className="form-group">
												<label className="text-sm-medium neutral-1000">Price of vehicle</label>
												<input className="form-control" type="text" placeholder="Rs 10,00,000" value={price.toLocaleString('en-IN')} onChange={handlePriceChange} />
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="text-sm-medium neutral-1000">Interest rate</label>
												<input className="form-control" type="text" placeholder="5%" value={interest} onChange={handleInterestChange} />
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="text-sm-medium neutral-1000">Terms</label>
												<input className="form-control" type="text" placeholder="12 months" value={terms} onChange={handleTermsChange} />
											</div>
										</div>
										<div className="col-lg-6">
											<div className="form-group">
												<label className="text-sm-medium neutral-1000">Down payment</label>
												<input className="form-control" type="text" placeholder="Rs 5,00,000" value={downPayment.toLocaleString('en-IN')} onChange={handleDownPaymentChange} />
											</div>
										</div>
										<div className="row py-4">
											<div className="col-md-5 col-8 d-flex flex-column gap-1">
												<p className="text-sm-bold neutral-1000">Down payment ammout</p>
												<p className="text-sm-bold neutral-1000">Amount financed</p>
												<p className="text-sm-bold neutral-1000">Monthly payment</p>
											</div>
											<div className="col-md-7 col-4 d-flex flex-column gap-1 align-items-end align-items-md-start">
												<p className="text-sm-bold neutral-1000">Rs {downPayment.toLocaleString('en-IN')}</p>
												<p className="text-sm-bold neutral-1000">Rs {loanAmount.toLocaleString('en-IN')}</p>
												<p className="text-sm-bold text-primary-dark">Rs {monthlyPayment.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
											</div>
										</div>
										<div className="col-lg-12">
											<button className="btn btn-book">
												Apply for a loan
												<svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6 order-first order-lg-last wow fadeInUp pt-lg-60">
							<div className="ps-lg-5">
								<h3 className="text-white mb-3">
									Want to Calculate <br className="d-none d-md-block" />
									Your Car Payment?
								</h3>
								<p className="text-lg-medium text-white">
									Match with up to 4 lenders to get the lowest rate <br className="d-none d-md-block" />
									available with no markups, no fees, and no obligations.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}