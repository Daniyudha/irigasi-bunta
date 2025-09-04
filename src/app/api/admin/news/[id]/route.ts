import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const news = await prisma.news.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!news) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, slug, content, excerpt, image, categoryId, published } = body;

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    // Check if slug is being changed and if it already exists
    if (slug && slug !== existingNews.slug) {
      const slugExists = await prisma.news.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { message: 'News with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const updatedNews = await prisma.news.update({
      where: { id },
      data: {
        title: title ?? existingNews.title,
        slug: slug ?? existingNews.slug,
        content: content ?? existingNews.content,
        excerpt: excerpt ?? existingNews.excerpt,
        image: image ?? existingNews.image,
        categoryId: categoryId ?? existingNews.categoryId,
        published: published ?? existingNews.published,
        publishedAt: published ? new Date() : existingNews.publishedAt,
      },
    });

    return NextResponse.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Check if news exists
    const existingNews = await prisma.news.findUnique({
      where: { id },
    });

    if (!existingNews) {
      return NextResponse.json({ message: 'News not found' }, { status: 404 });
    }

    await prisma.news.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}