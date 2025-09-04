'use client';

import { useState } from 'react';
import IrrigationMap from '@/components/maps/IrrigationMap';
import { irrigationAreas, IrrigationArea } from '@/types/irrigation';

export default function IrrigationPage() {
  const [selectedArea, setSelectedArea] = useState<IrrigationArea | null>(null);

  const handleAreaSelect = (area: IrrigationArea) => {
    setSelectedArea(area);
  };

  const getStatusColor = (status: IrrigationArea['status']) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: IrrigationArea['status']) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'low': return 'Low Water';
      case 'high': return 'High Water';
      case 'critical': return 'Critical';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Irrigation Profiles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the irrigation networks of Bunta regions with detailed information and interactive maps.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Interactive Map</h2>
            <p className="text-gray-600 mb-6">
              Click on the markers to view detailed information about each irrigation area.
            </p>
            <IrrigationMap areas={irrigationAreas} onAreaSelect={handleAreaSelect} />
          </div>
        </div>

        {/* Area Details Section */}
        {selectedArea && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                {selectedArea.name} Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium text-black">Description:</span> {selectedArea.description}</p>
                    <p><span className="font-medium text-black">Total Area:</span> {selectedArea.area.toLocaleString()} hectares</p>
                    <p><span className="font-medium text-black">Number of Canals:</span> {selectedArea.canals}</p>
                    <p><span className="font-medium text-black">Number of Gates:</span> {selectedArea.gates}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Current Status</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-black">Water Level:</span>{' '}
                      <span className="font-semibold text-gray-500">{selectedArea.waterLevel}m</span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Status:</span>{' '}
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedArea.status)}`}>
                        {getStatusText(selectedArea.status)}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Last Updated:</span>{' '}
                      <span className="font-semibold text-gray-500">{new Date(selectedArea.lastUpdate).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Areas Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {irrigationAreas.map((area) => (
            <div key={area.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">{area.name}</h2>
              <p className="text-gray-600 mb-4">{area.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium text-black">Water Level:</span>
                  <span className="font-semibold text-gray-500">{area.waterLevel}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-black">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(area.status)}`}>
                    {getStatusText(area.status)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-black">Area:</span>
                  <span className="font-semibold text-gray-500">{area.area.toLocaleString()} ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-black">Canals:</span>
                  <span className="font-semibold text-gray-500">{area.canals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-black">Gates:</span>
                  <span className="font-semibold text-gray-500">{area.gates}</span>
                </div>
              </div>
              <button
                onClick={() => handleAreaSelect(area)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Details on Map
              </button>
            </div>
          ))}
        </div>

        {/* Features Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Available Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Interactive maps with Leaflet integration</li>
            <li>Real-time water level monitoring (simulated data)</li>
            <li>Area-specific information and status</li>
            <li>Infrastructure details (canals, gates)</li>
            <li>Service area information</li>
            <li>Responsive design for mobile and desktop</li>
          </ul>
        </div>
      </div>
    </div>
  );
}