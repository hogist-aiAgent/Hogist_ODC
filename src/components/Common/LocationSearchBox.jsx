import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  Paper,
  Dialog,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

// Photon (OpenStreetMap data, komoot) bounding box: minLon,minLat,maxLon,maxLat
// Widened to cover Chennai + Chengalpattu + Kanchipuram districts (not just Chennai city)
const CHENNAI_BBOX = '79.45,12.00,80.35,13.35';

// Parsed once so we can do a real numeric containment check on returned coordinates,
// instead of relying only on text matching against inconsistent OSM address fields.
const [BBOX_MIN_LON, BBOX_MIN_LAT, BBOX_MAX_LON, BBOX_MAX_LAT] = CHENNAI_BBOX
  .split(',')
  .map(Number);

const isWithinBboxCoords = (lon, lat) =>
  typeof lon === 'number' &&
  typeof lat === 'number' &&
  !Number.isNaN(lon) &&
  !Number.isNaN(lat) &&
  lon >= BBOX_MIN_LON &&
  lon <= BBOX_MAX_LON &&
  lat >= BBOX_MIN_LAT &&
  lat <= BBOX_MAX_LAT;

const CHENNAI_METRO_KEYWORDS = [
  // Chennai district / city
  'chennai',
  'red hills',
  'redhills',
  'ponneri',
  'avadi',
  'ambattur',
  'poonamallee',
  'pallavaram',
  'pammal',
  'chromepet',
  'perungalathur',
  'st thomas mount',
  'tambaram',
  // OMR / IT corridor (falls under Chengalpattu district but commonly considered Chennai)
  'siruseri',
  'sholinganallur',
  'navalur',
  'perungudi',
  'thoraipakkam',
  'semmancheri',
  'padur',
  'karapakkam',
  'egattur',
  'omr',
  'kottivakkam',
  'palavakkam',
  'injambakkam',
  // Chengalpattu district
  'chengalpattu',
  'chengalpet',
  'maraimalai nagar',
  'guduvancheri',
  'vandalur',
  'urapakkam',
  'kelambakkam',
  'thiruporur',
  'mahabalipuram',
  'mamallapuram',
  'thirukalukundram',
  'thirukazhukundram',
  'cheyyur',
  'madurantakam',
  // Kanchipuram district
  'kanchipuram',
  'kancheepuram',
  'sriperumbudur',
  'oragadam',
  'walajabad',
  'uthiramerur',
  'kundrathur',
  'tiruvallur',
  'thiruvallur',
];

// Checks a lowercased blob of address text against the Chennai/Chengalpattu/Kanchipuram keyword list
const isWithinChennaiMetro = (cityFieldsText) =>
  CHENNAI_METRO_KEYWORDS.some((keyword) => cityFieldsText.includes(keyword));

const photonFeatureToLocationItem = (feature) => {
  const p = feature.properties || {};
  const [lon, lat] = feature.geometry?.coordinates || [];

  const streetLine = [p.housenumber, p.street].filter(Boolean).join(' ');

  const nameParts = [p.name, streetLine, p.district, p.city, p.state, p.country].filter(Boolean);
  const displayName = nameParts
    .filter((value, idx, arr) => arr.indexOf(value) === idx) // dedupe consecutive repeats
    .join(', ');

  return {
    place_id: p.osm_id ?? `${p.osm_type || 'feat'}-${p.name || 'unknown'}-${Math.random()}`,
    display_name: displayName || p.name || 'Unknown location',
    lon,
    lat,
    address: {
      city: p.city,
      town: p.town,
      suburb: p.district || p.locality,
      county: p.county,
      state_district: p.state,
      street: streetLine || p.street,
    },
  };
};

