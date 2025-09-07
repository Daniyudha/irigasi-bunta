import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only allow ADMIN or SUPER_ADMIN to access rainfall data
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || '' },
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const rainfallData = await prisma.rainfallData.findMany({
      orderBy: { measuredAt: 'desc' },
    });

    return NextResponse.json(rainfallData);
  } catch (error) {
    console.error('Error fetching rainfall data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only allow ADMIN or SUPER_ADMIN to create rainfall data
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || '' },
    });

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { location, value, unit, measuredAt } = body;

    // Validate required fields
    if (!location || value === undefined || !measuredAt) {
      return NextResponse.json(
        { message: 'Location, value, and measuredAt are required' },
        { status: 400 }
      );
    }

    const rainfallData = await prisma.rainfallData.create({
      data: {
        location,
        value: parseFloat(value),
        unit: unit || 'mm',
        measuredAt: new Date(measuredAt),
        recordedBy: user.id,
      },
    });

    return NextResponse.json(rainfallData, { status: 201 });
  } catch (error) {
    console.error('Error creating rainfall data:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}