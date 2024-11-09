import React, { useState } from 'react';
import { Heart, Activity, Moon, Droplets, Scale, FootprintsIcon } from 'lucide-react';
import { useHealthStore } from '../store/healthStore';

export default function HealthMetricsInput() {
  const addMetric = useHealthStore((state) => state.addMetric);
  const [metrics, setMetrics] = useState({
    heartRate: '',
    bloodPressureSystolic: '',
    bloodPressureDiastolic: '',
    sleepHours: '',
    sleepQuality: '',
    sugarLevel: '',
    weight: '',
    steps: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMetric({
      heartRate: Number(metrics.heartRate) || undefined,
      bloodPressureSystolic: Number(metrics.bloodPressureSystolic) || undefined,
      bloodPressureDiastolic: Number(metrics.bloodPressureDiastolic) || undefined,
      sleepHours: Number(metrics.sleepHours) || undefined,
      sleepQuality: Number(metrics.sleepQuality) || undefined,
      sugarLevel: Number(metrics.sugarLevel) || undefined,
      weight: Number(metrics.weight) || undefined,
      steps: Number(metrics.steps) || undefined
    });
    setMetrics({
      heartRate: '',
      bloodPressureSystolic: '',
      bloodPressureDiastolic: '',
      sleepHours: '',
      sleepQuality: '',
      sugarLevel: '',
      weight: '',
      steps: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Health Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Heart className="w-6 h-6 text-red-500" />
            <input
              type="number"
              placeholder="Heart Rate (BPM)"
              value={metrics.heartRate}
              onChange={(e) => setMetrics({ ...metrics, heartRate: e.target.value })}
              className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Activity className="w-6 h-6 text-blue-500" />
            <div className="flex-1 flex space-x-2">
              <input
                type="number"
                placeholder="Systolic"
                value={metrics.bloodPressureSystolic}
                onChange={(e) => setMetrics({ ...metrics, bloodPressureSystolic: e.target.value })}
                className="w-1/2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
              />
              <input
                type="number"
                placeholder="Diastolic"
                value={metrics.bloodPressureDiastolic}
                onChange={(e) => setMetrics({ ...metrics, bloodPressureDiastolic: e.target.value })}
                className="w-1/2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Moon className="w-6 h-6 text-indigo-500" />
            <div className="flex-1 flex space-x-2">
              <input
                type="number"
                placeholder="Sleep Hours"
                value={metrics.sleepHours}
                onChange={(e) => setMetrics({ ...metrics, sleepHours: e.target.value })}
                className="w-1/2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
              />
              <input
                type="number"
                placeholder="Sleep Quality (1-10)"
                value={metrics.sleepQuality}
                onChange={(e) => setMetrics({ ...metrics, sleepQuality: e.target.value })}
                className="w-1/2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Droplets className="w-6 h-6 text-red-400" />
            <input
              type="number"
              placeholder="Blood Sugar (mg/dL)"
              value={metrics.sugarLevel}
              onChange={(e) => setMetrics({ ...metrics, sugarLevel: e.target.value })}
              className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Scale className="w-6 h-6 text-green-500" />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={metrics.weight}
              onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
              className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>

          <div className="flex items-center space-x-4">
            <FootprintsIcon className="w-6 h-6 text-yellow-500" />
            <input
              type="number"
              placeholder="Steps"
              value={metrics.steps}
              onChange={(e) => setMetrics({ ...metrics, steps: e.target.value })}
              className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 p-2"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Metrics
      </button>
    </form>
  );
}