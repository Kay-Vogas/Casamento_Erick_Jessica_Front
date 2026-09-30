import React from 'react';
// import GlobalStyles from '../components/GlobalStyles';
import Navbar from '../components/Navbar';
import Hero from '../components/HeroSection';
import EventDetails from '../components/EventDetails';
import RSVP from '../components/RSVP';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* <GlobalStyles /> */}
      <Navbar />
      <Hero />
      <EventDetails />
      <RSVP />
      <Footer />
    </div>
  );
};

export default Home;