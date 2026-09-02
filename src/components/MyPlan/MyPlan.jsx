import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

import myPlanData from "../../data/MyPlanData";
import { getPlanMeals, removePlanMeal } from "../../utils/planStorage";
import { submitCart, clearCartError } from "../../store/slices/cartSlice";


const RED = "#9a0002"; 
const VEG_GREEN = "#2E7D32";
const AMBER = "#B5720F";
const BLUE = "#1565C0";
const INK = "#1B1B23";
const INK_SOFT = "#6B6B76";
const CARD_BORDER = "rgba(43,33,28,0.12)";
const BANNER_BG = "rgba(154,0,2,0.04)";
const FONT = '"open sans", sans-serif';
const HEADING_FONT = '"Montserrat", sans-serif';

const currency = (n) => {
  const sign = n < 0 ? "-" : "";
  return `${sign}₹${Math.abs(Math.round(n)).toLocaleString("en-IN")}`;
};


/* --------------------------------- stepper -------------------------------- */

function StepDot({ step }) {
  const isDone = step.status === "done";
  const isActive = step.status === "active";

  const circleColor = isDone ? VEG_GREEN : isActive ? RED : "transparent";
  const borderColor = isDone ? VEG_GREEN : isActive ? RED : "#C9C2BB";
  const textColor = isDone ? VEG_GREEN : isActive ? RED : INK_SOFT;

  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: `2px solid ${borderColor}`,
          bgcolor: circleColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isDone ? (
          <CheckIcon sx={{ fontSize: 14, color: "#fff" }} />
        ) : (
          <Typography sx={{ fontSize: 12, fontWeight: 800, color: isActive ? "#fff" : INK_SOFT, fontFamily: FONT }}>
            {step.id}
          </Typography>
        )}
      </Box>
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: isActive || isDone ? 700 : 600,
          color: textColor,
          fontFamily: FONT,
          whiteSpace: "nowrap",
        }}
      >
        {step.label}
      </Typography>
    </Stack>
  );
}

