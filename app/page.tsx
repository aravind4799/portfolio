'use client'; 

import React from 'react';
import {StarryBackground} from './componets/StarryBackground';
import {Contact} from './componets/Contact';
import {Projects} from './componets/Projects';
import {About} from './componets/About';
import {Home} from './componets/Home';
import {Header} from './componets/Header';

export default function App() {
  return (
    <div>
      <StarryBackground />
      <Header />
      <main>
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

