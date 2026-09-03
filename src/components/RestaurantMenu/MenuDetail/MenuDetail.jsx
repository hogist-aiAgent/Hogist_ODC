import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Stack,
  Breadcrumbs,
  Link,
  Button,
  IconButton,
  Divider,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import VerifiedIcon from "@mui/icons-material/Verified";

import { addPlanMeal } from "@/utils/planStorage";
import getMenuDetailById from "../../../data/menuDetails";

import { fetchVendorWithMenu, fetchMenuList, clearVendorDetail } from "../../../store/slices/catalogSlice";

const RED = "#9a0002";
const VEG_GREEN = "#2E7D32";
const INK = "#1B1B23";
const INK_SOFT = "#6B6B76";
const CARD_BORDER = "rgba(43,33,28,0.12)";
const FONT = '"open sans", sans-serif';

// Headcount rules: step by 10, minimum 30 guests, with quick-add jumps for large counts.
const PLATES_MIN = 30;
const PLATES_STEP = 10;
const QUICK_ADD_AMOUNTS = [50, 100, 500];

const currency = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

/* ----------------------------- small pieces ----------------------------- */

function BadgeChip({ label }) {
  const isVeg = /veg/i.test(label) && !/non/i.test(label);
  const isTop = /most booked|top rated/i.test(label);

  if (isVeg) {
    return (
      <Chip
        size="small"
        label={label}
        sx={{
          bgcolor: "#fff",
          border: `1px solid ${VEG_GREEN}`,
          color: VEG_GREEN,
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 0.3,
          fontFamily: FONT,
          height: 26,
        }}
      />
    );
  }
  if (isTop) {
    return (
      <Chip
        size="small"
        label={label}
        sx={{
          bgcolor: INK,
          color: "#fff",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: 0.3,
          fontFamily: FONT,
          height: 26,
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      icon={<VerifiedIcon sx={{ fontSize: 14, color: `${INK_SOFT} !important` }} />}
      label={label}
      variant="outlined"
      sx={{
        color: INK_SOFT,
        borderColor: CARD_BORDER,
        fontWeight: 700,
        fontSize: 11,
        letterSpacing: 0.3,
        fontFamily: FONT,
        height: 26,
      }}
    />
  );
}

function GalleryPlaceholder({ img, label, overlayCount }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "#EDEAE6",
        border: `1px solid ${CARD_BORDER}`,
      }}
    >
      {img ? (
        <Box
          component="img"
          src={img}
          alt={label}
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ color: "#B7B0A9", fontSize: 12, fontFamily: FONT }}>{label}</Typography>
        </Box>
      )}
      {overlayCount ? (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(27,27,35,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 800, fontSize: 20, fontFamily: FONT }}>
            +{overlayCount}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}


function SelectableItemCard({ item, control, selected, onToggle }) {
  return (
    <Box
      onClick={() => onToggle(item.id)}
      sx={{
        cursor: "pointer",
        border: `1.5px solid ${selected ? RED : CARD_BORDER}`,
        borderRadius: 2,
        px: 2,
        py: 1.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
        bgcolor: selected ? "rgba(154,0,2,0.03)" : "#fff",
        height: "100%",
        transition: "border-color 0.15s ease, background-color 0.15s ease",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
        <Box
          sx={{
            width: 18,
            height: 18,
            flexShrink: 0,
            borderRadius: control === "radio" ? "50%" : "5px",
            border: `2px solid ${selected ? RED : "#C9C2BB"}`,
            bgcolor: selected ? RED : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selected && control === "radio" && (
            <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: "#fff" }} />
          )}
          {selected && control === "checkbox" && (
            <Box
              sx={{
                width: 8,
                height: 5,
                borderLeft: "2px solid #fff",
                borderBottom: "2px solid #fff",
                transform: "rotate(-45deg) translate(0.5px, -1px)",
              }}
            />
          )}
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, fontFamily: FONT }} noWrap>
            {item.name}
          </Typography>
          {item.subtitle && (
            <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, mt: 0.1 }}>
              {item.subtitle}
            </Typography>
          )}
        </Box>
      </Stack>

      <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: INK, fontFamily: FONT, flexShrink: 0, pl: 1 }}>
        {item.pricePerPlate ? `+₹${item.pricePerPlate}` : "Free"}
      </Typography>
    </Box>
  );
}

