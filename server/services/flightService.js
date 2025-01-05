const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function generatePrice(source, destination, airline) {
  const basePrice = 1500;
  const sourceHash = source.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const destHash = destination.toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const airlineMultiplier = airline === 'indigo' ? 1 : airline === 'airAsia' ? 1.2 : 1.4;
  
  return Math.floor((basePrice + (sourceHash + destHash) % 1000) * airlineMultiplier);
}

export async function generateFlightPrices(source, destination, date) {
  await delay(500); // Simulate API delay

  return {
    indigo: `₹${generatePrice(source, destination, 'indigo').toLocaleString('en-IN')}`,
    airAsia: `₹${generatePrice(source, destination, 'airAsia').toLocaleString('en-IN')}`,
    vistara: `₹${generatePrice(source, destination, 'vistara').toLocaleString('en-IN')}`
  };
}