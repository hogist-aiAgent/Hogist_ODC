import safeStorage from "./storage";

// Carries the "Event Details" form (host, contacts, venue, etc.) forward to
// the Payment page, the same way planStorage.js carries the chosen meals —
// per-browser, nothing shared or defaulted across users.
const EVENT_DETAILS_STORAGE_KEY = "hogist_event_details";

function readEventDetails() {
  try {
    const raw = safeStorage.getItem(EVENT_DETAILS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch (e) {
    console.warn("Could not read saved event details:", e);
    return null;
  }
}

function writeEventDetails(details) {
  try {
    safeStorage.setItem(EVENT_DETAILS_STORAGE_KEY, JSON.stringify(details));
  } catch (e) {
    console.warn("Could not save event details:", e);
  }
}

// Returns the last-saved Event Details form, or null if nothing's been saved
// yet (e.g. user landed on Payment directly).
export function getEventDetails() {
  return readEventDetails();
}

// Saves the full Event Details form. Called when the user continues to
// Payment so the next page can prefill from it.
export function saveEventDetails(details) {
  writeEventDetails(details);
  return details;
}

// Clears the saved form (e.g. after the order is placed).
export function clearEventDetails() {
  safeStorage.removeItem(EVENT_DETAILS_STORAGE_KEY);
}

export default { getEventDetails, saveEventDetails, clearEventDetails };