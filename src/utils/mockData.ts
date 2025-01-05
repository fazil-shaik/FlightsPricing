import type { FlightPrice, SearchParams } from '../types/flight';

const airlines = ['IndiGo', 'Air Asia', 'Vistara', 'Air India', 'SpiceJet'];

export async function mockFlightSearch(params: SearchParams): Promise<FlightPrice[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return airlines.map(airline => ({
    airline,
    price: Math.floor(Math.random() * 3000) + 1500,
    duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 60)}m`,
    departureTime: '09:00 AM',
    arrivalTime: '11:30 AM'
  }));
}