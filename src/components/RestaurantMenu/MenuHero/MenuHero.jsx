import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import bgImg1 from '../../../assets/menu/menuHero/1.jpg';
import bgImg2 from '../../../assets/menu/menuHero/2.jpg';
import bgImg3 from '../../../assets/menu/menuHero/3.jpg';


export default function Hero({ onLocationConfirm } = {}) {
const locationSearchRef = useRef(null);
const [activeImageIndex, setActiveImageIndex] = useState(0);
const images = [bgImg1, bgImg2, bgImg3];

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
        bgcolor: '#efe6dd',
        pt: { xs: 5, md: 4, lg: 5, xl: 8 },
        pb: { xs: 6, md: 5, lg: 6, xl: 7 },
        p: { xs: 2, sm: 2, md: 1, lg: 3 },
        minHeight: { xs: '25vh', sm: '70vh', md: '80vh', lg: '80vh', xl: '90vh' },
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
        objectFit: 'fit',
        objectPosition: 'center center',
        // opacity: 0.18,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' },
        transition: 'opacity 0.8s ease-in-out',
      }}
    />
    </Box>
  );
}