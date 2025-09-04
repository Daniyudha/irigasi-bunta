export interface IrrigationArea {
  id: string;
  name: string;
  description: string;
  coordinates: [number, number]; // [latitude, longitude]
  area: number; // in hectares
  waterLevel: number; // in meters
  status: 'normal' | 'low' | 'high' | 'critical';
  lastUpdate: string;
  canals: number;
  gates: number;
}

export const irrigationAreas: IrrigationArea[] = [
  {
    id: 'bunta',
    name: 'Bunta Irrigation Area',
    description: 'Serves agricultural lands with efficient water distribution systems in Bunta District.',
    coordinates: [-1.3891, 121.6139], // Approximate coordinates for Bunta, Central Sulawesi
    area: 650,
    waterLevel: 2.5,
    status: 'normal',
    lastUpdate: '2025-09-04T10:30:00Z',
    canals: 12,
    gates: 8
  },
  {
    id: 'bella',
    name: 'Bella Irrigation Area',
    description: 'Supports farmers with modern water management infrastructure in Bella District.',
    coordinates: [-1.4567, 121.6789], // Approximate coordinates for Bella, Central Sulawesi
    area: 580,
    waterLevel: 1.8,
    status: 'low',
    lastUpdate: '2025-09-04T09:45:00Z',
    canals: 10,
    gates: 6
  }
];