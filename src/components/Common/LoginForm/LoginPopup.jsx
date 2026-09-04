import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BrandPanel from './BrandPanel';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
// OTP verification is not used for now — sign up / sign in go straight
// through email + password. The import, screen, and all handlers below
// are commented out (not deleted) so the OTP flow can be switched back
// on later without rebuilding it. See OtpVerification.jsx, which is kept
// as-is and untouched for when that time comes.
// import OtpVerification from './OtpVerification';
import { loginUser, registerUser, clearAuthErrors, clearRegisterSuccess } from '../../../store/slices/authSlice';

const LoginPopup = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { loginLoading, loginError, registerLoading, registerError } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // ─── OTP step — DISABLED FOR NOW ───────────────────────────────────────
  // Sign up and sign in currently go straight to the real register/login
  // calls with email + password, no OTP step in between. To bring OTP
  // back later: uncomment the state below, the OtpVerification import
  // above, the handleSendOtp/handleVerifyOtp/handleResendOtp/
  // handleBackFromOtp functions, the `step === 'otp'` render branch, and
  // call handleSendOtp('login') / handleSendOtp('register') instead of
  // dispatching loginUser/registerUser directly in handleContinue /
  // handleSignUp below.
  // const [step, setStep] = useState('form'); // 'form' | 'otp'
  // const [otpFlow, setOtpFlow] = useState(null); // 'login' | 'register'

  const resetLoginFields = () => {
    setEmail('');
    setPassword('');
  };

  const resetSignupFields = () => {
    setFullName('');
    setSignupMobile('');
    setSignupEmail('');
    setSignupPassword('');
  };

  // const handleSendOtp = (flow) => {
  //   // TODO: call the send-OTP API here once it's available, using `email`
  //   // for the login flow or `signupMobile` for the register flow.
  //   dispatch(clearAuthErrors());
  //   setOtpFlow(flow);
  //   setStep('otp');
  // };

  const handleContinue = () => {
    dispatch(loginUser({ userName: email, password }))
      .unwrap()
      .then(() => {
        resetLoginFields();
        onClose();
      })
      .catch(() => {
        // loginError from the store is already shown on the sign-in screen
      });
  };

  const handleGoogleLogin = () => {
    // TODO: implement Google login
    console.log('Continue with Google');
  };

  const handleSignUp = () => {
    dispatch(
      registerUser({
        fullName,
        email: signupEmail,
        mobile: signupMobile,
        password: signupPassword,
      })
    )
      .unwrap()
      .then(() => {
        resetSignupFields();
        setIsSignUp(false);
        dispatch(clearRegisterSuccess());
      })
      .catch(() => {
        // registerError from the store is already shown on the sign-up screen
      });
  };

  // ─── OTP handlers — DISABLED FOR NOW, see note above ───────────────────
  // const handleVerifyOtp = () => {
  //   if (otpFlow === 'login') {
  //     dispatch(loginUser({ userName: email, password }))
  //       .unwrap()
  //       .then(() => {
  //         resetLoginFields();
  //         setStep('form');
  //         onClose();
  //       })
  //       .catch(() => {
  //         // loginError from the store is already shown on the OTP screen
  //       });
  //   } else if (otpFlow === 'register') {
  //     dispatch(
  //       registerUser({
  //         fullName,
  //         email: signupEmail,
  //         mobile: signupMobile,
  //         password: signupPassword,
  //       })
  //     )
  //       .unwrap()
  //       .then(() => {
  //         resetSignupFields();
  //         setStep('form');
  //         setIsSignUp(false);
  //         dispatch(clearRegisterSuccess());
  //       })
  //       .catch(() => {
  //         // registerError from the store is already shown on the OTP screen
  //       });
  //   }
  // };

  // const handleResendOtp = () => {
  //   // TODO: call the resend-OTP API here once it's available.
  //   dispatch(clearAuthErrors());
  // };

  // const handleBackFromOtp = () => {
  //   dispatch(clearAuthErrors());
  //   setStep('form');
  // };

  const switchToSignUp = () => {
    dispatch(clearAuthErrors());
    setIsSignUp(true);
  };
  const switchToSignIn = () => {
    dispatch(clearAuthErrors());
    setIsSignUp(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          // Mobile (xs): edge-to-edge full-screen card — no radius, no margin,
          // fills the entire viewport, matching the reference mobile UI.
          // sm and up: unchanged (same floating card as before).
          borderRadius: { xs: 0, sm: '18px' },
          overflow: 'hidden',
          maxWidth: { xs: '100%', sm: 860 },
          width: { xs: '100%', sm: '100%' },
          m: { xs: 0, sm: 3 },
          // Fixed height from sm up (where the two panels sit side by side and
          // slide against each other) so switching between the shorter Sign In
          // content and the taller Sign Up content never resizes the card —
          // only the inner panels scroll if they need more room than this.
          // maxHeight stays as a safety cap for short viewports.
          height: { xs: '100%', sm: 600 },
          maxHeight: { xs: '100%', sm: '90vh' },
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          overflowX: 'hidden',
          overflowY: 'auto',
          height: { xs: '100%', sm: '100%' },
          maxHeight: { xs: '100%', sm: '90vh' },
        }}
      >
        <IconButton
          onClick={handleClose}
          size="small"
          sx={{
            position: 'absolute',
            right: { xs: 10, sm: 14 },
            top: { xs: 10, sm: 14 },
            color: '#8a8a8a',
            zIndex: 3,
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>

        {/* LEFT — dark brand panel */}
        <BrandPanel isSignUp={isSignUp} />

        {/* RIGHT — login / create account form panel */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', sm: '56%' },
            bgcolor: '#fff',
            px: { xs: 2.5, sm: 4.5, md: 5, lg: 5.5 },
            py: { xs: 3, sm: 2, md: 2.25, lg: 3 },
            height: { xs: '100%', sm: '100%' },
            overflowY: { xs: 'auto', sm: 'auto' },
            zIndex: 1,
            transform: { sm: isSignUp ? 'translateX(-78.5714%)' : 'translateX(0%)' },
            transition: 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {/* OTP step disabled for now — see note above. When re-enabled,
              restore the `step === 'otp' ? <OtpVerification ... /> :` branch
              here in front of the ternary below. */}
          {!isSignUp ? (
            <SignInForm
              mobile={email}
              setMobile={setEmail}
              password={password}
              setPassword={setPassword}
              handleContinue={handleContinue}
              handleGoogleLogin={handleGoogleLogin}
              switchToSignUp={switchToSignUp}
              loading={loginLoading}
              error={loginError}
            />
          ) : (
            <SignUpForm
              fullName={fullName}
              setFullName={setFullName}
              signupMobile={signupMobile}
              setSignupMobile={setSignupMobile}
              signupEmail={signupEmail}
              setSignupEmail={setSignupEmail}
              signupPassword={signupPassword}
              setSignupPassword={setSignupPassword}
              handleSignUp={handleSignUp}
              handleGoogleLogin={handleGoogleLogin}
              switchToSignIn={switchToSignIn}
              loading={registerLoading}
              error={registerError}
            />
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginPopup;
