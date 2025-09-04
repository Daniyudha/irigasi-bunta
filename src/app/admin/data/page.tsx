'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminData() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Data Management</h1>
          <p className="text-gray-600 mt-2">Manage irrigation data, imports, and exports</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Water Level Data</h3>
            <p className="text-gray-600 mb-4">Manage TMA (Tinggi Muka Air) data</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Input Data
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Rainfall Data</h3>
            <p className="text-gray-600 mb-4">Manage rainfall measurements</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Input Data
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">CSV Import</h3>
            <p className="text-gray-600 mb-4">Bulk import data from CSV files</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Import Data
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Data Export</h3>
            <p className="text-gray-600 mb-4">Export data to CSV/Excel formats</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors">
              Export Data
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">Historical Data</h3>
            <p className="text-gray-600 mb-4">View and edit historical records</p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors">
              View History
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Data Validation</h3>
            <p className="text-gray-600 mb-4">Validate and clean imported data</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              Validate Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}