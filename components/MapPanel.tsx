
import React from 'react';
import type { Location } from '../types';

interface MapPanelProps {
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

const MapPanel: React.FC<MapPanelProps> = ({ selectedLocation, onLocationSelect }) => {
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const lat = 90 - (y / rect.height) * 180;
    const lng = (x / rect.width) * 360 - 180;

    onLocationSelect({ lat, lng });
  };

  return (
    <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700 flex-shrink-0">
      <h2 className="text-lg font-semibold text-white mb-3">Global Map</h2>
      <div 
        className="relative w-full aspect-[2/1] bg-gray-700 rounded-md cursor-pointer overflow-hidden"
        onClick={handleMapClick}
        style={{ 
          backgroundImage: `url(https://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg)`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/30"></div>
        {selectedLocation && (
          <div 
            className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full bg-red-500 border-2 border-white ring-2 ring-red-500/50"
            style={{ 
              left: `${((selectedLocation.lng + 180) / 360) * 100}%`,
              top: `${((90 - selectedLocation.lat) / 180) * 100}%`,
            }}
          />
        )}
      </div>
       <p className="text-xs text-gray-400 mt-2 text-center">This is a representative map. Click anywhere to select coordinates for analysis.</p>
    </div>
  );
};

export default MapPanel;
