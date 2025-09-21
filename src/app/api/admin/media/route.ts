import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    // Middleware already handles authentication and authorization
    // We can proceed directly to fetching media data

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const skip = (page - 1) * limit;

    const whereClause = search ? {
      OR: [
        { filename: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
        { altText: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } },
      ],
    } : {};

    const [media, totalCount] = await Promise.all([
      prisma.media.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.media.count({ where: whereClause }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Use server session for authentication (consistent with other API routes)
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user details for caption
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if request is multipart/form-data for file upload
    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload
      const formData = await request.formData();
      const file = formData.get('file') as File;
      
      if (!file) {
        return NextResponse.json(
          { error: 'No file provided' },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = file.name;
      const fileExtension = originalName.split('.').pop();
      const filename = `news-${timestamp}.${fileExtension}`;
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      const filePath = path.join(uploadDir, filename);
      const url = `/uploads/${filename}`;

      // Create directory if it doesn't exist
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      // Write file to disk
      await fs.writeFile(filePath, buffer);

      // Create media record in database
      const media = await prisma.media.create({
        data: {
          filename,
          originalName,
          mimeType: file.type,
          size: file.size,
          path: url, // Store the URL path instead of file system path
          url,
          altText: originalName,
          caption: `Uploaded by ${user?.name || user?.email || 'Unknown user'}`,
        },
      });

      return NextResponse.json(media, { status: 201 });
    } else {
      // Handle JSON request for existing flow
      const body = await request.json();
      const { filename, originalName, mimeType, size, path, url, altText, caption } = body;

      if (!filename || !originalName || !mimeType || !size || !path || !url) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const media = await prisma.media.create({
        data: {
          filename,
          originalName,
          mimeType,
          size,
          path,
          url,
          altText,
          caption,
        },
      });

      return NextResponse.json(media, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating media:', error);
    // Log detailed error information
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}