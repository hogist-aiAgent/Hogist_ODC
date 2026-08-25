import React, { useState } from 'react';
import {
  Dialog,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Divider,
  Stack,
  InputAdornment,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import dinnarIcon from '../../../assets/login/DinnerIcon.png'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import GoogleIcon from '@mui/icons-material/Google';
import foodImage from '../../../assets/login/food.webp'

// Replace with your own asset, e.g. import foodImage from '../../../assets/login/food.png';

const RED = '#E32227';

const features = [
  {
    icon: <FlashOnRoundedIcon sx={{ fontSize: 18 }} />,
    title: 'Quick Ordering',
    desc: 'Save time on every order.',
  },
  {
    icon: <ReplayRoundedIcon sx={{ fontSize: 18 }} />,
    title: 'Easy Reordering',
    desc: 'Find your favourites faster.',
  },
  {
    icon: <NotificationsNoneRoundedIcon sx={{ fontSize: 18 }} />,
    title: 'Order Updates',
    desc: 'Stay updated from order to delivery.',
  },
];

const trustItems = [
  { icon: <CachedRoundedIcon sx={{ fontSize: 13 }} />, label: 'Order faster.' },
  { icon: <Inventory2OutlinedIcon sx={{ fontSize: 13 }} />, label: 'Track easily.' },
  { icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 13 }} />, label: 'Enjoy more.' },
];

const LoginPopup = ({ open, onClose }) => {
  const [mobile, setMobile] = useState('');

  const handleContinue = () => {
    // TODO: implement OTP / continue logic
    console.log('Continue with mobile:', mobile);
  };

  const handleGoogleLogin = () => {
    // TODO: implement Google login
    console.log('Continue with Google');
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '18px',
          overflow: 'hidden',
          maxWidth: 860,
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        {/* LEFT — dark brand panel */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '44%' },
            bgcolor: '#161311',
            color: '#fff',
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            overflow: 'hidden',
            height:'100'
          }}
        >

          <Box sx={{ position: 'relative', zIndex: 1, px: 3.5, pt: 4 }}>
            <Box sx={{ width: 34, height: 3, bgcolor: RED, borderRadius: 2, mb: 2 }} />

            <Typography
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 800,
                fontSize: '1.55rem',
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
                fontSize: '0.83rem',
                color: 'rgba(255, 255, 255, 0.81)',
                mb: 3,
                maxWidth: 230,
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
              height: 230,
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

        {/* RIGHT — login form panel */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '56%' },
            bgcolor: '#fff',
            px: { xs: 3, sm: 4.5 },
            py: { xs: 4, sm: 4.5 },
          }}
        >
          <IconButton
            onClick={onClose}
            size="small"
            sx={{ position: 'absolute', right: 14, top: 14, color: '#8a8a8a' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <Box sx={{ textAlign: 'center', mb: 1.5 }}>
            <Box sx={{ position: 'relative', display: 'inline-block', mb: 0 }}>
              <Box component="img" src={dinnarIcon} alt="" sx={{ width: 40, height: 40 }} />
              <FavoriteRoundedIcon
                sx={{ position: 'absolute', top: -6, left: -10, fontSize: 12, color: RED }}
              />
              <FavoriteRoundedIcon
                sx={{ position: 'absolute', top: -10, right: -8, fontSize: 9, color: RED }}
              />
            </Box>

            <Typography
              sx={{
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 800,
                fontSize: '1.35rem',
                color: '#1a1a1a',
                mb: 0,
              }}
            >
              Welcome back!
            </Typography>

            <Typography
              sx={{
                fontFamily: '"open sans", sans-serif',
                fontSize: '0.85rem',
                color: '#6b6b6b',
                maxWidth: 300,
                mx: 'auto',
                lineHeight: 1.5,
              }}
            >
              Login now to experience{' '}
              <Box component="span" sx={{ color: RED, fontWeight: 700 }}>
                faster ordering
              </Box>{' '}
              with Hogist.
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: '"open sans", sans-serif',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: '#3a3a3a',
              mb: 0.75,
            }}
          >
            Mobile Number
          </Typography>

          <TextField
            fullWidth
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
            inputProps={{ maxLength: 10 }}
            sx={{ mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Typography
                    sx={{
                      fontFamily: '"open sans", sans-serif',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      color: '#1a1a1a',
                      pr: 1.2,
                      borderRight: '1px solid #e2e2e2',
                    }}
                  >
                    +91
                  </Typography>
                </InputAdornment>
              ),
              sx: {
                borderRadius: '10px',
                fontFamily: '"open sans", sans-serif',
                fontSize: '0.9rem',
                '& fieldset': { borderColor: '#e2e2e2' },
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            disableElevation
            onClick={handleContinue}
            sx={{
              py: 1.3,
              mb: 1,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 700,
              fontFamily: '"open sans", sans-serif',
              fontSize: '0.9rem',
              bgcolor: RED,
              color: '#fff',
              '&:hover': { bgcolor: '#c81c20' },
            }}
          >
            Continue
          </Button>

          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
            <Divider sx={{ flex: 1 }} />
            <Typography
              sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.8rem', color: '#9a9a9a' }}
            >
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Stack>

          <Button
            fullWidth
            variant="outlined"
            disableElevation
            startIcon={<GoogleIcon sx={{ fontSize: 17 }} />}
            onClick={handleGoogleLogin}
            sx={{
              py: 1.2,
              mb: 2.5,
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 600,
              fontFamily: '"open sans", sans-serif',
              fontSize: '0.88rem',
              borderColor: '#e2e2e2',
              color: '#2a2a2a',
              '&:hover': { borderColor: RED, bgcolor: 'rgba(227,34,39,0.04)' },
            }}
          >
            Continue with Google
          </Button>

          <Typography
            sx={{
              textAlign: 'center',
              fontFamily: '"open sans", sans-serif',
              fontSize: '0.84rem',
              color: '#4a4a4a',
              mb: 2.5,
            }}
          >
            New to Hogist?{' '}
            <Box component="span" sx={{ color: RED, fontWeight: 700, cursor: 'pointer' }}>
              Create an account
            </Box>
          </Typography>

          <Stack direction="row" spacing={2.5} justifyContent="center">
            {trustItems.map((t) => (
              <Stack key={t.label} direction="row" spacing={0.5} alignItems="center">
                <Box sx={{ color: RED, display: 'flex' }}>{t.icon}</Box>
                <Typography
                  sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.72rem', color: '#7a7a7a' }}
                >
                  {t.label}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginPopup;