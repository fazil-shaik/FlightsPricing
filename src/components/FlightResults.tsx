import React from 'react';
import { Plane } from 'lucide-react';

interface FlightResultsProps {
  prices: {
    indigo?: string;
    airAsia?: string;
    vistara?: string;
  };
}

export function FlightResults({ prices }: FlightResultsProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-blue-900">Available Flights</h2>
      <div className="grid gap-4">
        {Object.entries(prices).map(([airline, price]) => (
          <div
            key={airline}
            className="p-4 bg-white/90 backdrop-blur-lg rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <Plane className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900">
                    {airline.charAt(0).toUpperCase() + airline.slice(1)}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">{price}</p>
                <p className="text-sm text-blue-500">per person</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}