import React, { useState } from "react";
import { Box, Chip, Menu, RadioGroup, FormControlLabel, Radio, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

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

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "rating_desc", label: "Rating (High to Low)" },
  { value: "price_asc", label: "Price (Low to High)" },
];

export default function FilterSortBar({
  searchValue = "",
  onSearchChange,
  sortValue = "relevance",
  onSortChange,
  filters = { veg: false, nonVeg: false, rated4: false },
  onToggleFilter,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const sortMenuOpen = Boolean(anchorEl);

  const handleSortClick = (e) => setAnchorEl(e.currentTarget);
  const handleSortClose = () => setAnchorEl(null);
  const handleSortSelect = (value) => {
    onSortChange?.(value);
    handleSortClose();
  };

  const currentSortLabel = SORT_OPTIONS.find((o) => o.value === sortValue)?.label;

  const chipBaseSx = {
    fontWeight: 600,
    fontSize: 13,
    height: 38,
    px: 0.5,
    borderRadius: "10px",
    border: "1px solid",
    borderColor: "divider",
    bgcolor: "background.paper",
    color: "text.primary",
    flexShrink: 0,
    transition: "all 0.15s ease",
    "&:hover": { bgcolor: "action.hover", borderColor: "text.disabled" },
  };

  const chipActiveSx = {
    bgcolor: "primary.main",
    color: "#fff",
    borderColor: "primary.main",
    boxShadow: "0 2px 8px rgba(179,17,31,0.25)",
    "&:hover": { bgcolor: "primary.dark", borderColor: "primary.dark" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 1.5, sm: 1.5 },
        mb: 4,
        p: { xs: 1.5, sm: 1.75 },
        borderRadius: "14px",
        bgcolor: "#efe6dd",
        // border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.31)",
      }}
    >
      {/* Search bar — full width on mobile, fixed max-width on tablet/desktop */}
      <TextField
        placeholder="Search caterers"
        value={searchValue}
        onChange={(e) => onSearchChange?.(e.target.value)}
        variant="outlined"
        size="small"
        sx={{
          width: { xs: "100%", sm: 220, md: 260, lg: 300 },
          flexShrink: 0,
          "& .MuiOutlinedInput-root": {
            borderRadius: "10px",
            bgcolor: (theme) => theme.palette.mode === "light" ? "#F8F6F2" : "background.default",
            fontSize: 14,
            "& fieldset": { borderColor: "transparent" },
            "&:hover fieldset": { borderColor: "divider" },
            "&.Mui-focused fieldset": { borderColor: "primary.main" },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: 19, color: "text.secondary" }} />
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

      {/* Divider between search and chips, visible only on sm+ */}
      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          width: "1px",
          alignSelf: "stretch",
          bgcolor: "divider",
        }}
      />

      {/* Sort + filter chips */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          overflowX: { xs: "auto", sm: "visible" },
          flexWrap: { xs: "nowrap", sm: "wrap" },
          flex: 1,
          minWidth: 0,
          pb: { xs: 0.5, sm: 0 },
          "&::-webkit-scrollbar": { height: 5 },
          "&::-webkit-scrollbar-thumb": { bgcolor: "divider", borderRadius: 3 },
        }}
      >
        {/* Sort by */}
        <Chip
          onClick={handleSortClick}
          label={
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Typography component="span" sx={{ fontSize: 13, fontWeight: 600 }}>
                {sortValue === "relevance" ? "Sort by" : currentSortLabel}
              </Typography>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  transform: sortMenuOpen ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s ease",
                }}
              />
            </Box>
          }
          sx={{ ...chipBaseSx, ...(sortValue !== "relevance" ? chipActiveSx : {}) }}
        />
        <Menu
          anchorEl={anchorEl}
          open={sortMenuOpen}
          onClose={handleSortClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          PaperProps={{ sx: { mt: 1, borderRadius: 2, minWidth: 240, boxShadow: 6, p: 0.5 } }}
        >
          <RadioGroup
            value={sortValue}
            onChange={(e) => handleSortSelect(e.target.value)}
            sx={{ px: 1.5, py: 0.5 }}
          >
            {SORT_OPTIONS.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={
                  <Radio
                    size="small"
                    sx={{ color: "divider", "&.Mui-checked": { color: "primary.main" } }}
                  />
                }
                label={<Typography sx={{ fontSize: 14, fontWeight: 500 }}>{opt.label}</Typography>}
                sx={{ py: 0.4 }}
              />
            ))}
          </RadioGroup>
        </Menu>

        {/* Veg */}
        <Chip
          onClick={() => onToggleFilter?.("veg")}
          icon={<VegDot color={filters.veg ? "#fff" : "#2e7d32"} />}
          label="Veg Dishes"
          sx={{ ...chipBaseSx, ...(filters.veg ? chipActiveSx : {}) }}
        />

        {/* Non-Veg */}
        <Chip
          onClick={() => onToggleFilter?.("nonVeg")}
          icon={<VegDot color={filters.nonVeg ? "#fff" : "#B3111F"} />}
          label="Non-Veg"
          sx={{ ...chipBaseSx, ...(filters.nonVeg ? chipActiveSx : {}) }}
        />

        {/* Rated 4+ */}
        <Chip
          onClick={() => onToggleFilter?.("rated4")}
          label="Rated 4+"
          sx={{ ...chipBaseSx, ...(filters.rated4 ? chipActiveSx : {}) }}
        />
      </Box>
    </Box>
  );
}