
import React from 'react';
import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { trackEvent } from '../../../utils/analytics';

const WhatsAppButton = ({ phoneNumber }) => {
  const openWhatsApp = () => {
     trackEvent({
    category: "Chat",
    action: "Open",
    label: `WhatsappChatBot`,
  });
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <Fab
      color="success"
      aria-label="whatsapp"
      onClick={openWhatsApp}
      sx={{
        position: 'fixed',
        bottom: 32,
        left: 10,
        zIndex: 1000,
        boxShadow: 6,
      }}
    >
      <WhatsAppIcon sx={{
        color:"white"
      }} />
    </Fab>
  );
};

export default WhatsAppButton;