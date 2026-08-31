import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  Chip,
  Button,
  Stack,
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import VisibilityIcon from "@mui/icons-material/Visibility";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import allRestaurants, { filterNearbyRestaurants } from "../../../data/restaurants";
import fallbackImg from "../../../assets/menu/chosseRestaurent/img1.jpg";
import { fetchVendorsNear } from "../../../store/slices/catalogSlice";
import FilterSortBar, {
  FILTER_GROUPS,
  SORTING_OPTIONS,
  getActiveFilterChips,
} from "../../Common/FilterSortBar/FilterSortBar";

function normalizeVendor(v) {
  return {
    id: v.slug || v._id || v.id,
    slug: v.slug,
    vendorId: v._id || v.id,
    name: v.fullName || v.name || "Caterer",
    area: v.area || v.city || "",
    matchKeywords: [],
    fssai: v.fssai || v.fssaiNo || "-",
    tags: Array.isArray(v.tags)
      ? v.tags
      : typeof v.tags === "string" && v.tags.trim() !== ""
      ? v.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : Array.isArray(v.cuisine)
      ? v.cuisine
      : typeof v.cuisine === "string" && v.cuisine.trim() !== ""
      ? v.cuisine.split(",").map((t) => t.trim()).filter(Boolean)
      : [],
    rating: v.rating != null ? String(v.rating) : "4.0",
    ribbon: v.ribbon,
    img: v.img || v.logo || v.banner || fallbackImg,
    isVeg: typeof v.isVeg === "boolean" ? v.isVeg : undefined,
    isNonVeg: typeof v.isNonVeg === "boolean" ? v.isNonVeg : undefined,
    price: v.price ?? v.startingPrice ?? v.pricePerPerson,
    minPlates: v.minPlates ?? v.min,
    eventsCount: v.eventsCount,
  };
}


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

  const tagsArray = Array.isArray(c.tags)
    ? c.tags
    : typeof c.tags === "string"
    ? c.tags.split(",")
    : [];
  const tagText = tagsArray.join(" ").toLowerCase();
  const tagHasVeg = /(^|\s)veg(\s|$)/.test(tagText);
  const tagHasNonVeg = /non[\s-]?veg/.test(tagText);

  if (tagHasVeg || tagHasNonVeg) {
    return { veg: tagHasVeg, nonVeg: tagHasNonVeg };
  }

  // No explicit signal available — assume the caterer offers both.
  return { veg: true, nonVeg: true };
}
function matchesDietaryFilter(caterer, value) {
  if (value === "Veg" || value === "Non-Vege") {
    const { veg, nonVeg } = getVegNonVegFlags(caterer);
    return value === "Veg" ? veg && !nonVeg : nonVeg && !veg;
  }

  // Jain / Vegan / Eggless — no dedicated flag exists on the caterer data
  // yet, so fall back to the same text-matching used by the other groups.
  const haystack = [
    ...(Array.isArray(caterer.tags) ? caterer.tags : caterer.tags ? [caterer.tags] : []),
    caterer.cuisine,
    caterer.mealType,
    caterer.foodType,
    caterer.pricePerPerson,
    caterer.services,
    caterer.dietary,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(String(value).toLowerCase());
}

function DietSquare({ color }) {
  return (
    <Box
      sx={{
        width: 9,
        height: 9,
        border: `1.5px solid ${color}`,
        borderRadius: "2px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: color }} />
    </Box>
  );
}

function DietBadge({ veg, nonVeg }) {
  if (!veg && !nonVeg) return null;
  const label = veg && nonVeg ? "Veg & Non-Veg" : veg ? "Veg" : "Non-Veg";
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.6}
      sx={{
        position: "absolute",
        top: 10,
        left: 10,
        bgcolor: "#fff",
        px: 1,
        py: 0.5,
        borderRadius: 999,
        boxShadow: 1,
      }}
    >
      {/* Show both indicators when the caterer offers both veg and non-veg */}
      {veg && <DietSquare color={VEG_GREEN} />}
      {nonVeg && <DietSquare color={NONVEG_RED} />}
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: 0.3,
          textTransform: "uppercase",
          color: "text.primary",
          fontFamily: '"open sans", sans-serif',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

function CatererCard({ c, onView }) {
  const { veg, nonVeg } = getVegNonVegFlags(c);
  // Falls back to a dummy price when the caterer record doesn't have one yet.
  const price = c.price ?? c.startingPrice ?? c.pricePerPerson ?? 249;

  return (
    <Card
      elevation={3}
      sx={{
        position: "relative",
        overflow: "visible",
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

        <DietBadge veg={veg} nonVeg={nonVeg} />

        {c.ribbon && (
          <Box
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: /new/i.test(c.ribbon) ? "#D97706" : "rgba(26,26,26,0.9)",
              color: WHITE,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 0.4,
              textTransform: "uppercase",
              px: 1.25,
              py: 0.6,
              borderRadius: 1,
              boxShadow: 2,
              fontFamily: '"open sans", sans-serif',
            }}
          >
            {c.ribbon}
          </Box>
        )}
      </Box>

      {/* Text content */}
      <Box
        sx={{
          px: 2.5,
          pt: 2,
          pb: 2.5,
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
            minHeight: "2.6em",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {c.name}
        </Typography>

        <Typography sx={{ color: "text.secondary", fontSize: 12, mt: 0.3, fontFamily: '"open sans", sans-serif' }}>
          {c.area}
        </Typography>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mt: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.6}>
            <StarIcon sx={{ fontSize: 15, color: GOLD }} />
            <Typography
              sx={{ fontSize: 13, fontWeight: 700, color: "text.primary", fontFamily: '"open sans", sans-serif' }}
            >
              {c.rating}
            </Typography>
            {c.eventsCount ? (
              <Typography sx={{ fontSize: 12, color: "text.secondary", fontFamily: '"open sans", sans-serif' }}>
                · {c.eventsCount} events
              </Typography>
            ) : null}
          </Stack>

          <Typography
            sx={{ color: "text.secondary", opacity: 0.7, fontSize: 11, fontFamily: '"open sans", sans-serif' }}
          >
            FSSAI No: {c.fssai}
          </Typography>
        </Stack>

        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1.5 }}>
          {(Array.isArray(c.tags) ? c.tags : c.tags ? [c.tags] : []).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                bgcolor: "#f1efee",
                color: "text.primary",
                fontSize: 10,
                fontWeight: 600,
                textTransform: "uppercase",
                height: 22,
                fontFamily: '"open sans", sans-serif',
              }}
            />
          ))}
        </Stack>

        <Stack direction="row" alignItems="flex-end" justifyContent="space-between" sx={{ mt: "auto", pt: 2 }}>
          <Box>
            {price != null && (
              <Typography sx={{ fontSize: 17, fontWeight: 800, color: "text.primary", fontFamily: '"open sans", sans-serif' }}>
                ₹{price}
                <Typography component="span" sx={{ fontSize: 12, fontWeight: 600, color: "text.secondary" }}>
                  /plate
                </Typography>
              </Typography>
            )}
            {c.minPlates ? (
              <Typography sx={{ fontSize: 11, color: "text.secondary", fontFamily: '"open sans", sans-serif' }}>
                min {c.minPlates} plates
              </Typography>
            ) : null}
          </Box>

          <Button
            aria-label={`View menu for ${c.name}`}
            startIcon={<VisibilityIcon sx={{ fontSize: 16 }} />}
            onClick={() => onView(c)}
            sx={{
              height: 34,
              px: 2,
              bgcolor: "primary.main",
              color: WHITE,
              boxShadow: 2,
              borderRadius: 999,
              textTransform: "none",
              fontSize: 12,
              fontWeight: 700,
              fontFamily: '"open sans", sans-serif',
              "&:hover": { bgcolor: "primary.dark" },
            }}
          >
            View
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}