function SectionBlock({ section, selection, onToggle }) {
  const selectedCount =
    section.type === "single" ? (selection ? 1 : 0) : (selection || []).length;

  return (
    <Box sx={{ mb: 3.5 }}>
      <Stack direction="row" alignItems="baseline" justifyContent="space-between" sx={{ mb: 0.25 }}>
        <Stack direction="row" alignItems="baseline" spacing={1}>
          <Typography sx={{ fontWeight: 800, fontSize: 15, color: INK, fontFamily: FONT }}>
            {section.title}
          </Typography>
      
        </Stack>
        {selectedCount > 0 && (
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: RED, fontFamily: FONT }}>
            {selectedCount} selected
          </Typography>
        )}
      </Stack>
      {section.helperText && (
        <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, mb: 1.25 }}>
          {section.helperText}
        </Typography>
      )}

      {section.items.length === 0 ? (
        <Typography sx={{ fontSize: 12.5, color: INK_SOFT, fontFamily: FONT, fontStyle: "italic" }}>
          No items added yet.
        </Typography>
      ) : (
        <Grid container spacing={1.5} sx={{ mt: section.helperText ? 0 : 0.25 }}>
          {section.items.map((item) => {
            const isSelected =
              section.type === "single" ? selection === item.id : (selection || []).includes(item.id);
            return (
              <Grid item xs={12} sm={6} key={item.id}>
                <SelectableItemCard
                  item={item}
                  control={section.type === "single" ? "radio" : "checkbox"}
                  selected={isSelected}
                  onToggle={() => onToggle(section.id, item.id, section.type)}
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

/* --------------------------------- main ---------------------------------- */

export default function MenuDetail() {
  const { restaurantId } = useParams();
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Every restaurant/caterer id now comes from the ODC vendor API (slug or
  // _id) — the hardcoded numeric-id local menu path has been removed.
  const {
    vendorDetail,
    vendorDetailMenu,
    vendorDetailReviews,
    vendorDetailLoading,
    vendorDetailError,
    menuCards,
  } = useSelector((state) => state.catalog);

  useEffect(() => {
    // TEMP: API call commented out — using dummy data to test the flow.
    // if (restaurantId) {
    //   dispatch(fetchVendorWithMenu({ slug: restaurantId }));
    // }
    return () => {
      if (restaurantId) dispatch(clearVendorDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, restaurantId]);


  useEffect(() => {
    // TEMP: API call commented out — using dummy data to test the flow.
    // if (vendorDetail?._id) {
    //   dispatch(fetchMenuList({ vendor: vendorDetail._id }));
    // }
  }, [dispatch, vendorDetail?._id]);

  const apiMenu = useMemo(() => {
    if (!vendorDetail) return null;
    const fallbackRestaurant = routerLocation.state?.restaurant;
    return {
      restaurantId: vendorDetail.slug || vendorDetail._id,
      caterer: vendorDetail.fullName || fallbackRestaurant?.name || "Caterer",
      area: vendorDetail.area || vendorDetail.city || fallbackRestaurant?.area || "",
      rating: vendorDetail.rating != null ? String(vendorDetail.rating) : fallbackRestaurant?.rating || "4.0",
      fssai: vendorDetail.fssai || fallbackRestaurant?.fssai || "-",
      img: vendorDetail.img || vendorDetail.logo || vendorDetail.banner || fallbackRestaurant?.img,
      dishTitle: vendorDetail.fullName ? `${vendorDetail.fullName} Menu` : "Menu",
      badges: [
        ...(vendorDetail.isVeg && !vendorDetail.isNonVeg ? ["PURE VEG"] : []),
        ...(vendorDetail.fssai ? ["FSSAI CERTIFIED"] : []),
      ],
      description: vendorDetail.description || "",
      eventContext: { occasion: "Event", guests: 100, date: "TBD", slot: "TBD" },
      reviewsCount: vendorDetailReviews.length,
      pricing: {
        minPlates: vendorDetail.min || 50,
        defaultPlates: vendorDetail.min || 50,
        plateStep: 10,
        transportFee: 0,
        seasonOffer: { code: "", amount: 0 },
      },
      sections: [
        {
          id: "menu-items",
          title: "Menu items",
          type: "multiple",
          location: "body",
          items: (menuCards.length > 0 ? menuCards : vendorDetailMenu).map((card) => ({
            id: card._id || card.id,
            name: card.name || card.title || "Menu item",
            subtitle: card.description || card.category || "",
            pricePerPlate: card.price ?? card.pricePerPlate ?? 0,
          })),
        },
      ],
    };
  }, [vendorDetail, vendorDetailMenu, vendorDetailReviews, menuCards, routerLocation.state]);

  // Menu data comes from the ODC vendor/menu API when available; otherwise
  // falls back to the hardcoded dummy menu so the flow can still be tested.
  const fallbackMenu = useMemo(
    () => (restaurantId ? getMenuDetailById(restaurantId) : null),
    [restaurantId]
  );
  // TEMP: forcing dummy data — restore the line below to use the API again.
  // const menu = apiMenu || fallbackMenu;
  const menu = fallbackMenu;

  const bodySections = useMemo(() => (menu?.sections || []).filter((s) => s.location !== "sidebar"), [menu]);
  const sidebarSections = useMemo(() => (menu?.sections || []).filter((s) => s.location === "sidebar"), [menu]);


  const [selections, setSelections] = useState({});
  const [plates, setPlates] = useState(menu?.pricing?.defaultPlates ?? 0);
  // Per-item guest count — lets someone set e.g. 100 veg / 50 non-veg
  // instead of every selected item following the total headcount.
  const [itemQuantities, setItemQuantities] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  // Raw text being typed into the PLATES count field — kept separate from
  // the numeric `plates` state so the field can be freely cleared/retyped.
  const [platesInputValue, setPlatesInputValue] = useState(String(plates));
  // Raw text being typed into each item's quantity field, keyed by item id.
  const [itemQuantityInputs, setItemQuantityInputs] = useState({});

  useEffect(() => {
    if (menu) setPlates(Math.max(PLATES_MIN, menu.pricing.defaultPlates));
  }, [menu?.restaurantId]);

  // Keep the editable PLATES text field in sync whenever the numeric value
  // changes via the +/- buttons or the quick-add pills.
  useEffect(() => {
    setPlatesInputValue(String(plates));
  }, [plates]);

  const handleToggle = (sectionId, itemId, type) => {
    setSelections((prev) => {
      if (type === "single") {
        const next = prev[sectionId] === itemId ? null : itemId;
        return { ...prev, [sectionId]: next };
      }
      const current = prev[sectionId] || [];
      const nextArr = current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId];
      return { ...prev, [sectionId]: nextArr };
    });
  };

  // Headcount: +/- move by 10, floor of 30 guests.
  const handlePlatesChange = (delta) => {
    setPlates((prev) => Math.max(PLATES_MIN, prev + delta * PLATES_STEP));
  };

  // Quick-add pills (+50 / +100 / +500) for jumping to large headcounts fast.
  const handleQuickAddPlates = (amount) => {
    setPlates((prev) => prev + amount);
  };

  // Manual typing into the PLATES field — allow free editing (including
  // empty/partial text) and only commit + clamp on blur or Enter.
  const handlePlatesInputChange = (event) => {
    const raw = event.target.value;
    if (raw === "" || /^[0-9]+$/.test(raw)) {
      setPlatesInputValue(raw);
    }
  };

  const commitPlatesInput = () => {
    const parsed = parseInt(platesInputValue, 10);
    const next = Number.isNaN(parsed) ? PLATES_MIN : Math.max(PLATES_MIN, parsed);
    setPlates(next);
    setPlatesInputValue(String(next));
  };

  const handlePlatesInputBlur = () => {
    commitPlatesInput();
  };

  const handlePlatesInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  // Per-item guest count — defaults to the overall headcount until adjusted.
  const handleItemQuantityChange = (itemId, delta) => {
    setItemQuantities((prev) => {
      const current = prev[itemId] ?? plates;
      const next = Math.max(0, current + delta);
      return { ...prev, [itemId]: next };
    });
  };

  // Manual typing into a per-item quantity field — same free-edit pattern
  // as the PLATES field, committed on blur/Enter.
  const handleItemQuantityInputChange = (itemId, event) => {
    const raw = event.target.value;
    if (raw === "" || /^[0-9]+$/.test(raw)) {
      setItemQuantityInputs((prev) => ({ ...prev, [itemId]: raw }));
    }
  };

  const commitItemQuantityInput = (itemId) => {
    const raw = itemQuantityInputs[itemId];
    const parsed = parseInt(raw, 10);
    const next = Number.isNaN(parsed) ? 0 : Math.max(0, parsed);
    setItemQuantities((prev) => ({ ...prev, [itemId]: next }));
    setItemQuantityInputs((prev) => ({ ...prev, [itemId]: String(next) }));
  };

  const handleItemQuantityInputBlur = (itemId) => {
    commitItemQuantityInput(itemId);
  };

  const handleItemQuantityInputKeyDown = (itemId, event) => {
    if (event.key === "Enter") {
      event.target.blur();
    }
  };

  const pricing = useMemo(() => {
    let pricePerPlate = 0;
    let foodTotal = 0;
    let selectedCount = 0;
    const selectedItemsList = [];

    (menu?.sections || []).forEach((section) => {
      const selection = selections[section.id];
      if (section.type === "single") {
        if (selection) {
          const item = section.items.find((i) => i.id === selection);
          if (item) {
            const qty = itemQuantities[item.id] ?? plates;
            pricePerPlate += item.pricePerPlate || 0;
            foodTotal += (item.pricePerPlate || 0) * qty;
            selectedCount += 1;
            selectedItemsList.push({ sectionId: section.id, item, qty });
          }
        }
      } else {
        (selection || []).forEach((itemId) => {
          const item = section.items.find((i) => i.id === itemId);
          if (item) {
            const qty = itemQuantities[item.id] ?? plates;
            pricePerPlate += item.pricePerPlate || 0;
            foodTotal += (item.pricePerPlate || 0) * qty;
            selectedCount += 1;
            selectedItemsList.push({ sectionId: section.id, item, qty });
          }
        });
      }
    });

    const hasSelection = selectedCount > 0;
    const seasonOfferAmount = hasSelection ? (menu?.pricing?.seasonOffer?.amount || 0) : 0;
    const transportFee = hasSelection ? (menu?.pricing?.transportFee || 0) : 0;
    const estimatedTotal = foodTotal + transportFee - seasonOfferAmount;

    return { pricePerPlate, foodTotal, estimatedTotal, hasSelection, selectedCount, selectedItemsList };
  }, [selections, plates, itemQuantities, menu]);

  const handleAddToPlan = () => {
    const itemsSelected = [];
    const itemIds = [];
    let serviceNote = "";

    menu.sections.forEach((section) => {
      const selection = selections[section.id];
      if (section.type === "single") {
        if (selection) {
          const item = section.items.find((i) => i.id === selection);
          if (item) {
            itemsSelected.push(item.name);
            itemIds.push(item.id);
            if (section.location === "sidebar" && item.subtitle) {
              serviceNote = item.subtitle;
            }
          }
        }
      } else {
        (selection || []).forEach((itemId) => {
          const item = section.items.find((i) => i.id === itemId);
          if (item) {
            itemsSelected.push(item.name);
            itemIds.push(item.id);
          }
        });
      }
    });

    const badgesText = menu.badges.join(" ");
    const isVeg = /veg/i.test(badgesText) && !/non[\s-]?veg/i.test(badgesText);

    addPlanMeal({
      id: `${menu.restaurantId}-${Date.now()}`,
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
      pricePerPlate: pricing.pricePerPlate,
      foodTotal: pricing.foodTotal,
      transportFee: pricing.hasSelection ? menu.pricing.transportFee : 0,
      seasonOfferCode: menu.pricing.seasonOffer.code,
      seasonOfferAmount: pricing.hasSelection ? menu.pricing.seasonOffer.amount : 0,
      estimatedTotal: pricing.estimatedTotal,
      img: menu.img,
    });

    navigate("/my-plan", {
      state: {
        restaurantId: menu.restaurantId,
        dishTitle: menu.dishTitle,
        plates,
        selections,
        estimatedTotal: pricing.estimatedTotal,
      },
    });
  };

  if (vendorDetailLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 14, pt: { xs: "72px", md: "88px" } }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!menu) {
    return (
      <Box sx={{ textAlign: "center", py: 14, pt: { xs: "72px", md: "88px" } }}>
        <Typography sx={{ fontFamily: FONT, color: INK_SOFT }}>
          {vendorDetailError || "This caterer's menu isn't available right now."}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#FFF", minHeight: "100vh", pt: { xs: "72px", md: "88px" } }}>
      {/* Event context bar */}
      <Box sx={{ bgcolor: "rgba(154,0,2,0.04)", borderBottom: `1px solid ${CARD_BORDER}` }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            spacing={0.5}
            sx={{ py: 1.25 }}
          >
            <Breadcrumbs separator={<NavigateNextIcon sx={{ fontSize: 15 }} />}>
              <Link
                component="button"
                variant="body2"
                onClick={() => navigate(-1)}
                sx={{ color: RED, fontWeight: 700, fontSize: 12.5, fontFamily: FONT, textDecoration: "none", mt: -0.7 }}
              >
                Menus
              </Link>
              
              <Typography sx={{ color: INK_SOFT, fontWeight: 600, fontSize: 12.5, fontFamily: FONT }}>
                {menu.caterer}
              </Typography>
            </Breadcrumbs>

          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
         
          <Grid item xs={12} md={7.5} lg={8}>
            {/* Gallery */}
            <Grid container spacing={1} sx={{ height: { xs: 220, sm: 280, md: 300 }, mb: 3 }}>
              <Grid item xs={8} sx={{ height: "100%" }}>
                <GalleryPlaceholder img={menu.img} label="photo" />
              </Grid>
              <Grid item xs={4} sx={{ height: "100%" }}>
                <Stack spacing={1} sx={{ height: "100%" }}>
                  <Box sx={{ flex: 1 }}>
                    <GalleryPlaceholder label="photo" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <GalleryPlaceholder label="photo" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <GalleryPlaceholder img={menu.img} label="photo" overlayCount={4} />
                  </Box>
                </Stack>
              </Grid>
            </Grid>

            {/* Badges */}
            {menu.badges.length > 0 && (
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
                {menu.badges.map((b) => (
                  <BadgeChip key={b} label={b} />
                ))}
              </Stack>
            )}

            {/* Title */}
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: 22, md: 26 },
                color: INK,
                fontFamily: '"Montserrat", sans-serif',
                mb: 0.75,
              }}
            >
              {menu.dishTitle}
            </Typography>

            {/* Caterer line */}
            <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap" sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 13.5, color: INK, fontFamily: FONT }}>
                {menu.caterer}
              </Typography>
              <Typography sx={{ color: INK_SOFT, fontSize: 13 }}>·</Typography>
              <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>{menu.area}</Typography>
              <Typography sx={{ color: INK_SOFT, fontSize: 13 }}>·</Typography>
              <Stack direction="row" alignItems="center" spacing={0.4}>
                <StarIcon sx={{ fontSize: 15, color: "#F5A623" }} />
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: FONT }}>
                  {menu.rating}
                </Typography>
              </Stack>
              {menu.reviewsCount > 0 && (
                <>
                  <Typography sx={{ color: INK_SOFT, fontSize: 13 }}>·</Typography>
                  <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>
                    {menu.reviewsCount} reviews
                  </Typography>
                </>
              )}
            </Stack>

            <Typography sx={{ fontSize: 13.5, color: INK_SOFT, fontFamily: FONT, lineHeight: 1.7, mb: 2.5 }}>
              {menu.description}
            </Typography>

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              TabIndicatorProps={{ style: { backgroundColor: RED, height: 2.5 } }}
              sx={{
                minHeight: 36,
                borderBottom: `1px solid ${CARD_BORDER}`,
                mb: 3,
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 13,
                  minHeight: 36,
                  color: INK_SOFT,
                  px: { xs: 1.25, sm: 2 },
                },
                "& .Mui-selected": { color: `${RED} !important` },
              }}
              variant="scrollable"
              scrollButtons={false}
            >
              <Tab label="Menu & customise" />
              <Tab label="Kitchen & hygiene" />
              <Tab label="Service & logistics" />
              <Tab label={`Reviews (${menu.reviewsCount})`} />
            </Tabs>

            {activeTab !== 0 ? (
              <Typography sx={{ fontSize: 13.5, color: INK_SOFT, fontFamily: FONT, py: 4 }}>
                {activeTab === 1 &&
                  "Kitchen & hygiene details for this caterer will show up here — certifications, kitchen photos, and hygiene practices."}
                {activeTab === 2 &&
                  "Service & logistics details — crew arrival time, setup/cleanup, and delivery radius will show up here."}
                {activeTab === 3 && `${menu.reviewsCount} reviews from past events will show up here.`}
              </Typography>
            ) : (
              <>

                {bodySections.map((section) => (
                  <SectionBlock
                    key={section.id}
                    section={section}
                    selection={selections[section.id]}
                    onToggle={handleToggle}
                  />
                ))}
              </>
            )}
          </Grid>
{/* Pricing Panel */}
          <Grid item xs={12} md={4.5} lg={4}>
            <Box
              sx={{
                position: { md: "sticky" },
                top: { md: 100 },
                border: `1px solid ${CARD_BORDER}`,
                borderRadius: 2,
                p: 2.5,
                boxShadow: "0 6px 24px rgba(27,27,35,0.06)",
                height: { xs: 480, sm: 520, md: "calc(100vh - 140px)" },
                overflowY: "auto",
                scrollbarWidth: "none", 
                msOverflowStyle: "none", 
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 22, color: INK, fontFamily: FONT }}>
                {pricing.hasSelection ? currency(pricing.pricePerPlate) : "₹0"}
                <Typography component="span" sx={{ fontSize: 13, fontWeight: 600, color: INK_SOFT }}>
                  {" "}per plate
                </Typography>
              </Typography>
              <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT, mb: 2 }}>
                {pricing.hasSelection
                  ? `Minimum ${PLATES_MIN} plates · Taxes extra`
                  : "Select items from the menu to see pricing"}
              </Typography>

              {/* Plates stepper */}
              <Typography
                sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: INK_SOFT, fontFamily: FONT, mb: 0.75 }}
              >
                PLATES
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ border: `1px solid ${CARD_BORDER}`, borderRadius: 1, px: 1, py: 0.5, mb: 0.75 }}
              >
                <IconButton
                  size="small"
                  onClick={() => handlePlatesChange(-1)}
                  disabled={plates <= PLATES_MIN}
                  sx={{ border: `1px solid ${CARD_BORDER}` }}
                >
                  <RemoveIcon sx={{ fontSize: 16 }} />
                </IconButton>
                <Box
                  component="input"
                  type="text"
                  inputMode="numeric"
                  value={platesInputValue}
                  onChange={handlePlatesInputChange}
                  onBlur={handlePlatesInputBlur}
                  onKeyDown={handlePlatesInputKeyDown}
                  aria-label="Plates count"
                  sx={{
                    fontWeight: 800,
                    fontSize: 16,
                    fontFamily: FONT,
                    color: INK,
                    textAlign: "center",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    width: 64,
                    p: 0,
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => handlePlatesChange(1)}
                  sx={{ bgcolor: INK, color: "#fff", "&:hover": { bgcolor: "#000" } }}
                >
                  <AddIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Stack>

              {/* Quick-add jumps for large headcounts */}
              <Stack direction="row" spacing={1} sx={{ mb: 0.75 }}>
                {QUICK_ADD_AMOUNTS.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => handleQuickAddPlates(amount)}
                    variant="outlined"
                    sx={{
                      flex: 1,
                      minWidth: 0,
                      borderColor: CARD_BORDER,
                      color: INK,
                      fontWeight: 700,
                      fontSize: 12.5,
                      textTransform: "none",
                      borderRadius: 999,
                      py: 0.6,
                      fontFamily: FONT,
                      "&:hover": { borderColor: RED, color: RED, bgcolor: "rgba(154,0,2,0.03)" },
                    }}
                  >
                    +{amount}
                  </Button>
                ))}
              </Stack>

              <Typography sx={{ fontSize: 11, color: INK_SOFT, fontFamily: FONT, mb: 2 }}>
                Final headcount can be revised up to 48h before
              </Typography>

              {/* Your selection — per-item guest counts, independent of the overall headcount */}
              {pricing.selectedItemsList.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: INK_SOFT, fontFamily: FONT, mb: 0.75 }}
                  >
                    YOUR SELECTION
                  </Typography>
                  <Stack spacing={1}>
                    {pricing.selectedItemsList.map(({ item, qty }) => (
                      <Stack
                        key={item.id}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{ border: `1px solid ${CARD_BORDER}`, borderRadius: 2, px: 1.25, py: 1 }}
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: 13, color: INK, fontFamily: FONT }} noWrap>
                            {item.name}
                          </Typography>
                          {item.subtitle && (
                            <Typography sx={{ fontSize: 11, color: INK_SOFT, fontFamily: FONT }} noWrap>
                              {item.subtitle}
                            </Typography>
                          )}
                        </Box>
                        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ flexShrink: 0 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleItemQuantityChange(item.id, -1)}
                            disabled={qty <= 0}
                            sx={{ border: `1px solid ${CARD_BORDER}`, width: 26, height: 26 }}
                          >
                            <RemoveIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                          <Box
                            component="input"
                            type="text"
                            inputMode="numeric"
                            value={itemQuantityInputs[item.id] ?? String(qty)}
                            onChange={(event) => handleItemQuantityInputChange(item.id, event)}
                            onBlur={() => handleItemQuantityInputBlur(item.id)}
                            onKeyDown={(event) => handleItemQuantityInputKeyDown(item.id, event)}
                            aria-label={`${item.name} quantity`}
                            sx={{
                              fontWeight: 800,
                              fontSize: 13,
                              fontFamily: FONT,
                              color: INK,
                              textAlign: "center",
                              border: "none",
                              outline: "none",
                              background: "transparent",
                              width: 36,
                              p: 0,
                              
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleItemQuantityChange(item.id, 1)}
                            sx={{ bgcolor: INK, color: "#fff", width: 26, height: 26, "&:hover": { bgcolor: "#000" } }}
                          >
                            <AddIcon sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>
                  <Typography sx={{ fontSize: 10.5, color: INK_SOFT, fontFamily: FONT, mt: 1 }}>
                    Quantities are per guest — adjust an item if some guests need a different count.
                  </Typography>
                </Box>
              )}

              {/* Sidebar-located sections (e.g. service style) — data-driven, same rules: nothing pre-selected */}
              {sidebarSections.map((section) => (
                <Box key={section.id} sx={{ mb: 2 }}>
                  <Typography
                    sx={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: INK_SOFT, fontFamily: FONT, mb: 0.75 }}
                  >
                    {section.title.toUpperCase()}
                  </Typography>
                  <Stack spacing={1}>
                    {section.items.map((item) => {
                      const isSelected =
                        section.type === "single"
                          ? selections[section.id] === item.id
                          : (selections[section.id] || []).includes(item.id);
                      return (
                        <SelectableItemCard
                          key={item.id}
                          item={item}
                          control={section.type === "single" ? "radio" : "checkbox"}
                          selected={isSelected}
                          onToggle={() => handleToggle(section.id, item.id, section.type)}
                        />
                      );
                    })}
                  </Stack>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              {/* Cost breakdown */}
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>
                    Food total
                  </Typography>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: FONT }}>
                    {currency(pricing.foodTotal)}
                  </Typography>
                </Stack>
                {pricing.hasSelection && menu.pricing.transportFee > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>
                      Transport: {menu.area}
                    </Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: INK, fontFamily: FONT }}>
                      {currency(menu.pricing.transportFee)}
                    </Typography>
                  </Stack>
                )}
                {pricing.hasSelection && menu.pricing.seasonOffer.amount > 0 && (
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: 13, color: INK_SOFT, fontFamily: FONT }}>
                      Season offer: {menu.pricing.seasonOffer.code}
                    </Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: RED, fontFamily: FONT }}>
                      -{currency(menu.pricing.seasonOffer.amount)}
                    </Typography>
                  </Stack>
                )}
              </Stack>

              <Divider sx={{ my: 1 }} />

              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: INK, fontFamily: FONT }}>
                  Estimated total
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 800, color: INK, fontFamily: FONT }}>
                  {currency(pricing.estimatedTotal)}
                </Typography>
              </Stack>

              <Button
                fullWidth
                variant="contained"
                onClick={handleAddToPlan}
                disabled={!pricing.hasSelection}
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
                  "&.Mui-disabled": { bgcolor: "rgba(154,0,2,0.3)", color: "#fff" },
                }}
              >
                Add to plan
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
                Request free tasting
              </Button>

              <Typography sx={{ fontSize: 9, color: INK_SOFT, fontFamily: FONT, mt: 1.2, textAlign: "center" }}>
                Kitchen confirms in 15 minutes. No payment taken until they accept.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}