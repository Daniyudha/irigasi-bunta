'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type DataType = 'water-level' | 'rainfall';

export default function DataInputClient() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [dataType, setDataType] = useState<DataType>('water-level');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    location: '',
    value: '',
    unit: '',
    measuredAt: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const apiUrl = dataType === 'water-level' 
        ? '/api/admin/data/water-level' 
        : '/api/admin/data/rainfall';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location: formData.location,
          value: parseFloat(formData.value),
          unit: formData.unit || (dataType === 'water-level' ? 'cm' : 'mm'),
          measuredAt: formData.measuredAt,
        }),
      });

      if (response.ok) {
        setSuccess(`${dataType === 'water-level' ? 'Water level' : 'Rainfall'} data submitted successfully!`);
        setFormData({
          location: '',
          value: '',
          unit: '',
          measuredAt: new Date().toISOString().slice(0, 16),
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to submit data');
      }
    } catch (err) {
      setError('Error submitting data');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Data Input</h1>
          <p className="text-gray-600 mt-2">Input irrigation metrics data</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Type
            </label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value as DataType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="water-level">Water Level (TMA)</option>
              <option value="rainfall">Rainfall</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter location name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Value
              </label>
              <input
                type="number"
                name="value"
                required
                step="0.01"
                value={formData.value}
                onChange={handleInputChange}
                placeholder={dataType === 'water-level' ? 'Enter water level in cm' : 'Enter rainfall in mm'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                placeholder={dataType === 'water-level' ? 'cm (default)' : 'mm (default)'}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave blank to use default unit ({dataType === 'water-level' ? 'cm' : 'mm'})
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Measurement Date & Time
              </label>
              <input
                type="datetime-local"
                name="measuredAt"
                required
                value={formData.measuredAt}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Data'}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Quick Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Water level (TMA) is typically measured in centimeters (cm)</li>
            <li>• Rainfall is typically measured in millimeters (mm)</li>
            <li>• Use specific location names for better data organization</li>
            <li>• Ensure measurement datetime is accurate for historical records</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
