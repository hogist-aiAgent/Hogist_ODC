import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { useRef } from 'react';
import bgImg from '../../assets/backgroundImage/Desktopu.png';
import IconButton from '@mui/material/IconButton';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import PaymentIcon from '@mui/icons-material/Payment';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import orderImg from '../../assets/HeroSection/img11.jpg'
import LocationSearchBox from '../Common/LocationSearchBox';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import WorkspacePremiumRoundedIcon from '@mui/icons-material/WorkspacePremiumRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';

const trustFeatures = [
  { icon: StorefrontRoundedIcon, title: '200+', subtitle: 'Partner Kitchens' },
  { icon: AccessTimeFilledRoundedIcon, title: 'On-Time', subtitle: 'Every Time' },
  { icon: WorkspacePremiumRoundedIcon, title: 'QHSE', subtitle: 'Compliant' },
  { icon: SupportAgentRoundedIcon, title: 'Dedicated', subtitle: 'Support' },
];

// Minimal entrance animation keyframes for hero content
const fadeSlideUp = {
  '@keyframes heroFadeSlideUp': {
    '0%': { opacity: 0, transform: 'translateY(16px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

const fadeSlideRight = {
  '@keyframes heroFadeSlideRight': {
    '0%': { opacity: 0, transform: 'translateX(24px)' },
    '100%': { opacity: 1, transform: 'translateX(0)' },
  },
};

const fadeIn = {
  '@keyframes heroFadeIn': {
    '0%': { opacity: 0, transform: 'scale(0.98)' },
    '100%': { opacity: 1, transform: 'scale(1)' },
  },
};

export default function Hero({ onLocationConfirm } = {}) {
const locationSearchRef = useRef(null);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#efe6dd',
        pt: { xs: 5, md: 4, lg: 5, xl: 8 },
        pb: { xs: 6, md: 5, lg: 6, xl: 7 },
        p: { xs: 2, sm: 2, md: 1, lg: 3 },
        minHeight: { xs: 'auto', md: '90vh', lg: '100vh', xl: '90vh' },
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'block' },
        flexDirection: { lg: 'column' },
        justifyContent: { lg: 'center' },
      }}
    >

      <Box
      component="img"
      src={bgImg}
      alt=""
      loading="lazy"
      decoding="async"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center center',
        // opacity: 0.18,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
      }}
    />
    

     {/* <Box
      component="img"
        src={curveImg}
        alt=""
        sx={{
          position: "absolute",
          top:"0",
          right: 0,
          width: {md:700,lg:1100, xl:1150},
          height: {md:550, lg: 700, xl: 690},
          zIndex:1,
          display: { xs: 'none', sm: 'none', md: 'block' },
        }}
      /> */}


      <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,

            /* Only around 1440px screens */
            '@media (min-width:1400px) and (max-width:1600px)': {
              maxWidth: '1320px',
              px: 1,
            },
          }}
        >
        <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: {
                xs: 'center',
                sm: 'center',
                md: 'center',
                lg: 'center',
              },
              justifyContent: 'space-between',
              textAlign: { xs: 'center',sm: 'center',md: 'left', lg: 'left' },
              gap: {
                xs: 5,
                sm: 6,
                md: 5,
                lg: 6,
                xl: 9,
              },
              mt: { xs: 7, sm: 7, md: 14, lg: 2, xl: 5 },

              '@media (min-width:1400px) and (max-width:1600px)': {
                mt: 2,
                gap: 6,
              },
            }}
          >
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 50%' },
              maxWidth: {
                xs: '100%',
                md: '56%',
              },
              width: '100%',
              position: 'relative',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            {/* Trust badge pill */}
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.8,
                bgcolor: '#fff',
                boxShadow: '0 10px 30px rgba(20,20,43,0.12)',
                border: '1px solid rgba(0, 0, 0, 0.23)',
                color: 'primary.main',
                fontWeight: 600,
                fontFamily: '"open sans", sans-serif',
                fontSize: { xs: '0.72rem', sm: '0.78rem', md: '0.75rem', lg: '0.8rem' },
                px: { xs: 1.6, md: 1.8 },
                py: { xs: 0.7, md: 0.7 },
                borderRadius: 999,
                mb: { xs: 2, md: 1.8 },

                '@media (min-width:1400px) and (max-width:1600px)': {
                  fontSize: '0.9rem',
                  px: 1.8,
                  py: 0.7,
                  mb: 1.8,
                },

                ...fadeSlideUp,
                opacity: 0,
                animation: 'heroFadeSlideUp 0.6s ease 0.1s forwards',
              }}
            >
              <VerifiedUserRoundedIcon sx={{ fontSize: { xs: 16, md: 18 } }} />
              Trusted by 30+ Companies in Chennai
            </Box>

            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 28, sm: 36, md: 33, lg: 42, xl: 49 },
                lineHeight: 1.15,
                mb: 1.5,
                fontWeight: 800,
                letterSpacing: '-0.5px',
                fontFamily: '"Montserrat", sans-serif',
                mt:{ xs: 1, sm: 1, md: 1,lg:0},

                '@media (min-width:1400px) and (max-width:1600px)': {
                  fontSize: 58,
                },

                ...fadeSlideUp,
                opacity: 0,
                animation: 'heroFadeSlideUp 0.65s ease 0.22s forwards',
              }}
            >
              A one-stop place for all your Food and Party{' '}
              <Box
                component="span"
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: { xs: -3, md: -5 },
                    height: { xs: 3, md: 4 },
                    bgcolor: 'primary.main',
                    borderRadius: 4,
                  },
                }}
              >
                Orders.
              </Box>
            </Typography>

                <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem', lg: '0.9rem', xl: '1rem' },
                letterSpacing: '0.1px',
                fontFamily: '"open sans", sans-serif',
                mb: 0.3,

                '@media (min-width:1400px) and (max-width:1600px)': {
                  fontSize: '1.3em',
                  mb: 0.5,
                },

                ...fadeSlideUp,
                opacity: 0,
                animation: 'heroFadeSlideUp 0.65s ease 0.34s forwards',
              }}
            >
             Delivering & serving anywhere in Chennai.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                fontWeight: 500,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.9rem', lg: '0.9rem', xl: '1rem' },
                letterSpacing: '0.1px',
                fontFamily: '"open sans", sans-serif',
                mb: 2,

                '@media (min-width:1400px) and (max-width:1600px)': {
                  fontSize: '1.3em',
                  mb: 2.5,
                },

                ...fadeSlideUp,
                opacity: 0,
                animation: 'heroFadeSlideUp 0.65s ease 0.34s forwards',
              }}
            >
              Order a day before the event.
              Place any order starting from{' '}
              <Box component="span" sx={{ color: 'primary.main', fontWeight: 800 }}>
                50pax
              </Box>
              .
            </Typography>

            {/* Location / search pill: "Cater to Chennai" with Search action, moved here from Navbar */}
            <Box
              sx={{
                position: 'relative',
                zIndex: 50,
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'center', md: 'center', lg: 'flex-start' },
                width: '100%',
                mt: { xs: 0, sm: 0, md: 0, lg: 0 },
                mb: { xs: 3, sm: 3, md: 2.5, lg: 3 },
                ml: { xs: 0, sm: 0, md: -3.5, lg: -1},

                ...fadeSlideUp,
                opacity: 0,
                animation: 'heroFadeSlideUp 0.65s ease 0.46s forwards',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  maxWidth: { xs: '100%', sm: 480, md: 440, lg: 480 },
                  bgcolor: '#fff',
                  borderRadius: 999,
                  boxShadow: '0 10px 30px rgba(20,20,43,0.12)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  pl: { xs: 1.5, md: 1.8 },
                  pr: { xs: 0.6, md: 0.6 },
                  py: { xs: 0.6, md: 0.5 },
                  gap: 1,

                  '@media (min-width:1400px) and (max-width:1600px)': {
                    maxWidth: 480,
                    pl: 2,
                    py: 0.9,
                  },
                }}
              >
                  <SearchIcon sx={{ color: 'primary.main', fontSize: { xs: 20, md: 20 }, flexShrink: 0 }} />

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <LocationSearchBox ref={locationSearchRef} onLocationConfirm={onLocationConfirm}
                  />
                  </Box>

                <Button
                  onClick={() => locationSearchRef.current?.confirm()}
                  sx={{
                    flexShrink: 0,
                    bgcolor: 'primary.main',
                    color: '#fff',
                    borderRadius: 999,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontFamily: '"open sans", sans-serif',
                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                    px: { xs: 2, md: 2.2 },
                    py: { xs: 0.9, md: 0.9 },
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                  endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                >
                  Next
                </Button>
              </Box>
            </Box>

            {/* Trust features strip */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: { xs: 3, sm: 2.5, md: 1.6, lg: 2.5, xl: 3 },
                width: '100%',

                '@media (min-width:1400px) and (max-width:1600px)': {
                  gap: 3,
                },

                ...fadeSlideUp,
                opacity: 0,
                animation: 'heroFadeSlideUp 0.65s ease 0.58s forwards',
              }}
            >
              {trustFeatures.map(({ icon: Icon, title, subtitle }) => (
                <Box
                  key={title + subtitle}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: { xs: 34, md: 34, lg: 39 },
                      height: { xs: 34, md: 34, lg: 39 },
                      borderRadius: '50%',
                      bgcolor: 'rgba(232,2,0,0.08)',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ color: 'primary.main', fontSize: { xs: 18, md: 18, lg: 20 } }} />
                  </Box>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '0.78rem', md: '0.8rem', lg: '0.85rem' },
                        fontFamily: '"Montserrat", sans-serif',
                        lineHeight: 1.2,
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 500,
                        fontSize: { xs: '0.68rem', md: '0.7rem', lg: '0.73rem' },
                        color: 'text.secondary',
                        fontFamily: '"open sans", sans-serif',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {subtitle}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              sx={{
                  display: { xs: 'flex', sm: 'flex', md: 'none' },
                  flex: {
                    xs: '1 1 100%',
                  },
                  maxWidth: {
                    xs: '100%',
                  },
                  width: '100%',
                  justifyContent: {
                    xs: 'center',
                    sm: 'center',
                    md: 'center',
                  },
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 2,
                  mt: { xs: 3, sm: 3, md: 1, },
                  mb:2
                }}
              >
                <Box
                  component="img"
                  src={orderImg}
                  alt="Order food"
                  loading="lazy"
                  decoding="async"
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '90%',
                    },
                    maxWidth: {
                      xs: 340,
                      sm: 420,
                      md: 490,
                    },
                    height: {
                      xs: '200px',
                      sm: '200px',
                      md: '250px',
                    },
                    display: 'block',
                    objectFit: 'cover',
                    borderRadius: {
                      xs: 2,
                      sm: 3,
                    },
                    boxShadow: '0 20px 45px rgba(20,20,43,0.08)',
                    mt: { xs: 3, sm: 2, md: 0, lg: 0 },

                    ...fadeIn,
                    opacity: 0,
                    animation: 'heroFadeIn 0.7s ease 0.3s forwards',
                  }}
                />
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' },
              flex: '1 1 45%',
              maxWidth: '45%',
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Box
              component="img"
              src={orderImg}
              alt="Order food"
              loading="lazy"
              decoding="async"
              sx={{
                width: '100%',
                maxWidth: { md: 460, lg: 500, xl: 650 },
                height: { md: 330, lg: 400, xl: 350 },
                display: 'block',
                objectFit: 'cover',
                borderRadius: 6,
                border: '3.5px solid #fff',
                boxShadow: '0 20px 45px rgba(20,20,43,0.15)',

                '@media (min-width:1400px) and (max-width:1600px)': {
                  maxWidth: 560,
                  height: 500,
                },

                ...fadeSlideRight,
                opacity: 0,
                animation: 'heroFadeSlideRight 0.75s ease 0.25s forwards',
              }}
            />
          </Box>

        </Box>

      </Container>

    </Box>
  );
}