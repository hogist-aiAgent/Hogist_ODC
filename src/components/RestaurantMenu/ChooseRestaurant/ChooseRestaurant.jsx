import React, { useMemo } from "react";
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


const GOLD = "#F5A623";
const WHITE = "#FFF";

function CatererCard({ c }) {
  return (
    <Card
      elevation={3}
      sx={{
        position: "relative",
        overflow: "visible", // lets the quick-view button float past the image edge
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
          }}
        >
          {c.ribbon}
        </Box>

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
          <Typography component="span" sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1 }}>
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
            fontWeight: 700,
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          View
        </Button>
      </Box>

      {/* Text content */}
      <Box sx={{ px: 2.5, pt: 3 }}>
        <Typography
          sx={{
            color: "text.primary",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: 15,
            lineHeight: 1.3,
          }}
        >
          {c.name}
        </Typography>

        <Typography sx={{ color: "text.secondary", fontSize: 12, mt: 0.3 }}>
          {c.area}
        </Typography>

        <Typography
          sx={{ color: "text.secondary", opacity: 0.7, fontSize: 11, mt: 1, fontFamily: "monospace" }}
        >
          FSSAI No: {c.fssai}
        </Typography>

        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{ mt: 1.5 }}>
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
              }}
            />
          ))}
        </Stack>
      </Box>
    </Card>
  );
}

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

  return (
    <Box sx={{ bgcolor: "background.default", py: { xs: 6, md: 4 } }}>
      <Container maxWidth="lg">
        {/* Header banner */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
          <Typography sx={{ color: "primary.main", fontSize: 22 }}>&raquo;</Typography>
          <Typography
            variant="h4"
            sx={{
              color: "text.primary",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 3,
              fontSize: { xs: 22, sm: 28, md: 32 },
              textAlign: "center",
            }}
          >
            Results Nearby
          </Typography>
          <Typography sx={{ color: "primary.main", fontSize: 22 }}>&laquo;</Typography>
        </Stack>
        <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 14, mt: 1, mb: selectedLocation ? 1 : 6 }}>
          Caterers near you, picked for taste and trust
        </Typography>

        {selectedLocation && (
          <Typography sx={{ textAlign: "center", color: "text.secondary", fontSize: 13, mb: 6 }}>
            {isFallback
              ? `No exact matches near "${selectedLocation.label}" — showing all available caterers.`
              : `Showing caterers near "${selectedLocation.label}"`}
          </Typography>
        )}

        {/* Responsive card grid: 1 col mobile, 2 col small, 4 col desktop */}
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {caterers.map((c) => (
            <Grid item xs={12} sm={6} lg={3} key={c.id}>
              <CatererCard c={c} />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}