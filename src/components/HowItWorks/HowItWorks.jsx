import { Fragment, useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import Choose from '../../assets/HowItWorks/1.png';
import Payment from '../../assets/HowItWorks/2.png';
import Delivery from '../../assets/HowItWorks/3.png';

const steps = [
  {
    num: '01',
    img: Choose,
    title: 'Choose Your Location',
    desc: "Enter your delivery location and we'll instantly check availability in your area.",
  },
  {
    num: '02',
    img: Payment,
    title: 'Browse Curated Menus',
    desc: 'Explore a wide range of menus and choose what suits your event, guests and budget.',
  },
  {
    num: '03',
    img: Delivery,
    title: 'Relax, We Handle Everything',
    desc: 'We allocate the best kitchen, prepare fresh, quality-check and deliver on time, every time.',
  },
];

const timelineSteps = [
  { icon: LocationOnRoundedIcon, label: 'Location Confirmed' },
  { icon: ListAltRoundedIcon, label: 'Menu Selected' },
  { icon: StorefrontRoundedIcon, label: 'Kitchen Allocated' },
  { icon: RestaurantRoundedIcon, label: 'Food Prepared' },
  { icon: GppGoodRoundedIcon, label: 'Quality Checked' },
  { icon: LocalShippingRoundedIcon, label: 'On-time Delivery' },
  { icon: CelebrationRoundedIcon, label: 'Happy Guests' },
];

const trustBadges = [
  { icon: GroupsRoundedIcon, value: '200+', label: 'Partner Kitchens', countTo: 200 },
  { icon: InsightsRoundedIcon, value: 'Live Capacity', label: 'Allocation' },
  { icon: VerifiedUserRoundedIcon, value: 'QHSE', label: 'Standards' },
  { icon: AccessTimeFilledRoundedIcon, value: 'On-time', label: 'Delivery' },
  { icon: SupportAgentRoundedIcon, value: 'Dedicated', label: 'Relationship Manager' },
];

const ARROW_OFFSET = { md: 61, lg: 89 };

const T = {
  step: [500, 1800, 3200],
  line: [1200, 2600],
  timelineStart: 3600,
  timelineStagger: 150,
  badgesStart: 4500,
  badgesStagger: 100,
};

function CountUpNumber({ to, active, suffix = '+', duration = 1200 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to, duration]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff',
        py: { xs: 6, md: 8, lg: 9 },
        opacity: revealed ? 1 : 0,
        transform: revealed ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          px: { xs: 2.5, sm: 3, md: 3 },
          '@media (min-width:1400px)': {
            maxWidth: '1400px',
          },
          '@media (min-width:1600px)': {
            maxWidth: '1500px',
          },
        }}
      >
        {/* Eyebrow */}
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{ mb: 1.5 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography
            sx={{
              letterSpacing: 2,
              fontWeight: 800,
              fontSize: { xs: '0.68rem', md: '0.9rem' },
              color: 'primary.main',
              textTransform: 'uppercase',
              fontFamily: '"open sans", sans-serif',
            }}
          >
            How Hogist Works
          </Typography>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main' }} />
        </Stack>

        {/* Heading */}
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontWeight: 800,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: { xs: 26, sm: 32, md: 38, lg: 44 },
            lineHeight: 1.25,
            mb: 2,
          }}
        >
          Ordering Event Food Has Never Been{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            This Easy
          </Box>
        </Typography>

        <Typography
          align="center"
          sx={{
            color: 'text.secondary',
            maxWidth: 560,
            mx: 'auto',
            fontFamily: '"open sans", sans-serif',
            fontWeight: 500,
            fontSize: { xs: '0.85rem', md: '0.95rem' },
            mb: { xs: 5, md: 7 },
          }}
        >
          Just choose your location and menu. We handle everything else—
          <br />
          from kitchen allocation to on-time delivery.
        </Typography>

        {/* Step cards, connected by circular arrow badges */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row', md: 'row' },
            flexWrap: { xs: 'nowrap', sm: 'wrap', md: 'nowrap' },
            alignItems: { xs: 'center', sm: 'flex-start', md: 'flex-start' },
            justifyContent: 'center',
            gap: { xs: 5, sm: 3, md: 0 },
            mb: { xs: 6, md: 6 },
          }}
        >
          {steps.map((step, idx) => (
            <Fragment key={step.title}>
              {/* card */}
              <Box
                sx={{
                  position: 'relative',
                  bgcolor: '#fff',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '20px',
                  boxShadow: '0 4px 24px rgba(20,20,43,0.05)',
                  px: { xs: 3, md: 2.2, lg: 0 },
                  pt: { xs: 5, md: 4.5, lg: 5 },
                  pb: { xs: 4, md: 3.5 },
                  py: { xs: 4, md: 3.5, lg: 1 },
                  flex: { xs: 'none', sm: '0 1 auto', md: '1 1 0' },
                  minWidth: { xs: 'auto', md: 0 },
                  width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'auto' },
                  maxWidth: { xs: 300, sm: 340, md: 'none' },
                  mx: 'auto',
                  textAlign: 'center',
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
                  transition: `opacity 0.6s ease ${T.step[idx]}ms, transform 0.6s ease ${T.step[idx]}ms`,
                }}
              >
                {/* Number badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: { xs: 12, md: 14 },
                    left: { xs: 12, md: 14 },
                    bgcolor: 'rgba(232,2,0,0.08)',
                    color: 'primary.main',
                    fontWeight: 800,
                    fontSize: { xs: '0.72rem', md: '1rem' },
                    fontFamily: '"Montserrat", sans-serif',
                    px: 1.1,
                    py: 0.3,
                    borderRadius: '8px',
                    lineHeight: 1.6,
                  }}
                >
                  {step.num}
                </Box>

                <Box
                  sx={{
                    width: { xs: 140, sm: 150, md: 140, lg: 170, xl: 190 },
                    height: { xs: 140, sm: 150, md: 140, lg: 190, xl: 210 },
                    mx: 'auto',
                    mt: 1,
                    mb: 1.5,
                    '@media (min-width:1400px)': {
                      width: 190,
                      height: 210,
                    },
                    '@media (min-width:1600px)': {
                      width: 205,
                      height: 225,
                    },
                    '@keyframes iconPop': {
                      '0%': { transform: 'scale(0.6)', filter: 'drop-shadow(0 0 0 rgba(232,2,0,0))' },
                      '60%': { transform: 'scale(1.12)', filter: 'drop-shadow(0 0 14px rgba(232,2,0,0.35))' },
                      '100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 0 rgba(232,2,0,0))' },
                    },
                    animation: revealed ? `iconPop 0.7s ease ${T.step[idx] + 100}ms both` : 'none',
                  }}
                >
                  <Box
                    component="img"
                    src={step.img}
                    alt={step.title}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>

                <Typography
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: '1rem', md: '1rem', lg: '1.05rem' },
                    fontFamily: '"open sans", sans-serif',
                    mb: 1,
                  }}
                >
                  {step.title}
                </Typography>

                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: '0.82rem', md: '0.8rem', lg: '0.85rem' },
                    fontFamily: '"open sans", sans-serif',
                    lineHeight: 1.5,
                    maxWidth: 240,
                    mx: 'auto',
                  }}
                >
                  {step.desc}
                </Typography>
              </Box>
                  {/* connected dotted line with arrow */}
              {idx !== steps.length - 1 && (
                <Box
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    alignItems: 'center',
                    width: { md: 80, lg: 88, xl: 110 },
                    flexShrink: 0,
                    mt: `${ARROW_OFFSET.md}px`,
                    '@media (min-width:1200px)': {
                      mt: `${ARROW_OFFSET.lg}px`,
                    },
                    '@media (min-width:1400px)': {
                      width: 110,
                      mt: `${ARROW_OFFSET.lg + 8}px`,
                    },
                    '@media (min-width:1600px)': {
                      width: 130,
                      mt: `${ARROW_OFFSET.lg + 14}px`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      borderTop: '2px dotted #E80200',
                      transformOrigin: 'left',
                      transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                      transition: `transform 0.6s ease ${T.line[idx]}ms`,
                    }}
                  />
                  <Box
                    sx={{
                      width: { md: 26, lg: 30 },
                      height: { md: 26, lg: 30 },
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      mx: 0.3,
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'scale(1)' : 'scale(0)',
                      transition: `opacity 0.4s ease ${T.line[idx] + 250}ms, transform 0.4s ease ${T.line[idx] + 250}ms`,
                    }}
                  >
                    <ArrowForwardRoundedIcon sx={{ color: '#fff', fontSize: { md: 15, lg: 17 } }} />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      borderTop: '2px dotted #E80200',
                      transformOrigin: 'left',
                      transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                      transition: `transform 0.6s ease ${T.line[idx] + 100}ms`,
                    }}
                  />
                </Box>
              )}
            </Fragment>
          ))}
        </Box>

        {/* Status timeline strip */}
        <Box
          sx={{
            bgcolor: '#FDF1EF',
            borderRadius: { xs: 2, md: 2 },
            px: { xs: 2.5, md: 4 },
            py: { xs: 3, md: 2.5 },
            overflowX: { xs: 'auto', md: 'visible' },
            mb: { xs: 4, md: 5 },
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent={{ xs: 'flex-start', md: 'space-between' }}
            sx={{ minWidth: { xs: 720, md: 'auto' } }}
          >
            {timelineSteps.map((t, idx) => {
              const delay = T.timelineStart + idx * T.timelineStagger;
              const isLast = idx === timelineSteps.length - 1;
              return (
                <Box
                  key={t.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    flex: !isLast ? 1 : '0 0 auto',
                  }}
                >
                  <Stack alignItems="center" spacing={1} sx={{ width: { xs: 92, md: 100, lg: 110 }, flexShrink: 0 }}>
                    <Box
                      sx={{
                        width: { xs: 48, md: 56, lg: 64 },
                        height: { xs: 48, md: 56, lg: 64 },
                        borderRadius: '50%',
                        bgcolor: '#fff',
                        boxShadow: '0 4px 14px rgba(20,20,43,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? 'scale(1)' : 'scale(0.5)',
                        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
                        '@keyframes celebratePulse': {
                          '0%': { boxShadow: '0 4px 14px rgba(20,20,43,0.08)' },
                          '50%': { boxShadow: '0 4px 22px rgba(232,2,0,0.4)' },
                          '100%': { boxShadow: '0 4px 14px rgba(20,20,43,0.08)' },
                        },
                        animation:
                          revealed && isLast ? `celebratePulse 0.9s ease ${delay + 500}ms` : 'none',
                      }}
                    >
                      <t.icon sx={{ color: 'primary.main', fontSize: { xs: 22, md: 25, lg: 28 } }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: { xs: '0.68rem', md: '0.75rem' },
                        fontWeight: 700,
                        textAlign: 'center',
                        fontFamily: '"open sans", sans-serif',
                        lineHeight: 1.3,
                        opacity: revealed ? 1 : 0,
                        transition: `opacity 0.5s ease ${delay + 100}ms`,
                      }}
                    >
                      {t.label}
                    </Typography>
                  </Stack>

                  {!isLast && (
                    <Box
                      sx={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        mt: { xs: 2.8, md: 3.3, lg: 3.7 },
                        mx: 0.5,
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          borderTop: '2px dotted #E80200',
                          transformOrigin: 'left',
                          transform: revealed ? 'scaleX(1)' : 'scaleX(0)',
                          transition: `transform 0.5s ease ${delay + 60}ms`,
                        }}
                      />
                      <ArrowForwardRoundedIcon
                        sx={{
                          color: '#E80200',
                          fontSize: 19,
                          ml: 0.2,
                          opacity: revealed ? 1 : 0,
                          transition: `opacity 0.4s ease ${delay + 900}ms`,
                        }}
                      />
                    </Box>
                  )}
                </Box>
              );
            })}
          </Stack>
        </Box>

      </Container>
    </Box>
  );
}