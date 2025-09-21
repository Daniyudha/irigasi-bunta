'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WaterLevelData } from '@/types/data';

interface WaterLevelChartProps {
  data: WaterLevelData[];
}

export default function WaterLevelChart({ data }: WaterLevelChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="w-full h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Tidak ada data level air yang tersedia</p>
          <p className="text-gray-400 text-sm">Silakan tambahkan data level air terlebih dahulu</p>
        </div>
      </div>
    );
  }

  // Group data by area for the chart
  const chartData = data.map(item => ({
    date: item.date,
    [item.area]: item.level,
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-black mb-4 text-center">Tren Ketinggian Air (meter)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
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
          <Line type="monotone" dataKey="Bunta" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}