import React, { useState } from 'react';
import {
  Dialog,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import BrandPanel from './BrandPanel';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const LoginPopup = ({ open, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleContinue = () => {
    // TODO: implement OTP / continue logic
    console.log('Continue with mobile:', mobile);
  };

  const handleGoogleLogin = () => {
    // TODO: implement Google login
    console.log('Continue with Google');
  };

  const handleSignUp = () => {
    // TODO: implement sign up logic
    console.log('Sign up with:', { name, signupEmail, signupPassword });
  };

  const switchToSignUp = () => setIsSignUp(true);
  const switchToSignIn = () => setIsSignUp(false);

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
          width: { xs: '94%', sm: '100%' },
          m: { xs: 1, sm: 3 },
          height: { sm: 600 },
          maxHeight: { xs: '95vh', sm: '90vh' },
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
          height: { sm: '100%' },
          maxHeight: { xs: '95vh', sm: '90vh' },
        }}
      >
        <IconButton
          onClick={onClose}
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
            height: { sm: '100%' },
            overflowY: { sm: 'auto' },
            zIndex: 1,
            transform: { sm: isSignUp ? 'translateX(-78.5714%)' : 'translateX(0%)' },
            transition: 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {!isSignUp ? (
            <SignInForm
              mobile={mobile}
              setMobile={setMobile}
              handleContinue={handleContinue}
              handleGoogleLogin={handleGoogleLogin}
              switchToSignUp={switchToSignUp}
            />
          ) : (
            <SignUpForm
              signupEmail={signupEmail}
              setSignupEmail={setSignupEmail}
              signupPassword={signupPassword}
              setSignupPassword={setSignupPassword}
              handleSignUp={handleSignUp}
              handleGoogleLogin={handleGoogleLogin}
              switchToSignIn={switchToSignIn}
            />
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default LoginPopup;