function PlanStepper({ steps }) {
  return (
    <Box sx={{ bgcolor: "#fff", borderBottom: `1px solid ${CARD_BORDER}` }}>
      <Container maxWidth="lg">
        <Stack
          direction="row"
          alignItems="center"
          sx={{ pt: 13,pb:2, overflowX: { xs: "auto", md: "visible" } }}
        >
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <StepDot step={step} />
              {idx < steps.length - 1 && (
                <Box sx={{ flexGrow: 1, height: "1px", bgcolor: CARD_BORDER, mx: { xs: 2, md: 3 }, minWidth: 24 }} />
              )}
            </React.Fragment>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

/* -------------------------------- meal tag -------------------------------- */

function MealTag({ tag }) {
  const variantStyles = {
    neutral: { border: CARD_BORDER, color: INK_SOFT, bg: "#fff" },
    amber: { border: "rgba(181,114,15,0.35)", color: AMBER, bg: "rgba(181,114,15,0.06)" },
    veg: { border: VEG_GREEN, color: VEG_GREEN, bg: "#fff" },
    blue: { border: "rgba(21,101,192,0.35)", color: BLUE, bg: "rgba(21,101,192,0.06)" },
  };
  const style = variantStyles[tag.variant] || variantStyles.neutral;

  return (
    <Chip
      size="small"
      label={tag.label}
      sx={{
        border: `1px solid ${style.border}`,
        bgcolor: style.bg,
        color: style.color,
        fontWeight: 700,
        fontSize: 11,
        fontFamily: FONT,
        height: 24,
      }}
    />
  );
}

/* ------------------------------- meal section ------------------------------ */

function MealPhotoPlaceholder({ img }) {
  return (
    <Box
      sx={{
        width: 88,
        height: 88,
        flexShrink: 0,
        borderRadius: 1.5,
        border: `1px solid ${CARD_BORDER}`,
        bgcolor: "#EDEAE6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {img ? (
        <Box component="img" src={img} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
      ) : (
        <Typography sx={{ fontSize: 11, color: "#B7B0A9", fontFamily: FONT }}>photo</Typography>
      )}
    </Box>
  );
}

function MealCard({ meal, onRemove }) {
  // Only include the meta parts that actually have a real value — no blank
  // "· ·" left behind when a field wasn't captured for this selection.
  const metaParts = [meal.caterer, meal.area, meal.serviceNote].filter(Boolean);

  const handleRemove = () => {
    if (onRemove) {
      onRemove(meal.id);
    }
  };

  return (
    <Box
      sx={{
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 2,
        p: 2,
        bgcolor: "#fff",
        mb: 2.5,
      }}
    >
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Stack direction="row" spacing={2} sx={{ minWidth: 0 }}>
          <MealPhotoPlaceholder img={meal.img} />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15.5, color: INK, fontFamily: FONT, mb: 0.25 }}>
              {meal.dishTitle}
            </Typography>
            {metaParts.length > 0 && (
              <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT, mb: 1 }}>
                {metaParts.join(" · ")}
              </Typography>
            )}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {meal.tags.map((tag) => (
                <MealTag key={tag.label} tag={tag} />
              ))}
            </Stack>
            {meal.itemsSelected && meal.itemsSelected.length > 0 && (
              <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, mt: 1 }}>
                {meal.itemsSelected.join(", ")}
              </Typography>
            )}
          </Box>
        </Stack>

        <Box sx={{ textAlign: "right", flexShrink: 0 }}>
          <Typography sx={{ fontWeight: 800, fontSize: 17, color: INK, fontFamily: FONT }}>
            {currency(meal.total)}
          </Typography>
          <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }}>
            {meal.plates} x ₹{meal.pricePerPlate}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 1.5 }} />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
      >
        <Stack direction="row" spacing={2.5}>
          {["Edit items", "Change plates"].map((action) => (
            <Typography
              key={action}
              sx={{
                fontSize: 12.5,
                fontWeight: 700,
                color: RED,
                fontFamily: FONT,
                cursor: "pointer",
               
              }}
            >
              {action}
            </Typography>
          ))}
          <Typography
            onClick={handleRemove}
            sx={{
              fontSize: 12.5,
              fontWeight: 700,
              color: RED,
              fontFamily: FONT,
              cursor: "pointer",
            }}
          >
            Remove
          </Typography>
        </Stack>

        {meal.kitchenAvailableOn && (
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: VEG_GREEN, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }}>
              Kitchen available on {meal.kitchenAvailableOn}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
}

function MealSlotSection({ meal, onRemove }) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.25 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 0.6,
            color: INK_SOFT,
            fontFamily: FONT,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          {meal.slotLabel}
        </Typography>
        <Box sx={{ flexGrow: 1, height: "1px", bgcolor: CARD_BORDER }} />
      </Stack>
      <MealCard meal={meal} onRemove={onRemove} />
    </Box>
  );
}

/* ------------------------------- add-on prompt ----------------------------- */

function AddOnPrompt({ addOnPrompt }) {
  return (
    <Box
      sx={{
        border: `1.5px dashed ${CARD_BORDER}`,
        borderRadius: 2,
        p: 2,
        bgcolor: "#FBFAF8",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1.5}
      >
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: INK, fontFamily: FONT, mb: 0.25 }}>
            {addOnPrompt.title}
          </Typography>
          <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>
            {addOnPrompt.subtitle}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          sx={{
            borderColor: CARD_BORDER,
            color: INK,
            fontWeight: 700,
            fontSize: 13,
            textTransform: "none",
            borderRadius: 999,
            px: 2.25,
            whiteSpace: "nowrap",
            flexShrink: 0,
            "&:hover": { borderColor: RED, color: RED },
          }}
        >
          {addOnPrompt.ctaLabel}
        </Button>
      </Stack>
    </Box>
  );
}

/* ------------------------------- cost summary ------------------------------ */

