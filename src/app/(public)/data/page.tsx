'use client';

import { useState, useEffect } from 'react';
import WaterLevelChart from '@/components/charts/WaterLevelChart';
import RainfallChart from '@/components/charts/RainfallChart';
import { WaterLevelData as ChartWaterLevelData, RainfallData as ChartRainfallData } from '@/types/data';

interface DbWaterLevelData {
  id: string;
  location: string;
  value: number;
  unit: string;
  measuredAt: string;
}

interface DbRainfallData {
  id: string;
  location: string;
  value: number;
  unit: string;
  measuredAt: string;
}

interface DbCropData {
  id: string;
  crop: string;
  area: number;
  production: number;
  season: string;
  location: string | null;
  createdAt: string;
}

interface DbFarmerData {
  id: string;
  name: string;
  group: string;
  chairman: string;
  members: string[];
  createdAt: string;
}

export default function DataPage() {
  const [activeTab, setActiveTab] = useState('water');
  const [chartWaterData, setChartWaterData] = useState<ChartWaterLevelData[]>([]);
  const [chartRainfallData, setChartRainfallData] = useState<ChartRainfallData[]>([]);
  const [cropData, setCropData] = useState<DbCropData[]>([]);
  const [farmerData, setFarmerData] = useState<DbFarmerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');

    try {
      if (activeTab === 'water') {
        const response = await fetch('/api/data/water-level');
        if (response.ok) {
          const data: DbWaterLevelData[] = await response.json();
          console.log('Raw water level data from API:', data);
          // Transform database data to chart format - use actual locations
          const transformedData: ChartWaterLevelData[] = data.map(item => ({
            date: item.measuredAt?.split('T')[0] || new Date().toISOString().split('T')[0],
            level: Number(item.value) || 0,
            area: item.location || 'Lokasi Tidak Diketahui'
          }));
          console.log('Water level transformed data:', transformedData);
          setChartWaterData(transformedData);
        } else {
          setError('Gagal mengambil data level air');
        }
      } else if (activeTab === 'rainfall') {
        const response = await fetch('/api/data/rainfall');
        if (response.ok) {
          const data: DbRainfallData[] = await response.json();
          // Transform database data to chart format - use actual locations
          const transformedData: ChartRainfallData[] = data.map(item => ({
            date: item.measuredAt?.split('T')[0] || new Date().toISOString().split('T')[0],
            rainfall: Number(item.value) || 0,
            area: item.location || 'Lokasi Tidak Diketahui'
          }));
          console.log('Rainfall transformed data:', transformedData);
          setChartRainfallData(transformedData);
        } else {
          setError('Gagal mengambil data curah hujan');
        }
      } else if (activeTab === 'crops') {
        const response = await fetch('/api/data/crops');
        if (response.ok) {
          const data: DbCropData[] = await response.json();
          setCropData(data);
        } else {
          setError('Gagal mengambil data tanaman');
        }
      } else if (activeTab === 'farmers') {
        const response = await fetch('/api/data/farmers');
        if (response.ok) {
          const data: DbFarmerData[] = await response.json();
          setFarmerData(data);
        } else {
          setError('Gagal mengambil data petani');
        }
      }
    } catch (err) {
      setError('Error mengambil data');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'water', label: 'Level Air', icon: '💧' },
    { id: 'rainfall', label: 'Curah Hujan', icon: '🌧️' },
    { id: 'crops', label: 'Data Tanaman', icon: '🌾' },
    { id: 'farmers', label: 'Data Kelompok Petani', icon: '👨‍🌾' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'water':
        return <WaterLevelChart data={chartWaterData} />;
      case 'rainfall':
        return <RainfallChart data={chartRainfallData} />;
      case 'crops':
        return (
          <div className="w-full">
            <h3 className="text-lg font-semibold text-black mb-4 text-center">Data Produksi Tanaman (Musim Hujan 2025)</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-black">
                    <th className="px-4 py-2 text-left font-semibold">Tanaman</th>
                    <th className="px-4 py-2 text-left font-semibold">Area (ha)</th>
                    <th className="px-4 py-2 text-left font-semibold">Produksi (ton)</th>
                    <th className="px-4 py-2 text-left font-semibold">Hasil (ton/ha)</th>
                  </tr>
                </thead>
                <tbody>
                  {cropData.map((crop, index) => (
                    <tr key={crop.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-black border-gray-50">{crop.crop}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{crop.area?.toLocaleString('id-ID') || '0'}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{crop.production?.toLocaleString('id-ID') || '0'}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{(crop.production / crop.area).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'farmers':
        return (
          <div className="w-full">
            <h3 className="text-lg font-semibold text-black mb-4 text-center">Data Kelompok Tani</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-black">
                    <th className="px-4 py-2 text-left font-semibold">Nama Kelompok</th>
                    <th className="px-4 py-2 text-left font-semibold">Ketua</th>
                    <th className="px-4 py-2 text-left font-semibold">Jumlah Anggota</th>
                    <th className="px-4 py-2 text-left font-semibold">Tanggal Dibentuk</th>
                  </tr>
                </thead>
                <tbody>
                  {farmerData.map((farmer, index) => (
                    <tr key={farmer.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-black border-gray-50">{farmer.group || '-'}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{farmer.chairman || '-'}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{farmer.members ? farmer.members.length : 0}</td>
                      <td className="px-4 py-2 text-black border-gray-50">
                        {farmer.createdAt ? new Date(farmer.createdAt).toLocaleDateString('id-ID') : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <WaterLevelChart data={chartWaterData} />;
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Data & Statistik</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Akses data irigasi komprehensif, level air, statistik curah hujan, dan metrik produksi pertanian.
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">💧</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Level Air</h3>
            <p className="text-gray-600 text-sm">Data level air real-time dan historis</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🌧️</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Curah Hujan</h3>
            <p className="text-gray-600 text-sm">Statistik curah hujan harian dan musiman</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">🌾</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Area Tanam</h3>
            <p className="text-gray-600 text-sm">Data penanaman tanaman dan cakupan area</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Produksi</h3>
            <p className="text-gray-600 text-sm">Statistik produksi pertanian</p>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Visualisasi Data</h2>
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b border-gray-200 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-80 pb-8">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              renderTabContent()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}