import React from 'react';
import Navbar from '../../components/Navbar'; // Update the import path as necessary
import Footer from '../../components/Footer';
import Holder from '../../components/Holder';
import './Home.module.css'; // Assuming you have specific CSS for Home

const Home = () => {
  return (
    <>
      <Navbar />
      <Holder />
      <Footer />
    </>
  );
};

export default Home;