function CostSummaryCard({
  costSummary,
  canSubmitCart,
  hasMultipleVendors,
  serviceDate,
  onServiceDateChange,
  onSubmitCart,
  onGoToEventDetails,
  cart,
  cartLoading,
  cartError,
}) {
  return (
    <Box
      sx={{
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 2,
        p: 2.5,
        bgcolor: "#fff",
        boxShadow: "0 6px 24px rgba(27,27,35,0.06)",
        mb: 2,
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: 16, color: INK, fontFamily: FONT, mb: 1.75 }}>
        Cost summary
      </Typography>

      <Stack spacing={1.1}>
        {costSummary.lineItems.map((item) => (
          <Stack direction="row" justifyContent="space-between" key={item.label}>
            <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>
              {item.label}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                color: item.amount < 0 ? RED : INK,
                fontFamily: FONT,
              }}
            >
              {currency(item.amount)}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 1.75 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT }}>
          Total
        </Typography>
        <Typography sx={{ fontSize: 21, fontWeight: 800, color: INK, fontFamily: FONT }}>
          {currency(costSummary.total)}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT, textAlign: "right" }}>
        ₹{costSummary.perGuest} per guest
      </Typography>

      {cart && (
        <Box
          sx={{
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 2,
            px: 1.75,
            py: 1.25,
            mt: 1.5,
          }}
        >
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.4, color: INK_SOFT, fontFamily: FONT, mb: 0.75 }}>
            CART (SAVED ON SERVER)
          </Typography>
          <Stack spacing={0.5}>
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>Subtotal</Typography>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: FONT }}>
                {currency(cart.subtotal || 0)}
              </Typography>
            </Stack>
            {cart.discount > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>Discount</Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: RED, fontFamily: FONT }}>
                  -{currency(cart.discount)}
                </Typography>
              </Stack>
            )}
            {cart.deliveryFee > 0 && (
              <Stack direction="row" justifyContent="space-between">
                <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>Delivery fee</Typography>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: FONT }}>
                  {currency(cart.deliveryFee)}
                </Typography>
              </Stack>
            )}
            <Stack direction="row" justifyContent="space-between">
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: INK, fontFamily: FONT }}>Cart total</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: INK, fontFamily: FONT }}>
                {currency(cart.total || 0)}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          bgcolor: BANNER_BG,
          border: `1px solid rgba(154,0,2,0.15)`,
          borderRadius: 2,
          px: 1.75,
          py: 1.25,
          mt: 2,
          mb: 2,
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: FONT }}>
            {costSummary.advance.label}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: INK, fontFamily: FONT }}>
            {currency(costSummary.advance.amount)}
          </Typography>
        </Stack>
        <Typography sx={{ fontSize: 11.5, color: AMBER, fontFamily: FONT, mt: 0.25 }}>
          {costSummary.advance.note}
        </Typography>
      </Box>


      {hasMultipleVendors && (
        <Typography sx={{ fontSize: 11.5, color: RED, fontFamily: FONT, mb: 1.25 }}>
          Your plan has menus from more than one caterer — the cart only supports one caterer at a
          time. Remove all but one before continuing.
        </Typography>
      )}

      {cartError && (
        <Typography sx={{ fontSize: 11.5, color: RED, fontFamily: FONT, mb: 1.25 }}>
          {cartError}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={onGoToEventDetails}
        sx={{
          bgcolor: RED,
          color: "#fff",
          fontWeight: 800,
          textTransform: "none",
          borderRadius: 999,
          py: 1.1,
          fontFamily: FONT,
          boxShadow: "0 4px 14px rgba(154,0,2,0.35)",
          mb: 1.25,
          "&:hover": { bgcolor: "#7d0002" },
          "&.Mui-disabled": { bgcolor: "rgba(154,0,2,0.35)", color: "#fff" },
        }}
      >
        Event details
      </Button>
      <Button
        fullWidth
        variant="outlined"
        sx={{
          borderColor: CARD_BORDER,
          color: INK,
          fontWeight: 700,
          textTransform: "none",
          borderRadius: 999,
          py: 1.1,
          fontFamily: FONT,
          "&:hover": { borderColor: RED, color: RED, bgcolor: "rgba(154,0,2,0.03)" },
        }}
      >
        Download quote (PDF)
      </Button>

      <Stack sx={{ mt: 1.5 }}>
        {costSummary.footNotes.map((note) => (
          <Typography
            key={note}
            sx={{ fontSize: 10.5, color: INK_SOFT, fontFamily: FONT, textAlign: "center" }}
          >
            {note}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}

/* ------------------------------- executive card ----------------------------- */

function ExecutiveCard({ executive }) {
  return (
    <Box
      sx={{
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 2,
        p: 2,
        bgcolor: "#fff",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ minWidth: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "#E4E0DA",
              flexShrink: 0,
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT }} noWrap>
              {executive.name}, {executive.role}
            </Typography>
            <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT }} noWrap>
              {executive.responseTime} · {executive.phone}
            </Typography>
          </Box>
        </Stack>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 800,
            color: RED,
            fontFamily: FONT,
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          Chat
        </Typography>
      </Stack>
    </Box>
  );
}

/* -------------------------------- empty state ------------------------------ */

function EmptyPlanState({ onBrowseMenus }) {
  return (
    <Box
      sx={{
        border: `1.5px dashed ${CARD_BORDER}`,
        borderRadius: 2,
        p: { xs: 3, md: 5 },
        textAlign: "center",
        bgcolor: "#FBFAF8",
      }}
    >
      <Typography sx={{ fontWeight: 800, fontSize: 17, color: INK, fontFamily: FONT, mb: 1 }}>
        No menus added yet
      </Typography>
      <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT, mb: 2.5 }}>
        Pick a menu and select the items you want — they'll show up here with their price once you add
        them to your plan.
      </Typography>
      <Button
        variant="contained"
        onClick={onBrowseMenus}
        sx={{
          bgcolor: RED,
          color: "#fff",
          fontWeight: 800,
          textTransform: "none",
          borderRadius: 999,
          px: 3,
          py: 1,
          fontFamily: FONT,
          boxShadow: "0 4px 14px rgba(154,0,2,0.35)",
          "&:hover": { bgcolor: "#7d0002" },
        }}
      >
        Browse menus
      </Button>
    </Box>
  );
}

