import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  InputAdornment,
  IconButton,
} from '@mui/material';
import dinnarIcon from '../../../assets/login/dinnerIcon.png';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

import { RED, compactFieldSx, trustItems } from './LoginConstants';
import axiosInstance from '../../../services/api/axios';
import { AUTH_ENDPOINTS } from '../../../services/api/endpoints';

const labelSx = {
  fontFamily: '"open sans", sans-serif',
  fontSize: '0.78rem',
  fontWeight: 600,
  color: '#3a3a3a',
  mb: 0.6,
};

const SignInForm = ({
  mobile: email,
  setMobile: setEmail,
  password,
  setPassword,
  handleContinue,
  switchToSignUp,
  loading,
  error,
}) => {
  // Show/hide toggle for the sign-in password field.
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState('signin'); 
  const [resetEmail, setResetEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [resetPassword, setResetPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState('');
  const [resetInfo, setResetInfo] = useState('');

  const openForgotPassword = () => {
    setView('forgot-request');
    setResetError('');
    setResetInfo('');
  };

  const backToSignIn = () => {
    setView('signin');
    setResetEmail('');
    setResetCode('');
    setResetPassword('');
    setShowResetPassword(false);
    setResetError('');
    setResetInfo('');
  };

  const handleRequestCode = async () => {
    if (!resetEmail || resetLoading) return;
    setResetLoading(true);
    setResetError('');
    setResetInfo('');
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.RESET_PASSWORD, {
        email: resetEmail,
        type: 'customer',
      });
      if (res.data?.status) {
        setResetInfo(res.data.message || 'Access code sent to your email.');
        setView('forgot-reset');
      } else {
        setResetError(res.data?.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setResetError(
        err.friendlyMessage || err.response?.data?.error || 'Something went wrong. Please try again.'
      );
    } finally {
      setResetLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!resetCode || !resetPassword || resetLoading) return;
    setResetLoading(true);
    setResetError('');
    setResetInfo('');
    try {
      const res = await axiosInstance.post(AUTH_ENDPOINTS.UPDATE_PASSWORD, {
        email: resetEmail,
        password: resetPassword,
        code: resetCode,
        type: 'customer',
      });
      if (res.data?.status) {
        setResetInfo('Password changed. You can sign in now.');
        setTimeout(() => backToSignIn(), 1200);
      } else {
        setResetError(res.data?.error || 'Access code is wrong.');
      }
    } catch (err) {
      setResetError(err.friendlyMessage || err.response?.data?.error || 'Access code is wrong.');
    } finally {
      setResetLoading(false);
    }
  };

  const BackLink = ({ onClick }) => (
    <Box sx={{ textAlign: 'left', mb: 2 }}>
      <Box
        component="button"
        type="button"
        onClick={onClick}
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          border: 'none',
          bgcolor: 'transparent',
          cursor: 'pointer',
          color: '#8a8a8a',
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.8rem',
          fontWeight: 600,
          p: 0,
          '&:hover': { color: RED },
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
        Back to Sign In
      </Box>
    </Box>
  );

  // ─── Forgot password — step 1: request the access code by email ───────
  if (view === 'forgot-request') {
    return (
      <>
        <BackLink onClick={backToSignIn} />

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.25rem', lg: '1.3rem' },
              color: '#1a1a1a',
              mb: 0.75,
            }}
          >
            Reset your password
          </Typography>
          <Typography
            sx={{
              fontFamily: '"open sans", sans-serif',
              fontSize: '0.78rem',
              color: '#6b6b6b',
              maxWidth: 320,
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            Enter your registered email and we'll send you an access code to reset your password.
          </Typography>
        </Box>

        <Typography sx={labelSx}>Email</Typography>
        <TextField
          fullWidth
          placeholder="Enter your registered email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          sx={compactFieldSx}
        />

        {resetError && (
          <Typography sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.78rem', color: RED, mb: 1 }}>
            {resetError}
          </Typography>
        )}
        {resetInfo && (
          <Typography sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.78rem', color: '#2e7d32', mb: 1 }}>
            {resetInfo}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={resetLoading}
          onClick={handleRequestCode}
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
          {resetLoading ? 'Sending code...' : 'Send Access Code'}
        </Button>
      </>
    );
  }

  // ─── Forgot password — step 2: submit the code + new password ─────────
  if (view === 'forgot-reset') {
    return (
      <>
        <BackLink onClick={backToSignIn} />

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            sx={{
              fontFamily: '"Montserrat", sans-serif',
              fontWeight: 800,
              fontSize: { xs: '1.25rem', lg: '1.3rem' },
              color: '#1a1a1a',
              mb: 0.75,
            }}
          >
            Enter access code
          </Typography>
          <Typography
            sx={{
              fontFamily: '"open sans", sans-serif',
              fontSize: '0.78rem',
              color: '#6b6b6b',
              maxWidth: 320,
              mx: 'auto',
              lineHeight: 1.5,
            }}
          >
            We've sent an 8-digit access code to{' '}
            <Box component="span" sx={{ fontWeight: 700, color: '#2a2a2a' }}>
              {resetEmail}
            </Box>
            . Enter it below with your new password.
          </Typography>
        </Box>

        <Typography sx={labelSx}>Access Code</Typography>
        <TextField
          fullWidth
          placeholder="Enter the 8-digit access code"
          value={resetCode}
          onChange={(e) => setResetCode(e.target.value.replace(/\D/g, ''))}
          inputProps={{ maxLength: 8 }}
          sx={compactFieldSx}
        />

        <Typography sx={labelSx}>New Password</Typography>
        <TextField
          fullWidth
          type={showResetPassword ? 'text' : 'password'}
          placeholder="Enter your new password"
          value={resetPassword}
          onChange={(e) => setResetPassword(e.target.value)}
          sx={compactFieldSx}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowResetPassword((v) => !v)}
                  edge="end"
                  size="small"
                  tabIndex={-1}
                >
                  {showResetPassword ? (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 19, color: '#8a8a8a' }} />
                  ) : (
                    <VisibilityOutlinedIcon sx={{ fontSize: 19, color: '#8a8a8a' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {resetError && (
          <Typography sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.78rem', color: RED, mb: 1 }}>
            {resetError}
          </Typography>
        )}
        {resetInfo && (
          <Typography sx={{ fontFamily: '"open sans", sans-serif', fontSize: '0.78rem', color: '#2e7d32', mb: 1 }}>
            {resetInfo}
          </Typography>
        )}

        <Button
          fullWidth
          variant="contained"
          disableElevation
          disabled={resetLoading}
          onClick={handleUpdatePassword}
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
          {resetLoading ? 'Updating...' : 'Update Password'}
        </Button>
      </>
    );
  }

  // ─── Normal sign-in view ────────────────────────────────────────────────
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

      <Typography sx={labelSx}>
        Email
      </Typography>

      <TextField
        fullWidth
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={compactFieldSx}
      />

      <Typography sx={labelSx}>
        Password
      </Typography>

      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={compactFieldSx}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((v) => !v)}
                edge="end"
                size="small"
                tabIndex={-1}
              >
                {showPassword ? (
                  <VisibilityOffOutlinedIcon sx={{ fontSize: 19, color: '#8a8a8a' }} />
                ) : (
                  <VisibilityOutlinedIcon sx={{ fontSize: 19, color: '#8a8a8a' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ textAlign: 'right', mb: 1.5 }}>
        <Box
          component="span"
          onClick={openForgotPassword}
          sx={{
            fontFamily: '"open sans", sans-serif',
            fontSize: '0.76rem',
            fontWeight: 700,
            color: RED,
            cursor: 'pointer',
          }}
        >
          Forgot password?
        </Box>
      </Box>

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