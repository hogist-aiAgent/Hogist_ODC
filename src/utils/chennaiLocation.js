

export const CHENNAI_METRO_KEYWORDS = [
  // Chennai district / city
  'chennai',
  'red hills',
  'redhills',
  'ponneri',
  'avadi',
  'ambattur',
  'poonamallee',
  'pallavaram',
  'pammal',
  'chromepet',
  'perungalathur',
  'st thomas mount',
  'tambaram',
  'kaiveli',
  'medavakkam',
  'pallikaranai',
  // OMR / IT corridor
  'siruseri',
  'sholinganallur',
  'navalur',
  'perungudi',
  'thoraipakkam',
  'semmancheri',
  'padur',
  'karapakkam',
  'egattur',
  'omr',
  'kottivakkam',
  'palavakkam',
  'injambakkam',
  // Chengalpattu district
  'chengalpattu',
  'chengalpet',
  'maraimalai nagar',
  'guduvancheri',
  'vandalur',
  'urapakkam',
  'kelambakkam',
  'thiruporur',
  'mahabalipuram',
  'mamallapuram',
  'thirukalukundram',
  'thirukazhukundram',
  'cheyyur',
  'madurantakam',
  // Kanchipuram district
  'kanchipuram',
  'kancheepuram',
  'sriperumbudur',
  'oragadam',
  'walajabad',
  'uthiramerur',
  'kundrathur',
  'tiruvallur',
  'thiruvallur',
];

const CHENNAI_BBOX = '79.45,12.00,80.35,13.35';
const [BBOX_MIN_LON, BBOX_MIN_LAT, BBOX_MAX_LON, BBOX_MAX_LAT] = CHENNAI_BBOX
  .split(',')
  .map(Number);

export const isWithinChennaiBbox = (lat, lon) =>
  typeof lat === 'number' &&
  typeof lon === 'number' &&
  !Number.isNaN(lat) &&
  !Number.isNaN(lon) &&
  lon >= BBOX_MIN_LON &&
  lon <= BBOX_MAX_LON &&
  lat >= BBOX_MIN_LAT &&
  lat <= BBOX_MAX_LAT;

export const isChennaiLocation = (text, coords) => {
  if (coords && isWithinChennaiBbox(coords.lat, coords.lon)) return true;
  if (!text) return false;
  const lower = text.toLowerCase();
  return CHENNAI_METRO_KEYWORDS.some((keyword) => lower.includes(keyword));
};