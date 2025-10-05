
import React from 'react';
import type { AnalysisParams } from '../types';
import { VEGETATION_INDICES, USER_ROLES } from '../constants';

interface ControlPanelProps {
  params: AnalysisParams;
  onParamsChange: <K extends keyof AnalysisParams,>(key: K, value: AnalysisParams[K]) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ params, onParamsChange, onAnalyze, isLoading }) => {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onParamsChange('dateRange', {
      ...params.dateRange,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-800/60 rounded-lg p-5 border border-gray-700 h-full flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-white border-b border-gray-600 pb-3">Analysis Controls</h2>
      
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-300">1. Selected Location</label>
        <div className="w-full bg-gray-900 rounded p-3 text-sm border border-gray-600">
          {params.location ? `Lat: ${params.location.lat.toFixed(4)}, Lng: ${params.location.lng.toFixed(4)}` : 'Click on the map to select'}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-300">2. Date Range</label>
        <div className="flex gap-2">
          <input
            type="date"
            name="start"
            value={params.dateRange.start}
            onChange={handleDateChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
          <input
            type="date"
            name="end"
            value={params.dateRange.end}
            onChange={handleDateChange}
            className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="vegetationIndex" className="text-sm font-medium text-gray-300">3. Vegetation Index</label>
        <select
          id="vegetationIndex"
          value={params.vegetationIndex}
          onChange={(e) => onParamsChange('vegetationIndex', e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
        >
          {VEGETATION_INDICES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="userRole" className="text-sm font-medium text-gray-300">4. Analysis Perspective</label>
        <select
          id="userRole"
          value={params.userRole}
          onChange={(e) => onParamsChange('userRole', e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
        >
          {USER_ROLES.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      
      <button
        onClick={onAnalyze}
        disabled={isLoading || !params.location}
        className="w-full mt-auto bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
      >
        {isLoading ? 'Analyzing...' : 'Generate Analysis'}
      </button>
    </div>
  );
};

export default ControlPanel;
