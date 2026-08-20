// Shared helper to decide whether a picked location falls inside the
// Chennai / Chengalpattu / Kanchipuram service metro. Mirrors the keyword
// list LocationSearchBox already uses internally to filter its
// suggestions, so this stays consistent with what the user is actually
// allowed to pick in the search box.

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

// Checks a free-text address/label (any case) against the metro keyword list.
export const isChennaiLocation = (text) => {
  if (!text) return false;
  const lower = text.toLowerCase();
  return CHENNAI_METRO_KEYWORDS.some((keyword) => lower.includes(keyword));
};
