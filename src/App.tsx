import React from 'react';
import HealthMetricsInput from './components/HealthMetricsInput';
import HealthChart from './components/HealthChart';
import AIChat from './components/AIChat';
import { Activity } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <HealthMetricsInput />
            <HealthChart />
          </div>
          <div>
            <AIChat />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;