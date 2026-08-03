import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Stack,
  InputBase,
  Divider,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Chennai METRO bounding box (left, top, right, bottom) used to restrict Nominatim
// search results. Widened beyond just the city core so nearby areas like
// Tambaram, Chengalpattu, and Red Hills are included in the search results.
const CHENNAI_VIEWBOX = '79.90,13.35,80.35,12.60';

// Place-name / district keywords that count as "serviceable" (Chennai city +
// its surrounding metropolitan area). A result is treated as inside our
// service area if any of these appear in its address fields.
const CHENNAI_METRO_KEYWORDS = [
  'chennai',
  'tambaram',
  'chengalpattu',
  'chengalpet',
  'kanchipuram',
  'tiruvallur',
  'thiruvallur',
  'red hills',
  'redhills',
  'ponneri',
  'avadi',
  'ambattur',
  'poonamallee',
  'sriperumbudur',
  'maraimalai nagar',
  'guduvancheri',
  'pallavaram',
  'pammal',
  'urapakkam',
  'vandalur',
];

// Checks a lowercased blob of address text against the Chennai metro keyword list
const isWithinChennaiMetro = (cityFieldsText) =>
  CHENNAI_METRO_KEYWORDS.some((keyword) => cityFieldsText.includes(keyword));

export default function LocationSearchBox({ onLocationConfirm } = {}) {
  const [locationQuery, setLocationQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [rawResultsCount, setRawResultsCount] = useState(0);
  const [confirmedLocation, setConfirmedLocation] = useState(null); // { label, full }
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  // When true, the next locationQuery change should NOT trigger a fresh search
  // or reopen the dropdown. Set right before we programmatically set
  // locationQuery from a selection / detected location.
  const skipNextSearchRef = useRef(false);

  // True when there WERE results from Nominatim, but none of them fall inside Chennai
  const showNoService =
    !isSearching &&
    locationQuery.trim().length >= 3 &&
    suggestions.length === 0 &&
    rawResultsCount > 0;

  // True whenever the location dropdown is visible on screen. It now opens as
  // soon as the field is focused/clicked (so "Detect my current location" is
  // always available first) — the suggestion list underneath it only starts
  // filtering once the user actually types a query (handled further below).
  const isDropdownOpen = showSuggestions;

  // Debounced search against Nominatim, restricted to Chennai's bounding box
  useEffect(() => {
    // Skip the search entirely if this locationQuery change came from
    // selecting a suggestion or detecting the current location — in that
    // case we already know the value and don't want the dropdown to reopen.
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
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&viewbox=${CHENNAI_VIEWBOX}&bounded=1&q=${encodeURIComponent(
          locationQuery
        )}`;
        const res = await fetch(url, {
          headers: { 'Accept-Language': 'en' },
        });
        const data = await res.json();

        setRawResultsCount(data.length);

        // Extra safety filter: only keep results within the Chennai metro area
        const chennaiOnly = data.filter((item) => {
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
        });

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

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSuggestion = (item) => {
    const shortLabel = item.display_name.split(',').slice(0, 2).join(',');
    skipNextSearchRef.current = true;
    setLocationQuery(shortLabel);
    setConfirmedLocation({ label: shortLabel, full: item.display_name });
    setShowSuggestions(false);
    setSuggestions([]);
    setRawResultsCount(0);
  };

  // Detect current location via browser Geolocation API, then reverse-geocode via Nominatim
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
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
          const res = await fetch(url, {
            headers: { 'Accept-Language': 'en' },
          });
          const data = await res.json();

          const addr = data.address || {};
          const cityFields = [
            addr.city,
            addr.town,
            addr.suburb,
            addr.county,
            addr.state_district,
            data.display_name,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase();

          if (isWithinChennaiMetro(cityFields)) {
            const label =
              addr.suburb || addr.neighbourhood || addr.city_district || addr.city || data.display_name;
            skipNextSearchRef.current = true;
            setLocationQuery(label);
            setConfirmedLocation({ label, full: data.display_name });
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
    // Hide the confirmed-location bar above the search field once confirmed
    setConfirmedLocation(null);
  };

  return (
    <Box
        ref={wrapperRef}
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: {
            xs: '100%',
            sm: 520,
            md: 560,
          },
          zIndex: 9999,
        }}
      >
      {/* Confirmed / selected location bar with Next button (shown once a location is picked) */}
      {confirmedLocation && (
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            bgcolor: 'rgba(211,47,47,0.06)',
            border: '1px solid rgba(211,47,47,0.25)',
            borderRadius: { xs: 2, sm: 999 },
            px: { xs: 1.25, sm: 2 },
            py: { xs: 0.75, sm: 1 },
            mb: 1.25,
            gap: 1,
          }}
        >
          <LocationOnIcon sx={{ color: 'error.main', flexShrink: 0, fontSize: '1.2rem' }} />
          <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <Typography
              noWrap
              sx={{
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                fontWeight: 700,
                color: 'error.main',
                fontFamily: '"open sans", sans-serif',
              }}
            >
              {confirmedLocation.label}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontSize: { xs: '0.65rem', sm: '0.72rem' },
                color: 'text.secondary',
                fontFamily: '"open sans", sans-serif',
              }}
            >
              {confirmedLocation.full}
            </Typography>
          </Box>
          <Button
            onClick={handleNext}
            variant="contained"
            color="error"
            size="small"
            endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
            sx={{
              borderRadius: 999,
              textTransform: 'none',
              fontWeight: 700,
              flexShrink: 0,
              px: { xs: 1.5, sm: 2.5 },
              fontSize: { xs: '0.72rem', sm: '0.85rem' },
              boxShadow: 'none',
            }}
          >
            Next
          </Button>
        </Stack>
      )}

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          bgcolor: '#fff',
          borderRadius: { xs: 3, sm: 999 },
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
          pl: { xs: 1.5, sm: 2.5 },
          pr: { xs: 1, sm: 1 },
          py: { xs: 0.75, sm: 0.5 },
          rowGap: 0.5,
        }}
      >
        <SearchIcon sx={{ color: 'primary.main', mr: 1, flexShrink: 0,  }} />
        <InputBase
          placeholder="find nearest food here"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          sx={{
            flex: '1 1 120px',
            minWidth: 0,
            fontSize: { xs: '0.8rem', sm: '0.95rem' },
            fontFamily: '"open sans", sans-serif',
          }}
        />
        {isSearching && <CircularProgress size={16} sx={{ mr: 1, flexShrink: 0 }} />}
        {/* <Divider
          orientation="vertical"
          flexItem
          sx={{ mx: { xs: 1, sm: 1.5 }, my: 1, display: { xs: 'none', sm: 'block' } }}
        /> */}
        {/* <Stack
          direction="row"
          alignItems="center"
          spacing={0.3}
          onClick={handleUseCurrentLocation}
          sx={{
            cursor: 'pointer',
            pr: 1.5,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            ml: { xs: 'auto', sm: 0 },
          }}
        >
          {isLocating ? (
            <CircularProgress size={16} />
          ) : (
            <MyLocationIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
          )}
          <Typography
            sx={{
              fontSize: { xs: '0.8rem', sm: '0.9rem' },
              color: 'text.secondary',
              fontFamily: '"open sans", sans-serif',

            }}
          >
            set location
          </Typography>
          <ExpandMoreIcon sx={{ color: 'text.secondary', fontSize: '1.2rem' }} />
        </Stack> */}
      </Stack>

      {isDropdownOpen && (
       <Paper
            elevation={6}
            sx={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              borderRadius: 2,
              overflow: 'hidden',
              boxSizing: 'border-box',
              maxHeight: {
                xs: 120,
                sm: 180,
                md: 170,
                lg: 230,
              },
              overflowY: 'auto',
              zIndex: 99999,
              boxShadow: '0 8px 20px rgba(0,0,0,.15)',
              border: '1px solid rgba(0,0,0,0.06)',
              scrollbarWidth: 'none',       
              msOverflowStyle: 'none',      
              '&::-webkit-scrollbar': {
                display: 'none',            
              },
            }}
          >
          <List dense disablePadding>
            {/* Quick "detect my location" row, always shown at the top of the dropdown —
                visible as soon as the field is focused/clicked, before any typing happens */}
            <ListItemButton
              onClick={handleUseCurrentLocation}
              sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}
            >
              <ListItemIcon sx={{ minWidth: 32 }}>
                {isLocating ? (
                  <CircularProgress size={16} />
                ) : (
                  <MyLocationIcon sx={{ color: 'primary.main', fontSize: '1.1rem' }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary="Detect my current location"
                primaryTypographyProps={{
                  sx: {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    color: 'primary.main',
                    fontWeight: 600,
                  },
                }}
              />
            </ListItemButton>

            {suggestions.length > 0 &&
              suggestions.map((item) => (
                <ListItemButton
                  key={item.place_id}
                  onClick={() => handleSelectSuggestion(item)}
                >
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <LocationOnIcon sx={{ color: 'error.main', fontSize: '1.1rem' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.display_name.split(',').slice(0, 2).join(',')}
                    secondary={item.display_name}
                    primaryTypographyProps={{
                      sx: { fontSize: { xs: '0.85rem', sm: '1rem' }, fontWeight: 600 },
                    }}
                    secondaryTypographyProps={{
                      noWrap: true,
                      sx: { fontSize: '0.75rem' },
                    }}
                  />
                </ListItemButton>
              ))}

            {locationQuery.trim().length >= 3 && suggestions.length === 0 && showNoService && (
              <Box sx={{ px: 2, py: 2 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
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
                  We currently deliver only within Chennai and its nearby areas (e.g. Tambaram, Chengalpattu, Red Hills). Please try another area.
                </Typography>
              </Box>
            )}

            {locationQuery.trim().length >= 3 && suggestions.length === 0 && !showNoService && !isSearching && (
              <Box sx={{ px: 2, py: 2 }}>
                <Typography
                  sx={{
                    fontSize: { xs: '0.8rem', sm: '0.85rem' },
                    color: 'text.secondary',
                  }}
                >
                  No matching places found in Chennai or nearby areas.
                </Typography>
              </Box>
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}