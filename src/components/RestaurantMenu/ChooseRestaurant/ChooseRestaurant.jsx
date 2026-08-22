import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Chip,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import allRestaurants, { filterNearbyRestaurants } from "../../../data/restaurants";
import FilterSortBar from "../../Common/FilterSortBar/FilterSortBar";


const GOLD = "#F5A623";
const WHITE = "#FFF";
const VEG_GREEN = "#2E7D32";
const NONVEG_RED = "#B3111F";

function getVegNonVegFlags(c) {
  const hasExplicitVeg = typeof c.isVeg === "boolean";
  const hasExplicitNonVeg = typeof c.isNonVeg === "boolean";

  if (hasExplicitVeg || hasExplicitNonVeg) {
    return {
      veg: hasExplicitVeg ? c.isVeg : false,
      nonVeg: hasExplicitNonVeg ? c.isNonVeg : false,
    };
  }

  const tagText = (c.tags || []).join(" ").toLowerCase();
  const tagHasVeg = /(^|\s)veg(\s|$)/.test(tagText);
  const tagHasNonVeg = /non[\s-]?veg/.test(tagText);

  if (tagHasVeg || tagHasNonVeg) {
    return { veg: tagHasVeg, nonVeg: tagHasNonVeg };
  }

  // No explicit signal available — assume the caterer offers both.
  return { veg: true, nonVeg: true };
}

function VegNonVegSymbol({ type }) {
  const color = type === "veg" ? VEG_GREEN : NONVEG_RED;
  return (
    <Box
      role="img"
      aria-label={type === "veg" ? "Veg" : "Non-Veg"}
      sx={{
        width: 18,
        height: 18,
        border: `1.5px solid ${color}`,
        borderRadius: "3px",
        bgcolor: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: 1,
      }}
    >
      <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: color }} />
    </Box>
  );
}

function ChevronLinesDecor({ direction = "right" }) {
  const flip = direction === "left";
  return (
   <Box
      component="svg"
      viewBox="0 0 30 36"
      sx={{
        width: 24,
        height: 26,
        transform: flip ? "scaleX(-1)" : "none",
      }}
    >
      <line x1="2" y1="2" x2="21" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="34" x2="21" y2="24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </Box>
  );
}

function CatererCard({ c }) {
  const { veg, nonVeg } = getVegNonVegFlags(c);

  return (
    <Card
      elevation={3}
      sx={{
        position: "relative",
        overflow: "visible",
        pb: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.25s ease",
        "&:hover": { boxShadow: 8 },
      }}
    >
      {/* Image + overlay badges */}
      <Box sx={{ position: "relative" }}>
        <Box
          component="img"
          src={c.img}
          alt={c.name}
          loading="lazy"
          sx={{
            width: "100%",
            height: 176,
            objectFit: "cover",
            display: "block",
            borderTopLeftRadius: (theme) => theme.shape.borderRadius,
            borderTopRightRadius: (theme) => theme.shape.borderRadius,
          }}
        />

        {/* Ribbon badge, top-left */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            bgcolor: "primary.main",
            color: WHITE,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 0.5,
            textTransform: "uppercase",
            px: 2,
            py: 1.5,
            borderTopRightRadius: 999,
            borderBottomRightRadius: 999,
            borderTopLeftRadius: 500,
            boxShadow: 2,
              fontFamily: '"open sans", sans-serif',
          }}
        >
          {c.ribbon}
        </Box>

        {/* Veg / Non-Veg symbols, top-right */}
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
          }}
        >
          {veg && <VegNonVegSymbol type="veg" />}
          {nonVeg && <VegNonVegSymbol type="nonveg" />}
        </Stack>

        {/* Rating badge, bottom-left */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            position: "absolute",
            bottom: 12,
            left: 12,
            bgcolor: GOLD,
            color: "primary.dark",
            px: 1,
            py: 0.5,
            borderRadius: 999,
            boxShadow: 2,
          }}
        >
          <StarIcon sx={{ fontSize: 14 }} />
          <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1,  fontFamily: '"open sans", sans-serif', }}>
            {c.rating}
          </Typography>
        </Stack>

        {/* View menu button */}
        <Button
          aria-label={`View menu for ${c.name}`}
          startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
          sx={{
            position: "absolute",
            bottom: 11,
            right: 10,
            height: 30,
            px: 2,
            bgcolor: "primary.main",
            color: WHITE,
        
            boxShadow: 3,
            borderRadius: 999,
            textTransform: "none",
            fontSize: 12,
              fontFamily: '"open sans", sans-serif',
            fontWeight: 700,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          View
        </Button>
      </Box>

      {/* Text content */}
      <Box
        sx={{
          px: 2.5,
          pt: 3,
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: 15,
            lineHeight: 1.3,
            fontFamily: '"open sans", sans-serif',
          }}
        >
          {c.name}
        </Typography>

        <Typography sx={{ color: "text.secondary", fontSize: 12, mt: 0.3,  fontFamily: '"open sans", sans-serif', }}>
          {c.area}
        </Typography>

        <Typography
          sx={{ color: "text.secondary", opacity: 0.7, fontSize: 11, mt: 1,  fontFamily: '"open sans", sans-serif',}}
        >
          FSSAI No: {c.fssai}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: "auto", pt: 1.5 }}>
          {c.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                bgcolor: "#fdf0f1",
                color: "primary.main",
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                border: "1px solid #f6d9dc",
                height: 22,
                fontFamily: '"open sans", sans-serif',
              }}
            />
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

