import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Stack,
  Divider,
  Paper,
  Popover,
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

const CHENNAI_VIEWBOX = '79.90,13.35,80.35,12.60';

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

  // True when there WERE results from Nominatim, but none of them fall inside Chennai
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
    // Hide the confirmed-location strip and close the popover once confirmed
    setConfirmedLocation(null);
    handleClosePopover();
  };

  return (
    <>
      {/* Header pill trigger: "CATER TO Chennai" */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.6}
        onClick={handleOpenPopover}
        sx={{
          cursor: 'pointer',
          bgcolor: 'rgba(0,0,0,0.035)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 1,
          px: { xs: 1.1, sm: 1.6 },
          py: { xs: 0.5, sm: 0.6 },
          minWidth: { xs: 0, sm: 148 },
          flexShrink: 0,
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.06)',
          },
        }}
      >
        <LocationOnIcon sx={{ color: 'error.main', fontSize: { xs: '1.1rem', sm: '1.3rem' }, flexShrink: 0 }} />
        <Box sx={{ textAlign: 'left', lineHeight: 1.1 }}>
          <Typography
            sx={{
              fontSize: { xs: '0.55rem', sm: '0.62rem' },
              color: 'text.secondary',
              fontWeight: 700,
              letterSpacing: '0.5px',
              fontFamily: '"open sans", sans-serif',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            CATER TO
          </Typography>
          <Typography
            noWrap
            sx={{
              fontSize: { xs: '0.75rem', sm: '0.88rem' },
              fontWeight: 800,
              color: 'text.primary',
              fontFamily: '"Montserrat", sans-serif',
              maxWidth: { xs: 70, sm: 130 },
            }}
          >
            Chennai
          </Typography>
        </Box>
        <ExpandMoreIcon
          sx={{
            color: 'text.secondary',
            fontSize: '1.1rem',
            flexShrink: 0,
            transition: 'transform 0.2s ease',
            transform: isPopoverOpen ? 'rotate(180deg)' : 'none',
          }}
        />
      </Stack>

      <Popover
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          elevation: 6,
          sx: {
            mt: 1.5,
            borderRadius: 3,
            width: { xs: 320, sm: 440 },
            maxWidth: '92vw',
            p: { xs: 2, sm: 3 },
            boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
          },
        }}
      >
        {/* Title */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          {/* <LocationOnIcon sx={{ color: 'warning.main', fontSize: '1.4rem' }} /> */}
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
              endIcon={<ArrowForwardIcon sx={{ fontSize: '1rem' }} />}
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
                borderRadius: 2,
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
                borderRadius: 2,
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

        <Stack direction="row" justifyContent="flex-end">
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

        {/* Autocomplete suggestions list, filtered to Chennai & nearby areas */}
        {isDropdownOpen && locationQuery.trim().length >= 3 && (
          <Paper
            variant="outlined"
            sx={{
              mt: 1.5,
              borderRadius: 2,
              overflow: 'hidden',
              boxSizing: 'border-box',
              maxHeight: { xs: 180, sm: 220 },
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
                    We currently deliver only within Chennai and its nearby areas (e.g. Tambaram, Chengalpattu, Red Hills). Please try another area.
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
                    No matching places found in Chennai or nearby areas.
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        )}
      </Popover>
    </>
  );
}