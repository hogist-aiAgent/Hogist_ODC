import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';

import kitchenImg from '../../assets/Whyhogist/hogist.png';

const reasons = [
  {
    num: '01',
    icon: GroupsOutlinedIcon,
    title: 'One Partner',
    desc: "One team coordinating kitchens, food, quality and delivery\u2014so you don't have to.",
  },
  {
    num: '02',
    icon: TrendingUpRoundedIcon,
    title: 'Built for Scale',
    desc: 'From daily meals for small teams to large-scale corporate events.',
  },
  {
    num: '03',
    icon: GppGoodOutlinedIcon,
    title: 'Quality You Can Count On',
    desc: 'Structured quality, hygiene and safety standards at every step.',
  },
  {
    num: '04',
    icon: HeadsetMicOutlinedIcon,
    title: 'Support When It Matters',
    desc: 'A dedicated relationship team that is always just a call away.',
  },
];

const stats = [
  {
    icon: ApartmentOutlinedIcon,
    value: '200+',
    label: 'Partner Kitchens',
    sub: 'Across Chennai & Tamil Nadu',
  },
  {
    icon: GroupsOutlinedIcon,
    value: '30+',
    label: 'Corporate Clients',
    sub: 'Across industries',
  },
  {
    icon: RoomServiceOutlinedIcon,
    value: '1M+',
    label: 'Meals Delivered',
    sub: 'Every month',
  },
  {
    icon: LocationOnOutlinedIcon,
    value: '3+',
    label: 'Districts Served',
    sub: 'Chennai, Kancheepuram, Thiruvallur & Chengalpattu',
  },
];

