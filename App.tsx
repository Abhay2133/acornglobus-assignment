import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-gray-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <Dashboard />
    </div>
  );
}