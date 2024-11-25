// Haversine Formula to Calculate Distance
export const calculateDistance = (
  lat1: any,
  lon1: any,
  lat2: any,
  lon2: any
) => {
  const toRad = (value: any) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
};

// Mock Data
export const mockData = [
  { id: "1", name: "John Doe", lat: 40.7128, lon: -74.006 }, // New York
  { id: "2", name: "Jane Smith", lat: 34.0522, lon: -118.2437 }, // Los Angeles
  { id: "3", name: "Alice Johnson", lat: 51.5074, lon: -0.1278 }, // London
  { id: "4", name: "Akira Yamamoto", lat: 35.6895, lon: 139.6917 }, // Tokyo
  { id: "5", name: "Liu Wei", lat: 39.9042, lon: 116.4074 }, // Beijing
  { id: "6", name: "Aisha Khan", lat: 24.8607, lon: 67.0011 }, // Karachi
  { id: "7", name: "Ravi Sharma", lat: 28.6139, lon: 77.209 }, // New Delhi
  { id: "8", name: "Nurul Huda", lat: 3.139, lon: 101.6869 }, // Kuala Lumpur
  { id: "9", name: "Kim Soo-jin", lat: 37.5665, lon: 126.978 }, // Seoul
  { id: "10", name: "Ahmed Al-Farsi", lat: 25.276987, lon: 55.296249 }, // Dubai
];
