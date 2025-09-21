'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RainfallData } from '@/types/data';

interface RainfallChartProps {
  data: RainfallData[];
}

export default function RainfallChart({ data }: RainfallChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Tidak ada data curah hujan yang tersedia</p>
          <p className="text-gray-400 text-sm">Silakan tambahkan data curah hujan terlebih dahulu</p>
        </div>
      </div>
    );
  }

  // Group data by date for the chart
  const chartData = data.map(item => ({
    date: item.date,
    [item.area]: item.rainfall,
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-black mb-4 text-center">Data Curah Hujan (mm)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Bunta" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}