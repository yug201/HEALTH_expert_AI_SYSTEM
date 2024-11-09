import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { useHealthStore } from '../store/healthStore';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function HealthChart() {
  const metrics = useHealthStore((state) => state.metrics);

  const dates = metrics.map((metric) => format(metric.timestamp, 'MMM d'));
  
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Heart Rate',
        data: metrics.map((metric) => metric.heartRate),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
      {
        label: 'Blood Pressure (Systolic)',
        data: metrics.map((metric) => metric.bloodPressureSystolic),
        borderColor: 'rgb(54, 162, 235)',
        tension: 0.1,
      },
      {
        label: 'Sleep Hours',
        data: metrics.map((metric) => metric.sleepHours),
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Health Metrics Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <Line data={chartData} options={options} />
    </div>
  );
}