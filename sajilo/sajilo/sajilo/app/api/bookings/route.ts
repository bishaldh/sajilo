import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Define the expected shape of the booking data with car details
type BookingWithCar = {
  id: string;
  startDate: Date;
  endDate: Date;
  car: {
    make: string;
    model: string;
    pricePerDay: number;
    imageUrl: string;
  };
};

// Define the shape for the frontend
type FormattedBooking = {
  id: string;
  startDate: Date;
  endDate: Date;
  car: {
    make: string;
    model: string;
    price: number;
    image: string;
  };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let bookings;
    if (userId) {
      // Fetch bookings for a specific user
      bookings = await prisma.booking.findMany({
        where: { userId },
        select: {
          id: true,
          startDate: true,
          endDate: true,
          car: {
            select: {
              make: true,
              model: true,
              pricePerDay: true,
              imageUrl: true
            }
          }
        }
      }) as unknown as BookingWithCar[];

      // Format the data for the frontend
      const formattedBookings: FormattedBooking[] = bookings.map(booking => ({
        id: booking.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        car: {
          make: booking.car.make,
          model: booking.car.model,
          price: booking.car.pricePerDay,
          image: booking.car.imageUrl || '/assets/imgs/cars/default.jpg'
        }
      }));
      return NextResponse.json(formattedBookings);
    } else {
      // Admin: Fetch all bookings with car and user details
      bookings = await prisma.booking.findMany({
        select: {
          id: true,
          startDate: true,
          endDate: true,
          car: {
            select: {
              make: true,
              model: true,
              pricePerDay: true,
              imageUrl: true
            }
          },
          user: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      // Format for admin
      const formattedBookings = bookings.map((booking: any) => ({
        id: booking.id,
        startDate: booking.startDate,
        endDate: booking.endDate,
        car: {
          make: booking.car.make,
          model: booking.car.model,
          price: booking.car.pricePerDay,
          image: booking.car.imageUrl || '/assets/imgs/cars/default.jpg'
        },
        user: {
          id: booking.user.id,
          name: booking.user.name,
          email: booking.user.email
        }
      }));
      return NextResponse.json(formattedBookings);
    }
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}


export async function POST(request: Request) {
  try {
    const { carId, userId, startDate, endDate, totalPrice } = await request.json();
    
    if (!carId || !userId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new booking
    const booking = await prisma.booking.create({
      data: {
        carId,
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        status: 'CONFIRMED'
      },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        car: {
          select: {
            make: true,
            model: true,
            pricePerDay: true,
            imageUrl: true
          }
        }
      }
    }) as unknown as BookingWithCar;
    
    // Format the response
    const formattedBooking: FormattedBooking = {
      id: booking.id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      car: {
        make: booking.car.make,
        model: booking.car.model,
        price: booking.car.pricePerDay,
        image: booking.car.imageUrl || '/assets/imgs/cars/default.jpg'
      }
    };
    
    return NextResponse.json(formattedBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
