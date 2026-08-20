import CssBaseline from '@mui/material/CssBaseline';
import { useNavigate } from 'react-router-dom';
import Preloader from '../../components/Common/Preloader/Preloader'
import Navbar from '../../components/Layout/Header/Navbar';
import Hero from '../../components/ODC/HeroSection/Hero';
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

  // Called by Hero (via LocationSearchBox's confirm()) once a location is
  // picked. Only navigates to the Menu page if the picked location is
  // inside the Chennai/Chengalpattu/Kanchipuram service metro; otherwise
  // it stays on this page.
  const handleLocationConfirm = (selectedLocation) => {
    const locationText = selectedLocation?.full || selectedLocation?.label || '';

    if (isChennaiLocation(locationText)) {
      navigate('/Menu', { state: { selectedLocation } });
    } else {
      alert('Sorry, we currently deliver only within Chennai, Chengalpattu and Kanchipuram. Please choose a location within our service area.');
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