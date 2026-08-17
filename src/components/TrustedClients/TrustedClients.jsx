import { Box, Container, Stack, Typography } from '@mui/material';


import client1 from '../../assets/client/img1.png';
import client2 from '../../assets/client/img2.png';
import client3 from '../../assets/client/img3.png';
import client4 from '../../assets/client/img4.png';
import client5 from '../../assets/client/img5.webp';
import client6 from '../../assets/client/img6.webp';
import client7 from '../../assets/client/img7.webp';
import client8 from '../../assets/client/img8.webp';
import client9 from '../../assets/client/img9.webp';
import client10 from '../../assets/client/img10.png';
import client11 from '../../assets/client/img11.webp';
import client12 from '../../assets/client/img12.webp';
import client13 from '../../assets/client/img13.png';
import client14 from '../../assets/client/img14.png';
import client15 from '../../assets/client/img15.png';
import client16 from '../../assets/client/img16.webp';
import client17 from '../../assets/client/img17.png';
import client18 from '../../assets/client/img18.png';
import client19 from '../../assets/client/img19.webp';
import client20 from '../../assets/client/img20.png';

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
];


const marqueeLogos = [...clientLogos, ...clientLogos];

export default function TrustedClients() {
  return (
    <Box  sx={{
    py: { xs: 2, md: 2 },
    overflow: 'hidden',
    // background:
    //   'radial-gradient(ellipse at center, #ca3939 0%, #a21f1f 45%, #72001b 100%)',
  }}>
      <Container maxWidth="lg">
        {/* <Stack alignItems="center" spacing={1} sx={{ mb: 5 }}>
          <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            fontWeight: 800,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: { xs: 24, sm: 30, md: 38 },
            mb: { xs: 4, md: 6 },
            color: '#9a0002',
          }}
        >
          Our Trusted Clients
        </Typography>
          <Typography variant="body2" color="#9a0002" sx={{ fontFamily: '"open sans", sans-serif',}}>
            Trusted by the world&apos;s best companies. Join the ranks of the elite.
          </Typography>
        </Stack> */}
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

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 1000,
          mx: 'auto',
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
                width: { xs: 88, sm: 108, md: 130, lg: 100 },
                height: { xs: 48, sm: 58, md: 68, lg: 70 },
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
                decoding="async"
                draggable={false}
                sx={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  filter: 'grayscale(100%)',
                  opacity: 0.7,
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}