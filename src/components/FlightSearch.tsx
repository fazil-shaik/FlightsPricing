import React, { useState } from 'react';
import { Plane, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import type { SearchParams } from '../types/flight';
import { searchFlights } from '../services/flightApi';
import { FlightResults } from './FlightResults';

export function FlightSearch() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    source: '',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
  });
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResults(null);
    
    try {
      const prices = await searchFlights(searchParams);
      setResults(prices);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl p-6 space-y-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Plane className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
          <input
            type="text"
            placeholder="From (e.g., Delhi)"
            value={searchParams.source}
            onChange={(e) => setSearchParams({ ...searchParams, source: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <Plane className="absolute left-3 top-3 h-5 w-5 text-blue-400 transform rotate-90" />
          <input
            type="text"
            placeholder="To (e.g., Jaipur)"
            value={searchParams.destination}
            onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <input
            type="date"
            value={searchParams.date}
            onChange={(e) => setSearchParams({ ...searchParams, date: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <div className="relative">
          <Users className="absolute left-3 top-3 h-5 w-5 text-blue-400" />
          <input
            type="number"
            min="1"
            max="9"
            value={searchParams.passengers}
            onChange={(e) => setSearchParams({ ...searchParams, passengers: parseInt(e.target.value) })}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="col-span-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Searching...' : 'Search Flights'}
        </button>
      </form>

      {results && <FlightResults prices={results} />}
    </div>
  );
}