import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only allow users with ADMIN or SUPER_ADMIN roles to access sliders
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || '' },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user || !user.role || (user.role.name !== 'ADMIN' && user.role.name !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = params;

    const slider = await prisma.slider.findUnique({
      where: { id },
    });

    if (!slider) {
      return NextResponse.json({ message: 'Slider not found' }, { status: 404 });
    }

    return NextResponse.json(slider);
  } catch (error) {
    console.error('Error fetching slider:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only allow users with ADMIN or SUPER_ADMIN roles to update sliders
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || '' },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user || !user.role || (user.role.name !== 'ADMIN' && user.role.name !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = params;
    const contentType = request.headers.get('content-type') || '';
    
    if (contentType.includes('multipart/form-data')) {
      // Handle file upload for update
      const formData = await request.formData();
      const title = formData.get('title') as string;
      const subtitle = formData.get('subtitle') as string;
      const link = formData.get('link') as string;
      const buttonText = formData.get('buttonText') as string;
      const order = parseInt(formData.get('order') as string) || 0;
      const active = formData.get('active') === 'true';
      const file = formData.get('image') as File;

      // Validate required fields
      if (!title) {
        return NextResponse.json(
          { message: 'Title is required' },
          { status: 400 }
        );
      }

      let imageUrl: string | undefined;

      // If a new file is provided, upload it
      if (file && file.size > 0) {
        const mediaFormData = new FormData();
        mediaFormData.append('file', file);

        const mediaResponse = await fetch(`${request.nextUrl.origin}/api/admin/media`, {
          method: 'POST',
          body: mediaFormData,
          headers: {
            'cookie': request.headers.get('cookie') || '',
          },
        });

        if (!mediaResponse.ok) {
          const error = await mediaResponse.json();
          return NextResponse.json(
            { message: error.message || 'Failed to upload image' },
            { status: mediaResponse.status }
          );
        }

        const media = await mediaResponse.json();
        imageUrl = media.url;
      }

      // Update slider with new data
      const updateData: any = {
        title,
        subtitle: subtitle || null,
        link: link || null,
        buttonText: buttonText || 'Pelajari Lebih Lanjut',
        order,
        active,
      };

      if (imageUrl) {
        updateData.image = imageUrl;
      }

      const slider = await prisma.slider.update({
        where: { id },
        data: updateData,
      });

      return NextResponse.json(slider);
    } else {
      // Handle JSON request for backward compatibility
      const body = await request.json();
      const { title, subtitle, image, link, buttonText, order, active } = body;

      // Validate required fields
      if (!title || !image) {
        return NextResponse.json(
          { message: 'Title and image are required' },
          { status: 400 }
        );
      }

      const slider = await prisma.slider.update({
        where: { id },
        data: {
          title,
          subtitle: subtitle || null,
          image,
          link: link || null,
          buttonText: buttonText || 'Pelajari Lebih Lanjut',
          order: order || 0,
          active: active !== undefined ? active : true,
        },
      });

      return NextResponse.json(slider);
    }

  } catch (error) {
    console.error('Error updating slider:', error);
    if (error instanceof Error && error.message.includes('Record to update not found')) {
      return NextResponse.json({ message: 'Slider not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Only allow users with ADMIN or SUPER_ADMIN roles to delete sliders
    const user = await prisma.user.findUnique({
      where: { email: session.user?.email || '' },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user || !user.role || (user.role.name !== 'ADMIN' && user.role.name !== 'SUPER_ADMIN')) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const { id } = params;

    await prisma.slider.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Slider deleted successfully' });
  } catch (error) {
    console.error('Error deleting slider:', error);
    if (error instanceof Error && error.message.includes('Record to delete does not exist')) {
      return NextResponse.json({ message: 'Slider not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}