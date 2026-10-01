import React from 'react';
// import GlobalStyles from '../components/GlobalStyles';
import Navbar from '../components/Navbar';
import Hero from '../components/HeroSection';
import Countdown from '../components/Countdown'; // NOVO IMPORT
import EventDetails from '../components/EventDetails';
import ExtraDetails from '../components/ExtraDetails'; // NOVO IMPORT
import RSVP from '../components/RSVP';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <GlobalStyles /> */}
      <Navbar />
      
      <main>
        <Hero />
        {/* <Countdown /> Inserido logo após a capa */}
        <EventDetails />
        <ExtraDetails /> {/* Inserido antes da confirmação de presença */}
        <RSVP />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;