import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
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
  Typography,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import RestaurantMenuOutlinedIcon from '@mui/icons-material/RestaurantMenuOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import logo from '../../../assets/CompanyLogo/logo.png';
import SystemUpdateOutlinedIcon from '@mui/icons-material/SystemUpdateOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoginPopup from '../../Common/LoginForm/LoginPopup'; // Import the LoginPopup component

const navLinks = [
  { label: 'Home', active: true, href: 'https://hogist.com/' },
  { label: 'Why Us', sectionId: 'why-us' },
  { label: 'Services', sectionId: 'services' },
  { label: 'Testimonial', sectionId: 'testimonial' },
  { label: 'Contact Us', sectionId: 'contact-us' },
];


function LocationBadge({ text }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={0.5}
      sx={{
        border: '1.5px solid rgba(154,0,2,0.25)',
        borderRadius: 999,
        px: { xs: 1.1, md: 1.4 },
        py: { xs: 0.5, md: 0.6 },
        bgcolor: 'rgba(154,0,2,0.04)',
        flexShrink: 0,
      }}
    >
      <LocationOnIcon sx={{ fontSize: { xs: 15, md: 16 }, color: '#9a0002' }} />
      <Typography
        sx={{
          fontSize: { xs: '0.72rem', md: '0.8rem' },
          fontWeight: 700,
          color: '#9a0002',
          fontFamily: '"open sans", sans-serif',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}


function MenuPageActions({ onNotificationClick, onCartClick, onProfileClick, locationText, userName }) {
  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0.75, md: 1.5 }}>
      {/* Location badge — hidden on mobile (xs) only; still shows on tablet (sm) and desktop/laptop (md+) */}
      <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <LocationBadge text={locationText} />
      </Box>
      <IconButton
        onClick={onNotificationClick}
        aria-label="Notifications"
        sx={{
          color: '#9a0002',
          border: '1.5px solid rgba(154,0,2,0.3)',
          p: { xs: 0.5, md: 0.6, lg: 0.5 },
          '&:hover': {
            bgcolor: 'rgba(154,0,2,0.06)',
          },
        }}
      >
        <NotificationsNoneOutlinedIcon sx={{ fontSize: { xs: 20, md: 22, lg: 24 } }} />
      </IconButton>

      <IconButton
        onClick={onCartClick}
        aria-label="Cart"
        sx={{
          color: '#9a0002',
          border: '1.5px solid rgba(154,0,2,0.3)',
         p: { xs: 0.5, md: 0.6, lg: 0.5 },
          '&:hover': {
            bgcolor: 'rgba(154,0,2,0.06)',
          },
        }}
      >
        <ShoppingCartOutlinedIcon sx={{ fontSize: { xs: 20, md: 21, lg: 24 } }} />
      </IconButton>

      {/* Profile pill — icon + Guest/user name + chevron, opens the profile dropdown */}
      <Box
        component="button"
        type="button"
        onClick={onProfileClick}
        aria-label="Profile menu"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.4, md: 0.6 },
          cursor: 'pointer',
          background: 'none',
          color: '#9a0002',
          border: '1.5px solid rgba(154,0,2,0.3)',
          borderRadius: 999,
          pl: { xs: 0.5, md: 0.6 },
          pr: { xs: 1, md: 1.2 },
          py: { xs: 0.35, sm:0.4,md: 0.4 },
          '&:hover': {
            bgcolor: 'rgba(154,0,2,0.06)',
          },
        }}
      >
        <AccountCircleOutlinedIcon sx={{ fontSize: { xs: 20, md: 22, lg: 24 }, color: '#9a0002' }} />
        <Typography
          sx={{
            fontSize: { xs: '0.72rem', md: '0.8rem' },
            fontWeight: 700,
            color: '#9a0002',
            textTransform: 'uppercase',
            fontFamily: '"open sans", sans-serif',
            whiteSpace: 'nowrap',
          }}
        >
          {userName || 'Guest'}
        </Typography>
        <ExpandMoreIcon sx={{ fontSize: { xs: 16, md: 18 }, color: '#9a0002' }} />
      </Box>
    </Stack>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Dropdown Menu State
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [profileAnchorEl, setProfileAnchorEl] = useState(null);
  const isProfileMenuOpen = Boolean(profileAnchorEl);
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const userName = authUser?.fullName || null;
  const isLoggedIn = Boolean(userName);

  const [selectedLink, setSelectedLink] = useState('Home');

  const [scrolled, setScrolled] = useState(false);

  // Login Popup State
  const [loginPopupOpen, setLoginPopupOpen] = useState(false);

  const routerLocation = useLocation();
  const isMenuPage = routerLocation.pathname.toLowerCase().includes('menu');
  const isMyPlan = routerLocation.pathname.toLowerCase().includes('plan'); 
  const isEventDetails = routerLocation.pathname.toLowerCase().includes('event-details'); 
  const isPayment = routerLocation.pathname.toLowerCase().includes('payment'); 

  const showBackground = scrolled || isMenuPage || isMyPlan || isEventDetails || isPayment;

  const selectedLocation = routerLocation.state?.selectedLocation;

  const DEFAULT_PINCODE = '600034';

  const getLocationBadgeText = (loc) => {
    const full = loc?.full || loc?.label || '';
    const pincodeMatch = full.match(/\b\d{6}\b/);
    const pincode = pincodeMatch ? pincodeMatch[0] : DEFAULT_PINCODE;
    return `Chennai · ${pincode}`;
  };

  const locationBadgeText = getLocationBadgeText(selectedLocation);

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

  const handleProfileMenuOpen = (event) => {
    setProfileAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchorEl(null);
  };

  const handleNotificationClick = () => {
    // TODO: route to notifications page
  };

  const handleCartClick = () => {
    // TODO: route to cart page
  };

  const handleWhatsAppClick = (event) => {
    if (event.ctrlKey || event.metaKey || event.button === 1) {
      return;
    }
    event.preventDefault();
    window.open(`https://wa.me/${'15557647627'}`, '_blank');
  };

  const handleGetAppClick = () => {
    const section = document.getElementById('app-download');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleProfileClick = () => {
    // TODO: route to profile / account page
  };

  const handleLoginClick = () => {
    setLoginPopupOpen(true);
  };

  const handleLoginPopupClose = () => {
    setLoginPopupOpen(false);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const handleNavClick = (link) => {
    setSelectedLink(link.label);
    setMobileOpen(false);

    if (link.href) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
      return;
    }

    if (link.sectionId) {
      const section = document.getElementById(link.sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: showBackground ? '#efe6dd' : 'transparent',
          boxShadow: showBackground ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          // borderBottom: '1px solid #F0F0F3',
          color: 'text.primary',
        }}
      >
        <Container
          maxWidth="lg"
          disableGutters
          sx={{
            px: { xs: 0 },
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
          >
            {/* Logo */}
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
                component="a"
                href="https://hogist.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Hogist Logo"
                  loading="lazy"
                  decoding="async"
                  sx={{
                    height: { xs: 42, sm: 48, md: 48, lg: 60, xl: 66 },
                    width: 'auto',

                    '@media (min-width:1400px) and (max-width:1600px)': {
                      height: 60,
                    },
                  }}
                />
              </Box>
            </Stack>

            {/* Desktop nav - hide on menu page */}
            {!isMenuPage && !isMyPlan && !isEventDetails && !isPayment && (
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
                    onClick={() => handleNavClick(link)}
                    sx={{
                      px: { md: 1.3, lg: 1.5 },
                      py: { md: 0.6, lg: 0.7 },
                      borderRadius: 999,
                      fontWeight: 600,
                      fontSize: { md: '0.8rem', lg: '0.9rem', xl: '0.95rem' },
                      letterSpacing: '0.2px',
                      textTransform: 'none',
                      fontFamily: '"Montserrat", sans-serif',
                      color:
                        selectedLink === link.label
                          ? showBackground
                            ? '#efe6dd'
                            : '#9a0002'
                          : showBackground
                          ? '#9a0002'
                          : '#efe6dd',
                      bgcolor:
                        selectedLink === link.label
                          ? showBackground
                            ? '#9a0002'
                            : '#efe6dd'
                          : 'transparent',
                      '&:hover': {
                        bgcolor:
                          selectedLink === link.label
                            ? showBackground
                              ? '#9a0002'
                              : '#efe6dd'
                            : showBackground
                            ? 'rgba(154,0,2,0.06)'
                            : 'rgba(255,255,255,0.12)',
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
            )}

            {/* CTA */}
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                display: { xs: 'none', md: 'flex' },
                mr: { md: 2, lg: 4 },

                '@media (min-width:1400px) and (max-width:1600px)': {
                  mr: 0,
                },
              }}
            >
              {isMenuPage || isMyPlan || isEventDetails || isPayment ? (
                <MenuPageActions
                  locationText={locationBadgeText}
                  userName={userName}
                  onNotificationClick={handleNotificationClick}
                  onCartClick={handleCartClick}
                  onProfileClick={handleProfileMenuOpen}
                  
                />
              ) : (
                <Button
                  component="a"
                  variant="contained"
                  onClick={handleGetAppClick}
                  startIcon={
                    <SystemUpdateOutlinedIcon
                      sx={{ fontSize: { md: 15, lg: 17 } }}
                    />
                  }
                  sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    px: { md: 2.1, lg: 3 },
                    py: { md: 0.75, lg: 0.9 },
                    borderRadius: 999,
                    textTransform: 'none',
                    fontWeight: 800,
                    fontFamily: '"open sans", sans-serif',
                    fontSize: { md: '0.8rem', lg: '0.9rem' },
                    letterSpacing: '0.3px',
                    background:
                      'linear-gradient(135deg, #ac1f1f 0%, #d6293e 45%, #9a0002 100%)',
                    color: '#fff',
                    boxShadow:
                      '0 4px 14px rgba(154,0,2,0.45), 0 0 0 1.5px rgba(255,255,255,0.35) inset',
                    border: 'none',
                    animation: 'getAppGlow 2.4s ease-in-out infinite',
                    '@keyframes getAppGlow': {
                      '0%, 100%': {
                        boxShadow:
                          '0 4px 14px rgba(154,0,2,0.45), 0 0 0 1.5px rgba(255,255,255,0.35) inset',
                      },
                      '50%': {
                        boxShadow:
                          '0 6px 22px rgba(214,41,62,0.7), 0 0 0 1.5px rgba(255,255,255,0.5) inset',
                      },
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-75%',
                      width: '50%',
                      height: '100%',
                      background:
                        'linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent)',
                      transform: 'skewX(-20deg)',
                      animation: 'getAppShine 3.2s ease-in-out infinite',
                    },
                    '@keyframes getAppShine': {
                      '0%': { left: '-75%' },
                      '35%': { left: '130%' },
                      '100%': { left: '130%' },
                    },

                    '@media (min-width:1400px) and (max-width:1600px)': {
                      px: 2.6,
                      py: 0.9,
                      fontSize: '1rem',
                    },

                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #ac1f1f 0%, #e12e45 45%, #ae0003 100%)',
                      transform: 'translateY(-2px) scale(1.04)',
                      boxShadow:
                        '0 8px 26px rgba(154,0,2,0.55), 0 0 0 1.5px rgba(255,255,255,0.5) inset',
                    },
                    transition:
                      'transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
                  }}
                >
                  GET APP
                </Button>
              )}


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

            {(isMenuPage || isMyPlan || isEventDetails || isPayment) && (
              <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center' }}>
                <MenuPageActions
                locationText={locationBadgeText}
                userName={userName}
                  onNotificationClick={handleNotificationClick}
                  onCartClick={handleCartClick}
                  onProfileClick={handleProfileMenuOpen}
                />
              </Box>
            )}

            <Menu
              anchorEl={profileAnchorEl}
              open={isProfileMenuOpen}
              onClose={handleProfileMenuClose}
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
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 200,
                  py: 0.5,
                },
              }}
            >
              {isLoggedIn ? (
                [
                  <MenuItem
                    key="profile"
                    onClick={() => {
                      handleProfileMenuClose();
                      handleProfileClick();
                    }}
                    sx={{
                      fontSize: '0.9rem',
                      py: 1,
                      fontFamily: '"open sans", sans-serif',
                    }}
                  >
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 18, mr: 1.25, color: '#9a0002' }} />
                    Profile
                  </MenuItem>,

                  <MenuItem
                    key="settings"
                    onClick={handleProfileMenuClose}
                    sx={{
                      fontSize: '0.9rem',
                      py: 1,
                      fontFamily: '"open sans", sans-serif',
                    }}
                  >
                    <SettingsOutlinedIcon sx={{ fontSize: 18, mr: 1.25, color: '#9a0002' }} />
                    Settings
                  </MenuItem>,

                  <Divider key="divider" sx={{ my: 0.5 }} />,

                  <MenuItem
                    key="logout"
                    onClick={() => {
                      handleProfileMenuClose();
                      handleLogoutClick();
                    }}
                    sx={{
                      fontSize: '0.9rem',
                      py: 1,
                      fontWeight: 700,
                      color: '#9a0002',
                      fontFamily: '"open sans", sans-serif',
                    }}
                  >
                    <LogoutOutlinedIcon sx={{ fontSize: 18, mr: 1.25 }} />
                    Logout
                  </MenuItem>,
                ]
              ) : (
                <MenuItem
                  onClick={() => {
                    handleProfileMenuClose();
                    handleLoginClick();
                  }}
                  sx={{
                    fontSize: '0.9rem',
                    py: 1,
                    fontWeight: 700,
                    color: '#9a0002',
                    fontFamily: '"open sans", sans-serif',
                  }}
                >
                  <LoginOutlinedIcon sx={{ fontSize: 18, mr: 1.25 }} />
                  Login
                </MenuItem>
              )}
            </Menu>

            {!isMenuPage && !isMyPlan && !isEventDetails && !isPayment && (
              <IconButton
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>

        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
        >
          <Box sx={{ width: { xs: 240, sm: 280, md: 300 }, pt: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 1 }}>
              <IconButton onClick={() => setMobileOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <List>
              {/* Show nav links only on non-menu pages */}
              {!isMenuPage && !isMyPlan && !isEventDetails && !isPayment &&
                navLinks.map((link) => (
                  <ListItemButton
                    key={link.label}
                    selected={selectedLink === link.label}
                    onClick={() => handleNavClick(link)}
                    sx={{
                      '&.Mui-selected': {
                        bgcolor: 'rgba(232,2,0,0.08)',
                        color: 'primary.main',
                      },
                    }}
                  >
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontFamily: '"open sans", sans-serif',
                      }}
                    />
                  </ListItemButton>
                ))}

              <Box sx={{ px: 2, pt: 2 }}>
                {!isMenuPage && !isMyPlan && !isEventDetails && !isPayment && (
                  <Button
                    fullWidth
                    component="a"
                    variant="contained"
                    startIcon={<SystemUpdateOutlinedIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      mb: 1.5,
                      borderRadius: 999,
                      textTransform: 'none',
                      fontWeight: 800,
                      letterSpacing: '0.3px',
                      fontFamily: '"open sans", sans-serif',
                      background:
                        'linear-gradient(135deg, #ac1f1f 0%, #d6293e 45%, #9a0002 100%)',
                      color: '#fff',
                      boxShadow:
                        '0 4px 14px rgba(154,0,2,0.45), 0 0 0 1.5px rgba(255,255,255,0.35) inset',
                      border: 'none',
                      animation: 'getAppGlowMobile 2.4s ease-in-out infinite',
                      '@keyframes getAppGlowMobile': {
                        '0%, 100%': {
                          boxShadow:
                            '0 4px 14px rgba(154,0,2,0.45), 0 0 0 1.5px rgba(255,255,255,0.35) inset',
                        },
                        '50%': {
                          boxShadow:
                            '0 6px 22px rgba(214,41,62,0.7), 0 0 0 1.5px rgba(255,255,255,0.5) inset',
                        },
                      },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-75%',
                        width: '50%',
                        height: '100%',
                        background:
                          'linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent)',
                        transform: 'skewX(-20deg)',
                        animation: 'getAppShineMobile 3.2s ease-in-out infinite',
                      },
                      '@keyframes getAppShineMobile': {
                        '0%': { left: '-75%' },
                        '35%': { left: '130%' },
                        '100%': { left: '130%' },
                      },
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #ac1f1f 0%, #e12e45 45%, #ae0003 100%)',
                        boxShadow:
                          '0 8px 26px rgba(154,0,2,0.55), 0 0 0 1.5px rgba(255,255,255,0.5) inset',
                      },
                    }}
                    onClick={handleWhatsAppClick}
                  >
                    GET APP
                  </Button>
                )}
              </Box>
            </List>
          </Box>
        </Drawer>
      </AppBar>

      {/* Login Popup */}
      <LoginPopup open={loginPopupOpen} onClose={handleLoginPopupClose} />
    </>
  );
}