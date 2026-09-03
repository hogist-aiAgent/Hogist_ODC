import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import bgImg1 from '../../../assets/menu/menuHero/7.png';
import bgImg2 from '../../../assets/menu/menuHero/8.png';
import bgImg3 from '../../../assets/menu/menuHero/9.png';
import bgImg4 from '../../../assets/menu/menuHero/10.png';
import bgImg5 from '../../../assets/menu/menuHero/11.png';


export default function Hero({ onLocationConfirm } = {}) {
const locationSearchRef = useRef(null);
const [activeImageIndex, setActiveImageIndex] = useState(0);
const images = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5];

// Auto-slide functionality
useEffect(() => {
  const timer = setInterval(() => {
    setActiveImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, 5000); // Change image every 5 seconds

  // Cleanup timer on component unmount
  return () => clearInterval(timer);
}, []);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#fff',
        pt: { xs: 5, md: 4, lg: 5, xl: 9 },
        pb: { xs: 6, md: 5, lg: 1, xl: 7 },
        p: { xs: 2, sm: 2, md: 1, lg: 3 },
        // xs kept in sync with real phone heights via clamp() — a plain
        // 28vh shrinks too far on unusually short viewports (e.g. DevTools'
        // custom 472px height), even though it looks right on real phones
        // (which are taller). The floor/ceiling keep normal-height phones
        // rendering exactly as before.
        minHeight: { xs: 'clamp(200px, 28vh, 260px)', sm: '67vh', md: '70vh', lg: '78vh', xl: '80vh' },
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'flex', xl: 'block' },
        flexDirection: { lg: 'column' },
        justifyContent: { lg: 'center' },
      }}
    >

      <Box
      component="img"
      src={images[activeImageIndex]}
      alt=""
      loading="lazy"
      decoding="async"
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        objectPosition: 'center center',
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' },
        transition: 'opacity 0.8s ease-in-out',
        // Small mobile screens (320px - 374px)
        '@media (max-width: 374px)': {
          objectFit: 'contain',
          objectPosition: 'center center',
          height: '100%',
          width: '100%',
        },
        // Medium mobile screens (375px - 424px)
        '@media (min-width: 375px) and (max-width: 424px)': {
          objectFit: 'contain',
          objectPosition: 'center center',
          height: '110%',
          width: '100%',
        },
        // Large mobile screens (425px - 600px)
        '@media (min-width: 425px) and (max-width: 600px)': {
          objectFit: 'contain',
          objectPosition: 'center center',
          height: '120%',
          width: '100%',
        },
        // Tablet screens
        '@media (min-width: 601px) and (max-width: 960px)': {
          objectFit: 'contain',
          objectPosition: 'center center',
          height: '110%',
          width: '100%',
        },
        // Laptop/Desktop screens (up to 1400px)
        '@media (min-width: 961px) and (max-width: 1400px)': {
          objectFit: 'contain',
          objectPosition: 'center center',
          height: '100%',
          width: '100%',
        },
        // Above 1400px - keep as is
        '@media (min-width: 1401px)': {
          objectFit: 'contain',
          objectPosition: 'center center',
          height: '100%',
          width: '100%',
        },
      }}
    />
    </Box>
  );
}