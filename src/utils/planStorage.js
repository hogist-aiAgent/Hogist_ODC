import safeStorage from "./storage";

// Every user's browser keeps only their own selections under this key —
// nothing here is shared or defaulted across users.
const PLAN_STORAGE_KEY = "hogist_my_plan_meals";

function readMeals() {
  try {
    const raw = safeStorage.getItem(PLAN_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Could not read saved plan:", e);
    return [];
  }
}

function writeMeals(meals) {
  try {
    safeStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(meals));
  } catch (e) {
    console.warn("Could not save plan:", e);
  }
}

// Returns only the menus this user has actually added to their plan.
export function getPlanMeals() {
  return readMeals();
}

// Adds (or updates, if this restaurant's menu was already added) a real,
// user-selected menu entry.
export function addPlanMeal(meal) {
  const meals = readMeals().filter((m) => m.restaurantId !== meal.restaurantId);
  meals.push(meal);
  writeMeals(meals);
  return meals;
}

// Removes a single previously-added menu by id.
export function removePlanMeal(mealId) {
  const meals = readMeals().filter((m) => m.id !== mealId);
  writeMeals(meals);
  return meals;
}

// Clears the whole plan (e.g. after checkout / order placed).
export function clearPlanMeals() {
  safeStorage.removeItem(PLAN_STORAGE_KEY);
}

export default { getPlanMeals, addPlanMeal, removePlanMeal, clearPlanMeals };