import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Header/Navbar';
import Hero from './components/HeroSection/Hero';
import HowItWorks from './components/HowItWorks/HowItWorks';
import TrustedClients from './components/TrustedClients';
// import WhatWeHave from './components/WhatWeHave';
// import IsoBanner from './components/IsoBanner';
// import Gallery from './components/Gallery';
import AppDownload from './components/AppDownload/AppDownload';
// import Testimonials from './components/Testimonials';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Hero />
      <HowItWorks />
      <TrustedClients />
      {/* <WhatWeHave />
      <IsoBanner />
      <Gallery />
      <Testimonials />
       */}
       <AppDownload />
       <Footer />
    </>
  );
}

export default App;
