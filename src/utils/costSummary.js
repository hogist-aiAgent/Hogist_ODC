export function buildCostSummary(meals) {
  let foodSubtotal = 0;
  let transportTotal = 0;
  let offerTotal = 0;

  meals.forEach((meal) => {
    foodSubtotal += meal.foodTotal || 0;
    if (meal.transportFee) transportTotal += meal.transportFee;
    if (meal.seasonOfferAmount) offerTotal += meal.seasonOfferAmount;
  });

  const preTaxTotal = foodSubtotal + transportTotal - offerTotal;
  const gst = Math.round(preTaxTotal * 0.05);
  const total = preTaxTotal + gst;
  const totalPlates = meals.reduce((max, m) => Math.max(max, m.plates || 0), 0);
  const perGuest = totalPlates > 0 ? Math.round(total / totalPlates) : 0;

  return { foodSubtotal, transportTotal, offerTotal, gst, total, perGuest, totalPlates };
}
