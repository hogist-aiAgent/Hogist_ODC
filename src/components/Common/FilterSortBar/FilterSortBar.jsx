import React from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import BentoIcon from "@mui/icons-material/Bento";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

// Sort now renders as a dropdown in the results header (see ChooseRestaurant.jsx)
// to match the reference design, so it's exported here for reuse instead of
// living inside FILTER_GROUPS.
export const SORTING_OPTIONS = [
  { value: "relevance", label: "Recommended" },
  { value: "nearest", label: "Nearest" },
  { value: "popular", label: "Popular" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const CUISINES_OPTIONS = [
  { value: "South Indian", label: "South Indian" },
  { value: "North Indian", label: "North Indian" },
  { value: "Briyani", label: "Briyani" },
  { value: "Chinese", label: "Chinese" },
  { value: "Multi cuisines", label: "Multi cuisines" },
  { value: "Traditional", label: "Traditional" },
];

const PRICEPERSON_OPTIONS = [
  { value: "Under 100", label: "Under 100" },
  { value: "100-200", label: "100-200" },
  { value: "200-300", label: "200-300" },
  { value: "300-500", label: "300-500" },
  { value: "500+", label: "500+" },
];

const MEALTYPE_OPTIONS = [
  { value: "Breakfast", label: "Breakfast" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dinner", label: "Dinner" },
  { value: "Snacks", label: "Snacks" },
  { value: "Full Day", label: "Full Day" },
];

const FOOD_OPTIONS = [
  { value: "Full Menu/Thali", label: "Full Menu/Thali" },
  { value: "Buffet", label: "Buffet" },
  { value: "Packed Meals", label: "Packed Meals" },
  { value: "Briyani", label: "Briyani" },
  { value: "Sweets", label: "Sweets" },
  { value: "Snacks", label: "Snacks" },
  { value: "Combos", label: "Combos" },
];

const SERVICES_OPTIONS = [
  { value: "Delivery Only", label: "Delivery Only" },
  { value: "Buffet Setup", label: "Buffet Setup" },
  { value: "Service Staff", label: "Service Staff" },
  { value: "Live Counter", label: "Live Counter" },
  { value: "Leaf Service", label: "Leaf Service" },
  { value: "Disposable Setup", label: "Disposable Setup" },
];

const DIETARY_OPTIONS = [
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Non-Vegetarian", label: "Non-Vegetarian" },
  { value: "Jain", label: "Jain" },
  { value: "Vegan", label: "Vegan" },
  { value: "Eggless", label: "Eggless" },
];

const RATINGS_OPTIONS = [
  { value: "4.5", label: "4.5+" },
  { value: "4.0", label: "4.0+" },
];

// `variant: "checklist"` renders as a checkbox list with counts (matches the
// "Cuisine" section in the reference). `variant: "pill"` renders as a row of
// toggle pills (matches the "Diet" / "Service Style" sections in the reference).
export const FILTER_GROUPS = [
  { key: "dietary", label: "Diet", options: DIETARY_OPTIONS, icon: BentoIcon, variant: "pill" },
  { key: "cuisine", label: "Cuisine", options: CUISINES_OPTIONS, icon: RestaurantIcon, variant: "checklist" },
  { key: "pricePerPerson", label: "Price/Person", options: PRICEPERSON_OPTIONS, icon: CurrencyRupeeIcon, variant: "pill" },
  { key: "services", label: "Service Style", options: SERVICES_OPTIONS, icon: RoomServiceIcon, variant: "pill" },
  { key: "mealType", label: "Meal Type", options: MEALTYPE_OPTIONS, icon: AccessTimeIcon, variant: "pill" },
  { key: "foodType", label: "Food Type", options: FOOD_OPTIONS, icon: LocalDiningIcon, variant: "pill" },
  { key: "ratings", label: "Ratings", options: RATINGS_OPTIONS, icon: StarRoundedIcon, variant: "pill" },
];

// Shared helper so the results header (ChooseRestaurant.jsx) can render the
// same "active filter" chips the reference design shows above the results grid.
export function getActiveFilterChips(selectedFilters = {}) {
  const chips = [];
  Object.entries(selectedFilters).forEach(([key, values]) => {
    if (key === "sorting") return;
    const group = FILTER_GROUPS.find((g) => g.key === key);
    if (!group) return;
    (values || []).forEach((v) => {
      const opt = group.options.find((o) => o.value === v);
      chips.push({ groupKey: key, value: v, label: opt?.label || v });
    });
  });
  return chips;
}

export default function FilterSortBar({
  searchValue = "",
  onSearchChange,
  selectedFilters = {},
  onFilterToggle,
  onClearAll,
  optionCounts = {},
}) {
  const hasActiveFilters = getActiveFilterChips(selectedFilters).length > 0;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 1.5,
        border: "1px solid rgba(43,33,28,0.08)",
        boxShadow: "0 2px 4px rgba(43,33,28,0.04)",
        overflow: "hidden",
        position: { md: "sticky" },
        top: { md: 16 },
        display: "flex",
        flexDirection: "column",
        maxHeight: { md: "calc(100vh - 32px)" },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 2,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{ fontWeight: 800, fontSize: 18, fontFamily: '"Montserrat", sans-serif' }}
        >
          Filters
        </Typography>
        {hasActiveFilters && (
          <Typography
            component="button"
            onClick={onClearAll}
            sx={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "primary.main",
              fontWeight: 700,
              fontSize: 13,
              fontFamily: '"open sans", sans-serif',
              p: 0,
            }}
          >
            Clear all
          </Typography>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ px: 2.5, pb: 2, flexShrink: 0 }}>
        <TextField
          placeholder="Search caterers"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "999px",
              bgcolor: "#faf7f5",
              fontSize: 12,
              "& fieldset": { borderColor: "rgba(43,33,28,0.10)" },
              "&:hover fieldset": { borderColor: "primary.main" },
              "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "1.5px" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 18, color: "primary.main" }} />
              </InputAdornment>
            ),
            endAdornment: searchValue ? (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="Clear search" onClick={() => onSearchChange?.("")}>
                  <CloseIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>

      <Divider sx={{ flexShrink: 0 }} />

      {/* Scrollable filter sections — flat always-visible blocks, matching the reference */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {FILTER_GROUPS.map((group, idx) => {
          const GroupIcon = group.icon;
          const selectedForGroup = selectedFilters[group.key] || [];
          const counts = optionCounts[group.key] || {};
          return (
            <React.Fragment key={group.key}>
              <Box sx={{ px: 2.5, py: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                  <GroupIcon sx={{ fontSize: 15, color: "primary.main" }} />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 12,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      fontFamily: '"open sans", sans-serif',
                    }}
                  >
                    {group.label}
                  </Typography>
                </Box>

                {group.variant === "checklist" ? (
                  <FormGroup>
                    {group.options.map((opt) => {
                      const checked = selectedForGroup.includes(opt.value);
                      const count = counts[opt.value];
                      return (
                        <FormControlLabel
                          key={opt.value}
                          control={
                            <Checkbox
                              size="small"
                              checked={checked}
                              onChange={() => onFilterToggle?.(group.key, opt.value)}
                              sx={{
                                color: "divider",
                                "&.Mui-checked": { color: "primary.main" },
                              }}
                            />
                          }
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "100%",
                                gap: 1,
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: 13,
                                  fontWeight: checked ? 700 : 500,
                                  color: checked ? "primary.main" : "text.primary",
                                  fontFamily: '"open sans", sans-serif',
                                }}
                              >
                                {opt.label}
                              </Typography>
                              {typeof count === "number" && (
                                <Typography
                                  sx={{
                                    fontSize: 12,
                                    color: "text.secondary",
                                    fontFamily: '"open sans", sans-serif',
                                  }}
                                >
                                  {count}
                                </Typography>
                              )}
                            </Box>
                          }
                          sx={{ m: 0, py: 0.4, width: "100%", "& .MuiFormControlLabel-label": { width: "100%" } }}
                        />
                      );
                    })}
                  </FormGroup>
                ) : (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {group.options.map((opt) => {
                      const checked = selectedForGroup.includes(opt.value);
                      return (
                        <Box
                          key={opt.value}
                          component="button"
                          type="button"
                          onClick={() => onFilterToggle?.(group.key, opt.value)}
                          sx={{
                            px: 2,
                            py: 0.85,
                            borderRadius: 999,
                            cursor: "pointer",
                            border: "1.5px solid",
                            borderColor: checked ? "primary.main" : "rgba(43,33,28,0.15)",
                            bgcolor: checked ? "rgba(179,17,31,0.06)" : "#fff",
                            color: checked ? "primary.main" : "text.primary",
                            fontSize: 12,
                            fontWeight: 700,
                            fontFamily: '"open sans", sans-serif',
                            transition: "all 0.15s ease",
                          }}
                        >
                          {opt.label}
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
              {idx < FILTER_GROUPS.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}