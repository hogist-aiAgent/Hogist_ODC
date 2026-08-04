import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Stack,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Container,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import logo from '../../assets/CompanyLogo/logo.png'
import LocationSearchBox from '../Common/LocationSearchBox';

const navLinks = [
  { label: 'Home', active:true },
  { label: 'About Us' },
  { label: 'Our Services' },
  { label: 'Gallery' },
  { label: 'Contact Us' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dropdown Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Selected nav link toggle state
  const [selectedLink, setSelectedLink] = useState('Home');

  // Scroll state for transparent -> white navbar
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: scrolled ? '#fff' : 'transparent',
        boxShadow: scrolled ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        // borderBottom: '1px solid #F0F0F3',
        color: 'text.primary',
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ py: 1, px: { xs: 2, sm: 2.5, md: 0 } }}>
          {/* Logo */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ ml: { xs: 0, sm: 1, md: 3, lg: 1 }, flexGrow: { xs: 1, sm: 1, md: 0 } }}
          >
            <Box
              component="img"
              src={logo}
              alt="Hogist Logo"
              sx={{
                height: { xs: 42, sm: 48, md: 55, lg: 60 },
                width: 'auto',
              }}
            />
          </Stack>

          {/* Location pill (desktop/laptop): "CATER TO Chennai" with Delivery Location popover */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' },
              ml: { md: 2.5, lg: 2 },
              mr: 'auto',
              flexShrink: 0,
            }}
          >
            <LocationSearchBox />
          </Box>

          {/* Desktop nav */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: {xs:'auto', sm:2,md:2} }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => setSelectedLink(link.label)}
                sx={{
                  px: { md: 1.2, lg: 1.8 },
                  py: 0.2,
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: { md: '0.9rem', lg: '1.05rem', xl: '1.15rem' },
                  letterSpacing: '0.2px',
                  textTransform: 'none',
                  fontFamily: '"Montserrat", sans-serif',
                  color: selectedLink === link.label
                    ? (scrolled ? '#fff' : '#c60000')
                    : (scrolled ? '#c60000' : '#fff'),
                  bgcolor: selectedLink === link.label
                    ? (scrolled ? '#c60000' : '#fff')
                    : 'transparent',
                  '&:hover': {
                    
                    bgcolor: selectedLink === link.label
                      ? (scrolled ? '#c60000' : '#fff')
                      : (scrolled
                          ? 'rgba(228,3,46,0.06)'
                          : 'rgba(255,255,255,0.12)'),
                  },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>

          {/* CTA */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ display: { xs: 'none', md: 'flex' }, mr: { md: 2.5, lg: 5 } }}
          >
           <Button
              variant="outlined"
              onClick={handleMenuOpen}
              sx={{
                px: { md: 1.5, lg: 2.5 },
                color: isMenuOpen
                  ? (scrolled ? '#fff' : '#c60000')
                  : (scrolled ? 'primary.main' : '#fff'),
                borderColor: scrolled ? 'primary.main' : '#fff',
                bgcolor: isMenuOpen
                  ? (scrolled ? '#c60000' : '#fff')
                  : 'transparent',
                '&:hover': {
                  color: isMenuOpen
                    ? (scrolled ? '#fff' : '#c60000')
                    : (scrolled ? 'primary.main' : '#fff'),
                  borderColor: scrolled ? 'primary.dark' : '#fff',
                  bgcolor: isMenuOpen
                    ? (scrolled ? '#c60000' : '#fff')
                    : (scrolled
                        ? 'rgba(228,3,46,0.06)'
                        : 'rgba(255,255,255,0.12)'),
                },
              }}
            >
              <RestaurantMenuOutlinedIcon />
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                elevation: 4,
                sx: {
                  mt: 3,
                  borderRadius: 2,
                  minWidth: { xs: 180, sm: 210 },
                  py: 0.5,
                },
              }}
            >
              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  color: 'red',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: 1,
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Industrial Catering
              </MenuItem>

              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  color: 'red',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: 1,
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Corporate Catering
              </MenuItem>

              <MenuItem
                onClick={handleMenuClose}
                sx={{
                  color: 'red',
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  py: 1,
                  fontFamily: '"Roboto", sans-serif',
                }}
              >
                Outdoor Catering (ODC)
              </MenuItem>
            </Menu>
          </Stack>

          {/* Location pill (mobile/tablet): shown next to the menu icon */}
          <Box sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' }, mr: 1, flexShrink: 0 }}>
            <LocationSearchBox />
          </Box>

          {/* Mobile toggle */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: { xs: 240, sm: 280, md: 300 }, pt: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navLinks.map((link) => (
              <ListItemButton key={link.label} selected={link.active}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}

            <Box sx={{ px: 2, pt: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                sx={{ mb: 1.5 }}
                onClick={handleMenuOpen}
              >
                <RestaurantMenuOutlinedIcon />
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}