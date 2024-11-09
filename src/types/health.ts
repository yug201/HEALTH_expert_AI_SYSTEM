export interface HealthMetric {
  id: string;
  timestamp: Date;
  heartRate?: number;
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  sleepHours?: number;
  sleepQuality?: number;
  sugarLevel?: number;
  weight?: number;
  steps?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface HealthReport {
  id: string;
  type: 'blood' | 'xray' | 'other';
  imageUrl: string;
  analysis?: string;
  timestamp: Date;
}