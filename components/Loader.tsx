
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800/60 rounded-lg border border-gray-700 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      <p className="mt-4 text-lg font-semibold text-white">Generating AI Analysis...</p>
      <p className="text-sm text-gray-400">This may take a moment. The model is analyzing trends and generating insights.</p>
    </div>
  );
};

export default Loader;
