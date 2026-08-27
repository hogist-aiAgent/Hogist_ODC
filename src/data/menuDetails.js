import allRestaurants from "./restaurants";


const MENU_DETAILS_BY_ID = {
  // Aswathy Caterers — Madhavaram
  1: {
    category: "Wedding - Veg",
    dishTitle: "Traditional Tamil Wedding Sappadu",
    badges: ["PURE VEG", "FSSAI CERTIFIED", "MOST BOOKED"],
    description:
      "An 18-item banana leaf meal served in traditional order, cooked the morning of the event and transported in insulated vessels.",
    eventContext: { occasion: "Wedding reception", guests: 250, date: "Sat, 14 Sep", slot: "Lunch" },
    reviewsCount: 94,
    pricing: {
      minPlates: 100,
      defaultPlates: 250,
      plateStep: 10,
      transportFee: 2400,
      seasonOffer: { code: "SEASON25", amount: 6250 },
    },
    sections: [
      {
        id: "service-style",
        title: "Service style",
        type: "single",
        location: "sidebar",
        helperText: "Choose how the meal is served",
        items: [
          { id: "banana-leaf", name: "Banana leaf service", subtitle: "Crew of 12 included", pricePerPlate: 20 },
          { id: "buffet", name: "Buffet counters", subtitle: "6 counters, crew of 9", pricePerPlate: 5 },
        ],
      },
      {
        id: "starters",
        title: "Starters & accompaniments",
        type: "multiple",
        location: "body",
        items: [
          { id: "s1", name: "Medhu vadai", subtitle: "2 pieces per guest", pricePerPlate: 22 },
          { id: "s2", name: "Masala bonda", subtitle: "Crispy potato filling", pricePerPlate: 25 },
          { id: "s3", name: "Sundal", subtitle: "Kondakadalai", pricePerPlate: 12 },
          { id: "s4", name: "Vazhakkai podimas", subtitle: "Raw banana", pricePerPlate: 15 },
          { id: "s5", name: "Kosumalli", subtitle: "Moong dal salad", pricePerPlate: 10 },
        ],
      },
      {
        id: "main",
        title: "Main course",
        type: "multiple",
        location: "body",
        items: [
          { id: "m1", name: "Sambar & rasam", subtitle: "Unlimited refills", pricePerPlate: 35 },
          { id: "m2", name: "Vathakuzhambu", subtitle: "Tangy tamarind gravy", pricePerPlate: 28 },
          { id: "m3", name: "Mor kuzhambu", subtitle: "Buttermilk-based gravy", pricePerPlate: 26 },
          { id: "m4", name: "Kootu & poriyal", subtitle: "2 varieties", pricePerPlate: 30 },
          { id: "m5", name: "Avial", subtitle: "Coconut base", pricePerPlate: 32 },
          { id: "m6", name: "Paruppu urundai kuzhambu", subtitle: "Lentil dumpling gravy", pricePerPlate: 34 },
          { id: "m7", name: "Cabbage poriyal", subtitle: "Stir-fried, lightly spiced", pricePerPlate: 18 },
          { id: "m8", name: "Applam & vadam", subtitle: "Served fried", pricePerPlate: 8 },
          { id: "m9", name: "Curd", subtitle: "Fresh, thick set", pricePerPlate: 10 },
        ],
      },
      {
        id: "sweets",
        title: "Sweets",
        type: "multiple",
        location: "body",
        items: [
          { id: "sw1", name: "Semiya payasam", subtitle: "Served warm", pricePerPlate: 20 },
          { id: "sw2", name: "Mysore pak", subtitle: "1 piece per guest", pricePerPlate: 24 },
          { id: "sw3", name: "Boondi laddu", subtitle: "1 piece per guest", pricePerPlate: 18 },
        ],
      },
    ],
  },

  // CES Catering Service — Choolaimedu
  2: {
    category: "Corporate - Veg & Non-Veg",
    dishTitle: "Corporate Lunch Box Combo",
    badges: ["VEG & NON-VEG", "FSSAI CERTIFIED"],
    description:
      "Individually packed lunch boxes for office events, delivered hot in insulated carriers with disposable cutlery.",
    eventContext: { occasion: "Corporate lunch", guests: 80, date: "Fri, 6 Sep", slot: "Lunch" },
    reviewsCount: 41,
    pricing: {
      minPlates: 30,
      defaultPlates: 80,
      plateStep: 5,
      transportFee: 900,
      seasonOffer: { code: "OFFICE10", amount: 800 },
    },
    sections: [
      {
        id: "packaging",
        title: "Packaging style",
        type: "single",
        location: "sidebar",
        helperText: "Choose how meals are packed",
        items: [
          { id: "eco-box", name: "Eco-friendly box", subtitle: "Biodegradable, single compartment", pricePerPlate: 8 },
          { id: "compartment-tray", name: "3-compartment tray", subtitle: "Rigid tray, reusable lid", pricePerPlate: 14 },
        ],
      },
      {
        id: "mains",
        title: "Main course",
        type: "multiple",
        location: "body",
        items: [
          { id: "cm1", name: "Veg biryani", subtitle: "With raita & fryums", pricePerPlate: 90 },
          { id: "cm2", name: "Chicken chettinad", subtitle: "Spicy, boneless", pricePerPlate: 130 },
          { id: "cm3", name: "Paneer butter masala", subtitle: "Creamy tomato gravy", pricePerPlate: 85 },
          { id: "cm4", name: "Jeera rice", subtitle: "Steamed, lightly tempered", pricePerPlate: 40 },
          { id: "cm5", name: "Chapati (2 pcs)", subtitle: "Soft, whole wheat", pricePerPlate: 20 },
        ],
      },
      {
        id: "add-ons",
        title: "Add-ons",
        type: "multiple",
        location: "body",
        items: [
          { id: "ao1", name: "Gulab jamun (2 pcs)", subtitle: "Sweet, served warm", pricePerPlate: 25 },
          { id: "ao2", name: "Buttermilk", subtitle: "200ml, chilled", pricePerPlate: 15 },
          { id: "ao3", name: "Bottled water", subtitle: "500ml", pricePerPlate: 12 },
        ],
      },
    ],
  },

  // Saravana Bhavan Catering — T Nagar
  5: {
    category: "Wedding - Veg",
    dishTitle: "South Indian Grand Feast",
    badges: ["PURE VEG", "FSSAI CERTIFIED", "TOP RATED"],
    description:
      "A premium multi-course vegetarian spread with live counters, curated for large wedding gatherings.",
    eventContext: { occasion: "Wedding reception", guests: 400, date: "Sun, 22 Sep", slot: "Dinner" },
    reviewsCount: 162,
    pricing: {
      minPlates: 150,
      defaultPlates: 400,
      plateStep: 25,
      transportFee: 3600,
      seasonOffer: { code: "GRAND25", amount: 9000 },
    },
    sections: [
      {
        id: "service-style",
        title: "Service style",
        type: "single",
        location: "sidebar",
        helperText: "Choose how the meal is served",
        items: [
          { id: "banana-leaf", name: "Banana leaf service", subtitle: "Crew of 20 included", pricePerPlate: 30 },
          { id: "live-buffet", name: "Live buffet counters", subtitle: "10 counters, crew of 16", pricePerPlate: 45 },
        ],
      },
      {
        id: "live-counters",
        title: "Live counters",
        type: "multiple",
        location: "body",
        items: [
          { id: "lc1", name: "Dosa counter", subtitle: "Made to order", pricePerPlate: 40 },
          { id: "lc2", name: "Chaat counter", subtitle: "3 varieties", pricePerPlate: 35 },
          { id: "lc3", name: "Ice cream counter", subtitle: "4 flavours", pricePerPlate: 30 },
        ],
      },
      {
        id: "main",
        title: "Main course",
        type: "multiple",
        location: "body",
        items: [
          { id: "gm1", name: "Sambar & rasam", subtitle: "Unlimited refills", pricePerPlate: 38 },
          { id: "gm2", name: "Paneer kurma", subtitle: "Rich cashew gravy", pricePerPlate: 45 },
          { id: "gm3", name: "Vegetable kootu", subtitle: "Mixed vegetables", pricePerPlate: 32 },
          { id: "gm4", name: "Curd rice", subtitle: "Tempered, cooling", pricePerPlate: 20 },
        ],
      },
      {
        id: "sweets",
        title: "Sweets",
        type: "multiple",
        location: "body",
        items: [
          { id: "gsw1", name: "Badusha", subtitle: "1 piece per guest", pricePerPlate: 22 },
          { id: "gsw2", name: "Rava kesari", subtitle: "Served warm", pricePerPlate: 18 },
        ],
      },
    ],
  },
};

