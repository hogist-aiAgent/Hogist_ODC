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
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
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
            px: { xs: 0, },
            '@media (min-width: 1400px) and (max-width: 1600px)': {
              maxWidth: '100%',
              width: '100%',
              px: 4,
            },
          }}
        >
          <Toolbar
            sx={{
              py: { xs: 1, md: 0.7, lg: 1 },
              px: { xs: 2, sm: 2.5, md: 0 },

              '@media (min-width: 1400px) and (max-width: 1600px)': {
                justifyContent: 'space-between',
                px: 0,
                py: 0.8,
              },
            }}
          >          {/* Logo */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  flexGrow: 1,
                  ml: { xs: 0, sm: 1, md: 2, lg: 1 },

                  '@media (min-width:1400px) and (max-width:1600px)': {
                    ml: 0,
                  },
                }}
              >       
              
             <Box
              component="img"
              src={logo}
              alt="Hogist Logo"
              sx={{
                height: { xs: 42, sm: 48, md: 48, lg: 60, xl: 66  },
                width: 'auto',

                '@media (min-width:1400px) and (max-width:1600px)': {
                  height: 60,
                },
              }}
            />
          </Stack>

          {/* Desktop nav */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: { xs: 'auto', sm: 2, md: 1.5, lg: 2 },

              '@media (min-width:1400px) and (max-width:1600px)': {
                mr: 0.5,
              },
            }}
          >
            {navLinks.map((link) => (
              <Button
                key={link.label}
                onClick={() => setSelectedLink(link.label)}
                sx={{
                  px: { md: 1.3, lg: 1.5,},
                  py: { md: 0.6, lg: 0.7 },
                  borderRadius: 999,
                  fontWeight: 600,
                  fontSize: { md: '0.8rem', lg: '0.9rem', xl: '0.95rem' },
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
                  '@media (min-width:1400px) and (max-width:1600px)': {
                    px: 3.7,
                    py: 0.7,
                    fontSize: '1rem',
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
                mr: { md: 2, lg: 4 },

                '@media (min-width:1400px) and (max-width:1600px)': {
                  mr: 0,
                },
              }}
            >
           <Button
              variant="contained"
              onClick={handleMenuOpen}
              startIcon={<LocalPhoneRoundedIcon sx={{ fontSize: { md: 15, lg: 17 } }} />}
              sx={{
                px: { md: 1.8, lg: 2.6 },
                py: { md: 0.7, lg: 0.85 },
                borderRadius: 999,
                textTransform: 'none',
                fontWeight: 700,
                fontFamily: '"open sans", sans-serif',
                fontSize: { md: '0.78rem', lg: '0.87rem' },
                bgcolor: 'primary.main',
                color: '#fff',
                boxShadow: 'none',
                border: '1.5px solid #fff',
                
                '@media (min-width:1400px) and (max-width:1600px)': {
                  px: 2.2,
                  py: 0.85,
                  fontSize: '0.87rem',
                },

                '&:hover': {
                  bgcolor: 'primary.dark',
                  boxShadow: 'none',
                },
              }}
            >
              Get in Touch
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
              <ListItemButton
                key={link.label}
                selected={selectedLink === link.label}
                onClick={() => setSelectedLink(link.label)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'rgba(232,2,0,0.08)',
                    color: 'primary.main',
                  },
                }}
              >
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}

            <Box sx={{ px: 2, pt: 2 }}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<LocalPhoneRoundedIcon sx={{ fontSize: 16 }} />}
                sx={{
                  mb: 1.5,
                  borderRadius: 999,
                  textTransform: 'none',
                  fontWeight: 700,
                  bgcolor: 'primary.main',
                  color: '#fff',
                  boxShadow: 'none',
                  border: '1.5px solid #fff',
                  '&:hover': { bgcolor: 'primary.dark', boxShadow: 'none' },
                }}
                onClick={handleMenuOpen}
              >
                Get in Touch
              </Button>
            </Box>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}