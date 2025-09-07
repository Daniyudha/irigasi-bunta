'use client';

import { useState } from 'react';
import WaterLevelChart from '@/components/charts/WaterLevelChart';
import RainfallChart from '@/components/charts/RainfallChart';
import { waterLevelData, rainfallData, cropData, farmerData } from '@/types/data';

export default function DataPage() {
  const [activeTab, setActiveTab] = useState('water');

  const tabs = [
    { id: 'water', label: 'Level Air', icon: '💧' },
    { id: 'rainfall', label: 'Curah Hujan', icon: '🌧️' },
    { id: 'crops', label: 'Data Tanaman', icon: '🌾' },
    { id: 'farmers', label: 'Statistik Petani', icon: '👨‍🌾' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'water':
        return <WaterLevelChart data={waterLevelData} />;
      case 'rainfall':
        return <RainfallChart data={rainfallData} />;
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
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-black border-gray-50">{crop.crop}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{crop.area.toLocaleString()}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{crop.production.toLocaleString()}</td>
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
            <h3 className="text-lg font-semibold text-black mb-4 text-center">Statistik Petani per Kecamatan</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-50 text-black">
                    <th className="px-4 py-2 text-left font-semibold">Kecamatan</th>
                    <th className="px-4 py-2 text-left font-semibold">Petani</th>
                    <th className="px-4 py-2 text-left font-semibold">Area (ha)</th>
                    <th className="px-4 py-2 text-left font-semibold">Rata-rata Hasil (ton/ha)</th>
                  </tr>
                </thead>
                <tbody>
                  {farmerData.map((district, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-2 text-black border-gray-50">{district.district}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{district.farmers.toLocaleString()}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{district.area.toLocaleString()}</td>
                      <td className="px-4 py-2 text-black border-gray-50">{district.averageYield.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      default:
        return <WaterLevelChart data={waterLevelData} />;
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
            {renderTabContent()}
          </div>
        </div>

        {/* Features Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Fitur yang Tersedia</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Bagan time series interaktif untuk level air dan curah hujan</li>
            <li>Pembaruan data real-time (disimulasikan untuk demonstrasi)</li>
            <li>Analisis data historis dan tren</li>
            <li>Statistik produksi tanaman</li>
            <li>Data dan statistik petani</li>
            <li>Laporan produksi pertanian</li>
            <li>Desain responsif untuk mobile dan desktop</li>
          </ul>
        </div>
      </div>
    </div>
  );
}