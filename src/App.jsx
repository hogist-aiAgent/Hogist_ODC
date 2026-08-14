import CssBaseline from '@mui/material/CssBaseline';
import Preloader from './components/Common/Preloader/Preloader'
import Navbar from './components/Header/Navbar';
import Hero from './components/HeroSection/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import TrustedClients from './components/TrustedClients/TrustedClients';
import AppDownload from './components/AppDownload/AppDownload';
import Testimonials from './components/Testimonial/Testimonials';
import Footer from './components/Footer/Footer';
import ServiceAreas from './components/Serviceareas/ServicesAreas' 
import WhatHogistOffers from './components/WhatOffers/WhatHogistOffers'
import WhyHogist from './components/Whyhogist/Whyhogist';
import ReadyWhenYouAre from './components/ReadyWhenYouare/Readywhenyouare';
import FAQ from './components/FAQ/Faq';

function App() {
  return (
    <>
      <CssBaseline />
      <Preloader />
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

export default App;