/* ------------------------ derive display data from real selections ------------------------ */

// Turns a raw stored plan entry (as saved by MenuDetail's "Add to plan") into
// the shape MealCard/MealSlotSection render — tags are built from the real
// selection instead of being hardcoded.
function toDisplayMeal(meal) {
  const itemCount = (meal.itemsSelected || []).length;
  const tags = [
    { label: `${itemCount} item${itemCount === 1 ? "" : "s"}`, variant: "neutral" },
  ];
  if (meal.isVeg) tags.push({ label: "Pure veg", variant: "veg" });

  return {
    id: meal.id,
    slotLabel: meal.slotLabel,
    dishTitle: meal.dishTitle,
    caterer: meal.caterer,
    area: meal.area,
    serviceNote: meal.serviceNote,
    itemsSelected: meal.itemsSelected,
    tags,
    plates: meal.plates,
    pricePerPlate: meal.pricePerPlate,
    total: meal.foodTotal,
    kitchenAvailableOn: meal.kitchenAvailableOn,
    img: meal.img,
  };
}

// Cost summary computed purely from the meals the user actually added —
// no hardcoded line items, offers, or totals.
function buildCostSummary(meals) {
  const lineItems = [];
  let foodSubtotal = 0;
  let transportTotal = 0;
  let offerTotal = 0;

  meals.forEach((meal) => {
    lineItems.push({ label: meal.dishTitle, amount: meal.foodTotal || 0 });
    foodSubtotal += meal.foodTotal || 0;
    if (meal.transportFee) transportTotal += meal.transportFee;
    if (meal.seasonOfferAmount) offerTotal += meal.seasonOfferAmount;
  });

  if (transportTotal > 0) {
    lineItems.push({
      label: `Transport · ${meals.length} kitchen${meals.length > 1 ? "s" : ""}`,
      amount: transportTotal,
    });
  }
  if (offerTotal > 0) {
    lineItems.push({ label: "Season offer", amount: -offerTotal });
  }

  const preTaxTotal = foodSubtotal + transportTotal - offerTotal;
  const gst = Math.round(preTaxTotal * 0.05);
  if (preTaxTotal > 0) {
    lineItems.push({ label: "GST 5%", amount: gst });
  }

  const total = preTaxTotal + gst;
  const totalPlates = meals.reduce((max, m) => Math.max(max, m.plates || 0), 0);
  const perGuest = totalPlates > 0 ? Math.round(total / totalPlates) : 0;
  const advanceAmount = Math.round(total * 0.25);

  return {
    lineItems,
    total,
    perGuest,
    advance: {
      label: "Pay now · 25% advance",
      amount: advanceAmount,
      note: "Balance due 2 days before the event",
    },
    footNotes: [
      "Free cancellation up to 7 days before the event.",
      "Headcount revisable until 48 hours before the event.",
    ],
  };
}

