'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Pengaturan Sistem</h1>
          <p className="text-gray-600 mt-2">Konfigurasi preferensi sistem dan pengaturan global</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">Pengaturan Umum</h3>
            <p className="text-gray-600 mb-4">Nama situs, logo, dan informasi dasar</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Konfigurasi
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">Pengaturan SEO</h3>
            <p className="text-gray-600 mb-4">Tag meta dan optimasi mesin pencari</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Konfigurasi
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">Kunci API</h3>
            <p className="text-gray-600 mb-4">Kelola integrasi API pihak ketiga</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Kelola Kunci
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Ambang Batas Peringatan</h3>
            <p className="text-gray-600 mb-4">Konfigurasi pengaturan peringatan ketinggian air</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors">
              Atur Ambang Batas
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">Backup & Restore</h3>
            <p className="text-gray-600 mb-4">Backup dan restorasi database</p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors">
              Kelola Backup
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">Log Sistem</h3>
            <p className="text-gray-600 mb-4">Lihat log sistem dan laporan error</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              Lihat Log
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}