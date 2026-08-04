import { Box, Container, Stack, Typography } from '@mui/material';

// All client logos from src/assets/client/, imported individually so the
// bundler can optimize/hash them like any other asset.
import client1 from '../assets/client/client-1.webp';
import client2 from '../assets/client/client-2.webp';
import client3 from '../assets/client/client-3.webp';
import client4 from '../assets/client/client-4.webp';
import client5 from '../assets/client/client-5.webp';
import client6 from '../assets/client/client-6.webp';
import client7 from '../assets/client/client-7.webp';
import client8 from '../assets/client/client-8.webp';
import client9 from '../assets/client/client-9.webp';
import client10 from '../assets/client/client-10.webp';
import client11 from '../assets/client/client-11.webp';
import client12 from '../assets/client/client-12.webp';
import client13 from '../assets/client/client-13.webp';
import client14 from '../assets/client/client-14.webp';
import client15 from '../assets/client/client-15.webp';
import client16 from '../assets/client/client-16.webp';
import client17 from '../assets/client/client-17.webp';
import client18 from '../assets/client/client-18.webp';
import client19 from '../assets/client/client-19.webp';
import client20 from '../assets/client/client-20.webp';
import client21 from '../assets/client/client-21.webp';
import client22 from '../assets/client/client-22.webp';
import client23 from '../assets/client/client-23.webp';
import client24 from '../assets/client/client-24.webp';
import client25 from '../assets/client/client-25.webp';
import client26 from '../assets/client/client-26.webp';
import client27 from '../assets/client/client-27.webp';
import client28 from '../assets/client/client-28.webp';
import client29 from '../assets/client/client-29.webp';
import client30 from '../assets/client/client-30.webp';
import client31 from '../assets/client/client-31.webp';
import client32 from '../assets/client/client-32.webp';
import client33 from '../assets/client/client-33.webp';
import client34 from '../assets/client/client-34.webp';
import client35 from '../assets/client/client-35.webp';
import client36 from '../assets/client/client-36.webp';
import client37 from '../assets/client/client-37.webp';
import client38 from '../assets/client/client-38.webp';
import client39 from '../assets/client/client-39.webp';
import client40 from '../assets/client/client-40.webp';
import client41 from '../assets/client/client-41.webp';
import client42 from '../assets/client/client-42.webp';
import client43 from '../assets/client/client-43.webp';
import client44 from '../assets/client/client-44.webp';
import client45 from '../assets/client/client-45.webp';
import client46 from '../assets/client/client-46.webp';
import client47 from '../assets/client/clientt-47.webp';
import client50 from '../assets/client/client-50.webp';
import client55 from '../assets/client/client-55.webp';

const clientLogos = [
  client1,
  client2,
  client3,
  client4,
  client5,
  client6,
  client7,
  client8,
  client9,
  client10,
  client11,
  client12,
  client13,
  client14,
  client15,
  client16,
  client17,
  client18,
  client19,
  client20,
  client21,
  client22,
  client23,
  client24,
  client25,
  client26,
  client27,
  client28,
  client29,
  client30,
  client31,
  client32,
  client33,
  client34,
  client35,
  client36,
  client37,
  client38,
  client39,
  client40,
  client41,
  client42,
  client43,
  client44,
  client45,
  client46,
  client47,
  client50,
  client55,
];


const marqueeLogos = [...clientLogos, ...clientLogos];

export default function TrustedClients() {
  return (
    <Box  sx={{
    py: { xs: 2, md: 3 },
    overflow: 'hidden',
    background:
      'radial-gradient(ellipse at center, #ca3939 0%, #a21f1f 45%, #72001b 100%)',
  }}>
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={1} sx={{ mb: 5 }}>
          <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: { xs: 24, sm: 30, md: 38 },
            mb: { xs: 4, md: 6 },
            color: '#fff',
          }}
        >
          Our Trusted Clients
        </Typography>
          <Typography variant="body2" color="#fff" sx={{ fontFamily: '"open sans", sans-serif',}}>
            Trusted by the world&apos;s best companies. Join the ranks of the elite.
          </Typography>
        </Stack>
      </Container>

      {/* Keyframes for the continuous right-to-left marquee scroll */}
      <style>
        {`
          @keyframes trustedClientsScroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      {/* Full-bleed scrolling track. Sits outside the Container on purpose so
          the logos can slide edge-to-edge across the full page width. */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          // Fade the logos out near the left/right edges instead of a hard cut
          maskImage:
            'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: 'max-content',
            gap: { xs: 4, sm: 5, md: 7 },
            // Slow, continuous scroll — slower still on larger screens since
            // more logos are visible at once.
            animation: {
              xs: 'trustedClientsScroll 40s linear infinite',
              sm: 'trustedClientsScroll 55s linear infinite',
              md: 'trustedClientsScroll 70s linear infinite',
              lg: 'trustedClientsScroll 85s linear infinite',
            },
            willChange: 'transform',
          }}
        >
          {marqueeLogos.map((logo, i) => (
            <Box
              key={i}
              sx={{
                flexShrink: 0,
                width: { xs: 88, sm: 108, md: 130, lg: 150 },
                height: { xs: 48, sm: 58, md: 68, lg: 76 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="Trusted client logo"
                loading="lazy"
                draggable={false}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}