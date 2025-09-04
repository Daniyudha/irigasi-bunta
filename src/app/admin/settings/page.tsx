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
          <h1 className="text-3xl font-bold text-gray-800">System Settings</h1>
          <p className="text-gray-600 mt-2">Configure system preferences and global settings</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-blue-600">General Settings</h3>
            <p className="text-gray-600 mb-4">Site name, logo, and basic information</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
              Configure
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-green-600">SEO Settings</h3>
            <p className="text-gray-600 mb-4">Meta tags and search engine optimization</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors">
              Configure
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-purple-600">API Keys</h3>
            <p className="text-gray-600 mb-4">Manage third-party API integrations</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
              Manage Keys
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-orange-600">Alert Thresholds</h3>
            <p className="text-gray-600 mb-4">Configure water level alert settings</p>
            <button className="w-full bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors">
              Set Thresholds
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-teal-600">Backup & Restore</h3>
            <p className="text-gray-600 mb-4">Database backup and restoration</p>
            <button className="w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition-colors">
              Manage Backups
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4 text-red-600">System Logs</h3>
            <p className="text-gray-600 mb-4">View system logs and error reports</p>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors">
              View Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}