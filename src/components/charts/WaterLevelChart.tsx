'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { WaterLevelData } from '@/types/data';

interface WaterLevelChartProps {
  data: WaterLevelData[];
}

export default function WaterLevelChart({ data }: WaterLevelChartProps) {
  // Group data by area for the chart
  const chartData = data.map(item => ({
    date: item.date,
    [item.area]: item.level,
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold text-black mb-4 text-center">Water Level Trends (meters)</h3>
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
          <Line type="monotone" dataKey="Bella" stroke="#10b981" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}