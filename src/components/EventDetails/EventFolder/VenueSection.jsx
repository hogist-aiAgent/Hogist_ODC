
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Grid, TextField, Typography, Stack, Button, IconButton, Tooltip } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { SectionLabel, FieldLabel } from "./SectionLabel";
import { CARD_BORDER, INK, INK_SOFT, RED, VEG_GREEN, FONT } from "./Constants";

const DEFAULT_CENTER = { lat: 13.0827, lng: 80.2707 }; // Chennai fallback, used before any pin exists

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MAP_STYLE_URL = "mapbox://styles/mapbox/streets-v12";

const RASTER_FALLBACK_STYLE = {
  version: 8,
  sources: {
    "osm-raster": {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [{ id: "osm-raster", type: "raster", source: "osm-raster" }],
};

function reverseGeocode(lat, lng, signal) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=en`;
  return fetch(url, {
    signal,
    headers: { "Accept-Language": "en" },
  }).then((res) => {
    if (!res.ok) throw new Error("reverse geocode failed");
    return res.json();
  });
}

function forceEnglishLabels(map) {
  const style = map.getStyle();
  if (!style || !style.layers) return;
  style.layers.forEach((layer) => {
    if (layer.type !== "symbol") return;
    const textField = layer.layout && layer.layout["text-field"];
    if (!textField) return;
    if (!JSON.stringify(textField).includes('"name"')) return;
    try {
      map.setLayoutProperty(layer.id, "text-field", ["coalesce", ["get", "name_en"], ["get", "name"]]);
    } catch {
      /* a handful of layers may not support this override — safe to skip */
    }
  });
}

// Custom pin element drawn as inline SVG so it matches the app's red marker exactly.
function createPinElement() {
  const el = document.createElement("div");
  el.style.width = "34px";
  el.style.height = "44px";
  el.style.cursor = "grab";
  el.style.filter = "drop-shadow(0 3px 5px rgba(0,0,0,0.35))";
  el.innerHTML = `
    <svg width="34" height="44" viewBox="0 0 34 44" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 0C7.6 0 0 7.6 0 17c0 12.75 17 27 17 27s17-14.25 17-27C34 7.6 26.4 0 17 0z" fill="${RED}"/>
      <circle cx="17" cy="17" r="7" fill="#fff"/>
    </svg>
  `;
  return el;
}

export default function VenueSection({ venue, onChange, eventDateLabel }) {
  const set = (field) => (e) => onChange({ ...venue, [field]: e.target.value });

  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");
  const [resolvedAddress, setResolvedAddress] = useState("");
  const hasAutoLocated = useRef(false);
  const geocodeAbortRef = useRef(null);

  // Mapbox map/marker instances live in refs, not React state — the map is imperative
  // (created once, then mutated).
  const mapNodeRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  const setPin = useCallback(
    (lat, lng) => {
      onChange({ ...venue, pin: { lat, lng } });
    },
    [onChange, venue]
  );

  const handleUseMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocateError("Location isn't available on this device/browser.");
      return;
    }
    setLocating(true);
    setLocateError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPin(pos.coords.latitude, pos.coords.longitude);
        setLocating(false);
      },
      () => {
        setLocateError("Couldn't detect your location — drop the pin manually.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [setPin]);

  useEffect(() => {
    if (hasAutoLocated.current) return;
    hasAutoLocated.current = true;
    if (!venue.pin) handleUseMyLocation();
  }, []);

  
  useEffect(() => {
    if (!venue.pin) {
      setResolvedAddress("");
      return;
    }
    if (geocodeAbortRef.current) geocodeAbortRef.current.abort();
    const controller = new AbortController();
    geocodeAbortRef.current = controller;

    const timer = setTimeout(() => {
      reverseGeocode(venue.pin.lat, venue.pin.lng, controller.signal)
        .then((data) => {
          if (data && data.display_name) setResolvedAddress(data.display_name);
        })
        .catch(() => {
          /* ignore — user can still type the address manually */
        });
    }, 500);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [venue.pin]);

  const handleUseResolvedAddress = () => {
    if (resolvedAddress) onChange({ ...venue, address: resolvedAddress });
  };

  const center = venue.pin || DEFAULT_CENTER;

  useEffect(() => {
    if (!mapNodeRef.current || mapInstanceRef.current) return;

    if (!MAPBOX_TOKEN) {
      console.warn(
        "Venue map: VITE_MAPBOX_TOKEN is not set — falling back to raster tiles. " +
          "Add VITE_MAPBOX_TOKEN=pk.xxxxx to your .env file and restart the dev server to use Mapbox."
      );
    } else {
      mapboxgl.accessToken = MAPBOX_TOKEN;
    }

    const map = new mapboxgl.Map({
      container: mapNodeRef.current,
      style: MAPBOX_TOKEN ? MAP_STYLE_URL : RASTER_FALLBACK_STYLE,
      center: [center.lng, center.lat],
      zoom: venue.pin ? 16 : 12,
      scrollZoom: false,
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-right");

    let styleLoaded = false;
    let fellBackToRaster = !MAPBOX_TOKEN;

    map.on("error", (e) => {
      console.error("Venue map error:", e && e.error ? e.error : e);
    });

    map.on("load", () => {
      styleLoaded = true;
      if (!fellBackToRaster) forceEnglishLabels(map);
    });
    map.once("idle", () => {
      if (!fellBackToRaster) forceEnglishLabels(map);
    });

    const fallbackTimer = setTimeout(() => {
      if (styleLoaded || fellBackToRaster) return;
      fellBackToRaster = true;
      console.warn("Venue map: Mapbox style didn't load in time, falling back to raster tiles.");
      map.setStyle(RASTER_FALLBACK_STYLE);
    }, 6000);

    map.on("click", (e) => {
      setPin(e.lngLat.lat, e.lngLat.lng);
    });

    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => map.resize());
    resizeObserver.observe(mapNodeRef.current);

    return () => {
      clearTimeout(fallbackTimer);
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (venue.pin) {
      map.flyTo({ center: [venue.pin.lng, venue.pin.lat], zoom: Math.max(map.getZoom(), 16), duration: 700 });

      if (markerRef.current) {
        markerRef.current.setLngLat([venue.pin.lng, venue.pin.lat]);
      } else {
        const marker = new mapboxgl.Marker({ element: createPinElement(), draggable: true, anchor: "bottom" })
          .setLngLat([venue.pin.lng, venue.pin.lat])
          .addTo(map);

        marker.on("dragend", () => {
          const { lat, lng } = marker.getLngLat();
          setPin(lat, lng);
        });

        markerRef.current = marker;
      }
    } else if (markerRef.current) {
      markerRef.current.remove();
      markerRef.current = null;
    }
  }, [venue.pin, setPin]);

  return (
    <Box>
      <SectionLabel>Venue</SectionLabel>

      <Grid container spacing={2} sx={{ mb: 2.5 }}>
        <Grid item xs={12} md={6}>
          <FieldLabel>Hall or address</FieldLabel>
          <TextField
            fullWidth
            size="small"
            value={venue.address}
            onChange={set("address")}
            placeholder="Enter the hall name or full address"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FieldLabel>Pincode</FieldLabel>
          <TextField
            fullWidth
            size="small"
            value={venue.pincode}
            onChange={set("pincode")}
            placeholder="600001"
          />
        </Grid>
        <Grid item xs={6} md={3}>
          <FieldLabel>Setup access from</FieldLabel>
          <TextField
            fullWidth
            size="small"
            value={venue.setupAccessFrom}
            onChange={set("setupAccessFrom")}
            placeholder="e.g. 9:30 am"
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              position: "relative",
              height: 220,
              borderRadius: 2,
              border: `1px solid ${CARD_BORDER}`,
              overflow: "hidden",
              boxShadow: "0 4px 18px rgba(27,27,35,0.08)",
              "& .mapboxgl-map": { width: "100%", height: "100%", fontFamily: FONT },
              "& .mapboxgl-ctrl-group": {
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(27,27,35,0.18)",
                border: "none",
              },
       
              "& .mapboxgl-ctrl-attrib": {
                fontSize: 9.5,
              },
            }}
          >
            <Box ref={mapNodeRef} sx={{ width: "100%", height: "100%" }} />

            <Typography
              sx={{
                position: "absolute",
                left: 18,
                top: 10,
                zIndex: 5,
                fontSize: 10.5,
                color: INK_SOFT,
                fontFamily: FONT,
                bgcolor: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(6px)",
                borderRadius: 999,
                px: 1.25,
                py: 0.4,
                maxWidth: "60%",
              }}
              noWrap
            >
              Tap the map to drop a pin, or drag it to the exact gate.
            </Typography>
          </Box>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={1}
            sx={{ mt: 1 }}
          >
            <Box>
              {venue.pin ? (
                <>
                  <Typography sx={{ fontSize: 12, fontWeight: 700, color: INK, fontFamily: FONT }}>
                    Pin dropped: {venue.pin.lat.toFixed(4)}, {venue.pin.lng.toFixed(4)}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: RED, fontFamily: FONT }}>
                    Drag the pin to the exact gate the crew should use.
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontSize: 11.5, color: INK_SOFT, fontFamily: FONT }}>
                  {locateError || 'No pin dropped yet — tap the map or use "Use my location".'}
                </Typography>
              )}
            </Box>
            <Button
              size="small"
              startIcon={<MyLocationIcon sx={{ fontSize: 15 }} />}
              onClick={handleUseMyLocation}
              variant="outlined"
              sx={{
                borderColor: CARD_BORDER,
                color: INK,
                fontWeight: 700,
                fontSize: 12,
                textTransform: "none",
                borderRadius: 999,
                flexShrink: 0,
                "&:hover": { borderColor: RED, color: RED },
              }}
            >
              {locating ? "Locating…" : "Use my location"}
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <FieldLabel>Landmark for the delivery crew</FieldLabel>
          <TextField
            fullWidth
            size="small"
            value={venue.landmark}
            onChange={set("landmark")}
            placeholder="e.g. Opposite the water tank"
            sx={{ mb: 1.5 }}
          />

          {resolvedAddress && (
            <Box
              sx={{
                border: `1px dashed ${CARD_BORDER}`,
                borderRadius: 1.5,
                px: 1.5,
                py: 1.25,
                mb: 1.5,
              }}
            >
              <Typography sx={{ fontSize: 11, color: INK_SOFT, fontFamily: FONT, mb: 0.5 }}>
                Address detected from the pin
              </Typography>
              <Typography sx={{ fontSize: 12, color: INK, fontFamily: FONT, mb: 1 }}>
                {resolvedAddress}
              </Typography>
              <Typography
                onClick={handleUseResolvedAddress}
                sx={{ fontSize: 12, fontWeight: 700, color: RED, fontFamily: FONT, cursor: "pointer" }}
              >
                Use this as the address
              </Typography>
            </Box>
          )}

          {venue.pin ? (
            <Box
              sx={{
                bgcolor: "rgba(46,125,50,0.06)",
                border: "1px solid rgba(46,125,50,0.25)",
                borderRadius: 1.5,
                px: 1.5,
                py: 1.25,
              }}
            >
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <CheckCircleIcon sx={{ fontSize: 17, color: VEG_GREEN, mt: 0.1 }} />
                <Typography sx={{ fontSize: 12, color: INK, fontFamily: FONT }}>
                  Both your kitchens deliver to this pin and are free on {eventDateLabel}.
                </Typography>
              </Stack>
            </Box>
          ) : (
            <Box
              sx={{
                bgcolor: "#FBFAF8",
                border: `1px dashed ${CARD_BORDER}`,
                borderRadius: 1.5,
                px: 1.5,
                py: 1.25,
              }}
            >
              <Typography sx={{ fontSize: 12, color: INK_SOFT, fontFamily: FONT }}>
                Drop a pin so we can confirm kitchen delivery to your venue.
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}