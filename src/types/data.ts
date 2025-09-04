export interface WaterLevelData {
  date: string;
  level: number;
  area: string;
}

export interface RainfallData {
  date: string;
  rainfall: number;
  area: string;
}

export interface CropData {
  crop: string;
  area: number;
  production: number;
  season: string;
}

export interface FarmerData {
  district: string;
  farmers: number;
  area: number;
  averageYield: number;
}

export const waterLevelData: WaterLevelData[] = [
  { date: '2025-09-01', level: 2.8, area: 'Bunta' },
  { date: '2025-09-02', level: 2.6, area: 'Bunta' },
  { date: '2025-09-03', level: 2.5, area: 'Bunta' },
  { date: '2025-09-04', level: 2.5, area: 'Bunta' },
  { date: '2025-09-01', level: 2.0, area: 'Bella' },
  { date: '2025-09-02', level: 1.9, area: 'Bella' },
  { date: '2025-09-03', level: 1.8, area: 'Bella' },
  { date: '2025-09-04', level: 1.8, area: 'Bella' },
];

export const rainfallData: RainfallData[] = [
  { date: '2025-09-01', rainfall: 12.5, area: 'Bunta' },
  { date: '2025-09-02', rainfall: 8.3, area: 'Bunta' },
  { date: '2025-09-03', rainfall: 5.1, area: 'Bunta' },
  { date: '2025-09-04', rainfall: 2.0, area: 'Bunta' },
  { date: '2025-09-01', rainfall: 10.2, area: 'Bella' },
  { date: '2025-09-02', rainfall: 7.8, area: 'Bella' },
  { date: '2025-09-03', rainfall: 4.5, area: 'Bella' },
  { date: '2025-09-04', rainfall: 1.5, area: 'Bella' },
];

export const cropData: CropData[] = [
  { crop: 'Rice', area: 450, production: 2250, season: 'Wet Season 2025' },
  { crop: 'Corn', area: 200, production: 800, season: 'Wet Season 2025' },
  { crop: 'Soybean', area: 150, production: 300, season: 'Wet Season 2025' },
  { crop: 'Vegetables', area: 100, production: 250, season: 'Wet Season 2025' },
];

export const farmerData: FarmerData[] = [
  { district: 'Bunta', farmers: 150, area: 650, averageYield: 5.2 },
  { district: 'Bella', farmers: 100, area: 580, averageYield: 4.8 },
];