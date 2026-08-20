// Restaurant/caterer details, kept separate from the UI so ChooseRestaurant.jsx
// only has to render + filter this list, not own the data.
//
// `area` is the human-readable locality shown on the card.
// `matchKeywords` are lowercase terms checked against the user's selected
// location text (from LocationSearchBox) to decide if this listing is
// "nearby" — add aliases/neighbouring localities here to widen a match.

import img1 from '../assets/menu/chosseRestaurent/img1.jpg';
import img2 from '../assets/menu/chosseRestaurent/img2.jpg';

const restaurants = [
  {
    id: 1,
    name: 'Aswathy Caterers',
    area: 'Madhavaram',
    matchKeywords: ['madhavaram'],
    fssai: '22419246000629',
    tags: ['South Indian', 'North Indian'],
    rating: '4.3',
    ribbon: 'TOP RATED',
    img: img1,
  },
  {
    id: 2,
    name: 'CES Catering Service',
    area: 'Choolaimedu',
    matchKeywords: ['choolaimedu', 'chozhiimedu'],
    fssai: '13422000001516',
    tags: ['South Indian', 'North Indian'],
    rating: '4.1',
    ribbon: 'POPULAR',
    img: img2,
  },
  {
    id: 3,
    name: 'Meenakshi Catering',
    area: 'KK Nagar',
    matchKeywords: ['kk nagar', 'k.k. nagar', 'kk. nagar'],
    fssai: '22424545000557',
    tags: ['South Indian'],
    rating: '4.5',
    ribbon: 'TOP RATED',
    img: img1,
  },
  {
    id: 4,
    name: 'Sri Balaji Catering Service',
    area: 'Valasaravakkam',
    matchKeywords: ['valasaravakkam'],
    fssai: '22419530000140',
    tags: ['South Indian'],
    rating: '4.0',
    ribbon: 'NEW',
    img: img2,
  },
  {
    id: 5,
    name: 'Saravana Bhavan Catering',
    area: 'T Nagar',
    matchKeywords: ['t nagar', 'thyagaraya nagar', 'theagaraya nagar'],
    fssai: '22411145000821',
    tags: ['South Indian', 'North Indian'],
    rating: '4.6',
    ribbon: 'TOP RATED',
    img: img1,
  },
  {
    id: 6,
    name: 'Green Leaf Caterers',
    area: 'Adyar',
    matchKeywords: ['adyar'],
    fssai: '22417745000934',
    tags: ['South Indian'],
    rating: '4.2',
    ribbon: 'POPULAR',
    img: img2,
  },
  {
    id: 7,
    name: 'Spice Route Catering',
    area: 'Velachery',
    matchKeywords: ['velachery'],
    fssai: '22413345001127',
    tags: ['North Indian', 'Chinese'],
    rating: '4.0',
    ribbon: 'NEW',
    img: img1,
  },
  {
    id: 8,
    name: 'Annapoorna Catering Services',
    area: 'Anna Nagar',
    matchKeywords: ['anna nagar'],
    fssai: '22412245001338',
    tags: ['South Indian', 'North Indian'],
    rating: '4.4',
    ribbon: 'TOP RATED',
    img: img2,
  },
  {
    id: 9,
    name: 'Tambaram Thali Caterers',
    area: 'Tambaram',
    matchKeywords: ['tambaram'],
    fssai: '22419945001449',
    tags: ['South Indian'],
    rating: '3.9',
    ribbon: 'NEW',
    img: img1,
  },
  {
    id: 10,
    name: 'OMR Feast Catering',
    area: 'Sholinganallur',
    matchKeywords: ['sholinganallur', 'omr', 'perungudi', 'thoraipakkam'],
    fssai: '22418845001552',
    tags: ['North Indian', 'Chinese'],
    rating: '4.1',
    ribbon: 'POPULAR',
    img: img2,
  },
  {
    id: 11,
    name: 'Porur Grand Caterers',
    area: 'Porur',
    matchKeywords: ['porur'],
    fssai: '22416645001663',
    tags: ['South Indian', 'North Indian'],
    rating: '4.3',
    ribbon: 'TOP RATED',
    img: img1,
  },
  {
    id: 12,
    name: 'Mylapore Mess Catering',
    area: 'Mylapore',
    matchKeywords: ['mylapore'],
    fssai: '22414445001774',
    tags: ['South Indian'],
    rating: '4.5',
    ribbon: 'TOP RATED',
    img: img2,
  },
];

export default restaurants;

// Returns the subset of `restaurants` whose matchKeywords appear inside the
// given location text (e.g. the label/full address the user picked in
// LocationSearchBox). Case-insensitive substring match.
export const filterNearbyRestaurants = (locationText) => {
  if (!locationText) return [];
  const lower = locationText.toLowerCase();
  return restaurants.filter((r) =>
    r.matchKeywords.some((keyword) => lower.includes(keyword))
  );
};
