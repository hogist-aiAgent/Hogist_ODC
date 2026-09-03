export const RED = "#9a0002";
export const VEG_GREEN = "#2E7D32";
export const AMBER = "#B5720F";
export const INK = "#1B1B23";
export const INK_SOFT = "#6B6B76";
export const CARD_BORDER = "rgba(43,33,28,0.12)";
export const BANNER_BG = "rgba(154,0,2,0.04)";
export const FONT = '"open sans", sans-serif';
export const HEADING_FONT = '"Montserrat", sans-serif';

export const currency = (n) => {
  const sign = n < 0 ? "-" : "";
  return `${sign}₹${Math.abs(Math.round(n)).toLocaleString("en-IN")}`;
};

export const EVENT_DETAILS_STEPS = [
  { id: 1, label: "Menus chosen", status: "done" },
  { id: 2, label: "Plan reviewed", status: "done" },
  { id: 3, label: "Event details", status: "active" },
  { id: 4, label: "Payment", status: "upcoming" },
  { id: 5, label: "Kitchen Confirmation", status: "upcoming" },
];

export const OCCASIONS = ["Wedding", "Reception", "Birthday", "House warming", "Corporate", "Other"];

export const GUEST_PRESETS = [100, 250, 500, 1000, 2000];

export const MEAL_SLOTS = [
  { key: "breakfast", label: "Breakfast", time: "7:00 - 9:30 am" },
  { key: "lunch", label: "Lunch", time: "12:30 pm" },
  { key: "eveningSnacks", label: "Evening snacks", time: "5:00 pm" },
  { key: "dinner", label: "Dinner", time: "7:30 - 10:00 pm" },
];

export const NOTE_TAGS = ["Separate Jain counter", "Extra serving staff", "Disposable plates", "Late-night packing"];