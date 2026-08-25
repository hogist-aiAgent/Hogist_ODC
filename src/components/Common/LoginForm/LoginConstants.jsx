import React from 'react';
import FlashOnRoundedIcon from '@mui/icons-material/FlashOnRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

export const RED = '#E32227';

export const compactFieldSx = {
  mb: 1.1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '10px',
    fontFamily: '"open sans", sans-serif',
    fontSize: '0.9rem',
  },
  '& .MuiOutlinedInput-input': {
    padding: '9px 12px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2e2e2',
  },
};

export const features = [
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

export const trustItems = [
  { icon: <CachedRoundedIcon sx={{ fontSize: 13 }} />, label: 'Order faster.' },
  { icon: <Inventory2OutlinedIcon sx={{ fontSize: 13 }} />, label: 'Track easily.' },
  { icon: <FavoriteBorderRoundedIcon sx={{ fontSize: 13 }} />, label: 'Enjoy more.' },
];