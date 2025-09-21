'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';

const EditDataClient = dynamic(() => import('./EditDataClient'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  ),
});

interface PageProps {
  params: {
    type: string;
    id: string;
  };
}

export default async function EditDataPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const { type, id } = params;

  // Validate the type
  if (type !== 'water-level' && type !== 'rainfall') {
    redirect('/admin/data/management');
  }

  return <EditDataClient type={type} id={id} />;
}