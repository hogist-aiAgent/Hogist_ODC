import {
  Box,
  Container,
  Typography,
  Button,
} from '@mui/material';
import { useRef } from 'react';
import bgImg from '../../../assets/menu/menuHero/menubg.png';

export default function Hero({ onLocationConfirm } = {}) {
const locationSearchRef = useRef(null);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '70vh', sm: '80vh', md: '90vh', lg: '100vh', xl: '90vh' },
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
          objectPosition: {
            xs: 'right center',
            sm: 'right center',
            md: '75% center',
            lg: 'center center',
            xl: 'center center',
          },
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none',
          display: 'block',
        }}
      />

    </Box>
  );
}