/* --------------------------------- main ---------------------------------- */

export default function MyPlan() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, event, steps, addOnPrompt, executive } = myPlanData;
  const { cart, cartLoading, cartError } = useSelector((state) => state.cart);

  const [rawMeals, setRawMeals] = useState(() => getPlanMeals());
  useEffect(() => {
    setRawMeals(getPlanMeals());
  }, []);

  const meals = useMemo(() => rawMeals.map(toDisplayMeal), [rawMeals]);
  const hasMeals = meals.length > 0;
  const planMenuCount = meals.length;
  const costSummary = useMemo(() => buildCostSummary(rawMeals), [rawMeals]);

  // Only meals added from a real (API-backed) vendor carry real ODCMenuCard
  // ids — those are the only ones the cart API can accept.
  const apiMeals = useMemo(
    () => rawMeals.filter((m) => m.isApiSourced && Array.isArray(m.itemIds) && m.itemIds.length > 0),
    [rawMeals]
  );
  const apiVendorIds = useMemo(
    () => [...new Set(apiMeals.map((m) => m.restaurantId))],
    [apiMeals]
  );
  const hasMultipleVendors = apiVendorIds.length > 1;
  const canSubmitCart = apiMeals.length > 0 && !hasMultipleVendors;

  const [serviceDate, setServiceDate] = useState("");

  const handleServiceDateChange = (value) => {
    setServiceDate(value);
    if (cartError) dispatch(clearCartError());
  };

  // POST /v2/odc-cart — builds services from every selected item across the
  // (single-vendor) API-sourced meals, using each meal's plate count as that
  // item's cart count.
  const handleSubmitCart = () => {
    if (!canSubmitCart || !serviceDate) return;
    const services = apiMeals.flatMap((meal) =>
      (meal.itemIds || []).map((itemId) => ({ _id: itemId, count: meal.plates }))
    );
    dispatch(submitCart({ services, serviceDate, additional: [] }));
  };

  const handleRemoveMeal = (mealId) => {
    const updatedMeals = rawMeals.filter((meal) => meal.id !== mealId);
    setRawMeals(updatedMeals);
    removePlanMeal(mealId);
  };

  return (
    <Box sx={{ bgcolor: "#FFF", minHeight: "100vh" }}>
      
      <PlanStepper steps={steps} />

    <Box sx={{ bgcolor: "#fff", pt: { xs: 10, md: 3 } }}>
        <Container maxWidth="lg">
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: 20, md: 24 },
              color: INK,
              fontFamily: HEADING_FONT,
            }}
          >
            My Plans
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* LEFT: meal sections + add-on prompt */}
          <Grid item xs={12} md={7.5} lg={8}>
            <Stack spacing={3}>
              {hasMeals ? (
                meals.map((meal) => <MealSlotSection key={meal.id} meal={meal} onRemove={handleRemoveMeal} />)
              ) : (
                <EmptyPlanState onBrowseMenus={() => navigate("/Menu")} />
              )}
              {hasMeals && <AddOnPrompt addOnPrompt={addOnPrompt} />}
            </Stack>
          </Grid>

          {/* RIGHT: cost summary + executive contact */}
          <Grid item xs={12} md={4.5} lg={4}>
            <Box sx={{ position: { md: "sticky" }, top: { md: 100 } }}>
              {hasMeals && (
                <CostSummaryCard
                  costSummary={costSummary}
                  canSubmitCart={canSubmitCart}
                  hasMultipleVendors={hasMultipleVendors}
                  serviceDate={serviceDate}
                  onServiceDateChange={handleServiceDateChange}
                  onSubmitCart={handleSubmitCart}
                  onGoToEventDetails={() => navigate("/event-details")}
                  cart={cart}
                  cartLoading={cartLoading}
                  cartError={cartError}
                />
              )}
              <ExecutiveCard executive={executive} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}