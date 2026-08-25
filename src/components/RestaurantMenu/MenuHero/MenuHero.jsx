import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import img1 from '../../../assets/menu/chosseRestaurent/img1.jpg'
import img2 from '../../../assets/menu/chosseRestaurent/img2.jpg'

const MAROON_DARK = '#5c1018';
const MAROON_LIGHT = '#7a1a24';
const CREAM = '#f3ebe1';
const GOLD = '#e3b98a';
const WHITE = '#fff';

// Dummy promo content — swap these for real offers/copy whenever they're ready.
const SLIDES = [
  {
    eyebrow: 'WEDDING SEASON · BOOK BY 31 AUG',
    title: 'Flat ₹25 off per plate on orders above 300 plates',
    cta: 'See eligible menus',
    note: 'Code SEASON25 · auto-applied',
    photoLabel: img1,
  },
  {
    eyebrow: 'CORPORATE EVENTS · LIMITED SLOTS',
    title: 'Free tasting session for 500+ plate events',
    cta: 'Book a tasting',
    note: 'Available in Chennai only',
    photoLabel: img2,
  },
  {
    eyebrow: 'FESTIVE SPECIAL · THIS WEEK',
    title: 'Buy 200 plates, get a free live counter',
    cta: 'Explore festive menus',
    note: 'Code FESTLIVE · auto-applied',
    photoLabel: img1,
  },
  {
    eyebrow: 'FIRST ORDER · NEW CUSTOMERS',
    title: 'Flat 10% off on your first catering order',
    cta: 'Claim offer',
    note: 'Code WELCOME10 · auto-applied',
    photoLabel: img2,
  },
];

export default function Hero({ onLocationConfirm } = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = SLIDES.length;

  const currentSlide = SLIDES[activeIndex];
  const nextSlide = SLIDES[(activeIndex + 1) % total];

  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      goNext();
    }, 5000); // Change slide every 5 seconds

    // Cleanup timer on component unmount or when activeIndex changes
    return () => clearInterval(timer);
  }, [activeIndex]); // Re-run effect when activeIndex changes

  return (
    <Box
      sx={{
        bgcolor: '#fff',
         pt: { xs: 5,sm:11, md: 11, lg: 12 },
      }}
    >
      <Container 
        maxWidth="lg"
        sx={{
          maxWidth: { xs: '100%', sm: '100%', md: '100%', lg: '100%', xl: '1600px' },
          px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 }
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2, md: 2.5 }}
          alignItems="stretch"
        >
          {/* Main promo card — split into content half + photo-placeholder half */}
          <Box
            sx={{
              flex: { xs: '1 1 auto', lg: '0 0 68%' },
              maxWidth: { md:'70%', lg: '75%', xl: '72%' },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            }}
          >
            <Box
              sx={{
                flex: { sm: '0 0 59%' },
                bgcolor: MAROON_DARK,
                color: WHITE,
                px: { xs: 3, md: 4, xl: 5 },
                py: { xs: 3.5, md: 4, xl: 5 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 1.5,
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 10, xl: 12 },
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: GOLD,
                  fontFamily: '"open sans", sans-serif',
                }}
              >
                {currentSlide.eyebrow}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 18, sm: 20, md: 22, lg: 24, xl: 28 },
                  fontWeight: 800,
                  lineHeight: 1.25,
                  fontFamily: '"Montserrat", sans-serif',
                }}
              >
                {currentSlide.title}
              </Typography>

              <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} spacing={1.5} sx={{ mt: 1 }}>
                <Button
                  sx={{
                    bgcolor: WHITE,
                    color: MAROON_DARK,
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: { xs: 12, xl: 14 },
                    borderRadius: 999,
                    px: { xs: 2.5, xl: 3.5 },
                    py: { xs: 0.9, xl: 1.2 },
                    fontFamily: '"open sans", sans-serif',
                    alignSelf: 'flex-start',
                    '&:hover': { bgcolor: '#f2f2f2' },
                  }}
                >
                  {currentSlide.cta}
                </Button>
                <Typography
                  sx={{
                    fontSize: { xs: 11, xl: 13 },
                    color: 'rgba(255,255,255,0.75)',
                    fontFamily: '"open sans", sans-serif',
                  }}
                >
                  {currentSlide.note}
                </Typography>
              </Stack>
            </Box>

            <Box
              sx={{
                flex: { sm: '0 0 45%' },
                bgcolor: MAROON_LIGHT,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: { xs: 140, sm: 'auto' },
                px: 0,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={currentSlide.photoLabel}
                alt="Promo image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            </Box>
          </Box>

          {/* Peeking preview of the next card — desktop/laptop only */}
          <Box
            onClick={goNext}
            sx={{
              display: { xs: 'none', md: 'none', lg: 'flex' },
              flex: { lg: '0 0 28%', xl: '0 0 25%' },
              maxWidth: { lg: '28%', xl: '25%' },
              bgcolor: CREAM,
              borderRadius: 2,
              px: { xs: 3, md: 3.5, xl: 4 },
              py: { xs: 3, md: 4, xl: 5 },
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 1,
              cursor: 'pointer',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 10, xl: 12 },
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'primary.main',
                fontFamily: '"open sans", sans-serif',
              }}
            >
              Next
            </Typography>
            <Typography
              sx={{
                fontSize: { md: 14, lg: 15, xl: 18 },
                fontWeight: 800,
                lineHeight: 1.3,
                color: 'text.primary',
                fontFamily: '"Montserrat", sans-serif',
              }}
            >
              {nextSlide.title}
            </Typography>
          </Box>
        </Stack>

        {/* Pagination dots + counter, and prev/next controls */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 3 }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            {SLIDES.map((_, idx) => (
              <Box
                key={idx}
                onClick={() => setActiveIndex(idx)}
                sx={{
                  width: idx === activeIndex ? 22 : 6,
                  height: 6,
                  borderRadius: 999,
                  bgcolor: idx === activeIndex ? 'primary.main' : 'rgba(43,33,28,0.2)',
                  cursor: 'pointer',
                  transition: 'width 0.2s ease',
                }}
              />
            ))}
            <Typography
              sx={{
                fontSize: 11,
                color: 'text.secondary',
                fontFamily: '"open sans", sans-serif',
                ml: 1,
              }}
            >
              {activeIndex + 1}/{total}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={goPrev}
              aria-label="Previous offer"
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#fff',
                border: '1px solid rgba(43,33,28,0.15)',
                '&:hover': { bgcolor: '#f5f5f5' },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              onClick={goNext}
              aria-label="Next offer"
              sx={{
                width: 36,
                height: 36,
                bgcolor: '#1a1a1a',
                color: '#fff',
                '&:hover': { bgcolor: '#000' },
              }}
            >
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}