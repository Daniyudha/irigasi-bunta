import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: { id: string };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;

    const news = await prisma.news.findUnique({
      where: { 
        id,
        published: true 
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json(
        { message: 'News article not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news article:', error);
    return NextResponse.json(
      { message: 'Error fetching news article' },
      { status: 500 }
    );
  }
}