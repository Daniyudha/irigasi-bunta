'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RainfallData } from '@/types/data';

interface RainfallChartProps {
  data: RainfallData[];
}

export default function RainfallChart({ data }: RainfallChartProps) {
  // Group data by date for the chart
  const chartData = data.map(item => ({
    date: item.date,
    [item.area]: item.rainfall,
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-black mb-4 text-center">Rainfall Data (mm)</h3>
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
          <Bar dataKey="Bella" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}