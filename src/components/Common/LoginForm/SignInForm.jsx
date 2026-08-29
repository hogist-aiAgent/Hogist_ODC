import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  InputAdornment,
} from '@mui/material';
import dinnarIcon from '../../../assets/login/dinnerIcon.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GoogleIcon from '@mui/icons-material/Google';

import { RED, compactFieldSx, trustItems } from './LoginConstants';

const SignInForm = ({
  mobile,
  setMobile,
  password,
  setPassword,
  handleContinue,
  handleGoogleLogin,
  switchToSignUp,
  loading,
  error,
}) => {
  return (
    <>
      <Box sx={{ textAlign: 'center', mb: 4 ,mt:3}}>
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
            fontSize: { xs: '1.35rem', lg: '1.4rem' },
            color: '#1a1a1a',
            mb: 0,
          }}
        >
          Welcome back!
        </Typography>

        <Typography
          sx={{
            fontFamily: '"open sans", sans-serif',
            fontSize: '0.7rem',
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
          mb: 0.6,
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
        sx={compactFieldSx}
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
        }}
      />

      <Typography
        sx={{
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.78rem',
          fontWeight: 600,
          color: '#3a3a3a',
          mb: 0.6,
        }}
      >
        Password
      </Typography>

      <TextField
        fullWidth
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={compactFieldSx}
      />

      {error && (
        <Typography
          sx={{
            fontFamily: '"open sans", sans-serif',
            fontSize: '0.78rem',
            color: RED,
            mb: 1,
          }}
        >
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        disableElevation
        disabled={loading}
        onClick={handleContinue}
        sx={{
          py: 1.1,
          mb: 1,
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.9rem',
          bgcolor: RED,
          color: '#fff',
          '&:hover': { bgcolor: '#c81c20' },
          '&.Mui-disabled': { bgcolor: '#e28a8c', color: '#fff' },
        }}
      >
        {loading ? 'Signing in...' : 'Continue'}
      </Button>

   

      <Typography
        sx={{
          textAlign: 'center',
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.84rem',
          color: '#4a4a4a',
          mb: 2,
        }}
      >
        New to Hogist?{' '}
        <Box
          component="span"
          onClick={switchToSignUp}
          sx={{ color: RED, fontWeight: 700, cursor: 'pointer' }}
        >
          Create an account
        </Box>
      </Typography>

      <Stack
        direction="row"
        spacing={{ xs: 1.5, sm: 2.5 }}
        rowGap={1}
        flexWrap="wrap"
        justifyContent="center"
      >
        {trustItems.map((t) => (
          <Stack key={t.label} direction="row" spacing={0.5} alignItems="center">
            <Box sx={{ color: RED, display: 'flex' }}>{t.icon}</Box>
            <Typography
              sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.72rem', color: '#7a7a7a', whiteSpace: 'nowrap' }}
            >
              {t.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default SignInForm;