const DEFAULT_SELECTED_FILTERS = {
  sorting: [],
  cuisine: [],
  pricePerPerson: [],
  mealType: [],
  foodType: [],
  services: [],
  dietary: [],
  ratings: [],
};

const SORT_COMPARATORS = {
  relevance: () => 0,
  nearest: () => 0,
  popular: () => 0,
  rating_desc: (a, b) => Number(b.rating) - Number(a.rating),
  price_asc: (a, b) =>
    (a.price ?? a.startingPrice ?? a.pricePerPerson ?? Infinity) -
    (b.price ?? b.startingPrice ?? b.pricePerPerson ?? Infinity),
  price_desc: (a, b) =>
    (b.price ?? b.startingPrice ?? b.pricePerPerson ?? -Infinity) -
    (a.price ?? a.startingPrice ?? a.pricePerPerson ?? -Infinity),
};

export default function ChooseRestaurant() {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedLocation = routerLocation.state?.selectedLocation;
  const selectedLocationText = selectedLocation?.full || selectedLocation?.label || "";
  const hasCoords = typeof selectedLocation?.lat === "number" && typeof selectedLocation?.lon === "number";

  const {
    vendorsNear,
    vendorsNearLoading,
    vendorsNearError,
  } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (hasCoords) {
      dispatch(fetchVendorsNear({ lat: selectedLocation.lat, long: selectedLocation.lon }));
    }
  }, [dispatch, hasCoords, selectedLocation?.lat, selectedLocation?.lon]);

  const { list: caterers, isFallback } = useMemo(() => {
    if (!hasCoords) {
      if (!selectedLocationText) {
        return { list: allRestaurants, isFallback: false };
      }
      const nearby = filterNearbyRestaurants(selectedLocationText);
      return nearby.length > 0
        ? { list: nearby, isFallback: false }
        : { list: allRestaurants, isFallback: true };
    }
    if (vendorsNearError || vendorsNear.length === 0) {
      const nearby = filterNearbyRestaurants(selectedLocationText);
      return nearby.length > 0
        ? { list: nearby, isFallback: true }
        : { list: allRestaurants, isFallback: true };
    }
    return { list: vendorsNear.map(normalizeVendor), isFallback: false };
  }, [hasCoords, selectedLocationText, vendorsNear, vendorsNearError]);

  const [searchValue, setSearchValue] = useState("");
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

  const handleSortChange = (value) => {
    setSelectedFilters((prev) => ({ ...prev, sorting: value ? [value] : [] }));
  };

  const handleClearAllFilters = () => {
    setSelectedFilters(DEFAULT_SELECTED_FILTERS);
  };

  const handleHomeClick = () => {
    navigate(-1);
  };

  const handleViewMenu = (restaurant) => {
    navigate(`/menu-detail/${restaurant.id}`, {
      state: { restaurant, selectedLocation },
    });
  };

  const optionCounts = useMemo(() => {
    const counts = {};
    FILTER_GROUPS.forEach((group) => {
      counts[group.key] = {};
      group.options.forEach((opt) => {
        counts[group.key][opt.value] = caterers.filter((c) => {
          if (group.key === "ratings") {
            const threshold = parseFloat(opt.value);
            return !Number.isNaN(threshold) && Number(c.rating) >= threshold;
          }
          if (group.key === "dietary") {
            return matchesDietaryFilter(c, opt.value);
          }
          const haystack = [
            ...(Array.isArray(c.tags) ? c.tags : c.tags ? [c.tags] : []),
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
          return haystack.includes(String(opt.value).toLowerCase());
        }).length;
      });
    });
    return counts;
  }, [caterers]);

  const activeChips = useMemo(() => getActiveFilterChips(selectedFilters), [selectedFilters]);

  const filteredCaterers = useMemo(() => {
    let result = [...caterers];

    const query = searchValue.trim().toLowerCase();
    if (query) {
      result = result.filter(
        (c) =>
          c.name?.toLowerCase().includes(query) ||
          c.area?.toLowerCase().includes(query) ||
          (Array.isArray(c.tags) ? c.tags : c.tags ? [c.tags] : []).some((t) =>
            String(t).toLowerCase().includes(query)
          )
      );
    }

    const activeGroups = Object.entries(selectedFilters).filter(
      ([groupKey, values]) => groupKey !== "sorting" && values && values.length > 0
    );

    if (activeGroups.length > 0) {
      result = result.filter((c) => {
        const haystack = [
          ...(Array.isArray(c.tags) ? c.tags : c.tags ? [c.tags] : []),
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
          if (groupKey === "dietary") {
            return values.some((v) => matchesDietaryFilter(c, v));
          }
          return values.some((v) => haystack.includes(String(v).toLowerCase()));
        });
      });
    }

    const activeSorts = selectedFilters.sorting || [];
    if (activeSorts.length > 0) {
      result = [...result].sort((a, b) => {
        for (const sortKey of activeSorts) {
          const comparator = SORT_COMPARATORS[sortKey];
          const outcome = comparator ? comparator(a, b) : 0;
          if (outcome !== 0) return outcome;
        }
        return 0;
      });
    }

    return result;
  }, [caterers, searchValue, selectedFilters]);

  const locationCountLabel = selectedLocation?.label || selectedLocationText || "your area";

  return (
    <Box sx={{ bgcolor: "#FFF", py: { xs: 6, md: 4 } }}>
      <Container
        maxWidth="lg"
        sx={{
          "@media (min-width:1400px) and (max-width:1600px)": {
            maxWidth: "1400px",
            px: 2,
          },
        }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3, ml: 1 }}
        >
          <Link
            component="button"
            variant="body2"
            onClick={handleHomeClick}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "primary.main",
              fontWeight: 600,
              fontFamily: '"open sans", sans-serif',
              
            }}
          >
            Home
          </Link>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              fontFamily: '"open sans", sans-serif',
            }}
          >
            Caterers
          </Typography>
        </Breadcrumbs>

        {/* Left filters sidebar + right results grid */}
        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid item xs={12} md={3.5} lg={3}>
            <FilterSortBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              selectedFilters={selectedFilters}
              onFilterToggle={handleFilterToggle}
              onClearAll={handleClearAllFilters}
              optionCounts={optionCounts}
            />
          </Grid>

          <Grid item xs={12} md={8.5} lg={9}>
            {/* Results header: title + subtitle on the left, sort dropdown on the right */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: activeChips.length > 0 ? 2 : 4 }}
            >
              <Box>
                <Typography
                  sx={{
                    color: "text.primary",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    fontSize: { xs: 22, sm: 26, md: 30 },
                    fontFamily: '"Montserrat", sans-serif',
                  }}
                >
                  Caterers
                </Typography>
               
                <Typography
                  sx={{
                    color: "text.primary",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: '"open sans", sans-serif',
                    mt: 0.5,
                  }}
                >
                  {filteredCaterers.length} {filteredCaterers.length === 1 ? "caterer" : "caterers"} found near {locationCountLabel}
                </Typography>
              </Box>

              <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600, color: "text.secondary", fontFamily: '"open sans", sans-serif' }}
                >
                  Sort
                </Typography>
                <FormControl size="small">
                  <Select
                    value={selectedFilters.sorting?.[0] || "relevance"}
                    onChange={(e) => handleSortChange(e.target.value)}
                    sx={{
                      minWidth: 190,
                      borderRadius: 999,
                      fontSize: 13,
                      fontFamily: '"open sans", sans-serif',
                      "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(43,33,28,0.15)" },
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "primary.main" },
                    }}
                  >
                    {SORTING_OPTIONS.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value} sx={{ fontSize: 13, fontFamily: '"open sans", sans-serif' }}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>

            {/* Active filter chips */}
            {activeChips.length > 0 && (
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                {activeChips.map((chip) => (
                  <Chip
                    key={`${chip.groupKey}-${chip.value}`}
                    label={chip.label}
                    onDelete={() => handleFilterToggle(chip.groupKey, chip.value)}
                    size="small"
                    sx={{
                      bgcolor: "#f1efee",
                      color: "text.primary",
                      fontWeight: 600,
                      fontSize: 12,
                      fontFamily: '"open sans", sans-serif',
                      "& .MuiChip-deleteIcon": { fontSize: 12, color: "text.secondary" },
                    }}
                  />
                ))}
              </Stack>
            )}

            {hasCoords && vendorsNearLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                <CircularProgress size={28} />
              </Box>
            ) : (
              <Grid container spacing={{ xs: 4, md: 5 }}>
                {filteredCaterers.map((c) => (
                  <Grid item xs={12} sm={6} lg={4} key={c.id}>
                    <CatererCard c={c} onView={handleViewMenu} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}