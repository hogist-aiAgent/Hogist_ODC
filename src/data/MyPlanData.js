// Dummy data for the "My Plan" page.
// Structured to mirror what a future GET /api/plans/:id response would look
// like, so swapping this out for a real API call later is a drop-in change.

const myPlanData = {
  user: {
    initials: "RK",
  },

  planMenuCount: 2, // shown in the "My plan · 2 menus" pill in the header

  event: {
    title: "Kumar & Divya — wedding reception",
    date: "Sat, 14 Sep 2026",
    venue: "Rani Meyyammai Hall, Anna Nagar",
    guests: 250,
  },

  steps: [
    { id: 1, label: "Menus chosen", status: "done" },
    { id: 2, label: "Review plan", status: "active" },
    { id: 3, label: "Payment", status: "upcoming" },
    { id: 4, label: "Kitchen confirmation", status: "upcoming" },
  ],

  meals: [
    {
      id: "lunch",
      slotLabel: "Lunch · 12:30 PM",
      dishTitle: "Traditional Tamil Wedding Sappadu",
      caterer: "Sri Amman Catering",
      area: "Ashok Nagar",
      serviceNote: "banana leaf service, crew of 12",
      tags: [
        { label: "18 items", variant: "neutral" },
        { label: "2 items swapped", variant: "amber" },
        { label: "Pure veg", variant: "veg" },
      ],
      plates: 250,
      pricePerPlate: 385,
      total: 96250,
      kitchenAvailableOn: "14 Sep",
      img: null,
    },
    {
      id: "evening-snacks",
      slotLabel: "Evening snacks · 5:00 PM",
      dishTitle: "High Tea Platter — Savoury & Sweet",
      caterer: "Kovai Feast Kitchens",
      area: "Porur",
      serviceNote: "4 counters, crew of 6",
      tags: [
        { label: "9 items", variant: "neutral" },
        { label: "Live chat", variant: "blue" },
        { label: "Pure veg", variant: "veg" },
      ],
      plates: 250,
      pricePerPlate: 135,
      total: 33750,
      kitchenAvailableOn: "14 Sep",
      img: null,
    },
  ],

  addOnPrompt: {
    title: "Add breakfast for the morning ceremony?",
    subtitle:
      "Most 250-guest weddings also book a 7:30 am tiffin service. From ₹95 per plate.",
    ctaLabel: "Browse breakfast menus",
  },

  costSummary: {
    lineItems: [
      { label: "Lunch · Sappadu", amount: 96250 },
      { label: "Snacks · High Tea", amount: 33750 },
      { label: "Transport · 2 kitchens", amount: 4100 },
      { label: "Season offer · SEASON25", amount: -6250 },
      { label: "GST 5%", amount: 6393 },
    ],
    total: 134243,
    perGuest: 537,
    advance: {
      label: "Pay now · 25% advance",
      amount: 33561,
      note: "Balance due 2 days before the event",
    },
    footNotes: [
      "Free cancellation up to 7 days before the event.",
      "Headcount revisable until 12 Sep.",
    ],
  },

  executive: {
    name: "Priya",
    role: "your executive",
    responseTime: "Replies in ~10 min",
    phone: "99626 67733",
  },
};

export default myPlanData;