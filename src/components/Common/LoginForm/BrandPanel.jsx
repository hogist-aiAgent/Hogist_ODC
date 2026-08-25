import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import foodImage from '../../../assets/login/food.webp'

// Replace with your own asset, e.g. import foodImage from '../../../assets/login/food.png';

import { RED, features } from './loginConstants';

const BrandPanel = ({ isSignUp }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', sm: '44%' },
        bgcolor: '#161311',
        color: '#fff',
        display: { xs: 'none', sm: 'flex' },
        flexDirection: 'column',
        overflow: 'hidden',
        height: { xs: '100', sm: '100%' },
        zIndex: 2,
        transform: { sm: isSignUp ? 'translateX(127.2727%)' : 'translateX(0%)' },
        transition: 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
      }}
    >

      <Box sx={{ position: 'relative', zIndex: 1, px: { xs: 3.5, md: 3.75, lg: 4 }, pt: { xs: 4, md: 4.25, lg: 4.5 } }}>
        <Box sx={{ width: 34, height: 3, bgcolor: RED, borderRadius: 2, mb: 2 }} />

        <Typography
          sx={{
            fontFamily: '"Montserrat", sans-serif',
            fontWeight: 800,
            fontSize: { xs: '1.55rem', lg: '1.65rem' },
            lineHeight: 1.25,
            mb: 1.25,
          }}
        >
          Faster ordering
          <br />
          <Box component="span" sx={{ color: RED }}>
            starts here.
          </Box>
        </Typography>

        <Typography
          sx={{
            fontFamily: '"open sans", sans-serif',
            fontSize: { xs: '0.83rem', lg: '0.88rem' },
            color: 'rgba(255, 255, 255, 0.81)',
            mb: 3,
            maxWidth: { xs: 230, lg: 250 },
          }}
        >
          Login to Hogist and get back to your favourite food in seconds.
        </Typography>

        <Stack spacing={2}>
          {features.map((f) => (
            <Stack key={f.title} direction="row" spacing={1.25} alignItems="flex-start">
              <Box
                sx={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor: '#fff',
                  color: RED,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {f.icon}
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontFamily: '"open sans", sans-serif',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    lineHeight: 1.3,
                  }}
                >
                  {f.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: '"open sans", sans-serif',
                    fontSize: '0.76rem',
                    color: 'rgba(255, 255, 255, 0.78)',
                  }}
                >
                  {f.desc}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>

      {/* full-bleed food photo, fading into the dark panel at the top edge */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: { xs: 230, md: 245, lg: 260 },
          backgroundImage: `url(${foodImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 22%, rgba(0,0,0,0.75) 45%, black 65%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 22%, rgba(0,0,0,0.75) 45%, black 65%)',
        }}
      />
    </Box>
  );
};

export default BrandPanel;