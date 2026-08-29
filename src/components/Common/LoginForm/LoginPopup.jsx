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
import { loginUser, registerUser, clearAuthErrors, clearRegisterSuccess } from '../../../store/slices/authSlice';

const LoginPopup = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { loginLoading, loginError, registerLoading, registerError } = useSelector(
    (state) => state.auth
  );

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  const handleContinue = () => {
    dispatch(loginUser({ userName: mobile, password }))
      .unwrap()
      .then(() => {
        setMobile('');
        setPassword('');
        onClose();
      })
      .catch(() => {
        // loginError from the store is already shown in SignInForm
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
        setFullName('');
        setSignupMobile('');
        setSignupEmail('');
        setSignupPassword('');
        setIsSignUp(false);
        dispatch(clearRegisterSuccess());
      })
      .catch(() => {
        // registerError from the store is already shown in SignUpForm
      });
  };

  const switchToSignUp = () => {
    dispatch(clearAuthErrors());
    setIsSignUp(true);
  };
  const switchToSignIn = () => {
    dispatch(clearAuthErrors());
    setIsSignUp(false);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: '18px' },
          overflow: 'hidden',
          maxWidth: { xs: '100%', sm: 860 },
          width: { xs: '100%', sm: '100%' },
          m: { xs: 0, sm: 3 },
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
            height: { xs: '100%', sm: '100%' },
            overflowY: { xs: 'auto', sm: 'auto' },
            zIndex: 1,
            transform: { sm: isSignUp ? 'translateX(-78.5714%)' : 'translateX(0%)' },
            transition: 'transform 0.65s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {!isSignUp ? (
            <SignInForm
              mobile={mobile}
              setMobile={setMobile}
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