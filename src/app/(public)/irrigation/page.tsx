'use client';

import { useState, useEffect } from 'react';
import IrrigationMap from '@/components/maps/IrrigationMap';
import { irrigationAreas, IrrigationArea } from '@/types/irrigation';

interface WaterLevelData {
  id: string;
  location: string;
  value: number;
  unit: string;
  measuredAt: string;
}

export default function IrrigationPage() {
  const [selectedArea, setSelectedArea] = useState<IrrigationArea | null>(null);
  const [areasWithDynamicData, setAreasWithDynamicData] = useState<IrrigationArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWaterLevelData();
  }, []);

  const fetchWaterLevelData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/data/water-level');
      if (!response.ok) {
        throw new Error('Gagal mengambil data level air');
      }
      
      const waterLevelData: WaterLevelData[] = await response.json();
      
      // Update irrigation areas with dynamic water level data
      const updatedAreas = irrigationAreas.map(area => {
        // Find the latest water level data for this area (match by area id or name)
        const areaWaterData = waterLevelData
          .filter(data =>
            data.location.toLowerCase().includes(area.id.toLowerCase()) ||
            data.location.toLowerCase().includes(area.name.toLowerCase().split(' ')[0])
          )
          .sort((a, b) => new Date(b.measuredAt).getTime() - new Date(a.measuredAt).getTime())[0];
        
        if (areaWaterData) {
          return {
            ...area,
            waterLevel: areaWaterData.value,
            lastUpdate: areaWaterData.measuredAt
          };
        }
        
        return area; // Keep static data if no dynamic data found
      });
      
      setAreasWithDynamicData(updatedAreas);
    } catch (err) {
      setError('Error mengambil data level air: ' + (err instanceof Error ? err.message : 'Unknown error'));
      // Fallback to static data if fetch fails
      setAreasWithDynamicData(irrigationAreas);
    } finally {
      setLoading(false);
    }
  };

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
      case 'low': return 'Air Rendah';
      case 'high': return 'Air Tinggi';
      case 'critical': return 'Kritis';
      default: return 'Tidak Diketahui';
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Profil Irigasi</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Jelajahi jaringan irigasi wilayah Bunta dengan informasi detail dan peta interaktif.
          </p>
        </div>

        {/* Interactive Map Section */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-blue-800">Peta Interaktif</h2>
            <p className="text-gray-600 mb-6">
              Klik pada penanda untuk melihat informasi detail tentang setiap area irigasi.
            </p>
            <IrrigationMap areas={areasWithDynamicData.length > 0 ? areasWithDynamicData : irrigationAreas} onAreaSelect={handleAreaSelect} />
          </div>
        </div>

        {/* Area Details Section */}
        {/* {selectedArea && (
          <div className="mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 text-blue-800">
                Detail {selectedArea.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-black text-lg mb-3">Informasi Dasar</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium text-black">Deskripsi:</span> {selectedArea.description}</p>
                    <p><span className="font-medium text-black">Luas Total:</span> {selectedArea.area.toLocaleString()} hektar</p>
                    <p><span className="font-medium text-black">Jumlah Saluran:</span> {selectedArea.canals}</p>
                    <p><span className="font-medium text-black">Jumlah Pintu Air:</span> {selectedArea.gates}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-black text-lg mb-3">Status Saat Ini</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium text-black">Level Air:</span>{' '}
                      <span className="font-semibold text-gray-500">{selectedArea.waterLevel}m</span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Status:</span>{' '}
                      <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedArea.status)}`}>
                        {getStatusText(selectedArea.status)}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-black">Terakhir Diperbarui:</span>{' '}
                      <span className="font-semibold text-gray-500">{new Date(selectedArea.lastUpdate).toLocaleString()}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}

        {/* All Areas Overview */}
        <div className="grid grid-cols-1 gap-8 mb-12">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600">Memuat data...</span>
            </div>
          ) : error ? (
            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
              <p className="font-semibold">Peringatan</p>
              <p>{error}</p>
              <p className="text-sm mt-1">Menampilkan data statis sebagai cadangan.</p>
            </div>
          ) : (
            areasWithDynamicData.map((area) => (
              <div key={area.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">{area.name}</h2>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-black">Level Air:</span>
                    <span className="font-semibold text-gray-500">{area.waterLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-black">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(area.status)}`}>
                      {getStatusText(area.status)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-black">Luas:</span>
                    <span className="font-semibold text-gray-500">{area.area.toLocaleString()} ha</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-black">Saluran:</span>
                    <span className="font-semibold text-gray-500">{area.canals} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-black">Pintu Air:</span>
                    <span className="font-semibold text-gray-500">{area.gates}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleAreaSelect(area)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Lihat Detail di Peta
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}