import React from "react";
import { Box, Stack, Typography, Divider, Button } from "@mui/material";
import { CARD_BORDER, INK, INK_SOFT, RED, FONT, currency } from "../../../utils/constants";

export default function PlanSummaryCard({
  meals,
  costSummary,
  eventDateLabel,
  guests,
  venueLabel,
  hostName,
  contactCount,
  canSubmitCart,
  cartLoading,
  cartError,
  onContinueToPayment,
  onSaveForLater,
  onEditMenus,
}) {
  const vendorCount = new Set(meals.map((m) => m.restaurantId)).size;

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
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.75 }}>
        <Typography sx={{ fontWeight: 800, fontSize: 16, color: INK, fontFamily: FONT }}>
          Your plan
        </Typography>
        <Typography
          onClick={onEditMenus}
          sx={{ fontSize: 12.5, fontWeight: 700, color: RED, fontFamily: FONT, cursor: "pointer" }}
        >
          Edit menus
        </Typography>
      </Stack>

      {meals.length > 0 ? (
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          {meals.map((meal) => (
            <Stack direction="row" justifyContent="space-between" key={meal.id} spacing={1.5}>
              <Stack direction="row" spacing={1.25} sx={{ minWidth: 0 }}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1,
                    bgcolor: "#EDEAE6",
                    flexShrink: 0,
                    overflow: "hidden",
                  }}
                >
                  {meal.img && (
                    <Box component="img" src={meal.img} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT }} noWrap>
                    {meal.dishTitle}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT }} noWrap>
                    {meal.slotLabel.split(" · ")[0]} · {meal.plates} x ₹{meal.pricePerPlate}
                  </Typography>
                </Box>
              </Stack>
              <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT, flexShrink: 0 }}>
                {currency(meal.foodTotal)}
              </Typography>
            </Stack>
          ))}
        </Stack>
      ) : (
        <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT, mb: 2 }}>
          No menus added yet.
        </Typography>
      )}

      <Divider sx={{ mb: 1.5 }} />

      <Stack spacing={0.9} sx={{ mb: 1.5 }}>
        {[
          ["Date", eventDateLabel],
          ["Guests", guests],
          ["Venue", venueLabel],
          ["Host", hostName],
          ["Contacts", `${contactCount} number${contactCount === 1 ? "" : "s"}`],
        ].map(([label, val]) => (
          <Stack direction="row" justifyContent="space-between" key={label}>
            <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>{label}</Typography>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: FONT, textAlign: "right", maxWidth: "60%" }} noWrap>
              {val}
            </Typography>
          </Stack>
        ))}
        {costSummary.transportTotal > 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>
              Transport · {vendorCount || 1} kitchen{vendorCount === 1 ? "" : "s"}
            </Typography>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: FONT }}>
              {currency(costSummary.transportTotal)}
            </Typography>
          </Stack>
        )}
        {costSummary.gst > 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT }}>GST 5%</Typography>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: FONT }}>
              {currency(costSummary.gst)}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Divider sx={{ mb: 1.5 }} />

      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <Typography sx={{ fontSize: 14, fontWeight: 700, color: INK, fontFamily: FONT }}>
          Order total
        </Typography>
        <Typography sx={{ fontSize: 21, fontWeight: 800, color: INK, fontFamily: FONT }}>
          {currency(costSummary.total)}
        </Typography>
      </Stack>
      <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT, textAlign: "right", mb: 2 }}>
        ₹{costSummary.perGuest} per guest
      </Typography>

      {cartError && (
        <Typography sx={{ fontSize: 11.5, color: RED, fontFamily: FONT, mb: 1.25 }}>
          {cartError}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        onClick={onContinueToPayment}
        disabled={!canSubmitCart || cartLoading}
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
        {cartLoading ? "Saving..." : "Continue to payment"}
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={onSaveForLater}
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
        Save and finish later
      </Button>

      <Typography sx={{ fontSize: 10.5, color: INK_SOFT, fontFamily: FONT, textAlign: "center", mt: 1.5 }}>
        Kitchens confirm within 15 minutes of payment. Nothing is charged before that.
      </Typography>
    </Box>
  );
}