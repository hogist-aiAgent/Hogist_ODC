// Dummy data for the "My Events" account page.
// Structured to mirror what a future GET /api/account/overview response
// would look like, so swapping this out for a real API call later is a
// drop-in change — every value the page renders comes from here.

const myEventsData = {
  profile: {
    initials: "RK",
    name: "R. Kumar",
    phone: "+91 98840 21174",
    email: "kumar.r@gmail.com",
    memberSince: "Jan 2025",
  },

  stats: [
    { id: "upcoming", label: "Upcoming events", value: "2" },
    { id: "plates", label: "Plates booked", value: "430" },
    { id: "lifetime", label: "Lifetime spend", value: "₹3.9L" },
    {
      id: "balance",
      label: "Balance due 12 Sep",
      value: "₹1,00,682",
      accent: true,
    },
  ],

  sidebarNav: [
    { id: "my-events", label: "My events", active: true },
    { id: "past-events", label: "Past events" },
    { id: "saved-menus", label: "Saved menus", count: 6 },
    { id: "addresses", label: "Addresses", count: 3 },
    { id: "invoices", label: "Invoices & GST" },
    { id: "payment-methods", label: "Payment methods" },
    { id: "notifications", label: "Notifications" },
  ],

  executive: {
    name: "Priya",
    role: "Your executive",
  },

  upcomingEvents: [
    {
      id: "evt-4419",
      status: "confirmed",
      statusLabel: "CONFIRMED",
      timelineNote: "In 13 days · balance due in 11 days",
      refCode: "HOG-2026-4419",
      title: "Kumar & Divya — wedding reception",
      dateLabel: "Sat, 14 Sep 2026",
      venue: "Rani Meyyammai Hall, Anna Nagar",
      guests: 250,
      tags: [
        { label: "Lunch · Tamil Wedding Sappadu", variant: "neutral" },
        { label: "Snacks · High Tea Platter", variant: "neutral" },
        { label: "2 kitchens confirmed", variant: "veg" },
      ],
      amount: 134243,
      perGuest: 537,
      isEstimate: false,
      actions: [
        { id: "pay-balance", label: "Pay balance ₹1,00,682", variant: "primary" },
        { id: "track-order", label: "Track order", variant: "outlined" },
        { id: "change-headcount", label: "Change headcount", variant: "outlined" },
      ],
      footNote: "Tasting on 2 Sep, 4 pm",
    },
    {
      id: "evt-2503",
      status: "quote_pending",
      statusLabel: "QUOTE PENDING",
      timelineNote: "Executive replies by 4 pm today",
      refCode: "Draft EVT-2503",
      title: "Housewarming lunch — Kumar residence",
      dateLabel: "Sun, 12 Oct 2026",
      venue: "Kilpauk",
      guests: 180,
      preferenceNote: "pure veg, no onion garlic",
      tags: [
        { label: "Custom menu requested", variant: "neutral" },
        { label: "3 kitchens shortlisted", variant: "neutral" },
      ],
      amount: 61200,
      perGuest: 340,
      isEstimate: true,
      actions: [
        { id: "view-shortlist", label: "View shortlist", variant: "dark" },
        { id: "edit-brief", label: "Edit brief", variant: "outlined" },
      ],
      footNote: "Requested 28 Aug",
    },
  ],

  savedMenusCount: 6,

  savedMenus: [
    {
      id: "menu-kalyana-virundhu",
      name: "Kalyana Virundhu — Silver",
      caterer: "Vasantha Bhavan",
      pricePerPlate: 290,
      img: null,
    },
    {
      id: "menu-satvik-feast",
      name: "Satvik Feast",
      caterer: "Shree Rasoi",
      pricePerPlate: 340,
      img: null,
    },
    {
      id: "menu-grand-buffet",
      name: "Grand Buffet + Live Counters",
      caterer: "Kovai Feast",
      pricePerPlate: 560,
      img: null,
    },
  ],
};

export default myEventsData;
