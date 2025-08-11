
export default function ByPrice({ handlePriceRangeChange, filter, }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<input
					type="range"
					min="0"
					max="65000"
					step="1000"
					value={filter.priceRange[0]}
					onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), filter.priceRange[1]])}
				/>
				<input
					type="range"
					min="0"
					max="65000"
					step="1000"
					value={filter.priceRange[1]}
					onChange={(e) => handlePriceRangeChange([filter.priceRange[0], parseInt(e.target.value)])}
				/>
				<div>
					<span>NPR {filter.priceRange[0].toLocaleString()}</span> - <span>NPR {filter.priceRange[1].toLocaleString()}</span>
				</div>
			</div>
		</>
	)
}
