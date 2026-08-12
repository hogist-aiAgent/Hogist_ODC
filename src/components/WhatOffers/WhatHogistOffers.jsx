import { useEffect, useRef, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';

import corporateImg from '../../assets/WhatOffers/corp1.png';
import industrialImg from '../../assets/WhatOffers/corp2.png';
import cafeteriaImg from '../../assets/WhatOffers/corp3.png';
import eventsImg from '../../assets/WhatOffers/corp4.png';

const offers = [
  {
    num: '01',
    icon: WorkOutlineRoundedIcon,
    title: ['Corporate', 'Catering'],
    desc: 'Daily meals, meetings, conferences and office events.',
    img: corporateImg,
  },
  {
    num: '02',
    icon: FactoryOutlinedIcon,
    title: ['Industrial', 'Catering'],
    desc: 'Large-scale, recurring meal programs for factories and industrial facilities.',
    img: industrialImg,
  },
  {
    num: '03',
    icon: RoomServiceOutlinedIcon,
    title: ['Cafeteria', 'Management'],
    desc: 'End-to-end cafeteria operations, food service and employee meal solutions.',
    img: cafeteriaImg,
  },
  {
    num: '04',
    icon: GroupsOutlinedIcon,
    title: ['Events &', 'Bulk Orders'],
    desc: 'Reliable food solutions for parties, functions and large gatherings.',
    img: eventsImg,
  },
];

export default function WhatHogistOffers() {
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
        bgcolor: '#fff',
        pt: { xs: 6, sm: 7, md: 9, lg: 5 },
        pb: { xs: 14, sm: 16, md: 18, lg: 20 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 2.5, sm: 3, md: 3 },
          '@media (min-width:1400px)': { maxWidth: '1400px' },
        }}
      >
        {/* Eyebrow */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1}
          sx={{
            mb: 1.5,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s ease 0ms, transform 0.6s ease 0ms',
          }}
        >
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Typography
            sx={{
              letterSpacing: 2,
              fontWeight: 800,
              fontSize: 'clamp(0.68rem, 0.5rem + 0.5vw, 0.9rem)',
              color: 'primary.main',
              textTransform: 'uppercase',
              fontFamily: '"open sans", sans-serif',
            }}
          >
            What Hogist Offers
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
            fontSize: 'clamp(1.7rem, 1.2rem + 2vw, 2.9rem)',
            lineHeight: 1.2,
            mb: 1.5,
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s ease 100ms, transform 0.6s ease 100ms',
          }}
        >
          Everything You Need.{' '}
          <Box component="span" sx={{ color: 'primary.main' }}>
            One Place.
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
            fontSize: 'clamp(0.85rem, 0.78rem + 0.3vw, 1rem)',
            mb: { xs: 5, md: 5 },
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(14px)',
            transition: 'opacity 0.6s ease 180ms, transform 0.6s ease 180ms',
          }}
        >
          One platform for planned meals, workplace food and large-scale events.
        </Typography>

        {/* Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, sm: 2.5, lg: 2 },
          }}
        >
          {offers.map((offer, idx) => {
            const Icon = offer.icon;
            const delay = 150 * idx;
            return (
              <Box
                key={offer.num}
                className="offer-card"
                sx={{
                  position: 'relative',
                  bgcolor: '#fff',
                  border: '1px solid rgba(0,0,0,0.07)',
                  borderRadius: '18px',
                  boxShadow: '0 6px 26px rgba(20,20,43,0.06)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? 'translateY(0)' : 'translateY(24px)',
                  transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease`,
                  '&:hover': {
                    boxShadow: '0 14px 34px rgba(20,20,43,0.12)',
                    transform: 'translateY(-4px)',
                  },
                  '&:hover .offer-card-img': {
                    transform: 'scale(1.06)',
                  },
                }}
              >
                {/* Number badge */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    bgcolor: 'rgba(214,41,62,0.08)',
                    color: 'primary.main',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    fontFamily: '"Montserrat", sans-serif',
                    px: 1.2,
                    py: 0.3,
                    borderRadius: '8px',
                    zIndex: 2,
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'scale(1)' : 'scale(0.6)',
                    transition: `opacity 0.4s ease ${delay + 80}ms, transform 0.4s ease ${delay + 80}ms`,
                  }}
                >
                  {offer.num}
                </Box>

                {/* Body */}
                <Box sx={{ px: { xs: 2.5, lg: 2.2 }, pt: 6, pb: 2.5 }}>
                  {/* Icon + title, same row */}
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.2 }}>
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        flexShrink: 0,
                        borderRadius: '50%',
                        bgcolor: 'rgba(214,41,62,0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? 'scale(1)' : 'scale(0.5)',
                        transition: `opacity 0.5s ease ${delay + 150}ms, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay + 150}ms`,
                      }}
                    >
                      <Icon sx={{ color: 'primary.main', fontSize: 24 }} />
                    </Box>

                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontFamily: '"Montserrat", sans-serif',
                          fontSize: 'clamp(0.95rem, 0.85rem + 0.3vw, 1.1rem)',
                          lineHeight: 1.3,
                          opacity: revealed ? 1 : 0,
                          transform: revealed ? 'translateX(0)' : 'translateX(10px)',
                          transition: `opacity 0.5s ease ${delay + 200}ms, transform 0.5s ease ${delay + 200}ms`,
                        }}
                      >
                        {offer.title[0]}
                        <br />
                        {offer.title[1]}
                      </Typography>
                      <Box
                        sx={{
                          width: revealed ? 28 : 0,
                          height: 3,
                          borderRadius: 2,
                          bgcolor: 'primary.main',
                          mt: 0.7,
                          transition: `width 0.5s ease ${delay + 350}ms`,
                        }}
                      />
                    </Box>
                  </Stack>

                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontFamily: '"open sans", sans-serif',
                      fontSize: '0.85rem',
                      lineHeight: 1.6,
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateY(0)' : 'translateY(10px)',
                      transition: `opacity 0.5s ease ${delay + 250}ms, transform 0.5s ease ${delay + 250}ms`,
                    }}
                  >
                    {offer.desc}
                  </Typography>
                </Box>

                {/* Photo, full-bleed, fading up into the card */}
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 170, sm: 155, lg: 175 },
                    mt: -1,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    component="img"
                    className="offer-card-img"
                    src={offer.img}
                    alt={`${offer.title[0]} ${offer.title[1]}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      maskImage: 'linear-gradient(to bottom, transparent 0%, #000 35%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 35%)',
                      opacity: revealed ? 1 : 0,
                      transition: `opacity 0.6s ease ${delay + 300}ms, transform 0.4s ease`,
                    }}
                  />
                </Box>

                {/* Explore, below the photo */}
                <Box
                  component="button"
                  onClick={() => {}}
                  sx={{
                    all: 'unset',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    px: { xs: 2.5, lg: 2.2 },
                    py: 2.25,
                    color: 'primary.main',
                    fontWeight: 700,
                    fontFamily: '"open sans", sans-serif',
                    fontSize: '0.85rem',
                    opacity: revealed ? 1 : 0,
                    transition: `opacity 0.5s ease ${delay + 400}ms`,
                    '&:hover svg': { transform: 'translateX(3px)' },
                  }}
                >
                  Explore
                  <ArrowForwardRoundedIcon
                    sx={{ fontSize: 17, transition: 'transform 0.25s ease' }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Bottom wave + dot-pattern decoration */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: 130, sm: 160, md: 190, lg: 220 },
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* dot grid, bottom-left */}
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 12, md: 2 },
            bottom: { xs: 16, md: 50 },
            width: 130,
            height: 100,
            backgroundImage: 'radial-gradient(rgba(154,0,2,0.22) 1.5px, transparent 1.5px)',
            backgroundSize: '14px 14px',
            zIndex: 2,
            display:{xs:'none',sm:'none',md:'block'},
            opacity: revealed ? 1 : 0,
            transition: 'opacity 0.8s ease 500ms',
          }}
        />

        <Box
          component="svg"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '80%',
            opacity: revealed ? 1 : 0,
            transform: revealed ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.8s ease 350ms, transform 0.8s ease 350ms',
          }}
        >
          {/* soft cream wave, behind */}
          <path
            d="M0,110 C 220,60 420,150 680,120 C 940,90 1080,40 1260,70 C 1350,86 1400,96 1440,80 L1440,240 L0,240 Z"
            fill="#FBEEE6"
          />
          {/* red wave, front */}
          <path
            d="M760,240 C 900,200 970,90 1120,55 C 1230,28 1330,10 1440,20 L1440,240 Z"
            fill="#9a0002"
          />
        </Box>
      </Box>
    </Box>
  );
}