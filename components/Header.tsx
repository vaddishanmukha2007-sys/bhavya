
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <LeafIcon className="w-8 h-8 text-green-400 mr-3" />
        <h1 className="text-xl font-bold text-white tracking-wider">
          BloomFinder
        </h1>
        <span className="ml-4 text-sm text-gray-400 hidden sm:inline">Global Vegetation Phenology Explorer</span>
      </div>
    </header>
  );
};

export default Header;
