import { useState } from 'react';
import { Box, Container, Stack, Typography, IconButton, Button, Avatar } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';

// Drop these into src/assets/Testimonials/ and update the imports.
import leafCornerImg from '../../assets/Testimonials/veg1.png';
import tomatoCornerImg from '../../assets/Testimonials/veg2.png';
import foodTrayImg from '../../assets/Testimonials/foodTray.png';

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const testimonials = [
  {
    name: 'Brindha Ganesh',
    location: 'Chennai',
    rating: 5,
    quote:
      'For the first time we came across someone from online who were very professional from taking the food order, specifying the tariff and dispatching the food delivery on time. Food was very tasty and maintained good standards. Pricing was reasonably good and best service. Thanks to Hogist team for Organizing dinner menu for our Anniversary party for 50 members. I give 5 star ratings..',
    tags: [
      { icon: LocalShippingOutlinedIcon, label: 'On-Time Delivery' },
      { icon: RestaurantOutlinedIcon, label: 'Great Food Quality' },
      { icon: FavoriteBorderRoundedIcon, label: 'Reliable Service' },
    ],
  },
  {
    name: 'JANOSE BERDEEN I',
    location: 'Chennai',
    rating: 5,
    quote:
      'Hi I am JANOSE BERDEEN from chennai, Professional approach, decent pricing, excellent quality of food with commitment on the timings. Hassle-free Ordering experience. Hogist, the best small party catering services in chennai ever experienced.',
    tags: [
      { icon: LocalShippingOutlinedIcon, label: 'On-Time Delivery' },
      { icon: RestaurantOutlinedIcon, label: 'Great Food Quality' },
      { icon: FavoriteBorderRoundedIcon, label: 'Reliable Service' },
    ],
  },
  {
    name: 'Srinivasa Sampathkumar',
    location: 'Chennai',
    rating: 5,
    quote:
      'The food is excellent and service is also super taste and today bread halwa is very very tasty. All variety rice, raasam, kara Kulzambu and vegetables are good taste and serve in hot conditions. Butter milk is good really. Over all I love the food taste, presentation, service and conditions all excellent to the core',
    tags: [
      { icon: LocalShippingOutlinedIcon, label: 'On-Time Delivery' },
      { icon: RestaurantOutlinedIcon, label: 'Great Food Quality' },
      { icon: FavoriteBorderRoundedIcon, label: 'Reliable Service' },
    ],
  },
];

const ratingCategories = [
  { icon: RestaurantOutlinedIcon, label: 'Food Quality' },
  { icon: LocalShippingOutlinedIcon, label: 'On-Time Delivery' },
  { icon: Inventory2OutlinedIcon, label: 'Packaging' },
  { icon: RoomServiceOutlinedIcon, label: 'Service' },
];

