import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        car: true,
        user: true,
      },
    });
    return NextResponse.json(bookings);
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
    
    // Validate required fields
    if (!carId || !userId || !startDate || !endDate || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if car exists and is available
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json(
        { error: 'Car not found' },
        { status: 404 }
      );
    }

    // Check for overlapping bookings
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        carId,
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
        status: { in: ['PENDING', 'CONFIRMED'] },
      },
    });

    if (overlappingBooking) {
      return NextResponse.json(
        { error: 'Car is not available for the selected dates' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        carId,
        userId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalPrice,
        status: 'PENDING',
      },
      include: {
        car: true,
        user: true,
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
