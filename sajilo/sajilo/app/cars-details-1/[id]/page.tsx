// Server Component - data fetching only
import carsData from '@/util/cars.json';
import Link from 'next/link';
import CarDetailsView from './CarDetailsView';

interface CarData {
  id: number;
  price: number;
  duration: string;
  carType: string;
  amenities: string;
  rating: string;
  fuelType: string;
  location: string;
  image: string;
  name: string;
  year?: number;
  transmission?: string;
  seats?: number;
}

export default function Page({ params }: { params: { id: string } }) {
  const car = carsData.find((car: CarData) => car.id.toString() === params.id);

  if (!car) {
    return (
      <div className="container py-96 text-center">
        <h2 className="mb-20">Car Not Found</h2>
        <Link href="/cars-listing-1" className="btn btn-primary">
          Browse Available Cars
        </Link>
      </div>
    );
  }

  // Safely extract make and model from name
  const nameParts = car.name.split(' ');
  const make = nameParts[0] || 'Unknown';
  const model = nameParts.slice(1).join(' ') || 'Unknown';

  // Map JSON fields with proper fallbacks
  const formattedCar = {
    id: car.id.toString(),
    make,
    model,
    year: car.year ?? 2023, // Nullish coalescing for better fallback
    type: car.carType,
    transmission: car.transmission ?? 'Automatic',
    seats: car.seats ?? 5,
    pricePerDay: car.price,
    location: car.location,
    imageUrl: `/assets/imgs/cars-listing/cars-listing-6/${car.image}`,
    videoId: 'sample-video-id',
    rating: car.rating,
    features: {
      mileage: '56,500 km',
      fuelType: car.fuelType,
      doors: 4,
      engine: '2.5L'
    }
  };

  return <CarDetailsView car={formattedCar} />;
}