function StarRow({ count = 5, size = 16 }) {
  return (
    <Stack direction="row" spacing={0.25}>
      {Array.from({ length: count }).map((_, i) => (
        <StarRoundedIcon key={i} sx={{ color: '#F5A623', fontSize: size }} />
      ))}
    </Stack>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;
  const current = testimonials[activeIndex];

  const goPrev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const goNext = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#FFF8F3',
        py: { xs: 6, sm: 7, md: 5 },
      }}
    >
      {/* top-left leaf/vegetable corner accent */}
      <Box
        component="img"
        src={leafCornerImg}
        alt=""
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: { xs: 90, sm: 120, md: 270 },
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* top-right tomato/vegetable corner accent */}
      <Box
        component="img"
        src={tomatoCornerImg}
        alt=""
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: 90, sm: 120, md: 230 },
          height: 'auto',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      />

      {/* bottom-right red wave */}
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
          height: { xs: 90, sm: 120, md: 160, lg: 190 },
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M760,240 C 950,220 1080,110 1260,60 C 1340,36 1400,20 1440,14 L1440,240 Z"
          fill="#9a0002"
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          px: { xs: 1.5, sm: 3, md: 0 },
          '@media (min-width:1400px)': { maxWidth: '1400px' },
        }}
      >
        {/* Header */}
        <Stack alignItems="center" textAlign="center" sx={{ mb: { xs: 4, sm: 5, md: 4 } }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
            <Box sx={{ width: { xs: 24, sm: 32 }, height: '2px', bgcolor: 'primary.main'}} />
            <Box
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                px: 2,
                py: 0.6,
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '0.7rem',
                letterSpacing: 1.5,
                fontFamily: '"open sans", sans-serif',
                textTransform: 'uppercase',
              }}
            >
              Customer Stories
            </Box>
            <Box sx={{ width: { xs: 24, sm: 32 }, height: '2px', bgcolor: 'primary.main' }} />
          </Stack>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontFamily: '"Montserrat", sans-serif',
              fontSize: 'clamp(1.7rem, 1.2rem + 2vw, 2.6rem)',
              lineHeight: 1.25,
              mb: 1,
            }}
          >
            Real People.{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>
              Real Experiences.
            </Box>
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              fontFamily: '"open sans", sans-serif',
              fontSize: { xs: '0.9rem', sm: '0.97rem', md: '1.02rem' },
            }}
          >
            Thousands of meals delivered. Here&apos;s what our customers have to say.
          </Typography>
        </Stack>

        {/* Testimonial card */}
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              bgcolor: '#fff',
              borderRadius: { xs: '20px', md: '28px' },
              overflow: 'hidden',
              boxShadow: '0 24px 60px rgba(20,10,10,0.10)',
              height:{md:450}
            }}
          >
            {/* Left: testimonial content */}
            <Box
              sx={{
                flex: { md: '0 0 46%' },
                p: { xs: 3, sm: 4, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar
                  sx={{
                    width: { xs: 48, sm: 54 },
                    height: { xs: 48, sm: 54 },
                    bgcolor: 'primary.main',
                    fontFamily: '"Montserrat", sans-serif',
                    fontWeight: 800,
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                  }}
                >
                  {getInitials(current.name)}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontFamily: '"Montserrat", sans-serif',
                      fontSize: { xs: '1rem', sm: '1.05rem' },
                    }}
                  >
                    {current.name}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontFamily: '"open sans", sans-serif',
                        fontSize: '0.82rem',
                      }}
                    >
                      {current.location}
                    </Typography>
                    <StarRow count={current.rating} size={14} />
                  </Stack>
                </Box>
              </Stack>

              <Box
                sx={{
                  position: 'relative',
                  bgcolor: 'rgba(214,41,62,0.06)',
                  borderRadius: '18px',
                  p: { xs: 2.5, sm: 3 },
                  mb: 3,
                  height: { xs: 160, sm: 170, md: 250 },
                  overflowY: 'hidden',
                }}
              >
                <FormatQuoteRoundedIcon
                  sx={{
                    color: 'primary.main',
                    opacity: 0.35,
                    fontSize: { xs: 28, sm: 32 },
                    mb: 0.5,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: '"open sans", sans-serif',
                    fontStyle: 'italic',
                    color: 'text.primary',
                    fontSize: { xs: '0.92rem', sm: '0.97rem' },
                    lineHeight: 1.7,
                  }}
                >
                  {current.quote}
                </Typography>
              </Box>

              <Stack direction="row" flexWrap="wrap" gap={1.25}>
                {current.tags.map((tag) => {
                  const Icon = tag.icon;
                  return (
                    <Stack
                      key={tag.label}
                      direction="row"
                      alignItems="center"
                      spacing={0.75}
                      sx={{
                        bgcolor: 'rgba(214,41,62,0.06)',
                        borderRadius: '999px',
                        px: 1.5,
                        py: 0.75,
                      }}
                    >
                      <Icon sx={{ color: 'primary.main', fontSize: 16 }} />
                      <Typography
                        sx={{
                          fontFamily: '"open sans", sans-serif',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          color: 'text.primary',
                        }}
                      >
                        {tag.label}
                      </Typography>
                    </Stack>
                  );
                })}
              </Stack>

              {/* dots pagination */}
              <Stack direction="row" spacing={1} sx={{ mt: { xs: 3, md: 4 } }}>
                {testimonials.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    sx={{
                      width: i === activeIndex ? 22 : 8,
                      height: 8,
                      borderRadius: '999px',
                      bgcolor: i === activeIndex ? 'primary.main' : 'rgba(20,10,10,0.15)',
                      cursor: 'pointer',
                      transition: 'width 0.25s ease, background-color 0.25s ease',
                    }}
                  />
                ))}
              </Stack>
            </Box>

            {/* Right: image */}
            <Box
              sx={{
                flex: { md: '0 0 55%' },
                position: 'relative',
                minHeight: { xs: 230, sm: 300, md: 'auto' },
              }}
            >
              <Box
                component="img"
                src={foodTrayImg}
                alt="Hogist meal tray delivery"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Box>

          {/* Carousel arrows */}
          <IconButton
            onClick={goPrev}
            aria-label="Previous testimonial"
            sx={{
              position: 'absolute',
              top: '50%',
              left: { xs: 8, md: -22 },
              transform: 'translateY(-50%)',
              bgcolor: '#fff',
              boxShadow: '0 8px 20px rgba(20,10,10,0.15)',
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              '&:hover': { bgcolor: '#fff' },
            }}
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 16, color: 'text.primary' }} />
          </IconButton>
          <IconButton
            onClick={goNext}
            aria-label="Next testimonial"
            sx={{
              position: 'absolute',
              top: '50%',
              right: { xs: 8, md: -22 },
              transform: 'translateY(-50%)',
              bgcolor: '#fff',
              boxShadow: '0 8px 20px rgba(20,10,10,0.15)',
              width: { xs: 36, md: 44 },
              height: { xs: 36, md: 44 },
              '&:hover': { bgcolor: '#fff' },
            }}
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: 16, color: 'text.primary' }} />
          </IconButton>
        </Box>

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            mt: { xs: 4, sm: 5, md: 4 },
            borderRadius: { xs: '18px', md: '20px' },
            overflow: 'hidden',
            boxShadow: '0 14px 34px rgba(20, 10, 10, 0.13)',
            height:{md:120}
          }}
        >
          {/* Left: rating categories */}
          <Box
            sx={{
              flex: { md: '0 0 68%' },
              bgcolor: '#FFF8F3',
              px: { xs: 3, sm: 4, md: 2 },
              py: { xs: 3, sm: 3, md: 3 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', sm: 'flex-start', md: 'center' },
              gap: { xs: 2.5, sm: 3, md: 4 },
            }}
          >
            <Stack direction="row" spacing={0.5} alignItems="center" sx={{ flexShrink: 0 }}>
              <Box sx={{ width: 3, height: 40, bgcolor: 'primary.main', borderRadius: 2 }} />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: { xs: '1rem', sm: '1.08rem' },
                  lineHeight: 1,
                }}
              >
                Loved for the details <br/> <Box component="span" sx={{ color: 'primary.main' }}>that matter</Box>
              </Typography>
            </Stack>

            <Box
              sx={{
                display: { xs: 'grid', sm: 'grid', md: 'flex' },
                gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                flexWrap: { md: 'wrap' },
                alignItems: { xs: 'stretch', sm: 'stretch', md: 'center' },
                columnGap: { xs: 2, sm: 4, md: 5 },
                rowGap: { xs: 2, sm: 0, md: 2 },
                flex: 1,
                width: { xs: '100%', sm: '100%', md: 'auto' },
              }}
            >
              {ratingCategories.map((cat, idx) => {
                const Icon = cat.icon;
                const isLast = idx === ratingCategories.length - 1;
                const isLastCol = idx % 2 === 1;
                const isLastRow = idx >= ratingCategories.length - 2;
                return (
                  <Stack
                    key={cat.label}
                    alignItems={{ xs: 'flex-start', sm: 'center', md: 'center' }}
                    spacing={0.5}
                    sx={{
                      pr: { xs: isLastCol ? 0 : 2, sm: isLast ? 0 : 3, md: isLast ? 0 : 1 },
                      pb: { xs: isLastRow ? 0 : 2, sm: 0, md: 0 },
                      borderRight: {
                        xs: isLastCol ? 'none' : '1px solid rgba(20,10,10,0.1)',
                        sm: isLast ? 'none' : '1px solid rgba(20,10,10,0.1)',
                      },
                      borderBottom: {
                        xs: isLastRow ? 'none' : '1px solid rgba(20,10,10,0.1)',
                        sm: 'none',
                      },
                    }}
                  >
                    <StarRow count={5} size={13} />
                    <Stack direction="row" spacing={0.6} alignItems="center">
                      <Icon sx={{ color: 'primary.main', fontSize: 16 }} />
                      <Typography
                        sx={{
                          fontWeight: 700,
                          fontFamily: '"open sans", sans-serif',
                          fontSize: '0.8rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {cat.label}
                      </Typography>
                    </Stack>
                  </Stack>
                );
              })}
            </Box>
          </Box>

          {/* Right: CTA */}
          <Box
            sx={{
              flex: { md: '0 0 32%' },
              bgcolor: '#FFF8F3',
              color: '#000',
              px: { xs: 3, sm: 2 },
              py: { xs: 3, sm: 2.5 },
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              md: { flexDirection: 'column' },
              alignItems: { xs: 'flex-start', sm: 'center', md: 'flex-start' },
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontFamily: '"Montserrat", sans-serif',
                  fontSize: '1rem',
                  mb: 0,
                }}
              >
                Planning something bigger?
              </Typography>
              <Typography
                sx={{
                  fontFamily: '"open sans", sans-serif',
                  fontSize: '0.82rem',
                  opacity: 0.9,
                }}
              >
                Explore Hogist for your next event.
              </Typography>
            </Box>

            <Button
              variant="contained"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                fontWeight: 800,
                fontFamily: '"open sans", sans-serif',
                textTransform: 'none',
                borderRadius: '999px',
                px: 1.1,
                py: 0.5,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:hover': { bgcolor: '#f5f5f5' },
               mt:{md:6}
              }}
            >
              Explore Hogist
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}