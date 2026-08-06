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
      <Container 
          maxWidth="lg"
          disableGutters
          sx={{
            '@media (min-width: 1400px) and (max-width: 1450px)': {
              maxWidth: '1320px',
              width: '100%',
              px: 2,
            },
          }}
        >
          <Toolbar
            sx={{
              py: 1,
              px: { xs: 2, sm: 2.5, md: 0 },

              '@media (min-width: 1400px) and (max-width: 1450px)': {
                justifyContent: 'space-between',
                px: 0,
              },
            }}
          >          {/* Logo */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  flexGrow: 1,
                  ml: { xs: 0, sm: 1, md: 3, lg: 1 },

                  '@media (min-width:1400px) and (max-width:1450px)': {
                    ml: 0,
                  },
                }}
              >       
              
             <Box
              component="img"
              src={logo}
              alt="Hogist Logo"
              sx={{
                height: { xs: 42, sm: 48, md: 55, lg: 66  },
                width: 'auto',
              }}
            />
          </Stack>

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
                  fontSize: { md: '0.9rem', lg: '1.2rem', xl: '1.15rem' },
                  letterSpacing: '0.2px',
                  textTransform: 'none',
                  fontFamily: '"Montserrat", sans-serif',
                  color: selectedLink === link.label
                    ? (scrolled ? '#fff' : '#e80200')
                    : (scrolled ? '#e80200' : '#fff'),
                  bgcolor: selectedLink === link.label
                    ? (scrolled ? '#e80200' : '#fff')
                    : 'transparent',
                  '&:hover': {
                    
                    bgcolor: selectedLink === link.label
                      ? (scrolled ? '#e80200' : '#fff')
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
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: { md: 2.5, lg: 5 },

                '@media (min-width:1400px) and (max-width:1650px)': {
                  mr: 0,
                },
              }}
            >
           <Button
              variant="outlined"
              onClick={handleMenuOpen}
              sx={{
                px: { md: 1.5, lg: 2.5 },
                color: isMenuOpen
                  ? (scrolled ? '#fff' : '#e80200')
                  : (scrolled ? 'primary.main' : '#fff'),
                borderColor: scrolled ? 'primary.main' : '#fff',
                bgcolor: isMenuOpen
                  ? (scrolled ? '#e80200' : '#fff')
                  : 'transparent',
                '&:hover': {
                  color: isMenuOpen
                    ? (scrolled ? '#fff' : '#e80200')
                    : (scrolled ? 'primary.main' : '#fff'),
                  borderColor: scrolled ? 'primary.dark' : '#fff',
                  bgcolor: isMenuOpen
                    ? (scrolled ? '#e80200' : '#fff')
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