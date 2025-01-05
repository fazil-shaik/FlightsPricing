import { SearchParams } from '../types/flight';

interface FlightPrice {
  indigo: string;
  airAsia: string;
  vistara: string;
}

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate a consistent price based on route and date
function generatePrice(source: string, destination: string, airline: string): number {
  const basePrice = 1500;
  const sourceHash = source.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const destHash = destination.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const airlineMultiplier = airline === 'indigo' ? 1 : airline === 'airAsia' ? 1.2 : 1.4;
  
  return Math.floor((basePrice + (sourceHash + destHash) % 1000) * airlineMultiplier);
}

export async function searchFlights(params: SearchParams): Promise<FlightPrice> {
  try {
    // Validate inputs
    if (!params.source || !params.destination || !params.date) {
      throw new Error('Missing required search parameters');
    }

    // Simulate API delay
    await delay(800);
    
    // Generate consistent prices based on route
    const prices: FlightPrice = {
      indigo: formatPrice(generatePrice(params.source, params.destination, 'indigo')),
      airAsia: formatPrice(generatePrice(params.source, params.destination, 'airAsia')),
      vistara: formatPrice(generatePrice(params.source, params.destination, 'vistara')),
    };
    
    return prices;
  } catch (error) {
    console.error('Error fetching flight prices:', error);
    throw new Error('Failed to fetch flight prices. Please try again.');
  }
}

function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}