// Combined check: trust the actual returned coordinates first (this is the ground truth,
// since Photon was already asked to restrict to CHENNAI_BBOX). Only fall back to text
// keyword matching if coordinates are missing for some reason (e.g. reverse geocode edge cases).
const isLocationInServiceArea = (item) => {
  if (isWithinBboxCoords(item.lon, item.lat)) return true;

  const addr = item.address || {};
  const cityFields = [
    addr.city,
    addr.town,
    addr.suburb,
    addr.county,
    addr.state_district,
    item.display_name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return isWithinChennaiMetro(cityFields);
};

export default function LocationSearchBox({ onLocationConfirm } = {}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [locationQuery, setLocationQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [rawResultsCount, setRawResultsCount] = useState(0);
  const [confirmedLocation, setConfirmedLocation] = useState(null); // { label, full }
  const debounceRef = useRef(null);

  const skipNextSearchRef = useRef(false);

  const isPopoverOpen = Boolean(anchorEl);

  // True when there WERE results from Photon, but none of them fall inside the service area
  const showNoService =
    !isSearching &&
    locationQuery.trim().length >= 3 &&
    suggestions.length === 0 &&
    rawResultsCount > 0;

  const isDropdownOpen = showSuggestions;

  const handleOpenPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setShowSuggestions(false);
  };

  useEffect(() => {
    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (!locationQuery || locationQuery.trim().length < 3) {
      setSuggestions([]);
      setRawResultsCount(0);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        // Photon: OSM-data-based, purpose-built for autocomplete/partial-word search
        const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(
          locationQuery
        )}&bbox=${CHENNAI_BBOX}&limit=8&lang=en`;
        const res = await fetch(url);
        const data = await res.json();
        const features = data.features || [];

        setRawResultsCount(features.length);

        const mapped = features.map(photonFeatureToLocationItem);

        // Safety filter: keep results that are actually within the service area.
        // Coordinates (ground truth, already bbox-restricted by Photon) are checked first;
        // keyword text matching is only a fallback for the rare case coordinates are missing.
        const chennaiOnly = mapped.filter(isLocationInServiceArea);

        setSuggestions(chennaiOnly);
        setShowSuggestions(true);
      } catch (err) {
        setSuggestions([]);
        setRawResultsCount(0);
      } finally {
        setIsSearching(false);
      }
    }, 450);

    return () => clearTimeout(debounceRef.current);
  }, [locationQuery]);

  const handleClearQuery = () => {
    setLocationQuery('');
    setSuggestions([]);
    setRawResultsCount(0);
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (item) => {
    const shortLabel = item.display_name.split(',').slice(0, 2).join(',');
    skipNextSearchRef.current = true;
    setLocationQuery(shortLabel);
    setConfirmedLocation({ label: shortLabel, full: item.display_name });
    setShowSuggestions(false);
    setSuggestions([]);
    setRawResultsCount(0);
  };

  // Detect current location via browser Geolocation API, then reverse-geocode via Photon
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const url = `https://photon.komoot.io/reverse?lon=${longitude}&lat=${latitude}&lang=en`;
          const res = await fetch(url);
          const data = await res.json();
          const feature = (data.features && data.features[0]) || null;

          if (!feature) {
            alert('Could not detect your location. Please try again.');
            return;
          }

          const mapped = photonFeatureToLocationItem(feature);

          // Reverse geocode has no bbox param, so this check matters most here.
          // Use the device's own coordinates (always present) as the primary check,
          // falling back to the returned feature's text fields if needed.
          const withinArea =
            isWithinBboxCoords(longitude, latitude) || isLocationInServiceArea(mapped);

          if (withinArea) {
            // Build a street + area label, same pattern as manual suggestion selection,
            // instead of only showing the suburb/city name.
            const label = mapped.display_name.split(',').slice(0, 2).join(',');
            skipNextSearchRef.current = true;
            setLocationQuery(label);
            setConfirmedLocation({ label, full: mapped.display_name });
            setShowSuggestions(false);
            setSuggestions([]);
            setRawResultsCount(0);
          } else {
            alert('Your current location seems to be outside our Chennai metro service area.');
          }
        } catch (err) {
          alert('Could not detect your location. Please try again.');
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        alert('Location permission denied. Please allow location access or type your area manually.');
      }
    );
  };

  const handleNext = () => {
    if (!confirmedLocation) return;
    if (typeof onLocationConfirm === 'function') {
      onLocationConfirm(confirmedLocation);
    }
    // Hide the confirmed-location strip and close the popover once confirmed
    setConfirmedLocation(null);
    handleClosePopover();
  };

  return (
    <>
      {/* Header trigger: search-bar style pill (icon + "find nearest food here" + set location) */}
      <Stack
        direction="row"
        alignItems="center"
        onClick={handleOpenPopover}
        sx={{
          cursor: 'pointer',
          bgcolor: '#fff',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 1,
          pl: { xs: 1, sm: 1.2, md: 1.5 },
          pr: { xs: 1.5, sm: 2, md: 2.5 },
          py: { xs: 0.9, sm: 1.1, md: 1.3 },
          minWidth: { xs: 220, sm: 320, md: 420, lg: 460 },
          maxWidth: { xs: '100%',sm:300, md: 480 },
          width: '100%',
          boxShadow: '0 8px 24px rgba(20,20,43,0.10)',
          '&:hover': {
            boxShadow: '0 10px 28px rgba(20,20,43,0.14)',
          },
        }} 
      >
        <SearchIcon sx={{ color: 'primary.main', fontSize: { xs: '1.3rem', sm: '1.5rem' }, flexShrink: 0, mr: { xs: 1, sm: 1.5 } }} />
        <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
              fontWeight: 800,
              color: 'text.primary',
              fontFamily: '"Montserrat", sans-serif',
            }}
          >
            Cater to Chennai
          </Typography>
        </Box>
      
          {/* <ExpandMoreIcon
            sx={{
              color: 'text.secondary',
              fontSize: '1.1rem',
              transition: 'transform 0.2s ease',
              transform: isPopoverOpen ? 'rotate(180deg)' : 'none',
            }}
          /> */}
        </Stack>
      

      <Dialog
        open={isPopoverOpen}
        onClose={handleClosePopover}
        PaperProps={{
          elevation: 6,
          sx: {
            m: { xs: 2, sm: 3 },
            borderRadius: 2,
            width: { xs: '100%', sm: 440 },
            maxWidth: '92vw',
            p: { xs: 2, sm: 3 },
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          },
        }}
      >
        {/* Title + Detect my location (moved here, next to the title) */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
              letterSpacing: '0.3px',
              fontFamily: '"Montserrat", sans-serif',
            }}
          >
            DELIVERY LOCATION
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            onClick={handleUseCurrentLocation}
            sx={{ cursor: 'pointer' }}
          >
            {isLocating ? (
              <CircularProgress size={14} />
            ) : (
              <MyLocationIcon sx={{ fontSize: '1rem', color: 'error.main' }} />
            )}
            <Typography
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.82rem' },
                color: 'error.main',
                fontWeight: 700,
                textDecoration: 'underline',
                fontFamily: '"open sans", sans-serif',
              }}
            >
              Detect my location
            </Typography>
          </Stack>
        </Stack>

        {/* Quick confirmed-location strip with Next button */}
        {confirmedLocation && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              mb: 2,
              pb: 2,
              borderBottom: '1px solid rgba(0,0,0,0.08)',
            }}
          >
            <LocationOnIcon sx={{ color: 'error.main', fontSize: '1.1rem', flexShrink: 0 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography noWrap sx={{ fontSize: { xs: '0.78rem', sm: '0.85rem' }, fontFamily: '"open sans", sans-serif' }}>
                <Box component="span" sx={{ color: 'error.main', fontWeight: 700 }}>
                  Chennai
                </Box>
                <Box component="span" sx={{ color: 'text.secondary' }}>
                  {' '}
                  · {confirmedLocation.label}
                </Box>
              </Typography>
            </Box>
            <Button
              onClick={handleNext}
              variant="contained"
              color="error"
              size="small"
              endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem', }} />}
              sx={{
                borderRadius: 999,
                textTransform: 'none',
                fontWeight: 700,
                flexShrink: 0,
                boxShadow: 'none',
                fontSize: { xs: '0.7rem', sm: '0.8rem' },
              }}
            >
              Next
            </Button>
          </Stack>
        )}

        {/* City dropdown + area search */}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <FormControl size="small" sx={{ minWidth: { xs: 96, sm: 112 }, flexShrink: 0 }}>
            <Select
              value="Chennai"
              IconComponent={() => null}
              sx={{
                borderRadius: 1,
                fontSize: { xs: '0.78rem', sm: '0.85rem' },
                fontWeight: 600,
                fontFamily: '"open sans", sans-serif',
                '& .MuiSelect-select': {
                  pr: '14px !important',
                },
              }}
            >
              <MenuItem value="Chennai" sx={{ fontSize: '0.85rem' }}>
                Chennai
              </MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            size="small"
            placeholder="Search your area, colony, or locality..."
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            InputProps={{
              endAdornment: isSearching ? (
                <InputAdornment position="end">
                  <CircularProgress size={16} />
                </InputAdornment>
              ) : locationQuery ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={handleClearQuery} edge="end">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                fontFamily: '"open sans", sans-serif',
              },
            }}
          />
        </Stack>

        <Typography
          sx={{
            fontSize: { xs: '0.65rem', sm: '0.72rem' },
            color: 'text.secondary',
            mb: 1,
            fontFamily: '"open sans", sans-serif',
          }}
        >
          Enter Pincode if society is not visible
        </Typography>

        {/* Autocomplete suggestions list, filtered to Chennai & nearby areas */}
        {isDropdownOpen && locationQuery.trim().length >= 3 && (
          <Paper
            variant="outlined"
            sx={{
              mt: 1.5,
              borderRadius: 1,
              overflow: 'hidden',
              boxSizing: 'border-box',
              maxHeight: { xs: 180, sm: 130 },
              overflowY: 'auto',
              border: '1px solid rgba(0,0,0,0.08)',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            <List dense disablePadding>
              {suggestions.length > 0 &&
                suggestions.map((item) => (
                  <ListItemButton key={item.place_id} onClick={() => handleSelectSuggestion(item)}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <LocationOnIcon sx={{ color: 'error.main', fontSize: '1.1rem' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.display_name.split(',').slice(0, 2).join(',')}
                      secondary={item.display_name}
                      primaryTypographyProps={{
                        sx: { fontSize: { xs: '0.82rem', sm: '0.92rem' }, fontWeight: 600 },
                      }}
                      secondaryTypographyProps={{
                        noWrap: true,
                        sx: { fontSize: '0.72rem' },
                      }}
                    />
                  </ListItemButton>
                ))}

              {locationQuery.trim().length >= 3 && suggestions.length === 0 && showNoService && (
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.78rem', sm: '0.85rem' },
                      color: 'error.main',
                      fontWeight: 700,
                    }}
                  >
                    Service not available in this location
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.72rem',
                      color: 'text.secondary',
                      mt: 0.5,
                    }}
                  >
                    We currently deliver only within Chennai, Chengalpattu and Kanchipuram districts (e.g. Tambaram, Chengalpattu, Kanchipuram, Red Hills). Please try another area.
                  </Typography>
                </Box>
              )}

              {locationQuery.trim().length >= 3 && suggestions.length === 0 && !showNoService && !isSearching && (
                <Box sx={{ px: 2, py: 2 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.78rem', sm: '0.85rem' },
                      color: 'text.secondary',
                    }}
                  >
                    No matching places found in Chennai, Chengalpattu or Kanchipuram districts.
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        )}
      </Dialog>
    </>
  );
}