const DEFAULT_SELECTED_FILTERS = {
  cuisine: [],
  pricePerPerson: [],
  mealType: [],
  foodType: [],
  services: [],
  dietary: [],
  ratings: [],
};

export default function ChooseRestaurant() {
  const routerLocation = useLocation();
  const selectedLocation = routerLocation.state?.selectedLocation;
  const selectedLocationText = selectedLocation?.full || selectedLocation?.label || "";

  const { list: caterers, isFallback } = useMemo(() => {
    if (!selectedLocationText) {
      return { list: allRestaurants, isFallback: false };
    }
    const nearby = filterNearbyRestaurants(selectedLocationText);
    return nearby.length > 0
      ? { list: nearby, isFallback: false }
      : { list: allRestaurants, isFallback: true };
  }, [selectedLocationText]);

  const [searchValue, setSearchValue] = useState("");
  const [sortValue, setSortValue] = useState("relevance");
  const [selectedFilters, setSelectedFilters] = useState(DEFAULT_SELECTED_FILTERS);

  const handleFilterToggle = (groupKey, value) => {
    setSelectedFilters((prev) => {
      const current = prev[groupKey] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [groupKey]: next };
    });
  };

  const handleClearAllFilters = () => {
    setSelectedFilters(DEFAULT_SELECTED_FILTERS);
  };

  const filteredCaterers = useMemo(() => {
    let result = [...caterers];

    const query = searchValue.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(query) ||
          c.area?.toLowerCase().includes(query) ||
          c.tags?.some((t) => t.toLowerCase().includes(query))
      );
    }

    const activeGroups = Object.entries(selectedFilters).filter(
      ([, values]) => values && values.length > 0
    );

    if (activeGroups.length > 0) {
      result = result.filter((c) => {
        const haystack = [
          ...(c.tags || []),
          c.cuisine,
          c.mealType,
          c.foodType,
          c.pricePerPerson,
          c.services,
          c.dietary,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return activeGroups.every(([groupKey, values]) => {
          if (groupKey === "ratings") {
            return values.some((v) => {
              const threshold = parseFloat(v);
              return !Number.isNaN(threshold) && Number(c.rating) >= threshold;
            });
          }
          return values.some((v) => haystack.includes(String(v).toLowerCase()));
        });
      });
    }

    if (sortValue === "rating_desc") {
      result = [...result].sort((a, b) => Number(b.rating) - Number(a.rating));
    } else if (sortValue === "price_asc") {
      const getPrice = (c) => c.price ?? c.startingPrice ?? c.pricePerPerson ?? Infinity;
      result = [...result].sort((a, b) => getPrice(a) - getPrice(b));
    } else if (sortValue === "price_desc") {
      const getPrice = (c) => c.price ?? c.startingPrice ?? c.pricePerPerson ?? -Infinity;
      result = [...result].sort((a, b) => getPrice(b) - getPrice(a));
    }

    return result;
  }, [caterers, searchValue, selectedFilters, sortValue]);

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 6, md: 4 } }}>
      <Container maxWidth="lg">
        {/* Header banner */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Box sx={{ color: "primary.main",position:'relative',top:4.5,left:13 }}>
            <ChevronLinesDecor direction="right" />
          </Box>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontSize: { xs: 22, sm: 28, md: 32 },
              textAlign: "center",
              fontFamily: '"Montserrat", sans-serif',
            }}
          >
           Caterers
          </Typography>
          <Box sx={{ color: "primary.main",position:'relative',top:4.5,right:20  }}>
            <ChevronLinesDecor direction="left" />
          </Box>
        </Stack>
        <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 14,   fontFamily: '"open sans", sans-serif', mt: 1, mb: selectedLocation ? 4 : 6 }}>
          Caterers near you, picked for taste and trust
        </Typography>

        {/* Left filters sidebar + right results grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={3.5} lg={3}>
            <FilterSortBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              sortValue={sortValue}
              onSortChange={setSortValue}
              selectedFilters={selectedFilters}
              onFilterToggle={handleFilterToggle}
              onClearAll={handleClearAllFilters}
            />
          </Grid>

          <Grid item xs={12} md={8.5} lg={9}>
            <Grid container spacing={{ xs: 4, md: 5 }}>
              {filteredCaterers.map((c) => (
                <Grid item xs={12} sm={6} lg={4} key={c.id}>
                  <CatererCard c={c} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}