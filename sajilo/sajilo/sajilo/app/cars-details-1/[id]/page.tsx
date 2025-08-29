// Server Component - data fetching only
import Link from 'next/link';
import CarDetailsView from './CarDetailsView';

export default async function Page({ params }: { params: { id: string } }) {
  let car = null;
  let error = '';
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/cars/${params.id}`, { cache: 'no-store' });
    if (res.ok) {
      car = await res.json();
    } else {
      error = 'Car Not Found';
    }
  } catch (e) {
    error = 'Failed to load car details.';
  }

  if (!car) {
    return (
      <div className="container py-96 text-center">
        <h2 className="mb-20">{error || 'Car Not Found'}</h2>
        <Link href="/cars-list" className="btn btn-primary">
          Browse Available Cars
        </Link>
      </div>
    );
  }

  return <CarDetailsView car={car} />;
}