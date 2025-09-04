'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminContent() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Content Management</h1>
          <p className="text-gray-600 mt-2">Manage news articles, pages, and website content</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">News Articles</h3>
            <p className="text-gray-600 mb-4">Create and manage news content</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Manage News
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Static Pages</h3>
            <p className="text-gray-600 mb-4">Edit About Us and other pages</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Manage Pages
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Gallery</h3>
            <p className="text-gray-600 mb-4">Upload and manage images</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Manage Gallery
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Sliders/Banners</h3>
            <p className="text-gray-600 mb-4">Manage homepage sliders</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors">
              Manage Sliders
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">Categories</h3>
            <p className="text-gray-600 mb-4">Manage content categories</p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors">
              Manage Categories
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Media Library</h3>
            <p className="text-gray-600 mb-4">All uploaded media files</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              View Media
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}