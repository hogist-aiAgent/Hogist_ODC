import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Common/Preloader/Preloader'
import Navbar from '../../components/Layout/Header/Navbar';
import Hero from '../../components/ODC/HeroSection/Hero';
import Snackbar from '../../components/Common/Snackbar/Snackbar';
import { isChennaiLocation } from '../../utils/chennaiLocation';
import HowItWorks from '../../components/ODC/HowItWorks/HowItWorks';
import TrustedClients from '../../components/ODC/TrustedClients/TrustedClients';
import AppDownload from '../../components/ODC/AppDownload/AppDownload';
import Testimonials from '../../components/ODC/Testimonial/Testimonials';
import Footer from '../../components/Layout/Footer/Footer';
import ServiceAreas from '../../components/ODC/Serviceareas/ServicesAreas' 
import WhatHogistOffers from '../../components/ODC/WhatOffers/WhatHogistOffers'
import WhyHogist from '../../components/ODC/Whyhogist/Whyhogist';
import ReadyWhenYouAre from '../../components/ODC/ReadyWhenYouare/Readywhenyouare';
import FAQ from '../../components/ODC/FAQ/Faq';
import ChatWidget from '../../components/Common/WhatsapChatBot/ChatWidget';
import WhatsAppButton from '../../components/Common/WhatsapChatBot/WhatsAppButton';

function OdcPage() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState({ open: false, message: '', severity: 'info' });

  const closeNotice = () => setNotice((prev) => ({ ...prev, open: false }));

  const handleLocationConfirm = (selectedLocation) => {
    const locationText = selectedLocation?.full || selectedLocation?.label || '';

    if (isChennaiLocation(locationText, { lat: selectedLocation?.lat, lon: selectedLocation?.lon })) {
      navigate('/Menu', { state: { selectedLocation } });
    } else {
      setNotice({
        open: true,
        message: 'Sorry, we currently deliver only within Chennai, Chengalpattu and Kanchipuram. Please choose a location within our service area.',
        severity: 'error',
      });
    }
  };

  return (
    <>
      <CssBaseline />
      <Preloader />
      <WhatsAppButton phoneNumber={'15557647627'}/>
      <ChatWidget/>
      <Navbar />
      <Hero onLocationConfirm={handleLocationConfirm} />
      <Snackbar
        open={notice.open}
        message={notice.message}
        severity={notice.severity}
        onClose={closeNotice}
      />
      <WhatHogistOffers/>
      <HowItWorks />
      <TrustedClients />
       <WhyHogist/>
       <Testimonials />
       <AppDownload />
       <ServiceAreas/>
       <FAQ/>
       <ReadyWhenYouAre/>
       <Footer />
    </>
  );
}

export default OdcPage;