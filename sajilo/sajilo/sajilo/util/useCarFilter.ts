'use client'
import { ChangeEvent, useState } from "react"

interface Car {
	id: number;
	price?: number;
	pricePerDay?: number;
	carType?: string;
	amenities?: string;
	rating?: number;
	name?: string;
	make?: string;
	model?: string;
	fuelType?: string;
	location?: string;
	image?: string;
}

export interface Filter {
	names: string[]
	fuelType: string[]
	amenities: string[]
	locations: string[]
	priceRange: [number, number]
	ratings: number[]
	carType: string[]
}

type SortCriteria = "name" | "price" | "rating"

const useCarFilter = (carsData: Car[]) => {
	const [filter, setFilter] = useState<Filter>({
		names: [],
		fuelType: [],
		amenities: [],
		locations: [],
		priceRange: [0, 500],
		ratings: [],
		carType: [],
	})
	const [sortCriteria, setSortCriteria] = useState<SortCriteria>("name")
	const [itemsPerPage, setItemsPerPage] = useState<number>(10)
	const [currentPage, setCurrentPage] = useState<number>(1)

	const uniqueNames = [...new Set(carsData.map((car) => car.name || ((car.make && car.model) ? `${car.make} ${car.model}` : '')))]
	const uniqueFuelTypes = [...new Set(carsData.map((car) => car.fuelType))]
	const uniqueAmenities = [...new Set(carsData.map((car) => car.amenities))]
	const uniqueLocations = [...new Set(carsData.map((car) => car.location))]
	const uniqueRatings = [...new Set(carsData.map((car) => car.rating))]
	const uniqueCarTypes = [...new Set(carsData.map((car) => car.carType))]

	const filteredCars = carsData.filter((car) => {
		const displayName = car.name || ((car.make && car.model) ? `${car.make} ${car.model}` : '');
		const displayPrice = car.price ?? car.pricePerDay ?? 0;
		return (
			(filter.names.length === 0 || (displayName && filter.names.includes(displayName))) &&
			(filter.fuelType.length === 0 || (car.fuelType && filter.fuelType.includes(car.fuelType))) &&
			(filter.amenities.length === 0 || (car.amenities && filter.amenities.includes(car.amenities))) &&
			(filter.locations.length === 0 || (car.location && filter.locations.includes(car.location))) &&
			(displayPrice >= filter.priceRange[0] && displayPrice <= filter.priceRange[1]) &&
			(filter.ratings.length === 0 || (typeof car.rating === 'number' && filter.ratings.includes(car.rating))) &&
			(filter.carType.length === 0 || (car.carType && filter.carType.includes(car.carType)))
		)
	})

	const sortedCars = [...filteredCars].sort((a, b) => {
		if (sortCriteria === "name") {
			const nameA = a.name || ((a.make && a.model) ? `${a.make} ${a.model}` : '');
			const nameB = b.name || ((b.make && b.model) ? `${b.make} ${b.model}` : '');
			return nameA.localeCompare(nameB);
		}
		if (sortCriteria === "price") {
			const priceA = a.price ?? a.pricePerDay ?? 0;
			const priceB = b.price ?? b.pricePerDay ?? 0;
			return priceA - priceB;
		}
		if (sortCriteria === "rating") {
			return (b.rating ?? 0) - (a.rating ?? 0);
		}
		return 0;
	});

	const totalPages = Math.ceil(sortedCars.length / itemsPerPage)
	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage
	const paginatedCars = sortedCars.slice(startIndex, endIndex)

	const handleCheckboxChange = (field: keyof Filter, value: string | number) => (e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked
		setFilter((prevFilter) => {
			const values = prevFilter[field] as (string | number)[]
			if (checked) {
				return { ...prevFilter, [field]: [...values, value] }
			} else {
				return {
					...prevFilter,
					[field]: values.filter((item) => item !== value),
				}
			}
		})
	}

	const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setSortCriteria(e.target.value as SortCriteria)
	}

	const handlePriceRangeChange = (values: [number, number]) => {
		setFilter((prevFilter) => ({
			...prevFilter,
			priceRange: values,
		}))
	}

	const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(Number(e.target.value))
		setCurrentPage(1)
	}

	const handlePageChange = (newPage: number) => {
		setCurrentPage(newPage)
	}

	const handlePreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1)
		}
	}

	const handleNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1)
		}
	}

	const handleClearFilters = () => {
		setFilter({
			names: [],
			fuelType: [],
			amenities: [],
			locations: [],
			priceRange: [0, 65000],
			ratings: [],
			carType: [],
		})
		setSortCriteria("name")
		setItemsPerPage(4)
		setCurrentPage(1)
	}

	const startItemIndex = (currentPage - 1) * itemsPerPage + 1
	const endItemIndex = Math.min(startItemIndex + itemsPerPage - 1, sortedCars.length)

	return {
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
	}
}

export default useCarFilter
