import { create } from 'zustand';
import { HealthMetric, ChatMessage, HealthReport } from '../types/health';

interface HealthStore {
  metrics: HealthMetric[];
  messages: ChatMessage[];
  reports: HealthReport[];
  addMetric: (metric: Omit<HealthMetric, 'id' | 'timestamp'>) => void;
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  addReport: (report: Omit<HealthReport, 'id' | 'timestamp'>) => void;
}

export const useHealthStore = create<HealthStore>((set) => ({
  metrics: [],
  messages: [],
  reports: [],
  
  addMetric: (metric) => set((state) => ({
    metrics: [...state.metrics, {
      ...metric,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }],
  })),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }],
  })),
  
  addReport: (report) => set((state) => ({
    reports: [...state.reports, {
      ...report,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    }],
  })),
}));