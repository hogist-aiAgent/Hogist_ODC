import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';

import { RED } from './LoginConstants';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

// Shows "+91 98765 43210" when given a plain 10-digit mobile number,
// otherwise falls back to whatever was typed (e.g. if the sign-in field
// was used with an email instead of a mobile number).
const formatMobileDisplay = (value) => {
  const digits = (value || '').replace(/\D/g, '');
  if (digits.length !== 10) return value || '';
  return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
};

// UI-only OTP step. There is no send-OTP / verify-OTP endpoint in the
// backend yet — that's being built separately. For now this screen just
// collects a 6-digit code and, once "complete", hands it back to the
// parent via onVerify() so the real login/register call can be wired to
// it later without touching this component again.
const OtpVerification = ({ mobile, onVerify, onResend, onBack, loading, error }) => {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (secondsLeft <= 0) return undefined;
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const otpCode = digits.join('');
  const isComplete = otpCode.length === OTP_LENGTH;

  const handleChange = (index, rawValue) => {
    const value = rawValue.replace(/\D/g, '');
    if (!value) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
      return;
    }

    // Support pasting the whole code into one box.
    if (value.length > 1) {
      setDigits((prev) => {
        const next = [...prev];
        value
          .slice(0, OTP_LENGTH - index)
          .split('')
          .forEach((char, offset) => {
            next[index + offset] = char;
          });
        return next;
      });
      const lastFilled = Math.min(index + value.length, OTP_LENGTH) - 1;
      inputRefs.current[lastFilled]?.focus();
      return;
    }

    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendClick = () => {
    if (secondsLeft > 0) return;
    setDigits(Array(OTP_LENGTH).fill(''));
    setSecondsLeft(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
    onResend?.();
  };

  const handleVerifyClick = () => {
    if (!isComplete || loading) return;
    onVerify?.(otpCode);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        component="button"
        type="button"
        onClick={onBack}
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
          mb: { xs: 2, sm: 3 },
          alignSelf: 'flex-start',
          '&:hover': { color: RED },
        }}
      >
        <ArrowBackRoundedIcon sx={{ fontSize: 16 }} />
        Back
      </Box>

      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          bgcolor: 'rgba(227,34,39,0.08)',
          color: RED,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 2,
        }}
      >
        <ShieldOutlinedIcon sx={{ fontSize: 26 }} />
      </Box>

      <Typography
        sx={{
          fontFamily: '"Montserrat", sans-serif',
          fontWeight: 800,
          fontSize: { xs: '1.15rem', sm: '1.25rem' },
          color: '#1f1f1f',
          mb: 0.75,
        }}
      >
        Verify your mobile number
      </Typography>

      <Typography
        sx={{
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.85rem',
          color: '#6a6a6a',
          mb: { xs: 2.5, sm: 3 },
        }}
      >
        We've sent a {OTP_LENGTH}-digit OTP to{' '}
        <Box component="span" sx={{ fontWeight: 700, color: '#2a2a2a' }}>
          {formatMobileDisplay(mobile)}
        </Box>
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: 1, sm: 1.25 },
          mb: 2,
        }}
      >
        {digits.map((digit, index) => (
          <Box
            key={index}
            component="input"
            inputMode="numeric"
            maxLength={OTP_LENGTH}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(el) => (inputRefs.current[index] = el)}
            sx={{
              width: { xs: 38, sm: 44 },
              height: { xs: 44, sm: 50 },
              textAlign: 'center',
              fontSize: '1.1rem',
              fontWeight: 700,
              fontFamily: '"open sans", sans-serif',
              color: '#1f1f1f',
              borderRadius: '10px',
              border: digit ? `1.5px solid ${RED}` : '1.5px solid #e2e2e2',
              outline: 'none',
              '&:focus': { borderColor: RED },
            }}
          />
        ))}
      </Box>

      {error && (
        <Typography
          sx={{
            fontFamily: '"open sans", sans-serif',
            fontSize: '0.78rem',
            color: RED,
            mb: 1.5,
          }}
        >
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        disableElevation
        disabled={!isComplete || loading}
        onClick={handleVerifyClick}
        sx={{
          py: 1.1,
          mb: 2,
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 700,
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.9rem',
          bgcolor: RED,
          color: '#fff',
          '&:hover': { bgcolor: '#c81c20' },
          '&.Mui-disabled': { bgcolor: '#e8b4b5', color: '#fff' },
        }}
      >
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </Button>

      <Typography
        sx={{
          fontFamily: '"open sans", sans-serif',
          fontSize: '0.82rem',
          color: '#6a6a6a',
          mb: { xs: 2.5, sm: 3 },
        }}
      >
        {secondsLeft > 0 ? (
          <>
            Resend OTP in{' '}
            <Box component="span" sx={{ fontWeight: 700, color: '#2a2a2a' }}>
              00:{String(secondsLeft).padStart(2, '0')}
            </Box>
          </>
        ) : (
          <Box
            component="span"
            onClick={handleResendClick}
            sx={{ color: RED, fontWeight: 700, cursor: 'pointer' }}
          >
            Resend OTP
          </Box>
        )}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          bgcolor: 'rgba(227,34,39,0.06)',
          borderRadius: '10px',
          px: 1.5,
          py: 1,
          textAlign: 'left',
        }}
      >
        <ShieldOutlinedIcon sx={{ fontSize: 18, color: RED, flexShrink: 0 }} />
        <Typography
          sx={{
            fontFamily: '"open sans", sans-serif',
            fontSize: '0.74rem',
            color: '#5a5a5a',
            lineHeight: 1.35,
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: '#2a2a2a' }}>
            Your details are safe with Hogist.
          </Box>{' '}
          We never share your information with anyone.
        </Typography>
      </Box>
    </Box>
  );
};

export default OtpVerification;
