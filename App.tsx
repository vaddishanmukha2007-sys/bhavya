
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import MapPanel from './components/MapPanel';
import ResultsPanel from './components/ResultsPanel';
import Loader from './components/Loader';
import { analyzeBloomData } from './services/geminiService';
import type { AnalysisParams, AnalysisResult, Location } from './types';
import { VEGETATION_INDICES, USER_ROLES } from './constants';

const App: React.FC = () => {
  const [analysisParams, setAnalysisParams] = useState<AnalysisParams>({
    location: null,
    dateRange: {
      start: '2023-03-01',
      end: '2023-08-31',
    },
    vegetationIndex: VEGETATION_INDICES[0].value,
    userRole: USER_ROLES[0].value,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleLocationSelect = useCallback((location: Location) => {
    setAnalysisParams((prev) => ({ ...prev, location }));
  }, []);

  const handleParamsChange = useCallback(<K extends keyof AnalysisParams,>(key: K, value: AnalysisParams[K]) => {
    setAnalysisParams((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleAnalyzeClick = async () => {
    if (!analysisParams.location) {
      setError('Please select a location on the map first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeBloomData(analysisParams);
      setAnalysisResult(result);
    } catch (err) {
      console.error('Analysis failed:', err);
      setError('Failed to generate analysis. The AI model might be busy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row p-4 gap-4">
        <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0">
          <ControlPanel
            params={analysisParams}
            onParamsChange={handleParamsChange}
            onAnalyze={handleAnalyzeClick}
            isLoading={isLoading}
          />
        </aside>
        <main className="flex-1 min-w-0 flex flex-col gap-4">
          <MapPanel selectedLocation={analysisParams.location} onLocationSelect={handleLocationSelect} />
          {isLoading && <Loader />}
          {error && <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">{error}</div>}
          {analysisResult && !isLoading && <ResultsPanel result={analysisResult} />}
        </main>
      </div>
    </div>
  );
};

export default App;