export default function WhyHogist() {
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
      { threshold: 0.15 }
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
        bgcolor: '#FBF4EF',
        py: { xs: 5, sm: 6, md: 9, lg: 5 },
      }}
    >
      {/* dot grid, top-right */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 24, md: 40 },
          right: { xs: 16, md: 40 },
          width: 140,
          height: 140,
          backgroundImage: 'radial-gradient(rgba(154,0,2,0.18) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
          zIndex: 1,
          display: { xs: 'none', md: 'block' },
        }}
      />

      {/* red wave, bottom-right */}
      <Box
        component="svg"
        viewBox="0 0 1440 240"
        preserveAspectRatio="none"
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: { xs: 90, sm: 110, md: 140, lg: 160 },
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M900,240 C 1050,220 1120,120 1260,70 C 1340,42 1400,24 1440,20 L1440,240 Z"
          fill="#9a0002"
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 2.5, sm: 3, md: 3 },
          '@media (min-width:1400px)': { maxWidth: '1400px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: { xs: 4, sm: 5, md: 2 },
            columnGap: { md: 5, lg: 6 },
            alignItems: 'center',
          }}
        >
          {/* Image panel */}
          <Box
            sx={{
              order: { xs: 2, sm: 2, md: 1 },
              flexBasis: { xs: '100%', sm: '100%', md: 0 },
              flexGrow: { xs: 0, sm: 0, md: 0.8 },
              flexShrink: { md: 1 },
              minWidth: 0,
              position: 'relative',
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                borderRadius: { xs: '18px 44px 44px 18px', sm: '24px 60px 60px 24px', md: '20px 80px 80px 20px' },
                overflow: 'hidden',
                boxShadow: '0 20px 44px rgba(20,10,10,0.16)',
                height: { xs: 300, sm: 360, md: 420, lg: 460, xl: 500 },
              }}
            >
              <Box
                component="img"
                src={kitchenImg}
                alt="Hogist kitchen team packing meals"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Dark caption overlay — single gentle curve with a soft gradient fade, bottom third only */}
              <Box
                component="svg"
                viewBox="0 0 400 400"
                preserveAspectRatio="none"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <defs>
                  <linearGradient id="whyHogistFadeShade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(15,14,22,0)" />
                    <stop offset="35%" stopColor="rgba(15,14,22,0.55)" />
                    <stop offset="100%" stopColor="rgba(15,14,22,0.95)" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,255 Q 200,220 400,258 L400,400 L0,400 Z"
                  fill="url(#whyHogistFadeShade)"
                />
              </Box>

              {/* Icon badge */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '64%',
                  left: { xs: '5%', sm: '6%', md: '7%' },
                  width: { xs: 36, sm: 42, md: 46 },
                  height: { xs: 36, sm: 42, md: 46 },
                  borderRadius: '50%',
                  bgcolor: '#161119',
                  border: '1.5px solid #C4303B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RestaurantRoundedIcon sx={{ color: '#E5424B', fontSize: { xs: 16, sm: 19, md: 21 } }} />
              </Box>

              {/* Caption text */}
              <Box
                sx={{
                  position: 'absolute',
                  left: { xs: '5%', sm: '6%', md: '7%' },
                  bottom: { xs: '6%', sm: '7%' },
                  width: { xs: '85%', sm: '80%' },
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 800,
                    fontFamily: '"Montserrat", sans-serif',
                    fontSize: 'clamp(1rem, 0.85rem + 0.5vw, 1.3rem)',
                    lineHeight: 1.4,
                  }}
                >
                  We don&apos;t just
                  <br />
                  deliver food,
                  <br />
                  we deliver{' '}
                  <Box component="span" sx={{ color: '#E5424B' }}>
                    peace of mind.
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Stats bar */}
          <Box
            sx={{
              order: { xs: 3, sm: 3, md: 3 },
              flexBasis: '100%',
              flexGrow: 0,
              bgcolor: '#FBF4EF',
              borderRadius: { xs: '16px', md: '20px' },
              border: '1px solid rgba(20,10,10,0.05)',
              boxShadow: '0 18px 42px rgba(20,10,10,0.10)',
              px: { xs: 2.5, sm: 3, md: 4 },
              py: { xs: 3, sm: 3.5, md: 2 },
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease 500ms, transform 0.7s ease 500ms',
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                rowGap: { xs: 0, sm: 0.5 },
              }}
            >
              {stats.map((s, idx) => {
                const Icon = s.icon;
                const isLastRowXs = idx === stats.length - 1;
                const isLastRowSm = idx >= stats.length - 2;
                const isLeftColSm = idx % 2 === 0;
                const isLastMd = idx === stats.length - 1;
                return (
                  <Stack
                    key={s.label}
                    direction="row"
                    spacing={{ xs: 1.25, sm: 1.5, md: 1.75 }}
                    alignItems="center"
                    sx={{
                      py: { xs: 1.75, sm: 2, md: 0 },
                      px: { xs: 0, sm: 2, md: 3 },
                      borderBottom: {
                        xs: isLastRowXs ? 'none' : '1px solid rgba(20,10,10,0.1)',
                        sm: isLastRowSm ? 'none' : '1px solid rgba(20,10,10,0.1)',
                        md: 'none',
                      },
                      borderRight: {
                        xs: 'none',
                        sm: isLeftColSm ? '1px solid rgba(20,10,10,0.1)' : 'none',
                        md: isLastMd ? 'none' : '1px solid rgba(20,10,10,0.1)',
                      },
                    }}
                  >
                    <Icon sx={{ color: 'primary.main', fontSize: { xs: 28, sm: 34, md: 40, lg: 47 }, flexShrink: 0 }} />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontFamily: '"Montserrat", sans-serif',
                          color: 'primary.main',
                          fontSize: 'clamp(1.3rem, 1.1rem + 0.6vw, 1.6rem)',
                          lineHeight: 1.1,
                        }}
                      >
                        {s.value}
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"open sans", sans-serif',
                          fontSize: { xs: '0.8rem', sm: '0.84rem', md: '0.87rem' },
                          color: 'text.primary',
                          mt: 0.4,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {s.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: '"open sans", sans-serif',
                          fontSize: { xs: '0.7rem', sm: '0.73rem', md: '0.76rem' },
                          color: 'text.secondary',
                          mt: 0.2,
                        }}
                      >
                        {s.sub}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Box>
          </Box>

          {/* Right: heading + list */}
          <Box
            sx={{
              order: { xs: 1, sm: 1, md: 2 },
              flexBasis: { xs: '100%', sm: '100%', md: 0 },
              flexGrow: { xs: 0, sm: 0, md: 1.2 },
              minWidth: 0,
              opacity: revealed ? 1 : 0,
              transform: revealed ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.7s ease 120ms, transform 0.7s ease 120ms',
            }}
          >
            <Typography
              sx={{
                letterSpacing: 2,
                fontWeight: 800,
                fontSize: '0.8rem',
                color: 'primary.main',
                textTransform: 'uppercase',
                fontFamily: '"open sans", sans-serif',
                mb: 0.3,
              }}
            >
              Why Hogist
            </Typography>
            <Box sx={{ width: 40, height: 3, borderRadius: 2, bgcolor: 'primary.main', mb: 2 }} />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontFamily: '"Montserrat", sans-serif',
                fontSize: 'clamp(1.35rem, 1.05rem + 1.3vw, 2.15rem)',
                lineHeight: 1.3,
                mb: { xs: 3, sm: 3.5, md: 0 },
                whiteSpace: { xs: 'normal', md: 'normal', lg: 'nowrap' },
              }}
            >
              Food is the easy part.
              <br />
              Keeping everything on track is
              <br />
              <Box component="span" sx={{ color: 'primary.main' }}>
                what we do.
              </Box>
            </Typography>

            <Stack>
              {reasons.map((r, idx) => {
                const Icon = r.icon;
                const delay = 150 * idx;
                return (
                  <Stack
                    key={r.num}
                    direction="row"
                    spacing={{ xs: 2, sm: 2.25, md: 1 }}
                    alignItems="flex-start"
                    sx={{
                      py: { xs: 1.75, sm: 2, md: 2.2 },
                      borderTop: idx === 0 ? 'none' : '1px solid rgba(20,10,10,0.08)',
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateY(0)' : 'translateY(14px)',
                      transition: `opacity 0.5s ease ${300 + delay}ms, transform 0.5s ease ${300 + delay}ms`,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontFamily: '"Montserrat", sans-serif',
                        color: 'primary.main',
                        fontSize: { xs: '0.9rem', sm: '0.98rem', md: '1.05rem' },
                        minWidth: { xs: 26, sm: 30, md: 34 },
                        pt: { xs: 1.2, md: 1.6 },
                      }}
                    >
                      {r.num}
                    </Typography>

                    <Box
                      sx={{
                        width: { xs: 44, sm: 50, md: 56 },
                        height: { xs: 44, sm: 50, md: 56 },
                        flexShrink: 0,
                        borderRadius: '50%',
                        bgcolor: 'rgba(214,41,62,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon sx={{ color: 'primary.main', fontSize: { xs: 20, sm: 23, md: 26 } }} />
                    </Box>

                    <Box sx={{ pt: 0.5 }}>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontFamily: '"Montserrat", sans-serif',
                          fontSize: { xs: '0.92rem', sm: '0.97rem', md: '1.02rem' },
                          mb: 0.5,
                        }}
                      >
                        {r.title}
                      </Typography>
                      <Typography
                        sx={{
                          color: 'text.secondary',
                          fontFamily: '"open sans", sans-serif',
                          fontSize: { xs: '0.8rem', sm: '0.84rem', md: '0.87rem' },
                          lineHeight: 1.6,
                        }}
                      >
                        {r.desc}
                      </Typography>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}