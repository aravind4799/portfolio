'use client';

import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const LeetCodeIcon = ({ size = 32 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height={size} 
    width={size}
  >
    <path d="M12 13h7.5"></path>
    <path d="m9.424 7.268 4.999 -4.999"></path>
    <path d="m16.633 16.644 -2.402 2.415a3.189 3.189 0 0 1 -4.524 0l-3.77 -3.787a3.223 3.223 0 0 1 0 -4.544l3.77 -3.787a3.189 3.189 0 0 1 4.524 0l2.302 2.313"></path>
  </svg>
);

const Home = () => {
  return (
    <section id="home" className="relative h-screen w-screen flex items-center justify-center text-white p-4 overflow-hidden">
      <div className="relative z-10 flex items-center justify-center gap-8 md:gap-12 mb-20">
        <div className="group relative cursor-pointer transition-transform duration-300 hover:scale-110 font-display">
          <span className="text-9xl md:text-[10rem]  font-bold text-cyan-800 absolute top-2 left-2 -z-20 transition-all duration-300 ease-in-out group-hover:-translate-y-4 group-hover:-translate-x-4">A</span>
          <span className="text-9xl md:text-[10rem]  font-bold text-cyan-600 absolute top-1 left-1 -z-10 transition-all duration-300 ease-in-out group-hover:-translate-y-2 group-hover:-translate-x-2">A</span>
          <span className="text-9xl md:text-[10rem]  font-bold text-cyan-400 relative z-10">A</span>
        </div>
        <div className="w-0.5 h-28 md:h-40 bg-gray-400"></div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold">Aravind K</h1>
          <div className="font-mono">
            <p className="text-lg md:text-xl text-gray-300 font-mono">CS Master&apos;s @ Purdue University</p>
            <div className="flex items-center gap-2 text-lg md:text-xl text-gray-300 mt-1 font-mono">
              <span>Oracle Certified Java developer</span>
            </div>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <a href="https://github.com/aravind4799" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Github size={32} />
            </a>
            <a href="https://www.linkedin.com/in/aravindkumar3/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <Linkedin size={32} />
            </a>
            <a href="https://leetcode.com/u/aravind4799/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              <LeetCodeIcon size={32} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
