
import React from 'react';
import type { AnalysisResult } from '../types';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { DownloadIcon } from './icons/DownloadIcon';
import { PrintIcon } from './icons/PrintIcon';

interface ResultsPanelProps {
  result: AnalysisResult;
}

const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
  const { analysisText, timeSeriesData } = result;

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,date,value\n";
    timeSeriesData.forEach(row => {
      csvContent += `${row.date},${row.value}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bloom_analysis_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="report-content" className="bg-gray-800/60 rounded-lg p-5 border border-gray-700 flex flex-col gap-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-3">
        <h2 className="text-xl font-semibold text-white">Analysis Report</h2>
        <div className="flex gap-2">
          <button onClick={handleExportCSV} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors" title="Export Data as CSV">
            <DownloadIcon className="w-5 h-5"/>
          </button>
          <button onClick={handlePrint} className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors" title="Print Report">
            <PrintIcon className="w-5 h-5"/>
          </button>
        </div>
      </div>

      <div className="h-80 w-full bg-gray-900 p-4 rounded-lg border border-gray-700">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeSeriesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="date" stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#A0AEC0" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(26, 32, 44, 0.8)',
                borderColor: '#4A5568',
                color: '#E2E8F0',
                borderRadius: '0.5rem'
              }}
              labelStyle={{ color: '#CBD5E0', fontWeight: 'bold' }}
            />
            <Legend wrapperStyle={{fontSize: "14px"}}/>
            <Line type="monotone" dataKey="value" name="Vegetation Index" stroke="#48BB78" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReportSection title="Overview" content={analysisText.overview} />
          <ReportSection title="Phenology Trends" content={analysisText.phenologyTrends} />
          <ReportSection title="Ecological Impacts" content={analysisText.ecologicalImpacts} />
          <ReportSection title="Predictions & Outlook" content={analysisText.predictions} />
      </div>
    </div>
  );
};


const ReportSection: React.FC<{title: string, content: string}> = ({title, content}) => (
    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-green-400 mb-2">{title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
)

export default ResultsPanel;
