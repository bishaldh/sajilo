declare module '@/util/cars.json' {
  interface Car {
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

  const value: Car[];
  export default value;
}
