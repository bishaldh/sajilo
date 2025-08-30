import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// CREATE a new user
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await prisma.user.create({ data });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
