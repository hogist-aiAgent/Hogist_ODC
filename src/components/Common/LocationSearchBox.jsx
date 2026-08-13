import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  Box,
  Typography,
  Stack,
  Paper,
  Popper,
  ClickAwayListener,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';


const CHENNAI_BBOX = '79.45,12.00,80.35,13.35';

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

const LocationSearchBox = forwardRef(({ onLocationConfirm } = {}, ref) => {
  const [locationQuery, setLocationQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [rawResultsCount, setRawResultsCount] = useState(0);
  const [confirmedLocation, setConfirmedLocation] = useState(null); // { label, full }
  const debounceRef = useRef(null);

  const skipNextSearchRef = useRef(false);
  const fieldWrapRef = useRef(null);
  const inputRef = useRef(null);

  const isDropdownOpen = showSuggestions;

  // True when there WERE results from Photon, but none of them fall inside the service area
  const showNoService =
    !isSearching &&
    locationQuery.trim().length >= 3 &&
    suggestions.length === 0 &&
    rawResultsCount > 0;

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        setShowSuggestions(true);
        inputRef.current?.focus();
      },
      confirm: () => {
        if (confirmedLocation) {
          if (typeof onLocationConfirm === 'function') {
            onLocationConfirm(confirmedLocation);
          }
        } else {
          // No location picked yet — draw attention to the field instead of doing nothing
          setShowSuggestions(true);
          inputRef.current?.focus();
        }
      },
    }),
    [confirmedLocation, onLocationConfirm]
  );

  const handleFieldFocus = () => {
    setShowSuggestions(true);
  };

  const handleFieldClick = () => {
    setShowSuggestions(true);
  };

  const handleCloseDropdown = (event) => {
    if (fieldWrapRef.current && fieldWrapRef.current.contains(event.target)) {
      return;
    }
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

  const handleQueryChange = (e) => {
    setLocationQuery(e.target.value);
    // Typing again after a location was already confirmed should clear the confirmation
    if (confirmedLocation) setConfirmedLocation(null);
  };

  const handleClearQuery = () => {
    setLocationQuery('');
    setSuggestions([]);
    setRawResultsCount(0);
    setConfirmedLocation(null);
    setShowSuggestions(true);
    inputRef.current?.focus();
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

          const withinArea =
            isWithinBboxCoords(longitude, latitude) || isLocationInServiceArea(mapped);

          if (withinArea) {
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

  return (
    <Box ref={fieldWrapRef} sx={{ width: '100%', position: 'relative', }}>
      <TextField
        fullWidth
        variant="standard"
        placeholder="Choose your delivery location"
        value={locationQuery}
        onChange={handleQueryChange}
        onFocus={handleFieldFocus}
        onClick={handleFieldClick}
        inputRef={inputRef}
        InputProps={{
          disableUnderline: true,
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
          '& .MuiInputBase-input': {
            p: 0,
            fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
            fontWeight: 500,
            color: confirmedLocation ? 'text.primary' : 'text.secondary',
            fontFamily: '"open sans", sans-serif',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'text.secondary',
            opacity: 1,
          },
        }}
      />

      <Popper
        open={isDropdownOpen}
        anchorEl={fieldWrapRef.current}
        placement="bottom-start"
        style={{ zIndex: 1000, }}
        sx={{
          minWidth: { xs: 250, sm: 340, md: 300, lg: 370 },
        }}
        modifiers={[
          { name: 'offset', options: { offset: [0, 10] } },
          {
            name: 'flip',
            options: { fallbackPlacements: ['top-start', 'bottom-start'] },
          },
          {
            name: 'preventOverflow',
            options: { boundary: 'clippingParents', padding: 8, altAxis: true },
          },

          {
            name: 'sameWidth',
            enabled: true,
            phase: 'beforeWrite',
            requires: ['computeStyles'],
            fn: ({ state }) => {
              state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            effect: ({ state }) => {
              state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
            },
          },
        ]}
      >
        <ClickAwayListener onClickAway={handleCloseDropdown}>
          <Paper
            elevation={6}
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              border: '1px solid rgba(0,0,0,0.06)',
              mt: 1,
              mb:1
        
            }}
          >
            {/* Detect my location */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.8}
              onClick={handleUseCurrentLocation}
              sx={{
                cursor: 'pointer',
                px: { xs: 1, sm: 2 },
                py: { xs: 1.1, sm: 1 },
                '&:hover': { bgcolor: 'rgba(232,2,0,0.04)' },
                '&:active': { bgcolor: 'rgba(232,2,0,0.08)' },
              
              }}
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
                  fontFamily: '"open sans", sans-serif',
                }}
              >
                Detect my location
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: '0.65rem', sm: '0.72rem' },
                color: 'text.secondary',
                fontFamily: '"open sans", sans-serif',
                px: { xs: 1.5, sm: 2 },
                pb: 1,
              }}
            >
              Enter Pincode if society is not visible
            </Typography>

            {locationQuery.trim().length >= 3 && (
              <List
                dense
                disablePadding
                sx={{
                  maxHeight: { xs: 100, sm: 60, md: 100, lg: 100 },
                  overflowY: 'auto',
                  overscrollBehavior: 'contain',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(232,2,0,0.35) transparent',
                  '&::-webkit-scrollbar': {
                    width: 5,
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(232,2,0,0.35)',
                    borderRadius: 10,
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: 'rgba(232,2,0,0.55)',
                  },
                }}
              >
                {suggestions.length > 0 &&
                  suggestions.map((item) => (
                    <ListItemButton
                      key={item.place_id}
                      onClick={() => handleSelectSuggestion(item)}
                      sx={{ px: { xs: 1.5, sm: 2 }, py: { xs: 0.2, sm: 0 } }}
                    >
                      <ListItemIcon sx={{ minWidth: { xs: 28, sm: 32 } }}>
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

                {suggestions.length === 0 && showNoService && (
                  <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 2 }}>
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

                {suggestions.length === 0 && !showNoService && !isSearching && (
                  <Box sx={{ px: { xs: 1.5, sm: 2 }, py: 2 }}>
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
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
});

export default LocationSearchBox;