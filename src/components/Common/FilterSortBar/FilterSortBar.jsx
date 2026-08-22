import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import BentoIcon from "@mui/icons-material/Bento";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SortIcon from "@mui/icons-material/Sort";

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

const SORTING_OPTIONS = [
  { value: "relevance", label: "Recommended" },
  { value: "nearest", label: "Nearest" },
  { value: "popular", label: "Popular" },
  { value: "rating_desc", label: "Highest Rated" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const FILTER_GROUPS = [
  { key: "cuisine", label: "Cuisines", options: CUISINES_OPTIONS, icon: RestaurantIcon },
  { key: "pricePerPerson", label: "Price/Person", options: PRICEPERSON_OPTIONS, icon: CurrencyRupeeIcon },
  { key: "mealType", label: "Meal Type", options: MEALTYPE_OPTIONS, icon: AccessTimeIcon },
  { key: "foodType", label: "Food Type", options: FOOD_OPTIONS, icon: LocalDiningIcon },
  { key: "services", label: "Services", options: SERVICES_OPTIONS, icon: RoomServiceIcon },
  { key: "dietary", label: "Dietary", options: DIETARY_OPTIONS, icon: BentoIcon },
  { key: "ratings", label: "Ratings", options: RATINGS_OPTIONS, icon: StarRoundedIcon },
];

export default function FilterSortBar({
  searchValue = "",
  onSearchChange,
  sortValue = "relevance",
  onSortChange,
  selectedFilters = {},
  onFilterToggle,
  onClearAll,
}) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeChips = [];
  Object.entries(selectedFilters).forEach(([key, values]) => {
    const group = FILTER_GROUPS.find((g) => g.key === key);
    if (!group) return;
    (values || []).forEach((v) => {
      const opt = group.options.find((o) => o.value === v);
      activeChips.push({ groupKey: key, value: v, label: opt?.label || v });
    });
  });

  const hasActiveFilters = activeChips.length > 0;

  return (
    <Box
      sx={{
        bgcolor: "#fff",
        borderRadius: 2.5,
        border: "1px solid rgba(43,33,28,0.08)",
        boxShadow: "0 2px 4px rgba(43,33,28,0.04)",
        overflow: "hidden",
        position: { md: "sticky" },
        top: { md: 16 },
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
              fontSize: 12.5,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              fontFamily: '"open sans", sans-serif',
              p: 0,
            }}
          >
            Clear All
          </Typography>
        )}
      </Box>

      {/* Search */}
      <Box sx={{ px: 2.5, pb: 2 }}>
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
              fontSize: 14,
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
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>

      {/* Selected filter chips */}
      {hasActiveFilters && (
        <>
          <Box sx={{ px: 2.5, pb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {activeChips.map((chip) => (
              <Chip
                key={`${chip.groupKey}-${chip.value}`}
                label={chip.label}
                onDelete={() => onFilterToggle?.(chip.groupKey, chip.value)}
                size="small"
                sx={{
                  bgcolor: "#f1efee",
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: 12,
                  fontFamily: '"open sans", sans-serif',
                  "& .MuiChip-deleteIcon": { fontSize: 15, color: "text.secondary" },
                }}
              />
            ))}
          </Box>
          <Divider />
        </>
      )}

      {/* Categories (context breadcrumb) */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 12.5,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "text.primary",
            mb: 1,
            fontFamily: '"open sans", sans-serif',
          }}
        >
          Categories
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "text.secondary" }}>
          <ChevronLeftIcon sx={{ fontSize: 18 }} />
          <Typography sx={{ fontSize: 13.5, fontFamily: '"open sans", sans-serif' }}>
            Food &amp; Catering
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 700,
            color: "text.primary",
            pl: 3,
            mt: 0.5,
            fontFamily: '"open sans", sans-serif',
          }}
        >
          Caterers
        </Typography>
      </Box>
      <Divider />

      {/* Sort */}
      <Accordion
        disableGutters
        elevation={0}
        expanded={Boolean(expanded.sorting)}
        onChange={() => toggleExpand("sorting")}
        sx={{ "&:before": { display: "none" }, boxShadow: "none" }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <SortIcon sx={{ fontSize: 18, color: "primary.main" }} />
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 13.5,
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                fontFamily: '"open sans", sans-serif',
              }}
            >
              Sort
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 2.5, pt: 0 }}>
          <RadioGroup value={sortValue} onChange={(e) => onSortChange?.(e.target.value)}>
            {SORTING_OPTIONS.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={
                  <Radio
                    size="small"
                    sx={{ color: "divider", "&.Mui-checked": { color: "primary.main" } }}
                  />
                }
                label={
                  <Typography sx={{ fontSize: 13.5, fontFamily: '"open sans", sans-serif' }}>
                    {opt.label}
                  </Typography>
                }
                sx={{ m: 0, py: 0.4 }}
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>
      <Divider />

      {/* Filter groups */}
      {FILTER_GROUPS.map((group, idx) => {
        const GroupIcon = group.icon;
        const selectedForGroup = selectedFilters[group.key] || [];
        return (
          <React.Fragment key={group.key}>
            <Accordion
              disableGutters
              elevation={0}
              expanded={Boolean(expanded[group.key])}
              onChange={() => toggleExpand(group.key)}
              sx={{ "&:before": { display: "none" }, boxShadow: "none" }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 2.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <GroupIcon sx={{ fontSize: 18, color: "primary.main" }} />
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 13.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      fontFamily: '"open sans", sans-serif',
                    }}
                  >
                    {group.label}
                  </Typography>
                  {selectedForGroup.length > 0 && (
                    <Chip
                      label={selectedForGroup.length}
                      size="small"
                      sx={{
                        height: 18,
                        minWidth: 18,
                        fontSize: 10,
                        fontWeight: 700,
                        bgcolor: "primary.main",
                        color: "#fff",
                        "& .MuiChip-label": { px: 0.6 },
                      }}
                    />
                  )}
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 2.5, pt: 0 }}>
                {selectedForGroup.length > 0 && (
                  <Typography
                    component="button"
                    onClick={() => selectedForGroup.forEach((v) => onFilterToggle?.(group.key, v))}
                    sx={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      color: "text.secondary",
                      fontSize: 12.5,
                      fontWeight: 600,
                      p: 0,
                      mb: 0.75,
                      display: "block",
                      fontFamily: '"open sans", sans-serif',
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    Clear all
                  </Typography>
                )}
                <FormGroup>
                  {group.options.map((opt) => {
                    const checked = selectedForGroup.includes(opt.value);
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
                          <Typography
                            sx={{
                              fontSize: 13.5,
                              fontWeight: checked ? 700 : 500,
                              color: checked ? "primary.main" : "text.primary",
                              fontFamily: '"open sans", sans-serif',
                            }}
                          >
                            {opt.label}
                          </Typography>
                        }
                        sx={{ m: 0, py: 0.3 }}
                      />
                    );
                  })}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
            {idx < FILTER_GROUPS.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
    </Box>
  );
}