// Restaurants that don't have a curated menu yet fall back to this minimal,
// clearly-labelled placeholder so the page never breaks — swap it out by
// adding a real entry for that id in MENU_DETAILS_BY_ID above.
function buildPlaceholderMenu(restaurant) {
  return {
    category: "Menu",
    dishTitle: `${restaurant.name} — Menu`,
    badges: restaurant.tags || [],
    description: "Full menu details for this caterer are being added. Contact them directly to customise a plate.",
    eventContext: { occasion: "Event", guests: 100, date: "TBD", slot: "TBD" },
    reviewsCount: 0,
    pricing: {
      minPlates: 50,
      defaultPlates: 100,
      plateStep: 10,
      transportFee: 0,
      seasonOffer: { code: "", amount: 0 },
    },
    sections: [
      {
        id: "items",
        title: "Menu items",
        type: "multiple",
        location: "body",
        items: [],
      },
    ],
  };
}

export function getMenuDetailById(restaurantId) {
  const id = Number(restaurantId);
  const restaurant = allRestaurants.find((r) => r.id === id) || allRestaurants[0];
  const menu = MENU_DETAILS_BY_ID[restaurant.id] || buildPlaceholderMenu(restaurant);

  return {
    ...menu,
    restaurantId: restaurant.id,
    caterer: restaurant.name,
    area: restaurant.area,
    rating: restaurant.rating,
    fssai: restaurant.fssai,
    img: restaurant.img,
  };
}

export default getMenuDetailById;
