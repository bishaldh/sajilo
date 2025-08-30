import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET, PUT, DELETE booking by ID
export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const booking = await prisma.booking.findUnique({ where: { id: params.id } });
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch booking' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const booking = await prisma.booking.update({ where: { id: params.id }, data });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.booking.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
