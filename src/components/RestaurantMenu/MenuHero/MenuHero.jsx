import React, { useState } from "react";
import { Box, Chip, Menu, RadioGroup, FormControlLabel, Radio, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import RoomServiceIcon from "@mui/icons-material/RoomService";
import EcoIcon from '@mui/icons-material/RecordVoiceOver';
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import SortIcon from "@mui/icons-material/Sort";

function VegDot({ color }) {
  return (
    <Box
      sx={{
        width: 12,
        height: 12,
        border: `1.5px solid ${color}`,
        borderRadius: "3px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Box sx={{ width: 5.5, height: 5.5, borderRadius: "50%", bgcolor: color }} />
    </Box>
  );
}

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
  { value: "4.5+", label: "4.5+" },
  { value: "4.0+", label: "4.0+" },
];

const SORTING_OPTIONS = [
  { value: "Nearest", label: "Nearest" },
  { value: "Recommended", label: "Recommended" },
  { value: "Popular", label: "Popular" },
  { value: "Highest Rated", label: "Highest Rated" },
  { value: "Price: Low to High", label: "Price: Low to High" },
  { value: "Price: High to Low", label: "Price: High to Low" },
];

const FILTER_GROUPS = [
  { key: "cuisine", label: "Cuisines", options: CUISINES_OPTIONS, icon: RestaurantIcon },
  { key: "pricePerPerson", label: "Price/Person", options: PRICEPERSON_OPTIONS, icon: CurrencyRupeeIcon },
  { key: "mealType", label: "Meal Type", options: MEALTYPE_OPTIONS, icon: AccessTimeIcon },
  { key: "foodType", label: "Food Type", options: FOOD_OPTIONS, icon: LocalDiningIcon },
  { key: "services", label: "Services", options: SERVICES_OPTIONS, icon: RoomServiceIcon },
  { key: "dietary", label: "Dietary", options: DIETARY_OPTIONS, icon: EcoIcon },
  { key: "ratings", label: "Ratings", options: RATINGS_OPTIONS, icon: StarRoundedIcon },
];

const SORT_GROUP = { key: "sorting", label: "Sort", options: SORTING_OPTIONS, icon: SortIcon };

export default function FilterSortBar({
  searchValue = "",
  onSearchChange,
  sortValue = "relevance",
  onSortChange,
  filters = { veg: false, nonVeg: false, rated4: false },
  onToggleFilter,
}) {
  const [anchorEls, setAnchorEls] = useState({});
  const [selectedValues, setSelectedValues] = useState({});

  const handleChipClick = (key, e) => {
    setAnchorEls((prev) => ({ ...prev, [key]: e.currentTarget }));
  };

  const handleMenuClose = (key) => {
    setAnchorEls((prev) => ({ ...prev, [key]: null }));
  };

  const handleOptionSelect = (key, value) => {
    setSelectedValues((prev) => ({ ...prev, [key]: value }));
    onSortChange?.(value);
    handleMenuClose(key);
  };

  const chipBaseSx = {
    fontWeight: 600,
    fontSize: { xs: 12.5, sm: 13 },
    height: { xs: 36, sm: 38 },
    px: { xs: 0.5, sm: 0.75 },
    borderRadius: "999px",
    border: "1px solid",
    borderColor: "rgba(43,33,28,0.12)",
    bgcolor: "#fff",
    color: "text.primary",
    flexShrink: 0,
    scrollSnapAlign: "start",
    transition: "transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease, border-color 0.15s ease",
    "&:hover": {
      bgcolor: "#fff",
      borderColor: "primary.main",
      transform: "translateY(-1px)",
      boxShadow: "0 4px 12px rgba(43,33,28,0.10)",
    },
    "&:focus-visible": {
      outline: "2px solid",
      outlineColor: "primary.main",
      outlineOffset: "2px",
    },
  };

  const chipActiveSx = {
    background: "linear-gradient(135deg, #b41827 0%, #d73a2f 100%)",
    color: "#fff",
    borderColor: "transparent",
    // boxShadow: "0 4px 14px rgba(179,17,31,0.32)",
    "&:hover": {
      background: "linear-gradient(135deg, #AD1526 0%, #C5382F 100%)",
      borderColor: "transparent",
      transform: "translateY(-1px)",
    //   boxShadow: "0 6px 16px rgba(179,17,31,0.38)",
    },
  };

  const renderFilterChip = (group) => {
    const isOpen = Boolean(anchorEls[group.key]);
    const selectedValue = selectedValues[group.key];
    const selectedLabel = group.options.find((opt) => opt.value === selectedValue)?.label;
    const isActive = Boolean(selectedValue);
    const GroupIcon = group.icon;

    return (
      <React.Fragment key={group.key}>
        <Chip
          onClick={(e) => handleChipClick(group.key, e)}
          icon={
            <GroupIcon
              sx={{
                fontSize: 16,
                color: isActive ? "#fff !important" : "primary.main",
                ml: "6px !important",
              }}
            />
          }
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.4, whiteSpace: "nowrap" }}>
              <Typography component="span" sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
                {isActive ? selectedLabel : group.label}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 17,
                  opacity: isActive ? 0.9 : 0.6,
                  transform: isOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              />
            </Box>
          }
          sx={{ ...chipBaseSx, ...(isActive ? chipActiveSx : {}) }}
        />
        <Menu
          anchorEl={anchorEls[group.key]}
          open={isOpen}
          onClose={() => handleMenuClose(group.key)}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2.5,
              minWidth: 240,
              maxWidth: 300,
              boxShadow: "0 12px 32px rgba(43,33,28,0.18)",
              border: "1px solid",
              borderColor: "rgba(43,33,28,0.08)",
              p: 0.5,
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.75,
              px: 1.5,
              pt: 1,
              pb: 0.75,
              mb: 0.25,
              borderBottom: "1px solid",
              borderColor: "rgba(43,33,28,0.08)",
            }}
          >
            <GroupIcon sx={{ fontSize: 15, color: "primary.main" }} />
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "text.secondary",
              }}
            >
              {group.label}
            </Typography>
          </Box>
          <RadioGroup
            value={selectedValue || ""}
            onChange={(e) => handleOptionSelect(group.key, e.target.value)}
            sx={{ px: 0.75, py: 0.25 }}
          >
            {group.options.map((opt) => {
              const checked = selectedValue === opt.value;
              return (
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
                          fontSize: 14,
                          fontWeight: checked ? 700 : 500,
                          color: checked ? "primary.main" : "text.primary",
                        }}
                      >
                        {opt.label}
                      </Typography>
                      {checked && <CheckIcon sx={{ fontSize: 16, color: "primary.main" }} />}
                    </Box>
                  }
                  sx={{
                    m: 0,
                    py: 0.6,
                    px: 1,
                    borderRadius: 1.5,
                    bgcolor: checked ? "rgba(179,17,31,0.06)" : "transparent",
                    "&:hover": { bgcolor: checked ? "rgba(179,17,31,0.09)" : "action.hover" },
                  }}
                />
              );
            })}
          </RadioGroup>
        </Menu>
      </React.Fragment>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: 1.25, sm: 1.5 },
        mb: 4,
        width: "100vw",
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        boxSizing: "border-box",
        p: { xs: 1.25, sm: 1.5, md: "10px 14px" },
        borderRadius: { xs: "16px", sm: "18px" },
        bgcolor: "#9a0002",
        border: "1px solid rgba(43,33,28,0.06)",
        boxShadow: "0 2px 4px rgba(43,33,28,0.06), 0 12px 28px rgba(43,33,28,0.08)",
      }}
    >
      {/* Search bar — full width on mobile, fixed max-width on tablet/desktop */}
      <TextField
        placeholder="Search caterers"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        sx={{
          width: { xs: "100%", md: 210, lg: 250 },
          maxWidth: { xs: "100%", md: 210, lg: 250 },
          flexShrink: 0,
          "& .MuiOutlinedInput-root": {
            borderRadius: "999px",
            bgcolor: "#fff",
            fontSize: 14,
            transition: "box-shadow 0.15s ease, border-color 0.15s ease",
            "& fieldset": { borderColor: "rgba(43,33,28,0.10)" },
            "&:hover fieldset": { borderColor: "primary.main" },
            "&.Mui-focused fieldset": { borderColor: "primary.main", borderWidth: "1.5px" },
            "&.Mui-focused": { boxShadow: "0 0 0 4px rgba(179,17,31,0.10)" },
          },
          "& .MuiOutlinedInput-input": {
            py: { xs: 1.15, sm: 1.05 },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 19, color: "primary.main" }} />
            </InputAdornment>
          ),
          endAdornment: searchValue ? (
            <InputAdornment position="end">
              <IconButton
                size="small"
                aria-label="Clear search"
                onClick={() => onSearchChange?.("")}
              >
                <CloseIcon sx={{ fontSize: 17 }} />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />

      {/* Divider between search and chips, visible only on md+ */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: "1px",
          alignSelf: "stretch",
          bgcolor: "rgba(249, 246, 245, 0.49)",
        }}
      />

      {/* Filter chips */}
      <Box sx={{ position: "relative", flex: 1, minWidth: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 0.75, sm: 1 },
            overflowX: "auto",
            flexWrap: "nowrap",
            scrollSnapType: { xs: "x proximity", md: "none" },
            WebkitOverflowScrolling: "touch",
            pb: { xs: 0.5, md: 0 },
            pr: { xs: 2, md: 0 },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {renderFilterChip(SORT_GROUP)}
          {FILTER_GROUPS.map((group) => renderFilterChip(group))}
        </Box>

        {/* Edge fade to hint horizontal scroll below desktop */}
        <Box
          aria-hidden
          sx={{
            display: { xs: "block", lg: "none" },
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 6,
            width: 28,
            pointerEvents: "none",
            background: "linear-gradient(to right, rgba(239,230,221,0), #efe6dd 88%)",
          }}
        />
      </Box>

    </Box>
  );
}