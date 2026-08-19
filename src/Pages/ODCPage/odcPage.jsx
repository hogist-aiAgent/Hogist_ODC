import CssBaseline from '@mui/material/CssBaseline';
import Preloader from '../../components/Common/Preloader/Preloader'
import Navbar from '../../components/Layout/Header/Navbar';
import Hero from '../../components/ODC/HeroSection/Hero';
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
  return (
    <>
      <CssBaseline />
      <Preloader />
      <WhatsAppButton phoneNumber={'15557647627'}/>
      <ChatWidget/>
      <Navbar />
      <Hero />
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