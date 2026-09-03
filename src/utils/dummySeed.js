
import { getPlanMeals, addPlanMeal } from "./planStorage";
import getMenuDetailById from "../data/menuDetails";

const DUMMY_SELECTED_ITEM_IDS = ["banana-leaf", "s1", "s2", "m1", "m2", "sw1"];

export function seedDummyPlanMeal() {
  if (getPlanMeals().length > 0) return;

  const menu = getMenuDetailById(1); // Aswathy Caterers — Traditional Tamil Wedding Sappadu

  const itemsSelected = [];
  const itemIds = [];
  let serviceNote = "";

  menu.sections.forEach((section) => {
    section.items.forEach((item) => {
      if (DUMMY_SELECTED_ITEM_IDS.includes(item.id)) {
        itemsSelected.push(item.name);
        itemIds.push(item.id);
        if (section.location === "sidebar" && item.subtitle) {
          serviceNote = item.subtitle;
        }
      }
    });
  });

  const pricePerPlate = menu.sections
    .flatMap((section) => section.items)
    .filter((item) => DUMMY_SELECTED_ITEM_IDS.includes(item.id))
    .reduce((sum, item) => sum + (item.pricePerPlate || 0), 0);

  const plates = menu.pricing.defaultPlates;
  const foodTotal = pricePerPlate * plates;
  const transportFee = menu.pricing.transportFee;
  const seasonOfferAmount = menu.pricing.seasonOffer.amount;
  const estimatedTotal = foodTotal + transportFee - seasonOfferAmount;

  const badgesText = menu.badges.join(" ");
  const isVeg = /veg/i.test(badgesText) && !/non[\s-]?veg/i.test(badgesText);

  addPlanMeal({
    id: `${menu.restaurantId}-dummy-seed`,
    restaurantId: menu.restaurantId,
    dishTitle: menu.dishTitle,
    caterer: menu.caterer,
    area: menu.area,
    serviceNote,
    itemsSelected,
    itemIds,
    isApiSourced: true,
    isVeg,
    slotLabel: `${menu.eventContext.occasion} · ${menu.eventContext.slot}`,
    kitchenAvailableOn: menu.eventContext.date,
    plates,
    pricePerPlate,
    foodTotal,
    transportFee,
    seasonOfferCode: menu.pricing.seasonOffer.code,
    seasonOfferAmount,
    estimatedTotal,
    img: menu.img,
  });
}

export default seedDummyPlanMeal;