import CssBaseline from '@mui/material/CssBaseline';
import Preloader from './components/Common/Preloader/Preloader'
import Navbar from './components/Header/Navbar';
import Hero from './components/HeroSection/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import TrustedClients from './components/TrustedClients';
// import WhatWeHave from './components/WhatWeHave';
// import IsoBanner from './components/IsoBanner';
// import Gallery from './components/Gallery';
import AppDownload from './components/AppDownload/AppDownload';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer/Footer';
import ServiceAreas from './components/Serviceareas/ServicesAreas' 
import WhatHogistOffers from './components/WhatOffers/WhatHogistOffers'
import WhyHogist from './components/Whyhogist/Whyhogist';

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
      {/* <WhatWeHave />
      <IsoBanner />
      <Gallery />
       */}
       <WhyHogist/>
       <Testimonials />
       <AppDownload />
       <ServiceAreas/>
       <Footer />
    </>
  );
}

export default App;