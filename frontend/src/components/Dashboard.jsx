import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const fallData = [
  { date: '2023-09-01', count: 3 },
  { date: '2023-09-02', count: 2 },
  { date: '2023-09-03', count: 4 },
  { date: '2023-09-04', count: 1 },
  { date: '2023-09-05', count: 5 },
];

const activeDevices = [
  { id: 1, name: 'Device 1', location: 'Living Room' },
  { id: 2, name: 'Device 2', location: 'Bedroom' },
  { id: 3, name: 'Device 3', location: 'Kitchen' },
];

const fallHistory = [
  { id: 1, date: '2023-09-01', location: 'Living Room', time: '10:00 AM' },
  { id: 2, date: '2023-09-02', location: 'Bedroom', time: '11:30 AM' },
  { id: 3, date: '2023-09-03', location: 'Kitchen', time: '2:15 PM' },
];

const Dashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <h2 className="mt-8 text-xl font-semibold">Fall History</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={fallData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h2 className="mt-8 text-xl font-semibold">Active Devices</h2>
      <div className="mt-4">
        {activeDevices.map((device) => (
          <div key={device.id} className="border p-2 mb-2 rounded">
            <strong>{device.name}</strong> - {device.location}
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-semibold">Fall History List</h2>
      <ul className="mt-4">
        {fallHistory.map((fall) => (
          <li key={fall.id} className="border p-2 mb-2 rounded">
            <strong>Date:</strong> {fall.date} <strong>Location:</strong> {fall.location} <strong>Time:</strong> {fall.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
