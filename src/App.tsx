import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import Industries from './components/sections/Industries';
import Contact from './components/sections/Contact';
import Success from './components/sections/Success';

import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100">
            <Header />
            <main>
              <Hero />
              <About />
              <Portfolio />
              <Services />
              <Testimonials />
              <Industries />
              <Contact />
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;