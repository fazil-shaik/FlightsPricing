export interface FlightPrice {
  airline: string;
  price: number;
  duration: string;
  departureTime: string;
  arrivalTime: string;
}

export interface SearchParams {
  source: string;
  destination: string;
  date: string;
  passengers: number;
}